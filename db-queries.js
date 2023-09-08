const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://gutierrezc:2001323@cluster0.92cdcus.mongodb.net/?retryWrites=true&w=majority";

// Create a new MongoClient
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectDB(){
    await client.connect();
    const database = client.db("final-project");
    const collection = database.collection("items");

   const itemDocuments = [
    {"_id": "diamond valley halal ground beef, 4-count",
        "name": "Diamond Valley Halal Ground Beef, 4-count",
        "price": "24.99",
        "servings": "4",
        "cal": "220",
        "protein": "23",
        "carb": "0",
        "fat": "14",
        "ratio": "9.57",
        "category": ["meal"],
        "image": "https://photos.app.goo.gl/bc19ybdt2SqTXK127",
        "reviews":[

        ]},
    {"_id": "usda choice beef top sirloin steak, 6-count",
        "name": "USDA Choice Beef Top Sirloin Steak, 6-count",
        "price": "29.99",
        "servings": "6",
        "cal": "360",
        "protein": "34",
        "carb": "0",
        "fat": "24",
        "ratio": "15",
        "category": ["meal"],
        "image": "https://photos.app.goo.gl/i8PL1eJqywTx8pR2A",
        "reviews":[

        ]},
    {"_id": "Tyson Panko Breaded Chicken Breast Tenderloins",
        "name": "Tyson Panko Breaded Chicken Breast Tenderloins",
        "price": "24.99",
        "servings": "20",
        "cal": "210",
        "protein": "20",
        "carb": "13",
        "fat": "9",
        "ratio": "10.5",
        "category": ["snack", "meal"],
        "image": "https://photos.app.goo.gl/1ioaifPgx3Kbe1iNA",
        "reviews":[

        ]}
   ];
   const result = await collection.insertMany(itemDocuments);

    // _id is a required unique field that each document must have (primary key)
    // if u dont define it urself, mongodb will autogenerate one for you
    console.log(result.insertedCount);

    //UPDATE
    /*
    //set -> updates existing value or adds new field
    //increment -> increments field value
    //set a bday field for villager
    //updateOne, updateMany
    //takes a filter & new data
    const filter = {name:"dom"};
    const updateDocument = {
        $set:{
            birthday: new Date("02-27") //without adding a new, default is 2001
        }
    }
    //const result = await collection.updateOne(filter, updateDocument);
    //console.log(result);
    */

    client.close();
}

connectDB();