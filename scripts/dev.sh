#!/bin/bash

THISFILE=`realpath "$0"`
THISDIR=`dirname $THISFILE`

export ORACLE_HOME="$THISDIR/../functions/oracle/instantclient"
export LD_LIBRARY_PATH="$ORACLE_HOME"
export TNS_ADMIN="$ORACLE_HOME/network/admin"
export NLS_LANG=Spanish_Spain.UTF8

netlify dev
