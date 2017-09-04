var express = require('express');
var router = express.Router();
const path = require('path');
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/blog";
const ObjectId = require('objectid');
//引入multiparty中间件
const multiparty = require('multiparty');

/* GET home page. */

//显示文章列表
router.get('/', function(req, res, next) {
  //获取分页的相关参数
  let page = req.query.page || 1;//当前页
  let count = +req.query.count || 2;//每页显示的文章数,默认是5篇.其中加号是将字符串数字转为Number类型
  let offset = (page-1) * count;//偏移量
  MongoClient.connect(url,(err,db)=>{
    if (err) throw err;
    let posts = db.collection('posts');
    posts.find().skip(offset).limit(count).sort({time : -1}).toArray((err,result)=>{
      if (err) throw err;
      //获取总的文章数量
      posts.find().count().then( response => {
        let total = response;
        let size = Math.ceil(total / count);
        res.render('admin/article_list',{
          data : result,//当前页的文章
          page,//当前页
          count,//每页文章数量
          size//总分页数
        });
      }).catch(err => console.log(err));
    });
  });
});

//添加文章
router.get('/add', function(req, res, next) {
  // res.render('admin/article_add');
  MongoClient.connect(url,(err,db)=>{
    if (err) throw err;
    let category = db.collection('category');
    category.find().toArray((err,result)=>{
      if (err) throw err;
      res.render('admin/article_add',{data:result});
    })
  })
});

//插入文章操作
router.post('/insert',function(req, res, next){
  // res.send('插入文章了');
  const form = new multiparty.Form();
  //使用form对象的parse对req对象进行解析
  form.parse(req,(err,fields,files)=>{
    if(files.cover[0].size){
      let oldPath = files.cover[0].path;
      let newPath = path.join(__dirname,'../../public/uploads',files.cover[0].originalFilename);
      fs.rename(oldPath,newPath,(err)=>{
        if (err) throw err;
       //保存文件成功
       let category = fields.category_id[0];
       let subject = fields.subject[0];
       let summary = fields.summary[0];
       let content = fields.content[0];
       //获取当前时间
       let time = new Date().toLocaleString();
       //设置浏览次数 随机设一个
       let count = Math.ceil( (Math.random()*100) );
       //获取图片的路径,插入到数据库中.需要注意的是上传了的图片路径应该如何保存
       let cover ="/uploads/" + files.cover[0].originalFilename;
       //数据的有效性验证
       if (!subject){
         res.render("/admin/message",{msg:"标题不能为空"});
       };
       //连接数据库,完成插入
       MongoClient.connect(url,(err,db)=>{
         if (err) throw err;
         let posts = db.collection('posts');
         posts.insert({category,subject,summary,content,time,count,cover},(err,result)=>{
           if (err) throw err;
           res.render('admin/message',{msg:"添加文章成功"});
         });
       });
     });
    }else{
      //没有上传
      let category = fields.category_id[0];
      let subject = fields.subject[0];
      let summary = fields.summary[0];
      let content = fields.content[0];
      //获取当前时间
      let time = new Date().toLocaleString();
      //设置浏览次数 随机设一个
      let count = Math.ceil( (Math.random()*100) );
      //获取图片的路径,插入到数据库中.需要注意的是上传了的图片路径应该如何保存
      let cover ="";
      //数据的有效性验证
      if (!subject){
        res.render("/admin/message",{msg:"标题不能为空"});
      };
      //连接数据库,完成插入
      MongoClient.connect(url,(err,db)=>{
        if (err) throw err;
        let posts = db.collection('posts');
        posts.insert({category,subject,summary,content,time,count,cover},(err,result)=>{
          if (err) throw err;
          res.render('admin/message',{msg:"添加文章成功"});
        });
      });
    };
  });
});

//更新文章
router.get('/edit', function(req, res, next) {
  // res.render('admin/article_edit');
  let id = req.query.id;
  MongoClient.connect(url,(err,db)=>{
    if (err) throw err;
    let category = db.collection('category');
    let posts = db.collection('posts');
    category.find().toArray((err,result1)=>{
      if (err) throw err;
      posts.findOne({_id:ObjectId(id)},(err,result2)=>{
        if (err) throw err;
        console.log(result2);
        res.render('admin/article_edit',{category:result1,posts:result2});
      });
    });
  });
});
//处理更新文章提交的post请求
router.post('/update',function(req, res, next) {
  // res.send('文章更新了');
  // var id = req.body.id;
  const form = new multiparty.Form();
  //使用form对象的parse对req对象进行解析
  form.parse(req,(err,fields,files)=>{
    if(files.cover[0].size){
      let oldPath = files.cover[0].path;
      let newPath = path.join(__dirname,'../../public/uploads',files.cover[0].originalFilename);
      fs.rename(oldPath,newPath,(err)=>{
        if (err) throw err;
       //保存文件成功
       let category = fields.category_id[0];
       let subject = fields.subject[0];
       let summary = fields.summary[0];
       let content = fields.content[0];
       let id = fields.id[0];

       //获取当前时间
       let time = new Date().toLocaleString();
       //设置浏览次数 随机设一个
       let count = Math.ceil( (Math.random()*100) );
       //获取图片的路径,插入到数据库中.需要注意的是上传了的图片路径应该如何保存
       let cover ="/uploads/" + files.cover[0].originalFilename;
       //数据的有效性验证
       if (!subject){
         res.render("/admin/message",{msg:"标题不能为空"});
       };
       //连接数据库,完成插入
       MongoClient.connect(url,(err,db)=>{
         if (err) throw err;
         let posts = db.collection('posts');
         posts.update({_id:ObjectId(id)},{category,subject,summary,content,time,count,cover},(err,result)=>{
           if (err) throw err;
           res.render('admin/message',{msg:"更新文章成功"});
         });
       });
     });
    }else{
      //没有上传图片
      let category = fields.category_id[0];
      let subject = fields.subject[0];
      let summary = fields.summary[0];
      let content = fields.content[0];
      let id = fields.id[0];
      //获取当前时间
      let time = new Date().toLocaleString();
      //设置浏览次数 随机设一个
      let count = Math.ceil( (Math.random()*100) );
      //获取图片的路径,插入到数据库中.需要注意的是上传了的图片路径应该如何保存
      let cover ="";
      //数据的有效性验证
      if (!subject){
        res.render("/admin/message",{msg:"标题不能为空"});
      };
      //连接数据库,完成更新
      MongoClient.connect(url,(err,db)=>{
        if (err) throw err;
        let posts = db.collection('posts');
        posts.update({_id:ObjectId(id)},{category,subject,summary,content,time,count,cover},(err,result)=>{
          if (err) throw err;
          res.render('admin/message',{msg:"更新文章成功"});
        });
      });
    };
  });
});

//删除文章
router.get('/delete',function(req,res,next){
  // res.send('文章删除了');
  let id = req.query.id;
  MongoClient.connect(url,(err,db)=>{
    if (err) throw err;
    let posts = db.collection('posts');
    posts.remove({_id:ObjectId(id)},(err,result)=>{
      if (err) throw err;
      //删除文章成功
      res.render('admin/message',{msg:"删除文章成功"});
    });
  })
});

module.exports = router;
