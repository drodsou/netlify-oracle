#!/bin/bash

# THISFILE=`realpath "$0"`
# THISDIR=`dirname $THISFILE`

echo "decrypting '.encrypted' into 'functions/oracle/instantclient/network/admin'"

# get password if not in env
if [[ -z "${NETLIFY_ENCRYPT_KEY}" ]]; then
  # not defined in env
  echo -n Password: 
  read -s password
else
  password="$NETLIFY_ENCRYPT_KEY"
fi

# Run Command
# echo $password
NETLIFY_ENCRYPT_KEY="$password" node ./node_modules/netlify-plugin-encrypted-files/decrypt.js ./functions/oracle/instantclient/network/admin/*.*
