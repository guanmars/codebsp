const express=require('express');
const bodyParser=require(body-parser);
//搭建服务器
var app=express(); app.listen(8686);
//使用bodyParser中间件
app.use(bodyParser.urlencoded({
	extended:false;
}));