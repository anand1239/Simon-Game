var gameEnd=false;
let colorAvailable=["green","red","yellow","blue"];
let arr=document.querySelectorAll("div.btn");
let gameSequence=[];
let userSequence=[];

//For Restart the Game
document.addEventListener("keypress",function(){
    if(gameEnd||(gameSequence.length==0)){
        document.querySelector("#level-title").innerHTML="Level 1";
        gameSequence.length=0;
        userSequence.length=0;
        gameEnd=false;
        nextSequence();
    }
});
for(let i=0;i<arr.length;i++){
    arr[i].addEventListener("click",function(){
        if(gameEnd==false){
            handleClick(this.id);
            userSequence.push(this.id);          
            check(); 
        }
        if(gameEnd){
            document.querySelector("#level-title").innerHTML="Game Over,Press Any Key to Restart";
            document.querySelector("body").classList.add("game-over");
            let audio=new Audio("sounds/wrong.mp3");
            audio.play();
            setTimeout(function(){
                document.querySelector("body").classList.remove("game-over");
            },100);
        }
        else if(userSequence.length==gameSequence.length){
            setTimeout(function(){
            document.querySelector("#level-title").innerHTML="Level "+(userSequence.length+1);
            userSequence.length=0;
            nextSequence();                
            },600);
        }
    });
}
function handleClick(color){
    press(color);
    let audio=new Audio("sounds/"+color+".mp3");
    audio.play();
}
function press(id){
    let block=document.querySelector("#"+id);
    block.classList.add("pressed");
    setTimeout(function (){
        block.classList.remove("pressed");
    },100);
}
function nextSequence(){
    let nextNumber=Math.floor(Math.random()*4);
    gameSequence.push(colorAvailable[nextNumber]);
    handleClick(colorAvailable[nextNumber]);
}
function check(){
    if(userSequence.length>gameSequence.length){
        gameEnd=true;
        return;
    }
    for(let i=0;i<userSequence.length;i++){
        if(userSequence[i]!=gameSequence[i])
        gameEnd=true;
    }
}