#!/bin/bash


MINISHIFT_IP=$(minishift ip)

if [[ -z "${MINISHIFT_IP}" ]]
then
    echo "Using minishift instance at ${MINISHIFT_IP}"
    CONSOLE_HOST=console-datagrid-demo.${MINISHIFT_IP}.nip.io
    OPTAPLANNER_URL=http://optaplanner-demo-optaplanner-demo.${MINISHIFT_IP}.nip.io
else
    CONSOLE_HOST=console-datagrid-demo.apps.dev.openshift.redhatkeynote.com
    OPTAPLANNER_URL=http://optaplanner-demo-optaplanner-demo.apps.dev.openshift.redhatkeynote.com
    echo "No minishift instance.  Using ${CONSOLE_HOST}"
fi


PORT=8082 \
DATAGRID_HOST=0.0.0.0 \
DATAGRID_HOTROD_PORT=11222 \
DATAGRID_CONSOLE_HOST=${CONSOLE_HOST} \
DATAGRID_CONSOLE_PORT=80 \
DATAGRID_CONSOLE_REST_PORT=8080 \
OPTAPLANNER_URL=${OPTAPLANNER_URL} \
npm run dev
