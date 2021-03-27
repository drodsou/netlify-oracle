const fs = require('fs');
const { execSync } = require("child_process");

const oracledb = require('oracledb');

let pool;

exports.handler = async function (event, context) {

	try {
		oracledb.outFormat = oracledb.OBJECT;
		oracledb.fetchAsString = [oracledb.CLOB];
	    if( !pool ) {
	        pool = await oracledb.createPool({
	            user: process.env.DB_USER,
	            password: process.env.DB_PASSWORD,
	            connectString: process.env.CONNECT_STRING,
	        });
	    }
	    const connection = await pool.getConnection();
	    const records = await connection.execute("select sysdate from dual");
	    
	    // const result = records.rows.map((row) => {
	        // return {
	            // date: row.SYSDATE,
	        // }
	    // });
	    await connection.close();

	    return {
	    	statusCode: 200,
	    	body: JSON.stringify(records.rows)
	    }
	    
	 }  catch (e) {
	 	let oracleError = e.message
	 	let dir, os, uname = 'ups';

	 	try {
	 		dir = fs.readdirSync('/var/task/src/functions/oracle/instantclient');
	 		os = fs.readFileSync('/etc/os-release',{encoding:'utf8'});
	 	    uname = execSync('uname -r').toString();
	 	} catch (e) {}

		return {
			statusCode: 500,
			body: JSON.stringify({
				dir: dir,
		 		os: os,
		 		uname,
				oracle_home: process.env.ORACLE_HOME,
				ld_library_path: process.env.LD_LIBRARY_PATH,
				error: oracleError,
			},null,2)
		}
	 	
	 }

}















