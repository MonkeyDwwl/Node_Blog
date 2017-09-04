var express = require('express');
var router = express.Router();
//使用数据库
const MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/blog";
/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('home/index');
  //获取分页的参数
  let page = req.query.page ||1;
  let count = +req.query.count||2;
  let offset = (page-1) * count;
  MongoClient.connect(url,(err,db)=>{
    if (err) throw err;
    let category = db.collection('category');
    let posts = db.collection('posts');
    category.find().toArray((err,result1)=>{
      if (err) throw err;
      posts.find().sort({time:-1}).skip(offset).limit(count).toArray((err,result2)=>{
        if (err) throw err;
        //热门文章
        posts.find().sort({count:-1}).limit(10).toArray((err,result3)=>{
          if (err) throw err;
          posts.find().count().then(response => {
            let total = response ;
            let size = Math.ceil(total/count);
            res.render('home/index',{category:result1,posts:result2,hot:result3,page,count,size,total});
          }).catch(err=>{console.log(err)});
        });
      });
    });
  });
});

module.exports = router;
