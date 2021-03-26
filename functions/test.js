const fs = require('fs');

exports.handler = async function (event, context) {
	return {
		statusCode : 200,
		body : JSON.stringify({test: "all right", src: __filename, dir: fs.readdirSync(__dirname + '/..') })
	}
	
}
