const fs = require('fs');
const { execSync } = require("child_process");

const oracledb = require('oracledb');

let pool;

exports.handler = async function (event, context) {

	let oracleError, errorTwo
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

	    // return {
	    	// statusCode: 200,
	    	// body: JSON.stringify(records.rows)
	    // }
	    
	 }  catch (e) {
	 	let oracleError = e.message
	 }

	// -- finally
 	let dir_ld, os, uname, godb, dirn = 'ups';

 	try {
 		// dir_ld = fs.readdirSync(process.env.LD_LIBRARY_PATH);
 		os = fs.readFileSync('/etc/os-release',{encoding:'utf8'});
 	    uname = execSync('uname -r').toString();
 	    dirn = __dirname;
 	    godb = execSync(`LD_LIBRARY_PATH=${__dirname}/instantclient ${__dirname}/db`).toString()
 	    ldd = execSync(`ldd ${__dirname}/instantclient/libclntsh.so.21.1`).toString()
 	    uname = execSync('uname -r').toString();
 	} catch (e) {
 		errorTwo = e.message
 	}

	return {
		statusCode: 200,
		body: JSON.stringify({
			dir_ld: dir_ld,
	 		os: os,
	 		uname,
	 		dirn,
	 		godb,
			oracle_home: process.env.ORACLE_HOME,
			ld_library_path: process.env.LD_LIBRARY_PATH,
			errorOne: oracleError,
			errorTwo: errorTwo
		},null,2)
	}
	 	
	 

}















