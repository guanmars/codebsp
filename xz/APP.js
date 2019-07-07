//引入express
const express=require('express');
const bodyParser=require('body-parser');
//引入userRouter
const userRouter=require('./Routers/user.js');
//引入productRouter
const productRouter=require('./Routers/product.js');
//引入cartRouter
const cartRouter=require('./Routers/cart.js');
//引入indexRouter
const indexRouter=require('./Routers/index.js');
//创建web
 var app=express();
 app.listen(8080);
//中间件body
 app.use(bodyParser.urlencoded({
	extended:false
 }));
//设置PUBLIC
 app.use(express.static('public/cpi'));
 app.use(express.static('public/photo'));
 app.use(express.static('public/user'));
 app.use(express.static('public/product'));
 app.use(express.static('public/cart'));
 app.use(express.static('public/index'));
//路由器
 //路由器userRouter
 app.use('/user',userRouter);
 //路由器productRouter
 app.use('/product',productRouter);
 //路由器cartRouter
 app.use('/cart',cartRouter);
 //路由器indexRouter
 app.use('/index',indexRouter);

