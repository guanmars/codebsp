const express=require('express');
const pool=require('../pool.js');
//创建路由器cartRouter
var router=express.Router();
//购物车添加路由：get  /add
router.get('/add',function(req,res){
	var obj=req.query;
	if(!obj.lid)
	{
		res.send({code:401,msg:'required lid'});
		return;
	}
	if(!obj.buyCount){obj.buyCount=1;}
  //添加MySQL cart中
    pool.query('INSERT INTO xz_shoppingcart_item(product_id,count) VALUES(?,?) ',[obj.lid,obj.buyCount],function(err,result){
		if(err)throw err;
		if(result.affectedRows>0)
		{
			res.send({code:200,msg:'add suc'});
		}
    });
});
//购物车列表路由：get  /list
router.get('/list',function(req,res){
  //查询购物车列表
  pool.query('SELECT *FROM xz_shoppingcart_item',function(err,result){
	if(err)throw err;
	res.send(result);
  });
});
//购物车删除路由：get  /delete
router.get('/delete',function(req,res){
	var iid=req.query.iid;
	if(!iid)
	{
		res.send({code:401,msg:'required iid'});
		return;
	}
  //MySQL中删除
    pool.query('DELETE FROM xz_shoppingcart_item WHERE iid=?',[iid],function(err,result){
		if(err)throw err;
		if(result.affectedRows>0)
		{
			res.send({code:200,msg:'delete suc'});
			return;
		}
		if(result.affectedRows===0)
		{
			res.send({code:201,msg:'err:delete defeat'});
			return;
		}
    });
});
//购物车修改buycount路由：get   /updatecount
router.get('/updatecount',function(req,res){
	var obj=req.query;
	if(!obj.iid)
	{
		res.send({code:401,msg:'required iid'});
		return;
	}
	if(!obj.count)
	{
		res.send({code:402,msg:'required count'});
		return;
	}

  //MySQL修改count
    pool.query('UPDATE xz_shoppingcart_item SET count=? WHERE iid=?',[obj.count,obj.iid],
		function(err,result){
		if(err)throw err;
		console.log(result);
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
//购物车商品规格勾选路由：get  /updatechecked
router.get('/updatechecked',function(req,res){
	var obj=req.query;
	if(!obj.lid)
	{
		res.send({code:401,msg:'required lid'});
		return;
	}
	if(obj.checked==='on')
	{
		var checked=1;
		res.send({code:200,msg:'update suc'});
		return;
	}
	else if((checked in obj)===false)
	{
		checked=0;
		res.send({code:201,msg:'商品规格未选'});
		return;
	}
});
//购物车商品勾选路由：get  /listchecked
router.get('/listchecked',function(req,res){
	var obj=req.query,
		checked;
	console.log(obj);
	if(obj.checked.length>0)
	{
		checked=1;
		res.send({code:200,msg:'update suc'});
		return;
	} 
	if((checked in obj)===false)
	{
		//checked=0;
		res.send({code:201,msg:'未选要购买商品'});
		return;
	}
});
//导出router
module.exports=router;