#!/bin/bash

BUILD_ID_FILE=".next/BUILD_ID"

if [ ! -z "$SENTRY_ORG" -a ! -z "$SENTRY_AUTH_TOKEN" ] ; then
    if [ ! -z "$GIT_REV" -a ! -z "$GIT_REPO" ] ; then
        echo Setting commit from $GIT_REPO: $GIT_REV
        ARGS="-c ${GIT_REPO}@${GIT_REV}"
    else
        ARGS=""
    fi
    if [ -e "${BUILD_ID_FILE}" ] ; then
        node_modules/.bin/sentry-cli releases set-commits \
            --ignore-missing $(cat .next/BUILD_ID) $ARGS
    else
        echo NextJS build id file not found: ${BUILD_ID_FILE}
    fi
else
    echo Sentry env variables not found, not setting commits
fi
