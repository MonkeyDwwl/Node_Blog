var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var index = require('./routes/home/index');
var posts = require('./routes/home/posts');
var admin = require('./routes/admin/index');
var category = require('./routes/admin/category');
var article = require('./routes/admin/posts');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views/admin')));
app.use(session({
  secret:'blog',//加密设置
  resave:false,
  saveUninitialized:true,
  cookie:{}
}));
//后台的登陆判断
app.use("/admin",(req,res,next)=>{
  //判断session中是否有isLogin
  if(req.session.isLogin){
    next();//已经登陆,放行
  }else{
    //每有登陆
    res.redirect('/user/login');
  }
});
app.use('/', index);
app.use('/posts', posts);
app.use('/admin', admin);
app.use('/admin/category', category);
app.use('/admin/posts', article);
const user = require('./routes/admin/user');
app.use('/user',user);
const list = require('./routes/home/list');
app.use("/list",list);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
