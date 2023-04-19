let mapArray,ctx,currentImgMain;
let imgMountain,imgMain,imgEnemy;
var key=false;
//mapArray-決定地圖中每個格子的元素
//ctx-HTML5Canvas用
//currentImgMainX,currentImgMainY-決定主角所在座標
//imgMountain,imgMain,imgEnemy-障礙物,主角,敵人的圖片物件
const gridLength=100;
//網頁載入完成後初始化動作
$(function(){
    mapArray=[//0-可走,1-障礙,2-終點,3-敵人
        [0,1,1,0,0,0,0],
        [0,0,0,1,0,3,0],
        [3,1,0,0,0,1,0],
        [1,0,3,1,0,1,4],
        [0,0,0,0,0,0,3],
        [0,3,1,1,1,0,3],
        [0,5,0,0,2,1,0]
    ];
    ctx=$("#myCanvas")[0].getContext("2d");
    
    imgMain=new Image();
    imgMain.src="images/spriteSheet.png";
    currentImgMain={
        "x":0,
        "y":0
    };
    imgMain.onload=function(){
        ctx.drawImage(imgMain,0,0,80,130,currentImgMain.x,currentImgMain.y,gridLength,gridLength);
    };
    imgMountain=new Image();
    imgMountain.src="images/material.png";
    imgEnemy=new Image();
    imgEnemy.src="images/Enemy.png";
    imgExit=new Image();
    imgExit.src="images/exit.jpg";
    imgKey=new Image();
    imgKey.src="images/key.jpg";
    imgDoor=new Image();
    imgDoor.src="images/door.png";
    imgMountain.onload=function(){
        imgEnemy.onload=function(){
            for(var x in mapArray){
                for(var y in mapArray[x]){
                    if(mapArray[x][y]==1){
                        ctx.drawImage(imgMountain,32,65,32,32,y*gridLength,x*gridLength,gridLength,gridLength);
                    }else if(mapArray[x][y]==3){
                        ctx.drawImage(imgEnemy,7,40,104,135,y*gridLength,x*gridLength,gridLength,gridLength);
                    }else if(mapArray[x][y]==2){
                        ctx.drawImage(imgExit,35,55,135,150,y*gridLength,x*gridLength,gridLength-10,gridLength+10);
                    }else if(mapArray[x][y]==4){
                        ctx.drawImage(imgKey,70,10,200,200,y*gridLength,x*gridLength,gridLength+20,gridLength);
                    }else if(mapArray[x][y]==5){
                        ctx.drawImage(imgDoor,40,50,160,160,y*gridLength,x*gridLength,gridLength,gridLength);
                    }
                }
            }
        }
    }
});

$(document).on("keydown",function(event){
    let targetImg,targetBlock,cutImagePositionX;
    //cutImagePositionX-決定主角臉朝向哪個方向
    targetImg={
        //主角的目標座標
        "x":-1,"y":-1
    };
    targetBlock={
        //主角的目標(對應2維陣列)
        "x":-1,
        "y":-1}
        event.preventDefault();
        //避免鍵盤預設行為發生，如捲動/放大/換頁...
        //判斷使用者按下什麼並推算目標座標
        switch(event.code){
            case"ArrowLeft":
                targetImg.x=currentImgMain.x-gridLength;
                targetImg.y=currentImgMain.y;
                cutImagePositionX=175;//臉朝左
                break;
            case"ArrowUp":
                targetImg.x=currentImgMain.x;
                targetImg.y=currentImgMain.y-gridLength;
                cutImagePositionX=355;//臉朝上
                break;
            case"ArrowRight":
                targetImg.x=currentImgMain.x+gridLength;
                targetImg.y=currentImgMain.y;
                cutImagePositionX=540;//臉朝右
                break;
            case"ArrowDown":
                targetImg.x=currentImgMain.x;
                targetImg.y=currentImgMain.y+gridLength;
                cutImagePositionX=0;//臉朝下
                break;
            default://其他按鍵不處理
                return;
        }
        //確認目標位置不會超過地圖
        if(targetImg.x<=600 && targetImg.x>=0 && targetImg.y<=600 && targetImg.y>=0){
            targetBlock.x=targetImg.y/gridLength;
            targetBlock.y=targetImg.x/gridLength;
        }else{
            targetBlock.x=-1;
            targetBlock.y=-1;
        }
        
        //清空主角原本所在的位置
        ctx.clearRect(currentImgMain.x,currentImgMain.y,gridLength,gridLength);
        if(targetBlock.x!=-1&&targetBlock.y!=-1){
            switch(mapArray[targetBlock.x][targetBlock.y]){
                case 0://一般道路(可移動)
                    $("#talkBox").text("");
                    currentImgMain.x=targetImg.x;
                    currentImgMain.y=targetImg.y;
                    break;
                case 1://有障礙物(不可移動)
                    $("#talkBox").text("有山");
                    break;
                case 2://終點(可移動)
                    $("#talkBox").text("抵達終點");
                    currentImgMain.x=targetImg.x;
                    currentImgMain.y=targetImg.y;
                    break;
                case 3://敵人(不可移動)
                    $("#talkBox").text("你瞅啥");
                    break;
                case 4://鑰匙
                    $("#talkBox").text("可以開門了");
                    currentImgMain.x=targetImg.x;
                    currentImgMain.y=targetImg.y;
                    key=true;
                    console.log(key);
                    break;
                case 5://大門
                    if(key==true){
                        $("#talkBox").text("門開了");
                        currentImgMain.x=targetImg.x;
                        currentImgMain.y=targetImg.y;
                        break;
                    }
                    else{
                        $("#talkBox").text("需要鑰匙");
                        break;
                    }
                }
                

            }else{
                $("#talkBox").text("邊界");
            }
            //重新繪製主角
            ctx.drawImage(imgMain,cutImagePositionX,0,80,130,currentImgMain.x,currentImgMain.y,gridLength,gridLength);
 });

