const express = require("express");
const cors = require('cors');
// const { request } = require('express');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const { MongoClient, ServerApiVersion } = require('mongodb');


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// const uri = "mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.glj4w7o.mongodb.net/?retryWrites=true&w=majority";
const uri = "mongodb+srv://Online_Admin:YzIWQt4sklYmYjq2@cluster0.glj4w7o.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const productCollection = client.db('online_mart').collection('products')
        const serviceCollection = client.db('online_mart').collection('services')

        app.get('/product', async (req, res) => {
            const query = {};
            const cursor = productCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        })
        app.get('/service', async (req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
        })





    }
    finally {

    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send("Three.js")
});

app.listen(port, () => {
    console.log(port)
})