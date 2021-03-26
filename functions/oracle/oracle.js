const fs = require('fs');
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
	 	let dir = 'ups'
	 	try {
	 		dir = fs.readdirSync('/var/task/src/functions/oracle/instantclient')
	 	} catch (e) {}

		return {
			statusCode: 500,
			body: JSON.stringify({
				dir: dir,
				oracle_home: process.env.ORACLE_HOME,
				ld_library_path: process.env.LD_LIBRARY_PATH,
				error: oracleError,
			},null,2)
		}
	 	
	 }

}















