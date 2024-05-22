#!/bin/sh

if [ "$NEXTJS_STANDALONE_BUILD" -eq "1" ] ; then
  exec node server.js
else
  exec npm start
fi

