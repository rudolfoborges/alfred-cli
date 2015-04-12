#!/usr/bin/env node
(function(){
	'use strict';

	var CommandBuilder = require('./bin/command.builder'),
		program = require('commander');

	var commandBuilder = new CommandBuilder();

	program
	    .version('0.0.1')
	    .usage('[command]')
	    .option('init [gitUrl]', 'Create a new Alfred Project. [gitUrl] Optional git repository url.');

	
	program.on('-h, --help', function(){
		program.help();    
	});
	    
	program.on('init', function(){
		commandBuilder.build('init').execute(program.init);
	});

	program.parse(process.argv);

})();

