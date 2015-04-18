'use strict';

var git = require('gift'),
	fs = require('fs'),
	path = require('path'),
	alfred = require('./alfred'),
	modelTemplate = require('../templates/model.json');

module.exports = function(){

	var modelDir = path.join(alfred.getBaseDir(), 'models');

	function add(name){
		if(alfred.modelExists(name)) {
			console.log('Model ' + name + ' already exists!');
			return;
		}

		modelTemplate.createdAt = Date.now();
		modelTemplate.name = name;
		var modelPath = path.join(modelDir, name + '.json');
		
		fs.writeFile(modelPath, JSON.stringify(modelTemplate, null, '\t'), function(err){
			if(err) console.log(err);
			else alfred.addModel(name, function(){ console.log('Added new model ' + name); });
		});
	}

	function remove(name){
		if(!alfred.modelExists(name)) {
			console.log(name + ' is not a model');
			return;
		}

		var modelPath = path.join(modelDir, name + '.json');
		fs.unlink(modelPath, function(err){
			if(err) console.log(err);
			else alfred.removeModel(name, function(){ console.log('Removing model ' + name); })
		});
	}

	return {
		execute: function(name, arg){
			if(arg === 'add') alfred.checkAlfredConfig(function(){add(name);});
			else if(arg === 'remove') alfred.checkAlfredConfig(function(){remove(name);});
		}
	}

}