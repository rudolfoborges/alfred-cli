'use strict';
var path = require('path');
	

function alfred(){

	var baseDir = path.join(process.cwd(), 'alfred');
	return {
		getBaseDir: function(){
			return baseDir;
		},

		checkAlfredConfig: function(callback){
			fs.exists(baseDir, function(exists){
				if(exists) callback();
				else console.log('Alfred folder not exists');
			});
		}
	}

}

module.exports = alfred();