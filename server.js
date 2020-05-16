require('dotenv').config();
const express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;

const cors = require('cors');

const app = express();

const uri = "mongodb+srv://dbAppUser:minder@cluster0-fttn0.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(uri, {
    useUnifiedTopology: true
}).then(client => {
    console.log('Connected to Database');
    const db = client.db('users-app-db');
    const usersCollection = db.collection('users-list');


    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());

    app.get('/users-list', (req, res) => {
        const cursor = db.collection('quotes').find()
        console.log(cursor);

        console.log('kkk');
        usersCollection.find().toArray()
            .then(results => {
                res.json(results);
            })
            .catch(error => console.error(error))
    });

    app.post('/users-list', (req, res) => {

        usersCollection.insertOne(req.body)
            .then(result => {
                res.json(req.body);
            })
            .catch(error => console.error(error))
    });
    app.put('/users-list', (req, res) => {
        usersCollection.findOneAndUpdate({ ID: req.body.ID },
            {
                $set: req.body
            },
            {
                upsert: true
            })
            .then(result => {
                res.json(req.body);
            })
            .catch(error => console.error(error))
    });
    app.delete('/users-list',  (req, res) => {
        usersCollection.deleteOne(
            { ID: req.body.ID }
        )
            .then(result => {
                if (result.deletedCount === 0) {
                    return res.json('No user to delete')
                }
                res.json(``)
            })
            .catch(error => console.error(error))
    });
    app.listen(3001, () => {
        console.log('listening on 3001')
    });


}).catch(err => console.log("Not Connected to Database ERROR! ", err));

