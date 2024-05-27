#!/bin/sh

set -e

cd /app

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
export HOST=0.0.0.0

if [ -z "$1" ] ; then
  exec supervisord -c /etc/supervisord.conf
elif [ "$1" == "caddy" ]; then
  exec /usr/sbin/caddy run -c /etc/caddy/Caddyfile
elif [ "$1" == "nextjs" ]; then
  if [ "$NEXTJS_STANDALONE_BUILD" -eq "1" ] ; then
    exec node server.js
  else
    exec /app/node_modules/.bin/next start
  fi
else
  echo "Invalid command: $1"
  exit 1
fi
