const express=require('express');
const pool=require('../pool.js');
var router=express.Router();
//商品列表路由： get   /list 
router.get('/list',function(req,res){
  //验证
	var obj=req.query;
	var count=parseInt(obj.count),
		pno=parseInt(obj.pno);
	if(!count){count=5;}
	if(!pno){pno=1;}
	var start=(count-1)*pno;
  //查询MySQL
    pool.query('SELECT *FROM xz_laptop Limit ?,?',[start,count],function(err,result){
		if(err)throw err;
        if(result.length>0)
		{res.send(result);return;}
		if(result.length===0)
		{res.send({code:201,msg:'err:not find'});}
    });
});

//商品详情路由： get   /detail
router.get('/detail',function(req,res){
	var obj=req.query;
  //验证
    if(!obj.lid)
	{
		res.send({code:401,msg:'lid required'});
		return;
	}
  //查询MySQL
   pool.query('SELECT *FROM xz_laptop WHERE lid=?',[obj.lid],function(err,result){
	    if(err)throw err;
		if(result.length>0)
	   {
		res.send(result);return;
	   }
	   else if(result.length===0)
	   {
		res.send({code:201,msg:'err:not find'});
	   }
   });
});
//删除商品路由： get   /delete
router.get('/delete',function(req,res){
	var obj=req.query;
  //验证
	if(!obj.lid)
	{
		res.send({code:401,msg:'lid required'});
		return;
	}
  //查询MySQL
    pool.query('DELETE FROM xz_laptop WHERE lid=?',[obj.lid],function(err,result){
		if(err)throw err;
		if(result.affectedRows>0)
		{
			res.send({code:200,msg:'delete suc'});
			return;
		}
		else if(result.affectedRows===0)
		{
			res.send({code:201,msg:'err:delete defeat'});
			return;
		}
    });
});
//添加商品路由： post  /add
router.post('/add',function(req,res){
	var obj=req.body;
  //验证
	var i=400;
	for(var arr in obj)
	{
		i++;
		if(!obj[arr])
		{
			res.send({code:i,msg:'required '+arr});
			return;
		}
	}
  //修改MySQL data
    pool.query('INSERT INTO xz_laptop SET ?',[obj],function(err,result){
		if(err)throw err;
		if(result.affectedRows>0)
		{
			res.send({code:200,msg:'update suc'});
			return;
		}
		else if(result.affectedRows===0)
		{
			res.send({code:201,msg:'err:update defeat'});
			return;
		}
    });
});
//导出router
module.exports=router;