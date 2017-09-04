# Node_PersonalBlog
## About
---
一直打算基于node写一个完整的小项目，算是对自己学习的检验。最终选择了写个人博客这个项目，因为形式比较简单，也同样能运用到所学的知识点。 本项目使用express框架，页面样式使用bootstrap框架，具备响应式。需要配合数据库完成。
  
---  

**声明：本项目仅作为个人练习所用，不用于任何商业用途。**

## 技术栈  
- node.js
- mongodb
- express
- ajax
- bootstrap
- es6 
- ejs

## 实现的核心功能
1. 文章管理
	- 添加文章
	- 显示文章
	- 修改文章
	- 删除文章  
2. 分类管理
	- 添加分类
	- 显示分类
	- 修改分类
	- 删除分类  
3. 后台登陆控制
4. 用户管理

## 静态页面的准备
1. 前台页面
	- 首页
	- 列表页
	- 文章页  
2. 后台页面
	- 登录页面
	- 管理中心各页面   


## 项目布局
```
.
├── \ README.md
├── app.js           整个应用的入口文件
├── bin              http服务器的启动文件目录  
├── node_modules     包和模块的安装目录
├── models
│   └── catejory.js
├── package.json     项目配置文件
├── public           静态资源目录
│   ├── css
│   │   └── bootstrap.css
│   ├── fonts
│   │   ├── glyphicons-halflings-regular.eot
│   │   ├── glyphicons-halflings-regular.svg
│   │   ├── glyphicons-halflings-regular.ttf
│   │   ├── glyphicons-halflings-regular.woff
│   │   └── glyphicons-halflings-regular.woff2
│   ├── images
│   │   ├── 1.jpg
│   │   ├── 2.jpg
│   │   ├── 3.jpg
│   │   └── 4.jpg
│   ├── js
│   │   ├── bootstrap.js
│   │   ├── jquery-1.11.3.min.js
│   │   └── markdown.min.js
│   └── uploads
├── routes         路由文件目录
│   ├── admin      后台路由文件
│   │   ├── category.js
│   │   ├── index.js
│   │   ├── posts.js
│   │   └── user.js
│   └── home       前台路由文件
│       ├── index.js
│       ├── list.js
│       └── posts.js
└── views          模板文件目录
    ├── admin      后台页面模板
    │   ├── article_add.ejs
    │   ├── article_edit.ejs
    │   ├── article_list.ejs
    │   ├── category_add.ejs
    │   ├── category_edit.ejs
    │   ├── category_list.ejs
    │   ├── css
    │   ├── fonts
    │   ├── footer.ejs
    │   ├── header.ejs
    │   ├── images
    │   ├── index.ejs
    │   ├── js
    │   ├── login.ejs
    │   ├── message.ejs
    │   └── warn.ejs
    ├── error.ejs  错误页面模板
    └── home       前台页面模板
        ├── header.ejs
        ├── index.ejs
        ├── list.ejs
        └── posts.ejs

17 directories, 41 files
```  
## 项目运行  
> 运行前请确保系统已安装node和mongodb，并且数据库处于开启状态，克隆项目到本地，并且到当前项目目录下。

```
npm install

npm start

前台主页访问 http://localhost:3000

后台管理中心主页 http://localhost:3000/admin
```  

其中后台登陆页面有登陆控制，用户名为monkey，密码123456  

## 部分效果截图
> 前台首页  

![前台首页](http://upload-images.jianshu.io/upload_images/2730186-180369025f3045a9.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)  

> 前台文章详情页

![前台文章详情页](http://upload-images.jianshu.io/upload_images/2730186-cf73020d6722fe97.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

> 后台登陆页  

![后台登陆页](http://upload-images.jianshu.io/upload_images/2730186-325e749a3012a1ed.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)  

> 后台管理中心主页  

![后台管理中心主页](http://upload-images.jianshu.io/upload_images/2730186-7a9b00d8bbfd15bf.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)  

> 后台分类列表页  

![后台分类列表页](http://upload-images.jianshu.io/upload_images/2730186-7e3f345e3f7a51cb.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)  

> 后台文章列表页  

![后台文章列表页](http://upload-images.jianshu.io/upload_images/2730186-670558bedd12e8db.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

> 后台文章添加页  

![后台文章添加页](http://upload-images.jianshu.io/upload_images/2730186-49e7613701f4924e.jpg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)  

**再次声明仅做个人练手小项目，并无任何商业用途。**  
初步完成第一版源码，代码优化还在进一步完善中。
