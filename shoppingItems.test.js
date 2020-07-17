const ExpressError = require("./expressError");
const ShoppingItem = require("./shoppingItems");
const fs = require('fs');
let item;

// set test item
beforeAll(function() {
  item = new ShoppingItem('bananas', 1.25);
})

// reset JSON test file
afterAll(function() {
  fs.writeFileSync('./itemsDb-test.json', '[]');
})

describe("testing save()", function() {
  test("Saves item to JSON database file", function() {
    item.save('./itemsDb-test.json');
    const items = JSON.parse(fs.readFileSync('./itemsDb-test.json'));
    expect(items).toEqual([{name: 'bananas', price: 1.25}]);
  })
})

describe("testing getAllItems()", function() {
  test("Retrieves items from JSON database file", function() {
    const getItems = ShoppingItem.getAllItems('./itemsDb-test.json');
    expect(getItems).toEqual([{name: 'bananas', price: 1.25}]);
  })
})  

describe("testing getItem()", function() {
  test("Retrieves single item from JSON database file", function() {
    const getItem = ShoppingItem.getItem('./itemsDb-test.json', 'bananas');
    expect(getItem).toEqual({name: 'bananas', price: 1.25});
  })
})  

