process.env.NODE_ENV = "test";

const request = require("supertest");
const fs = require('fs')

const app = require("../app");

beforeEach(function() {
  fs.writeFileSync('../itemsDb-test.json', JSON.stringify([{name: "milk", price: 5}]));
})

afterEach(function() {
  fs.writeFileSync('../itemsDb-test.json', '[]'); 
})

describe("GET /items", function() {
  test("Retrieves items from JSON database file", async function() {  
    const resp = await request(app).get(`/items`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({items:[{"name": "milk", "price": 5}]});
  });
});

describe("POST /items", function() {
  test("Adds new item to JSON database file", async function() {
    const item = {"name": "bread", "price": 2.50};
    const resp = await request(app)
      .post(`/items`)
      .send(item);
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({added: {name: "bread", price: 2.50}});
  })   
})

describe("GET /items/:name", function() {
  test("Retrieves single item from JSON database file", async function() {
    const resp = await request(app).get('/items/milk');
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({item: {name: 'milk', price: 5}});
  })
})

describe("PATCH /items/:name", function() {
  test("Updates item in JSON database file", async function() {
      const item = {"name": "milk2%", "price": 2.75};
      const resp = await request(app)
        .patch(`/items/milk`)
        .send(item);
      expect(resp.statusCode).toBe(200);
      expect(resp.body).toEqual({updated: {name: "milk2%", price: 2.75}});
  })

describe("DELETE /items/:name", function() {
  test("Deletes item from JSON database file", async function() {
    const resp = await request(app).delete('/items/milk');
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({message: "Deleted"});
  })
})  
})
