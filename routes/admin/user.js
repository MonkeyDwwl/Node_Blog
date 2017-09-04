var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/blog";
/*显示登陆页面*/
router.get('/login', function(req, res, next) {
  res.render('admin/login');
});
//处理表单提交
router.post('/signin',(req,res) =>{
  //获取表单提交的数据
  let username = req.body.username.trim();
  let password = +req.body.password.trim();
  //验证数据的有效性
  if(username==""||password==""){
    res.render('admin/warn',{msg:"用户名或密码不能为空"});
    return;
  }
  //连接数据库,完成验证并给出提示
  MongoClient.connect(url,(err,db)=>{
    if (err) throw err;
    let user = db.collection('user');
    user.findOne({username,password},(err,result)=>{
      if (err) throw err;
      console.log(result);
      if(result){
        //登陆成功,保存登陆成功时的标志--isLogin,然后再跳转
        req.session.isLogin = 1;
        res.redirect('/admin');
      }else{
        //登陆失败了
          res.render('admin/warn',{msg:"用户名或密码填写错误"});
      };
    });
  });
})
//处理注销用户
router.get('/logout',(req,res)=>{
  delete req.session.isLogin;//删除session信息
  res.redirect('/admin');//跳转
});

module.exports = router;
