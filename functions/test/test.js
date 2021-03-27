const fs = require('fs');
const { execSync } = require("child_process");

exports.handler = async function (event, context) {
	return {
		statusCode : 200,
		body : JSON.stringify({
			test: "all right", 
			src: __filename, 
			godb: execSync(__dirname + '/db').toString(),
			dirs: fs.readdirSync(event.queryStringParameters.dir||__dirname),
			
		},null,2)
	}
	
}
