const express = require("express")
const router = new express.Router()
const ExpressError = require("../expressError")
const ShoppingItem = require("../shoppingItems")
const fs = require('fs');
// const file = '../itemsDb.json';

// uncomment JSON test file for testing and comment out above file path
const file = '../itemsDb-test.json';

router.get("/", function(req,res) {
  const items = ShoppingItem.getAllItems(file);
  res.json({items})
})

router.post("/", function(req,res) {
  const name = req.body.name;
  const price = req.body.price;
  const item = new ShoppingItem(name, price);
  item.save(file);
  res.status(201).json({added: {name: name, price: price}});
})

router.get("/:name", function(req,res) {
  try {
    const item = ShoppingItem.getItem(file, req.params.name);
    res.json({item});  
  } catch (err) {
    return next(err);
  }
  
})

router.patch("/:name", function(req,res) {
  try {
    const getName = req.params.name;
    const items = ShoppingItem.getAllItems(file);
    const index = items.findIndex(item => item.name == getName);
    if (index === -1) {
      throw new ExpressError("Item Not Found", 404);
    }  
    const name = (req.body.name) ? req.body.name : items[index].name;
    const price = (req.body.price) ? req.body.price : items[index].price;
    items[index].name = name;
    items[index].price = price;
    fs.writeFileSync(file, JSON.stringify(items));
    res.status(200).json({updated: {name: name, price: price}});
    } catch (err) {
      return next(err);
    }
})

router.delete("/:name", function(req,res) {
  try {
    const getName =  req.params.name;
    const items = ShoppingItem.getAllItems(file);
    const index = items.findIndex(item => item.name == getName);
    items.splice(index,1);
    fs.writeFileSync(file, JSON.stringify(items));
    res.status(200).json({message: "Deleted"});
  } catch (err) {
    return next(err);
  }
  
})

module.exports = router;