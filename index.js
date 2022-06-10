const express = require("express");
const cors = require('cors');
const { json } = require("express/lib/response");
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const app = express();
const port = process.env.PORT || 5000;

//use middleware
app.use(cors());
app.use(express.json());

// user: my-portfolio
//password: Vt0js3MIHff41SoG



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ocsvi.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const projectCollection = client.db('portfolio').collection('project');

        //get users
        app.get('/project', async (req, res) => {
            const query = {};
            const cursor = projectCollection.find(query);
            const projects = await cursor.toArray();
            res.send(projects);
        })
        app.get('/project/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await projectCollection.findOne(query);
            res.send(result);
        })
    }
    finally {

    }

}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Running My Node Server');
});

app.listen(port, () => {
    console.log("CRUD server is running")
})