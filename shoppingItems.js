const ExpressError = require("./expressError");
const fs = require('fs');

class ShoppingItem {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  // retrieves and parses items JSON data from JSON file, appends new item, and rewrites items JSON data to JSON file
  save(path) {
    try {
      let items = ShoppingItem.getAllItems(`${path}`);
      if (items === []) {
        fs.writeFileSync(`${path}`, JSON.stringify([{name: this.name, price: this.price}]));
      }
      else {
        items.push({name: this.name, price: this.price});
        fs.writeFileSync(`${path}`, JSON.stringify(items));
      }
      console.log('Successfully wrote to file!');
    } catch (error) {
      console.error(`File write failed: ${error}`);
      process.exit(1);
    }
  }

  

  // retrieves all items JSON data from JSON file
  static getAllItems(path) {
    try {
      return JSON.parse(fs.readFileSync(`${path}`));
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  }

  // retrieves single item JSON data from JSON file
  static getItem(path, name) {
    try {
      const items = JSON.parse(fs.readFileSync(`${path}`));
      const item =  items.find(item => item.name == name);
      if (!item) {
        throw new ExpressError("Item Not Found", 404);
      }
      return item;
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  }
}

module.exports = ShoppingItem