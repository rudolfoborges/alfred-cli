'use strict';

var git = require('gift'),
	fs = require('fs'),
	path = require('path'),
	alfred = require('./alfred'),
	modelTemplate = require('../templates/model.template.json');

module.exports = function(){

	var modelDir = path.join(config.getBaseDir(), 'models');

	function add(name){
		modelTemplate.createdAt = Date.now();
		var newModel = path.join(modelDir, name + '.json');
		fs.exists(newModel, function(err){
			if(!err) {
				fs.writeFile(newModel, JSON.stringify(modelTemplate, null, '\t'), function(err){
					if(err) console.log(err);
					else console.log('Added new model ' + name);
				});
			} else {
				console.log('Model ' + name + ' already exists!');
			}
		});
	}

	function remove(name){
		console.log('Removing model ' + name);
	}

	return {
		execute: function(name, arg){
			if(arg === 'add') config.checkAlfredConfig(function(){add(name);});
			else if(arg === 'remove') config.checkAlfredConfig(function(){emove(name);});
		}
	}

}