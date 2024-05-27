#!/bin/sh

PACKAGE_LOCK_HASH=$(sha1sum package-lock.json)
PACKAGE_LOCK_HASH_FILE=$(pwd)/.next/cache/package-lock-hash.txt

echo $PACKAGE_LOCK_HASH
echo $PACKAGE_LOCK_HASH_FILE

if [ "$1" == 'check' ] ; then
  if [ -f $PACKAGE_LOCK_HASH_FILE ] ; then
    if [ "$PACKAGE_LOCK_HASH" != "$(cat $PACKAGE_LOCK_HASH_FILE)" ] ; then
      echo Clearing NextJS cache
      rm -rf /app/.next/cache/*
    fi
  fi
elif [ "$1" == 'save' ] ; then
  echo -n "$PACKAGE_LOCK_HASH" > $PACKAGE_LOCK_HASH_FILE
fi
