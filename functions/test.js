const fs = require('fs');
const oracledb = require('oracledb');

let oracledbPath
try {
	oracledbPath = require.resolve('oracledb')
} catch (e) {
	oracledbPath = 'error'
}

exports.handler = async function (event, context) {
	return {
		statusCode : 200,
		body : JSON.stringify({
			test: "all right", 
			src: __filename, 
			node_modules: oracledbPath,
			dirs: fs.readdirSync(event.queryStringParameters.dir||__dirname),
			
		},null,2)
	}
	
}
