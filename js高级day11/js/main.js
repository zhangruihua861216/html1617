//飞机（我机、敌机）；子弹；

//
function $(id){
	return document.getElementById(id);
}
var Map=$("map");//游戏运行层

var gamescene=$("gamescene");//游戏主页面容器div
var statPage=$("start-page");//开始页面div容器
var overPanel=$("game-over-page");  //gameover容器
var statBtn=$("startbtn"); //开始按钮

var replayBtn=$("replaybtn");  //重新开始按钮
var pauseBtn=$("pausebtn");  //暂停按钮
var score=0;   //记录分数变量
var scrollMap1=$("scrollmap1");  //游戏背景1
var scrollMap2=$("scrollmap2");  //游戏背景2
var gameState=0;    //游戏状态，0停止，1开始，2暂停

var enemies=[];  //存储所有的可见敌机
var bullets=[];  //存储所有可见子弹
var hero=null;   //自己飞机

var tex={
	hero:"images/hero.png",
	enemy:"images/enemy1.png",
	bullet:"images/bullet1.png",
	bomb:"images/wsparticle_07.png",
}

enemyImgs=[
	'images/enemy1.png',
	'images/enemy2.png',
	'images/enemy3.png',
	'images/enemy4.png',		
]

//开始按钮事件处理器
statBtn.onclick=function(){
	statPage.style.display="none";
	gameState="1";
	//写一些开始游戏的动作
	start(){
		setInterval(scrollBG,10);
		hero=new Plan(80,65,100,500);		
		hero.init(tex.hero);
		addEnemytimer=setInterval(addEnemy,300);
		fireTimer=setInterval(fire,300);
		updateTimer=setInterval(update,30);
	};
}

//暂停按钮事件处理器

pauseBtn.onclick=function(){
	//处理暂停事件函数
}

//重新开始按钮事件处理器

replayBtn.onclick=function(){
	
}


//飞机对象的构造函数
var Plan=function(width,heigth,x,y){
	this.imgNode=null;
	this.width=width;
	this.height=heigth;
	this.x=x;
	this.y=y;
}

//飞机原型方法
Plan.prototype={
	constructor:Plan,
	//初始化
	init:function(imageSrc){
		this.imgNode=document.createElement('img');
		this.imgNode.style.position="absolute";
		this.imgNode.style.left=this.x+"px";
		this.imgNode.style.top=this.y+"px";
		this.imgNode.style.width=this.width+"px";
		this.imgNode.style.height=this.height+"px";	
		this.imgNode.src=imageSrc;
		Map.appendChild(this.imgNode);
	},
	//方法move，移动飞机
	move:function(speed){
		this.y=this.imgNode.offsetTop+speed;
		this.imgNode.style.top=this.y+"px";
		return this.y;
	},
	
	//爆炸
	remove:function(){
		
		this.imgNode.src="images/wspartcile_07.png";
	//方法一
//		var that=this;
//		setTimeout(function(){
//			Map.removeChild(that.imgNode);			
//		},200);
		
	//方法二
	(function(node){
		setTimeout(function(){
			Map.removeChild(node)
		},200);
	})(this.imgNode)
		
	}
}

hero=new Plan(109,82,50,50);  //创建飞机
//初始化飞机：创建图片、设置宽、高、坐标、图片路径；添加到map上显示出来
hero.init("images/hero.png")  //图片路径

//子弹的构造函数
var Bullet=function(x,y){
	this.x=x;
	this.y=y;
	if(arguments.length>=4){
		this.width=arguments[2];
		this.height=arguments[3];
	}
	else{
		this.width=14;
		this.height=31;
	}
	this.imgNode=document.createElement("img");
	this.imgNode.style.left=x+"px";
	this.imgNode.style.top=y+"px";
	this.imgNode.style.width=this.width+"px";
	this.imgNode.style.height=this.height+"px";
	this.imgNode.setAttribute("class","bullet");
//	this.imgNode.setAttribute("src","images/bullet1.png");
	this.imgNode.src="images/bullet1.png";  //子弹图片;
	Map.appendChild(this.imgNode);
}
//子弹原型
Bullet.prototype={
	constructor:Bullet,
	//move
	move:function(speed){
		this.y=this.imgNode.offsetTop-speed;
		this.imgNode.style.top=this.y+"px";
		return this.y;
	},
	remove:function(b,bullets,i){
		if(b.imgNode.parentNode){
			b.imgNode.parentNode.removeChild(b.imgNode);
			bullets.splice(i,1);
		}
	}
};

//移动飞机
//启动游戏
//暂停游戏
//结束游戏
//滚动背景
//添加敌机
//发射子弹
//更新游戏中对象状态
//碰撞

//滚动背景

function scrollBG(){
	if(scrollMap1.offsetTop>760){
		scrollMap1.style.top="-760px"
	}else{
		scrollMap1.style.top=(scrollMap1.offsetTop+1)+"px";
	}
	console.log("scrollMap1.style.top"+scrollMap1.style.top);
	console.log("scrollMap2.style.top"+scrollMap2.style.top);	
	if(scrollMap2.offsetTop>760){
		scrollMap2.style.top="-760px";
	}else{
		scrollMap2.style.top=(scrollMap1.offsetTop+1)+"px";
	}	
}

//启动游戏

function start(){
	setInterval(scrollBG,20);
}

//移动飞机

function movePlan(){
	
	//移动鼠标事件
	var event=window.event||arguments[0];
	
	var selfPlanX=event.clientX;
	var selfPlanY=event.clientY;
	
	var ourPlan=hero.imgNode;
	
	hero.x=selfPlanX-hero.width/2;
	hero.y=selfPlanY-hero.height/2;
	
	//控制飞机出map外面
	
	var w=512-80;
	var h=768-80;
	
	hero.x=hero.x>w?w:hero.x;
	hero.x=hero.x<0?0:hero.x;
	
	hero.y=hero.y>h?h:hero.y;
	hero.y=hero.y<0?0:hero.y;
	
	ourPlan.style.left=hero.x;
	ourPlan.style.top=hero.y;
}

//添加敌人飞机
function addEnemy(){
	var x=parseInt(Math.random()*360)+50;
	var en=new Plan(100,65,x,0);
	var index=parseInt(Math.random()*4);
	en.init(enemyImgs[index]);
}

//发射子弹

function fire(){
	var ourPlan=hero.imgNode;
	var x=ourPlan.offsetLeft+35;
	var y=ourPlan.offsetTop-10;
	var bullet=new Bullet(x,y);
	bullet.push(bullet);
}

//

var updateTimer,fireTimer,addEnemytimer;

//暂停游戏
function pauseGame(){
	//把所有任务结束
	if(gameState==1){
		clearInterval(updateTimer);
		clearInterval(fireTimer);
		clearInterval(addEnemytimer);
	}else if(gameState==2){
		gameState=1;
		fireTimer=setInterval(fire,300);
		addEnemytimer=setInterval(addEnemytimer,300);
		updateTimer=setInterval(update,30);
	}
}


//更新游戏状态

function update(){
	
}

//游戏结束

function stopGame(){
		clearInterval(updateTimer);
		clearInterval(fireTimer);
		clearInterval(addEnemytimer);
		var overScore=$("over-score");
		overScore.innerHTML=score;
		overPanel.style.display="block";
}



//更新游戏中的对象状态

function update(){
	//刷新所有子弹
	for(var i=0;i<bullets.length;i++){
		var b=bullets[i];
		if(b){
			var y=b.move(20);
			if(y<0){
				b.remove(b,bullets,i);
			}
			
			//碰撞检测
		}
	}
	
	//刷新敌机
	for(var i=0;i<enemies.length;i++){
		var enemy=enemies[i];
		if(enemy){
			enemy.move(5);
			if(y>600){
				//把飞机从map上移除
				enemy.remove();
				enemies.splice(i,1);
				//碰撞检测
				for(var k=0;k<enemies.length;k++){
					var em=enemies[k];
					if(em){
						if(pengzhuang(em,b)){
							b.remove(b,bullets,i);
							em.remove();
							enemies.splice(k,1);
							score++;
							//把分数放在记分div中
							$("score").innerHTML=score;
							//爆炸
						}
					}
				}
				if(pengzhuang())
			}
		}
	}
}

//碰撞

function pengzhuang(a,b){
	if((b.x+b.width>a.x&&b.x<a.x+a.width)&&(b.y<a.y+a.height&&b.y+b.height>a.y))
	return true;
}
