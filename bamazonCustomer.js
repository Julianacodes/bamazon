var mysql = require("mysql")
var inquirer = require("inquirer")
var connection = mysql.createConnection({
    host:"localhost",
    port:3306,
    user:"root",
    password:"Freeway123*",
    database:"bamazon"
});

connection.connect(function(error){
    if (error) throw error 
    start()
})


function start(){
    console.log("Yayyyyyy");
    
}