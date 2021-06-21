const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient
var mongodb = require('mongodb');
var bodyParser = require('body-parser')
// create application/json parser
var jsonParser = bodyParser.json()
const uri = 'mongodb://construction_user:vh3zz63bNTJWC4B@cluster0-shard-00-00.xzjfk.mongodb.net:27017,cluster0-shard-00-01.xzjfk.mongodb.net:27017,cluster0-shard-00-02.xzjfk.mongodb.net:27017/constructions?ssl=true&replicaSet=atlas-v6p6ui-shard-0&authSource=admin&retryWrites=true&w=majority';

// const uri = 'mongodb://rhabhishek:pwd123@ds014368.mlab.com:14368/mean-application-demo';
// mongoose.connect(test);

MongoClient.connect(uri, { useUnifiedTopology: true }).then(client =>{
  console.log('connected to DB');

  const db = client.db('constructions')

  const constructions = db.collection('constructions')

  router.get('/constructions', function (req, res) {
    constructions.find({}).toArray().then(result=> {
      res.status(200).json(result);
    }).catch(err=>{
      console.log(err);
    });
  });


  router.get('/constructions/:id', function (req, res) {
    const id = req.params.id;
    // console.log('in rest '+id);
    constructions.findOne({"_id": new mongodb.ObjectID(id)}).then(result=> {
      res.status(200).json(result);
    }).catch(err=>{
      console.log(err);
    });;
  });

  router.post('/constructions', function (req, res) {

    console.log(req.body)
    constructions.insertOne(req.body).then(result=> {
      res.json({"Message": "Construction Added."});
    }).catch(err=>{
      console.log(err);
      res.error();
    });
  });


  router.delete('/constructions/:id', function (req, res) {
    const id = req.params.id;
    constructions.deleteOne({"_id": new mongodb.ObjectID(id)}).then(result=> {
      res.json({"Message": "Construction deleted."});
    }).catch(err=>{
      console.log(err);
    });;
  });


  router.patch('/constructions/:id', function (req, res) {
    const id = req.params.id;
    const update = req.body;
    constructions.updateOne({"_id": new mongodb.ObjectID(id)}, {$set: update}).then(result=> {
      res.json({"Message": "Construction updated."});
    }).catch(err=>{
      console.log(err);
    });;
  });

  const parts = db.collection('parts')

  router.get('/parts', function (req, res) {
    parts.find({}).toArray().then(result=> {
      res.status(200).json(result);
    }).catch(err=>{
      console.log(err);
    });;
  });


  router.get('/parts/:id', function (req, res) {
    const id = req.params.id;
    // console.log('in rest '+id);
    parts.findOne({"_id": new mongodb.ObjectID(id)}).then(result=> {
      res.status(200).json(result);
    }).catch(err=>{
      console.log(err);
    });;
  });

  router.post('/parts', function (req, res) {
    // console.log("in api"+req.body)
    parts.insertOne(req.body).then(result=> {
      res.json({"Message": "Construction Added."});
    }).catch(err=>{
      console.log(err);
    });;
  });


  router.delete('/parts/:id', function (req, res) {
    const id = req.params.id;
    // console.log('in rest '+id);
    parts.deleteOne({"_id": new mongodb.ObjectID(id)}).then(result=> {
      res.json({"Message": "Construction deleted."});
    }).catch(err=>{
      console.log(err);
    });;
  });


  router.patch('/parts/:id', function (req, res) {
    const id = req.params.id;
    const update = req.body;
    // console.log("in api " + update);
    parts.updateOne({"_id": id}, {$set: update}).then(result=> {
      res.json({"Message": "Construction updated."});
    }).catch(err=>{
      console.log(err);
    });
  });
});




module.exports = router;