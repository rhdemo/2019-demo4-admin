#!/bin/bash
#set -x

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

[[ -z "${SERVER_IMAGE_REPOSITORY}" ]] && { SERVER_IMAGE_REPOSITORY="quay.io/redhatdemo/demo4-admin-server:latest"; }
[[ -z "${GIT_REPOSITORY}" ]] && { GIT_REPOSITORY="git@github.com:rhdemo/2019-demo4-admin.git"; }
[[ -z "${GIT_BRANCH}" ]] && { GIT_BRANCH="master"; }
echo "Building ${SERVER_IMAGE_REPOSITORY} from ${GIT_REPOSITORY} on ${GIT_BRANCH}"
s2i build ${GIT_REPOSITORY} --ref ${GIT_BRANCH} --context-dir /server docker.io/centos/nodejs-10-centos7:latest ${SERVER_IMAGE_REPOSITORY}


[[ -z "${UI_IMAGE_REPOSITORY}" ]] && { UI_IMAGE_REPOSITORY="quay.io/redhatdemo/demo4-admin-nginx:latest"; }
echo "Building ${UI_IMAGE_REPOSITORY}"
cd ${DIR}/../ui
rm -rf build
yarn install
yarn build
s2i build ./build centos/nginx-112-centos7 ${UI_IMAGE_REPOSITORY}



