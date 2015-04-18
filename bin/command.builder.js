'use strict';

var CommandInit = require('./command.init'),
	CommandModel = require('./command.model'),
	CommandTemplate = require('./command.template');

module.exports = function(){
	return {
		build: function(cmd){
			if(cmd === 'init') return new CommandInit();
			else if(cmd === 'model') return new CommandModel();
			else if(cmd === 'template') return new CommandTemplate();

		}
	}
}


