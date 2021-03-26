const fs = require('fs');

exports.handler = async function (event, context) {
	return {
		statusCode : 200,
		body : JSON.stringify({
			test: "all right", 
			src: __filename, 
			node_modules: require.resolve('oracledb'),
			dirs: fs.readdirSync(event.queryStringParameters.dir||__dirname),
			
		},null,2)
	}
	
}
