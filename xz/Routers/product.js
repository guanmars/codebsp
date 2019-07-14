const express=require('express');
const pool=require('../pool.js');
var router=express.Router();
//商品家族添加：post    /v1/addfy
router.post('/v1/addfy',function(req,res){
	var $fname=req.body.fname;
	var sql="insert into xz_laptop_family values(?,?)";
	pool.query(sql,[null,$fname],function(err,result){
		if(err)throw err;
		if(result.affectedRows>0){res.send("1");
			/*
			var sql="select * from xz_laptop_family order by fid DESC limit 1";
		    pool.query(sql,function(err,result){
				if(err)throw err;
				res.send(result);
		    });
			*/
		}
		else{res.send("0");}
	});
});
//查询某个家族信息：get /v1/schfy/:fid
router.get('/v1/schfy:fid',function(req,res){
	var $fid=req.params.fid;
	var sql="select * from xz_laptop_family where fid=?";
	pool.query(sql,[$fid],function(err,result){
		if(err)throw err;
		if(result.length>0){res.send(result);}
		else{res.send("0");}
	});
});
//修改商品家族：put   /v1/updfy
router.put('/v1/updfy',function(req,res){
	var $fid=req.body.ufid;
	var $fname=req.body.ufname;
	sql="update xz_laptop_family set fname=? where fid=?";
	pool.query(sql,[$fname,$fid],function(err,result){
		if(err)throw err;
		if(result.affectedRows>0){res.send("1");}
		else{res,send("0");}
	});
});
//商品家族列表： post   /v1/fylist
router.post('/v1/fylist',function(req,res){
	var sql="select *from xz_laptop_family";
	pool.query(sql,function(err,result){
		if(err)throw err;
		res.send(result);
	});
});
//商品家族的删除： delete  /v1/delfy/:fid
router.delete('/v1/delfy/:fid',function(req,res){
	var $fid=req.params.fid;
	var sql="delete from xz_laptop_family where fid=?";
	pool.query(sql,[$fid],function(err,result){
		if(err)throw err;
		if(result.affectedRows>0){res.send("1");}
		else{res.send("0");}
	});
})
//商品的添加路由： post  /v1/add
router.post('/v1/proadd',function(req,res){
	var obj=req.body;
	var sql="insert into xz_laptop set ?";
	pool.query(sql,[obj],function(err,result){
		if(err)throw err;
		if(result.affectedRows>0){res.send("1");}
		else{res.send("0");}
	});
});
//商品列表路由： post   /v1/prolist 
router.post('/v1/prolist',function(req,res){
	var $fid=req.body.fid;
	if($fid==="not"){
	var sql="select *from xz_laptop";
	}
	else{
	var sql="select *from xz_laptop where family_id=?";
	}
	pool.query(sql,[$fid],function(err,result){
		if(err)throw err;
		res.send(result);
	});
});
//商品分页查询：post  /v1/plist
router.post('/v1/plist',function(req,res){
	var $start=parseInt(req.body.start);
	var $count=parseInt(req.body.count);
	var sql="select *from xz_laptop limit ?,?";
	pool.query(sql,[$start,$count],function(err,result){
		if(err)throw err;
		res.send(result);
	});
});
//商品删除：delete  /v1/delpro/:lid
router.delete('/v1/delpro/:lid',function(req,res){
	var $lid=req.params.lid;
	var sql="delete from xz_laptop where lid=?";
	pool.query(sql,[$lid],function(err,result){
		if(err)throw err;
		if(result.affectedRows>0){res.send("1");}
		else{res.send("0");}
	});
});
//商品详情： get  /v1/details/:lid
router.get('/v1/detail/:lid',function(req,res){
	var $lid=req.params.lid;
	console.log($lid);
	var sql="select *from xz_laptop where lid=?";
	pool.query(sql,[$lid],function(err,result){
		if(err)throw err;
		if(result.length>0){res.send(result);}
		else{res.send("0");}
	});
});
//商品修改： put  /v1/put
router.put('/v1/uppro',function(req,res){
	var obj=req.body;
	var $lid=obj.lid;
	console.log(obj,$lid);
	    delete obj.lid;
	var sql="update xz_laptop set ? where lid=?";
	pool.query(sql,[obj,$lid],function(err,result){
		if(err)throw err;
		res.send("1");
	});
});
//导出router
module.exports=router;