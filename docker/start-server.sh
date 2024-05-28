#!/bin/sh

set -e

if [ ! -z "$APP_ROOT" ] ; then
  cd $APP_ROOT
fi

function replace_asset_prefix() {
  if [ -z "$NEXTJS_ASSET_PREFIX_PLACEHOLDER" ] ; then
    return
  fi

  echo Replacing \"$NEXTJS_ASSET_PREFIX_PLACEHOLDER\" with \"$NEXTJS_ASSET_PREFIX\"
  prefix_placeholder="$NEXTJS_ASSET_PREFIX_PLACEHOLDER"
  if [ ! -z "$NEXTJS_ASSET_PREFIX" ] ; then
    asset_prefix="$NEXTJS_ASSET_PREFIX"
  else
    asset_prefix=""
  fi
  dotnext_files=$(find .next -name '*.json' -o -name '*.html' -o -name '*.js' | xargs grep -l "$prefix_placeholder" | xargs)
  if [ -f server.js ] ; then
    dotnext_files="$dotnext_files server.js"
  fi
  for fn in $dotnext_files ; do
    cat "$fn" | sed -e "s=$prefix_placeholder=$asset_prefix=g" > "${fn}.new"
    mv "${fn}.new" "$fn"
  done
}

replace_asset_prefix

export PORT=${NEXTJS_PORT}
export HOSTNAME=0.0.0.0

if [ "$NEXTJS_STANDALONE_BUILD" == "1" ] ; then
  NODE_CMD="node server.js"
else
  NODE_CMD="/app/node_modules/.bin/next start"
fi

CADDY_CMD="/usr/sbin/caddy run -c /etc/caddy/Caddyfile"

if [ -z "$1" ] ; then
  exec multirun "$NODE_CMD" "$CADDY_CMD"
elif [ "$1" == "caddy" ]; then
  exec $CADDY_CMD
elif [ "$1" == "nextjs" ]; then
  exec $NODE_CMD
else
  echo "Invalid command: $1"
  exit 1
fi
