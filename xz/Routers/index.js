const express=require('express');
const pool=require('../pool');
var router=express.Router();
//轮播图首页路由 get  /index
router.get('',function(req,res){
	pool.query('SELECT * FROM xz_index_carousel',function(err,result){
		if(err)throw err;
		res.send(result);
	});
});
//轮播图添加路由：get  /add
router.get('/add',function(req,res){
	var obj=req.query,
		i=400;
	for(var arr in obj)
	{
		i++;
		if(!obj[arr])
		{
			res.send({code:i,msg:'required'+arr});
			return;
		}
	}
  //add to MySQL
   pool.query('INSERT INTO xz_index_carousel SET ?' ,[obj],function(err,result){
	if(err) throw err;
	if(result.affectedRows>0)
	{
	   res.send({code:200,msg:'add suc'});	
    }
	if(result.affectedRows===0)
	{
		res.send({code:201,msg:'add defeat'});
	}
   });
});
//轮播图修改路由： get  /update
router.get('/update',function(req,res){
	var obj=req.query,
		i=400;
	for(var arr in obj)
	{
		i++;
		if(!obj[arr])
		{
			res.send({code:i,msg:'required'+arr});
			return;
		}
	}
  //update in MySQL
    var cid=obj.cid;
		delete obj.cid;
    pool.query('UPDATE xz_index_carousel SET ? WHERE cid=?',[obj,cid],function(err,result){
		if(err)throw err;
		if(result.affectedRows>0)
		{
			res.send({code:200,msg:'update suc'});
			return;
		}
		if(result.affectedRows===0)
		{
			res.send({code:201,msg:'update defeat'});
			return;
		}
    });
});
router.get('/delete',function(req,res){
	var cid=req.query.cid;
	if(!cid)
	{
		res.send({code:401,msg:'required cid'});
		return;
	}
  //delete in MySQL
   pool.query('DELETE FROM xz_index_carousel WHERE cid=?',[cid],function(err,result){
	if(err)throw err;
	if(result.affectedRows>0)
	{
		res.send({code:200,msg:'delete suc'});
		return;
	}
	if(result.affectedRows===0)
	{
		res.send({code:201,mag:'err:delete dafeat'});
		return;
	}
   });
});
//导出router
module.exports=router;