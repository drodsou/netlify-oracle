# netlify function for oracle cloud ATP database

- derived from: https://github.com/jimmdd/node-oracle-layers-serverless

- include oracle instantclient libs: Ubuntu 20.04 LTS

## 1) decript oracle-client/network/admin
	
- in oracle-client/network/admin you need 
	- sqlnet.ora
	- tnsnames.ora 
	- cwallet.sso 

from the wallet you download from your Oracle ATP admin panel.

that directory must not be uploaded to git, for this:

- encript in dev with netlify-plugin-encrypted-files: `scripts/encrypt-networkadmin.sh`
- decrypt in dev `scripts/decrypt-networkadmin.sh`
	- in prod is automaticllly decripted by the plugin, using NETLIFY_ENCRYPT_KEY env var from the netlify UI


Also oracle-instantlclient/- needs files from instantclient basic lite, unzip and remove every file and and symlink except:
	- libclntsh.so.21.1
	- libclntshcore.so.21.1
	- libnnz21.so
	- libociicus.so 

- If you are not in Ubuntu 20.04 you may need to download them from: 

	- [https://www.oracle.com/database/technologies/instant-client/linux-x86-64-downloads.html]
	

- As these are binary files > 50MB this repo makes use of git-lfs:

	- [https://github.com/git-lfs/git-lfs/wiki/Installation]
	- [https://git-lfs.github.com/]
	
- in fresh ubuntu 20.04 I didn't need to compile nodejs oracle driver

## 2) in netlify UI variable, or locally .env file you need

```.env
ORACLE_HOME=oracle-instantclient
LD_LIBRARY_PATH=oracle-instantclient
TNS_ADMIN=oracle-instantclient/network/admin
NLS_LANG=Spanish_Spain.UTF8

DB_USER=yourdbuser
DB_PASSWORD=yourdbpasswd
CONNECT_STRING=yourtnsnamesstring
```

- if error not finding libs or timezone not set, its a problem with ENV vars or not proper libs in oracleclient


## 3) dev start

npm run dev


## 4) deploy to netlify




