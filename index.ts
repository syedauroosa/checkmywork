#!/user/bin/env node

import inquirer from "inquirer";    

interface ansType {
    menuOpt : string,
    todo : string,
}

let todos: string[] = []; //todos store
let loop: boolean = true;
let answers1: ansType;
let answers2: ansType;
let answers3: ansType;

async function startLoop(){
    while(loop){
    await displayMenuItem();
    }
}
startLoop();

async function displayMenuItem() {
    answers1 = await inquirer.prompt([
        {
            type: "list",
            name: "menuOpt",
            choices: [`add ToDo Item`, `delete ToDo item`, `exit`],
            message: `please select items:`
        }
    ]);
    switch(answers1.menuOpt) {
        case `add ToDo Item`: {
            await addTodo();
            break;
        }
        case `Delete Todo item`:{
            await deleteTodo();
            break;
        }
        default:{
            loop = false;
            console.log("exit program");
            break;
        }

    }
};
async function addTodo() {
    answers2 = await inquirer.prompt([
        {
            type: "input",
            name: "todo",
            message: "what to do?"
        }
    ])

    todos.push(answers2.todo);
    console.log(todos);
}
async function deleteTodo() {
    if (todos.length>0) {
        answers3 = await inquirer.prompt([
            {
                type: "list",
                name: "menuOpt",
                choices: todos,
                message: "select TODO for delete:"
            }
        ])
        let i = 0;
        do{
            if(todos[i] === answers3.menuOpt){
                todos.splice(i, 1);
                break;
            }
            i++;
        }while(i<todos.length);
        console.log(todos);
    } else {
        console.log("no items in toDos");
    }
}