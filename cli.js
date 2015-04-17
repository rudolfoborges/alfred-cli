#!/usr/bin/env node
'use strict';

var CommandBuilder = require('./bin/command.builder'),
	program = require('commander'),
	inquirer = require("inquirer"); 

var commandBuilder = new CommandBuilder();

program
    .version('0.0.1')
    .usage('[command]')
    .option('init', 'Starts a new Alfred project in the current PATH.')
    .option('model <option> <name>', 'Add or remove a model. \n\t\t\t\t\t -> [add] Add a new model \n\t\t\t\t\t -> [rm] Remove a model')
    //.option('model-template <option> <name>', 'Add or remove a model template. \n\t\t\t\t\t -> [add] Add a new model template. \n\t\t\t\t\t -> [rm] Remove a model template')
    .option('app-template <option> <name>', 'Add or remove an application template. \n\t\t\t\t\t -> [add] Add a new application template. \n\t\t\t\t\t -> [rm] Remove an application template')
    .option('generate <model>', 'Generate model')

program.on('-h, --help', function(){
	program.help();    
});
    
program.on('init', function(){
	var question = {
				    type: 'list',
				    name: 'platform',
				    message: 'What kind of application platform?',
				    choices: [ 'Java', 'Ruby', 'Node', '.Net', 'Python', 'Other'],
				  }
	inquirer.prompt([question], function(answers){
		commandBuilder.build('init').execute(program.init, answers);
	});
});

program.on('model', function(){
	var name = program.rawArgs[program.rawArgs.length - 1];
	var arg = program.rawArgs[program.rawArgs.length - 2];
	commandBuilder.build('model').execute(name, arg);
});

program.parse(process.argv);

