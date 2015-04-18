'use strict';
var path = require('path'),
	fs = require('fs');
	

function alfred(){

	var baseDir = path.join(process.cwd(), 'alfred');
	var alfredConfig = require(path.join(baseDir, 'alfred.json'));

	function saveConfig(configFile, callback){
		fs.writeFile(path.join(baseDir, 'alfred.json'), JSON.stringify(configFile, null, '\t'), function(err){
			if(err) console.log(err);
			else if(callback) callback();
		});
	}

	return {
		getBaseDir: function(){
			return baseDir;
		},

		checkAlfredConfig: function(callback){
			fs.exists(baseDir, function(exists){
				if(exists) callback();
				else console.log('Alfred folder not exists');
			});
		},

		addModel: function(name, callback){
			alfredConfig.alfred.models.push(name);
			saveConfig(alfredConfig, callback);
		},

		removeModel: function(name, callback){
			var models = alfredConfig.alfred.models;
			for(var i = 0; i < models.length; i++){
				if(name === models[i]){
					alfredConfig.alfred.models.splice(i, 1);
					break;
				}
			}
			saveConfig(alfredConfig, callback);
		},

		modelExists: function(name){
			var models = alfredConfig.alfred.models;
			for(var i = 0; i < models.length; i++){
				if(name === models[i]){
					alfredConfig.alfred.models.splice(i, 1);
					return true;
				}
			}
			return false;
		},

		addTemplate: function(name, callback){
			alfredConfig.app.templates.push(name);
			saveConfig(alfredConfig, callback);
		},

		removeTemplate: function(name, callback){
			var appTemplates = alfredConfig.app.templates;
			for(var i = 0; i < appTemplates.length; i++){
				if(name === appTemplates[i]){
					alfredConfig.app.templates.splice(i, 1);
					break;
				}
			}
			saveConfig(alfredConfig, callback);
		},

		templateExists: function(name){
			var appTemplates = alfredConfig.app.templates;
			for(var i = 0; i < appTemplates.length; i++){
				if(name === appTemplates[i]){
					alfredConfig.app.templates.splice(i, 1);
					return true;
				}
			}
			return false;
		}

	}

}

module.exports = alfred();