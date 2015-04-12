(function(){
	'use strict';
	var git = require('gift'); 

	module.exports = function(){
		return {
			execute: function(arg){
				console.log('Clone Alfred configurartion repository. Git is required.');
				git.clone(arg === true ? 'git@github.com:rudolfoborges/afred.git' : arg, './alfred', function(err, repo){
					if(err) console.log(err);
					else console.log('Init config has been successfully!');
				});
			}	
		};
	}

})();