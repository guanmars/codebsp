const express=require('express');
const pool=require('../pool.js');
var router=express.Router();
//用户注册路由 post  /reg
router.post('/reg',function(req,res){
	var obj=req.body;
	var sql="insert into xz_user set ?";
	pool.query(sql,[obj],function(err,result){
		if(result.affectedRows>0){res.send("1");}
		else{res.send("0");}
	});
});
//验证用户名是否存在路由：get  /verify_user
router.get('/verify_user/:uname',function(req,res){
	var $uname=req.params.uname;
	var sql="select uname from xz_user where uname=?";
	pool.query(sql,[$uname],function(err,result){
		if(err)throw err;
		if(result.length>0){res.send("1");}
		else{res.send("0");}
	});
});
//用户登入路由 get   /login
router.get('/login/:uname&:upwd',function(req,res){
	var $uname=req.params.uname,
		$upwd=req.params.upwd;
    var sql="select *from xz_user where uname=? and upwd=?";
	pool.query(sql,[$uname,$upwd],function(err,result){
		if(err)throw err;
		if(result.length>0){res.send("1");}
		else{res.send("0");}
	});
}); 
//导出路由器
module.exports=router;