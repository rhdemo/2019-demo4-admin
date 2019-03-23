#!/bin/bash
#set -x

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

oc project
echo "Undeploying demo4-admin-server"

oc process -f ${DIR}/demo4-admin-server.yml | oc delete -f -


oc project
echo "Undeploying demo4-admin-ui"

oc process -f ${DIR}/demo4-admin-ui.yml | oc delete -f -