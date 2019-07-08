const express=require('express');
const pool=require('../pool.js');
var router=express.Router();
//用户注册路由 post  /reg
router.post('/reg',function(req,res){
	var obj=req.body;
	console.log(obj);
	var sql="insert into xz_user set ?";
	pool.query(sql,[obj],function(err,result){
		console.log(result);
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
		if(result.length>0){res.send("0");}
		else{res.send("1");}
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
//用户列表路由：get  /v1/list
router.get("/v1/list",function(req,res){
	var sql="select * from xz_user";
	pool.query(sql,function(err,result){
		if(err)throw err;
		res.send(result);
	});
});
//用户分页查询路由：post /v1/plist/:$start&:count
router.post('/v1/plist',function(req,res){
	var obj=req.body;
	var count=parseInt(obj.count);
	var start=parseInt(obj.start);
	console.log(obj);
	var sql="select * from xz_user limit ?,?";
	pool.query(sql,[start,count],function(err,result){
		if(err)throw err;
		console.log(result);
		if(result.length>0){res.send(result);}
		else{res.send("0");}
	});
});
//用户数据删除：delete   /delete/:uid
router.delete("/v1/deluser/:uid",function(req,res){
	var $uid=req.params.uid;
	var sql="delete from xz_user where uid=?";
	pool.query(sql,[$uid],function(err,result){
		if(err)throw err;
	    console.log(result);
		if(result.affectedRows>0){res.send("1");}
		else{res.send("0");}
	});
});
//用户查询接口：get  /usearch/:uid
router.get('/v1/usearch/:uid',function(req,res){
	var $uid=req.params.uid;
	var sql="select * from xz_user where uid=?";
	pool.query(sql,[$uid],function(err,result){
		if(err)throw err;
		if(result.length>0){res.send(result);}
		else{res.send("0");}
	});
});
//用户数据修改：put  /v1/upuser 
router.post('/v1/upuser',function(req,res){
	var $uid=req.body.uid;
		$uname=req.body.uname,
		$upwd=req.body.upwd,
		$email=req.body.email,
		$phone=req.body.phone,
		$user_name=req.body.user_name,
		$gender=req.body.gender;
	console.log($uname,$upwd,$email,$phone,$user_name,$gender);
	var sql="update xz_user set uname=?,upwd=?,email=?,phone=?,user_name=?,gender=? where uid=?";
	pool.query(sql,[$uname,$upwd,$email,$phone,$user_name,$gender,$uid],function(err,result){
		if(err)throw err;
		console.log(result);
		if(result.affectedRows>0){res.send("1");}
		else{res.send('0');}
	});
});
//导出路由器
module.exports=router;