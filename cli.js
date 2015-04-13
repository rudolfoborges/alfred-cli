#!/usr/bin/env node
'use strict';

var CommandBuilder = require('./bin/command.builder'),
	program = require('commander'),
	inquirer = require("inquirer"); 

var commandBuilder = new CommandBuilder();

program
    .version('0.0.1')
    .usage('[command]')
    .option('init [gitUrl]', 'Create a new Alfred Project. [gitUrl] Optional git repository url.');

program.on('-h, --help', function(){
	program.help();    
});
    
program.on('init', function(){
	var question = {
				    type: "list",
				    name: "appType",
				    message: "What kind your application?",
				    choices: [ "Java", "Ruby", "Node", ".Net"],
				  }
	inquirer.prompt([question], function(answers){
		commandBuilder.build('init').execute(program.init, answers);
	});
});

program.parse(process.argv);

