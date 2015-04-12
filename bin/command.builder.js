'use strict';

var CommnadInit = require('./command.init');

module.exports = function(){
	return {
		build: function(cmd){
			if(cmd === 'init') return CommnadInit();
		}
	}
}


