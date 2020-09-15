var mysql = require("mysql");
var inquirer = require("inquirer");
require("dotenv").config()
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
});

connection.connect(function (error) {
  if (error) throw error;
  loadProducts();
});

// function start(){
//     console.log("Yayyyyyy it's connected");

// }

function loadProducts() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;

    console.table(res);

    promptItem(res);
  });
}

function promptItem(inventory) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "choice",
        message:
          "Please enter the ID of the item you would you like to buy. [Exit with E]",
        validate: function (val) {
          return !isNaN(val) || val.toLowerCase() === "e";
        },
      },
    ])
    .then(function (val) {
      checkExit(val.choice);
      var choiceId = parseInt(val.choice);
      var product = checkInventory(choiceId, inventory);

      if (product) {
        promptQuantity(product);
      } else {
        console.log("\nThe item is not currently available in our inventory.");
        loadProducts();
      }
    });
}

function promptQuantity(product) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: "How many would you like to purchase? [Exit with E]",
        validate: function (val) {
          return val > 0 || val.toLowerCase() === "e";
        },
      },
    ])
    .then(function (val) {
      checkExit(val.quantity);
      var quantity = parseInt(val.quantity);

      if (quantity > product.stock_quantity) {
        console.log("\nThere is not enouch in stock!");
        loadProducts();
      } else {
        makePurch(product, quantity);
      }
    });
}

function makePurch(product, quantity) {
  connection.query(
    "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
    [quantity, product.item_id],
    function (err, res) {
      console.log(
        "\nSuccessfully purchased " +
          quantity +
          " " +
          product.product_name +
          "'s!"
      );
      loadProducts();
    }
  );
}

function checkInventory(choiceId, inventory) {
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].item_id === choiceId) {
      return inventory[i];
    }
  }

  return null;
}

function checkExit(choice) {
  if (choice.toLowerCase() === "e") {
    console.log("See you Later!");
    process.exit(0);
  }
}
