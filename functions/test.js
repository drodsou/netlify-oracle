const fs = require('fs');

exports.handler = async function (event, context) {
	return {
		statusCode : 200,
		body : JSON.stringify({
			test: "all right", 
			src: __filename, 
			dirs: fs.readdirSync(event.queryStringParameters.dir||__dirname),
			
		},null,2)
	}
	
}
