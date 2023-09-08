/**
 
 This file handles 2 GET & 1 POST requests to the MongoDB collection with express.

 */
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://gutierrezc:2001323@cluster0.92cdcus.mongodb.net/?retryWrites=true&w=majority";

// Create a new MongoClient
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
const jsonParser = bodyParser.json();
app.use(cors());

let database = null;
let collection = null;

// Connect to DB
async function connectDB(){
    await client.connect();
    database = client.db("final-project");
    collection = database.collection("items");
}
connectDB();

//get all the item's info
//localhost:5000/
async function getAllItems(req, res){
    const query = {};
    let itemsCursor = await collection.find(query);
    let items = await itemsCursor.toArray();

    //construct response to send back to client
    const response = items;
    res.json(response);
}
app.get('/', getAllItems);

// Just%20Bare%20Lightly%20Breaded%20Chicken%20Breast%20Chunks
//get item by id/name 
async function getItem(req, res){
    //convert the parameter into lowercase & search based on id
    const itemName = req.params.itemName.toLowerCase();
    itemName.replaceAll("%20", " ");
    const query = {_id: itemName};

    //response
    let itemCursor = await collection.find(query);
    let item = await itemCursor.toArray();
    const response = item;
    res.json(response);
}
app.get("/item/:itemName", getItem);


// write a post request that allows users to update reviews for an item only if they haven't reviewed it yet
// http://localhost:5000/updaterating/:itemName
async function addItemReview(req, res){
    //check if user already reviewed this item
	const itemName = req.params.itemName.replaceAll("%20", " ");
    const reviewer = req.body.review.email;
    let itemsCursor = await collection.find({
        name: itemName,
        reviews: {$elemMatch: {email: reviewer}}
    });
    let item = await itemsCursor.toArray();

    if(item.length === 0){
        //grab the new rating thats being sent through body
        const newReview = req.body.review;

        //update doc
        const filter = {_id:itemName.toLowerCase()};
        const updateDoc = {
            $addToSet:{
                reviews : newReview
            }
        };
        const result = await collection.updateOne(filter, updateDoc);

        //construct response
        const response = [
            {matchedCount : result.matchedCount},
            {modifiedCount : result.modifiedCount}
        ];
        res.json(response);
    }
    else{
        const response = [
            {alreadyReviewed : "true"}
        ];
        res.json(response);
    }
}
app.post("/updaterating/:itemName", jsonParser, addItemReview);

app.listen(5000, function(){
    console.log("Running on port 5000!");
});