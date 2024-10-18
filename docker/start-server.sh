#!/bin/sh

set -e

if [ -n "$APP_ROOT" ] ; then
  cd "$APP_ROOT"
fi

if [ -z "$NEXT_PUBLIC_SENTRY_DSN" ]; then
  export NEXT_PUBLIC_SENTRY_DSN="$SENTRY_DSN"
fi

if [ -z "$NEXT_PUBLIC_DEPLOYMENT_TYPE" ]; then
  export NEXT_PUBLIC_DEPLOYMENT_TYPE="$DEPLOYMENT_TYPE"
fi

replace_placeholder() {
  placeholder="$1"
  replacement="$2"

  if [ -z "$placeholder" ] ; then
    return
  fi

  # shellcheck disable=SC2086
  echo Replacing \"$placeholder\" with \"$replacement\"

  # shellcheck disable=SC2038
  dotnext_files=$(find .next -name '*.json' -o -name '*.html' -o -name '*.js' -o -name '*.css' | xargs grep -l "$placeholder" | xargs)
  if [ -f server.js ] ; then
    dotnext_files="$dotnext_files server.js"
  fi
  for fn in $dotnext_files ; do
    sed -e "s=$placeholder=$replacement=g" < "${fn}" > "${fn}.new"
    mv "${fn}.new" "$fn"
  done
}

PLACEHOLDERS_FN=runtime-placeholders.txt

# Read and process .placeholders file
if [ -f "$PLACEHOLDERS_FN" ]; then
  while IFS='|' read -r env_var placeholder
  do
    replacement=$(eval echo \$"$env_var")
    replace_placeholder "$placeholder" "$replacement"
  done < "$PLACEHOLDERS_FN"
fi

export PORT="${NEXTJS_PORT}"
export HOSTNAME=0.0.0.0

if [ "$NEXTJS_STANDALONE_BUILD" = "1" ] ; then
  NODE_CMD="node server.js"
else
  NODE_CMD="/app/node_modules/.bin/next start"
fi

CADDY_CMD="/usr/sbin/caddy run -c /etc/caddy/Caddyfile"

if [ -z "$1" ] ; then
  exec multirun "$NODE_CMD" "$CADDY_CMD"
elif [ "$1" = "caddy" ]; then
  exec $CADDY_CMD
elif [ "$1" = "nextjs" ]; then
  exec $NODE_CMD
else
  echo "Invalid command: $1"
  exit 1
fi
