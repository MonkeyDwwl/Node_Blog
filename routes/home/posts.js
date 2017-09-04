var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/blog";
const ObjectId = require('objectid');
/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('home/posts');
  let id = req.query.id;
  MongoClient.connect(url,(err,db)=>{
    if (err) throw err;
    let category = db.collection('category');
    let posts = db.collection('posts');
    //更新当前文章count属性 +1
    posts.update({_id:ObjectId(id)},{$inc:{count:1}},(err,result)=>{if (err) throw err});
    category.find().toArray((err,result1)=>{
      if (err) throw err;
      posts.findOne({_id:ObjectId(id)},(err,result2)=>{
        if (err) throw err;
          res.render('home/posts',{category:result1,posts:result2});
      });
    });
  });
});

module.exports = router;
