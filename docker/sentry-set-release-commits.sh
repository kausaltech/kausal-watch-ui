#!/bin/sh

BUILD_ID_FILE=".next/BUILD_ID"
AUTH_TOKEN_FILE=/run/secrets/SENTRY_AUTH_TOKEN

if [ -f $AUTH_TOKEN_FILE ] ; then
    SENTRY_AUTH_TOKEN=$(cat $AUTH_TOKEN_FILE)
fi

if [ ! -z "$SENTRY_ORG" -a ! -z "$SENTRY_AUTH_TOKEN" ] ; then
    if [ ! -z "$GIT_REV" -a ! -z "$GIT_REPO" ] ; then
        echo Setting commit from $GIT_REPO: $GIT_REV
        ARGS="-c ${GIT_REPO}@${GIT_REV}"
    elif [ ! -z "$GIT_REPO" ] ; then
        echo Setting commit from .git for $GIT_REPO
        ARGS="-c ${GIT_REPO}#."
    fi
    if [ -e "${BUILD_ID_FILE}" ] ; then
        node_modules/.bin/sentry-cli releases set-commits \
            --ignore-missing "$(cat ${BUILD_ID_FILE})" $ARGS
    else
        echo NextJS build id file not found: ${BUILD_ID_FILE}
    fi
else
    echo Sentry env variables not found, not setting commits
fi
