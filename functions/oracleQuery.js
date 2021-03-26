const oracledb = require('oracledb');

let pool;

exports.handler = async function (event, context) {

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

}















