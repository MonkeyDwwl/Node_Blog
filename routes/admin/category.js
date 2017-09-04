var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/blog";
const ObjectId = require('objectid');
/* GET home page. */
router.get('/', function(req, res, next) {
  //获取分类数据
  MongoClient.connect(url,(err,db)=>{
    if (err) throw err;
    // 连接数据库成功
    let category = db.collection('category');
    category.find().toArray((err,result)=>{
      if (err) throw err;
      //渲染模板
      res.render('admin/category_list',{data:result});
    })
  })

});
router.get('/add', function(req, res, next) {
  res.render('admin/category_add');
});
router.post('/insert', function(req, res, next) {
  // res.send('插入分类了');
  let title = req.body.title.trim();
  let order = req.body.order.trim();
  //验证数据的有效性
  if(!title){
    res.render('admin/message',{msg:"分类名不能为空"});
    return;
  }
  if(!(+order == order)){
    res.render('admin/message',{msg:"排序依据必须是数字"});
    return;
  }
  //连接数据库
  MongoClient.connect(url,(err,db)=>{
    if (err) throw err;
    let category = db.collection('category');
    category.insert({title,order},(err,result)=>{
      if (err) throw err;
      //插入成功了
      res.render('admin/message',{msg:"添加分类成功"});
    })
  })
});
router.get('/edit', function(req, res, next) {
  //获取传递过来的ObjectId
  let id = req.query.id;
  MongoClient.connect(url,(err,db)=>{
    if (err) throw err;
    let category = db.collection('category');
    category.findOne({_id:ObjectId(id)},(err,result)=>{
      if (err) throw err;
      res.render('admin/category_edit',{data:result});
    });
  });
});
router.post('/update', function(req, res, next) {
  // res.send('分类更新了');
  //获取表单提交的数据\
  let title = req.body.title.trim();
  let order = req.body.order.trim();
  let id = req.body.id;
  //验证数据的有效性
  if(!title){
    res.render('admin/message',{msg:"分类名不能为空"});
    return;
  }
  if(!(+order == order)){
    res.render('admin/message',{msg:"排序依据必须是数字"});
    return;
  }
  //连接数据库完成更新操作
  MongoClient.connect(url,(err,db)=>{
    if (err) throw err;
    let category = db.collection('category');
    category.update({_id:ObjectId(id)},{title,order},(err,result)=>{
      if (err) throw err;
      //更新成功了
      res.render('admin/message',{msg:"更新分类成功"});
    });
  });
});
//删除分类
router.get('/delete', function(req, res, next) {
  //获取id
  let id = req.query.id;
  MongoClient.connect(url,(err,db)=>{
    if (err) throw err;
    let category = db.collection('category');
    category.remove({_id:ObjectId(id)},(err,result)=>{
      if (err) throw err;
      //删除成功了
      res.render('admin/message',{msg:"删除分类成功"});
    });
  });
  // res.render('admin/category_delete');
});

module.exports = router;
