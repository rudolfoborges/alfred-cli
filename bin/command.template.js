'use strict';

var git = require('gift'),
	fs = require('fs'),
	path = require('path'),
	alfred = require('./alfred');

module.exports = function(){

	var templateFolder = path.join(alfred.getBaseDir(), 'app-templates');

	function add(name){
		if(alfred.templateExists(name)) {
			console.log('Model ' + name + ' already exists!');
			return;
		}

		var templatePath = path.join(templateFolder, name + '.alf');
		
		fs.writeFile(templatePath, 'This is a blank template', function(err){
			if(err) console.log(err);
			else alfred.addTemplate(name, function(){ console.log('Added new template ' + name); });
		});
	}

	function remove(name){
		if(!alfred.templateExists(name)) {
			console.log(name + ' is not a template');
			return;
		}

		var templatePath = path.join(templateFolder, name + '.alf');
		fs.unlink(templatePath, function(err){
			if(err) console.log(err);
			else alfred.removeTemplate(name, function(){ console.log('Removing template ' + name); })
		});
	}

	return {
		execute: function(name, arg){
			if(arg === 'add') alfred.checkAlfredConfig(function(){add(name);});
			else if(arg === 'remove') alfred.checkAlfredConfig(function(){remove(name);});
		}
	}

}