	function MyUtil(info){
				this.info=info;
			}
			
//			MyUtil.prototype.print=function(msg){
//				console.log(msg);
//			}
			
			       
//			myUtil.prototype.print=function(msg){
//				var now=new Date();
//				console.log("事件"+now+";打印"+msg);
//			}
		//打印msg指定的内容，并且附近打印的时间
		MyUtil.prototype.print=function(msg){
				var now=new Date();
				console.log("事件"+this.handleDate()+";打印"+msg);
			}		
		//当前日期以字符串的形式返回
			MyUtil.prototype.handleDate=function(){
				var now=new Date();
				var result=now.getFullYear()+"-"+(now.getMonth()+1)+"-"+now.getDate()+" "+now.getHours()+":"+now.getMinutes()+":"+now.getSeconds();
				
				return result;
			}
			
//			var obj=MyUtil.prototype;
//			obj.a=function(){};
//			obj.b=function(){};
//			obj.c=function(){};
//			
//			
//			MyUtil.prototype.a=function(){};
//			MyUtil.prototype.b=function(){};
//			MyUtil.prototype.c=function(){};
//			MyUtil.prototype.d=function(){};
//			
//			//覆盖原有原型
//			MyUtil.prototype={
//				a:function(){},
//				b:function(){},
//			}
			
			
//			var myUtil=new MyUtil("我的工具箱");
//			
//			for (var  p in myUtil){
//				console.log(p);
//			}
			
			//判断属性是否实例hasOwnProperty
			
//		console.log((MyUtil.hasOwnProperty("info")?"info是自己的属性":"info是原型属性"));
//		
//		console.log((MyUtil.hasOwnProperty("print")?"print是自己的属性":"print是原型属性"));

       	//判断指定的属性是不是指定对象原型上的属性，
		//是返回true，否则返回false
		//@param  {object} obj [判断的对象]
		//@param  {String} prop [指定的属性]
		
		//@return {Boolean}
		
	   
		MyUtil.prototype.isPrototypeOf=function(obj,prop){
			
			return !obj.hasOwnProperty(prop)&&(prop in obj);
		}
		
		var mTool=new MyUtil("cohen.lee的工具")
		
		window.print=mTool.print();
		
		window.handleDate=mTool.handleDate();
		
		
			  