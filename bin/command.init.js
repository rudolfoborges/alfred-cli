'use strict';
var git = require('gift'),
	fs = require('fs'),
	path = require('path'),
	alfredConfig = require('../templates/alfred.json');

module.exports = function(){

	function init(){
		var baseDir = path.join(process.cwd(), 'alfred');
		createFolder(baseDir);
		writeConfigFiles(baseDir);
		console.log('Init config has been successfully!');
	}

	function writeConfigFiles(baseDir){
		fs.writeFile(path.join(baseDir, 'alfred.json'), JSON.stringify(alfredConfig, null, '\t'), function(err){
			if(err) console.log(err);
		});
	}

	function createFolder(baseDir){
		fs.mkdirSync(baseDir);
		fs.mkdirSync(path.join(baseDir, 'models'));
		fs.mkdirSync(path.join(baseDir, 'models-templates'));
		fs.mkdirSync(path.join(baseDir, 'app-templates'));
	}


	return {
		execute: function(arg, answers){
			alfredConfig.platform = answers.platform;
			fs.exists(path.join(process.cwd(), 'alfred'), function(exists){
				if(!exists) init();
				else console.log('Alfred folder already exists');
			});
		}	
	};
}