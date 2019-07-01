const express=require('express');
const pool=require('../pool.js');
var router=express.Router();
//用户注册路由/reg
router.post('/reg',function(req,res){
	var obj=req.body;
	//console.log(obj);
  //验证输入是否为空
	if(!obj.uname)
	{
		res.send({code:401,msg:'uname required'});
		return;
	}
	if(!obj.upwd)
	{
		res.send({code:402,msg:'upwd required' });
		return;
	}
	if(!obj.phone)
	{
		res.send({code:403,msg:'phone required'});
		return;
	}
	if(!obj.email)
	{
		res.send({code:404,msg:'email required'});
		return;
	}
   //若不为空，则导入数据库xz_user中
	pool.query('INSERT INTO	xz_user SET ?',[obj],function(err,result){
		if(err)throw err;
		//console.log(result);
		if(result.affectedRows>0)
	{res.send({code:200,msg:'reg suc'});}
	});
});
//用户登入路由/login
router.post('/login',function(req,res){
	var obj=req.body;
	//console.log(obj1);
   //验证是否为空
	if(!obj.uname)
	{
		res.send({code:401,msg:'uname required'});
	    return;
	}
	if(!obj.upwd)
	{
		res.send({code:402,msg:'upwd required'});
		return;
	}
   //验证成功是否注册
	pool.query('SELECT uname,upwd FROM xz_user WHERE uname=? AND upwd=?',[obj.uname,obj.upwd],
	function(err,result){
		if(err)throw err;
		console.log(result,result.length);
		/*
		if(result.length>0)
		{
			res.send({code:200,masg:'login suc'});
			return;
		}
		else
		{
		    res.send({code:404,msg:'uname or upwd err'});
		    return;
		}
		*/
		switch(result.length)
		{
		case 0:res.send({code:201,msg:'uname or upwd err'});break
		default:res.send({code:200,msg:'login suc'});break
		}
	});	
});
//用户详情路由/detail
router.get('/detail',function(req,res){
	var obj=req.query;
  //验证为空
	if(!obj.uid)
	{
		res.send({code:401,msg:'uid required'});
		return;
	}
  //查询mysql
	pool.query('SELECT * FROM xz_user WHERE uid=?',[obj.uid],function(err,result){
		if(err)throw err;
		if(result.length>0)
		{
			res.send(result);
			return;
		}
		else if(result.length===0)
		{
			res.send('not this uid');
			return;
		}
	});
});
//用户修改路由/update
router.post('/update',function(req,res){
	var obj=req.body;
 //验证是否为空
  var i=400;
  for(var arr in obj)
	{
	    i++;
		if(!obj[arr])
		{
		res.send({code:i,msg:'required  '+arr});
			return;
		}
	}
 //在MySQL中修改内容
   //先将uid取出，
  var uid=obj.uid;
   //后删除
      delete obj.uid;
   //修改update
  pool.query('UPDATE xz_user SET ? WHERE uid=uid',[obj],
  function(err,result){
	  if(err)throw err;
	  console.log(result);
	  if(result.affectedRows>0)
	  {
		  res.send({code:200,msg:'update suc'});
		  return;
	  }
	  else if(result.affectedRows===0)
	  {
		res.send('update defeat');
		return;
	  }
  }); 
});
//分页显示路由/list
router.get('/list',function(req,res){
	var obj=req.query;
	console.log(obj);
	for(arr in obj)
	{
		obj[arr]=parseInt(obj[arr]);
	}
	var count=obj.count,
		pno=obj.pno;
	if(!count){count=2;}
	if(!pno){pno=1;}
	console.log(count,pno);
	//分页显示
	var start=(pno-1)*count;
	pool.query('SELECT * FROM xz_user LIMIT ?,?',[start,count],function(err,result){
		if(err)throw err;
		console.log(result);
		if(result.length>0)
		{
		  res.send(result);return;
		}
		else if(result.length===0)
		{
		  res.send('not result');
		  return;
		}
	});
});
//用户删除路由/delete
router.get('/delete',function(req,res){
	var obj=req.query,
		uid=obj.uid;
  //验证为空
	if(!uid)
	{
		res.send({code:401,msg:'uid required'});
	}
	console.log(uid);
	
  //删除数据
  pool.query('DELETE FROM xz_user WHERE uid=?',[uid],function(err,result){
	if(err)throw err;
	if(result.affectedRows>0)
	  {
		res.send({code:200,msg:'delete suc'});
		return
	    }
	 else if(result.affectedRows===0)
	  {
		 res.send({code:201,msg:'delete'});
		 return;
		 }
  });
});
//导出路由器
module.exports=router;