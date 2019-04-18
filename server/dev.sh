#!/bin/bash


MINISHIFT_IP=$(minishift ip 2>/dev/null)

if [[ -z "${MINISHIFT_IP}" ]]
then
    CONSOLE_HOST=console-datagrid-demo.apps.dev.openshift.redhatkeynote.com
    OPTAPLANNER_URL=http://optaplanner-demo-optaplanner-demo.apps.dev.openshift.redhatkeynote.com
    echo "No minishift instance."
    echo "Using ${CONSOLE_HOST}"
    echo "Using ${OPTAPLANNER_URL}"
else
    CONSOLE_HOST=console-datagrid-demo.${MINISHIFT_IP}.nip.io
    OPTAPLANNER_URL=http://optaplanner-demo-optaplanner-demo.${MINISHIFT_IP}.nip.io
    echo "Using minishift instance at ${MINISHIFT_IP}"
    echo "Using ${CONSOLE_HOST}"
    echo "Using ${OPTAPLANNER_URL}"
fi


PORT=8082 \
DATAGRID_HOST=0.0.0.0 \
DATAGRID_HOTROD_PORT=11222 \
DATAGRID_CONSOLE_HOST=${CONSOLE_HOST} \
DATAGRID_CONSOLE_PORT=80 \
DATAGRID_CONSOLE_REST_PORT=8080 \
OPTAPLANNER_URL=${OPTAPLANNER_URL} \
npm run dev
