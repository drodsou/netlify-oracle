#!/bin/bash

# Read Password
echo -n Password: 
read -s password
echo

THISFILE=`realpath "$0"`
THISDIR=`dirname $THISFILE`

# Run Command
echo $password
NETLIFY_ENCRYPT_KEY="$password" node $THISDIR/../node_modules/netlify-plugin-encrypted-files/encrypt.js $THISDIR/../oracle-instantclient/network/admin/*.*
 
