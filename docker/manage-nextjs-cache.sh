#!/bin/sh

CACHE_DIR=$(pwd)/.next/cache
PACKAGE_LOCK_HASH=$(sha1sum package-lock.json)
PACKAGE_LOCK_HASH_FILE=${CACHE_DIR}/package-lock-hash.txt

if [ "$1" == 'check' ] ; then
  if [ -f $PACKAGE_LOCK_HASH_FILE ] ; then
    if [ "$PACKAGE_LOCK_HASH" != "$(cat $PACKAGE_LOCK_HASH_FILE)" ] ; then
      echo ${PACKAGE_LOCK_HASH_FILE} changed, clearing NextJS cache
      rm -rf ${CACHE_DIR}/*
    else
      echo "NextJS cache:"
      du -c ${CACHE_DIR}
    fi
  else
    echo "No existing cache found"
  fi
elif [ "$1" == 'save' ] ; then
  echo -n "$PACKAGE_LOCK_HASH" > $PACKAGE_LOCK_HASH_FILE
  echo "Saving NextJS cache:"
  du -c ${CACHE_DIR}
fi
