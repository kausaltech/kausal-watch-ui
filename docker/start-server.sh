#!/bin/bash

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

if [ -z "$AUTH_SECRET" ]; then
  echo "⚠️ AUTH_SECRET is not set; generating it dynamically."
  AUTH_SECRET=$(tr -dc A-Za-z0-9 </dev/urandom | head -c 32; echo)
  export AUTH_SECRET
fi

PLACEHOLDERS_FN=runtime-placeholders.txt

replace_placeholders() {
  SED_ARGS=()
  while IFS='|' read -r env_var placeholder ; do
    replacement=$(eval echo \$"$env_var")
    echo Replacing \""$placeholder"\" with \""$replacement"\"
    SED_ARGS+=('-e' "s=$placeholder=$replacement=g")
  done < "$PLACEHOLDERS_FN"

  while IFS= read -r fn ; do
    sed "${SED_ARGS[@]}" < "${fn}" > "${fn}.new"
    mv "${fn}.new" "$fn"
  done < <(cat runtime-placeholder-files.txt)
}

if [ -f "$PLACEHOLDERS_FN" ]; then
  replace_placeholders
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
