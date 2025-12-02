 let body=document.querySelector('.bdy');
let cursor= document.querySelector('#cursorcontainer img');





body.addEventListener("mousemove",(dets)=>{
    cursor.style.left=dets.x+"px";
    cursor.style.top=dets.y+"px";

})

 let typewriter= document.getElementsByClassName("typewriter")[0];
//  console.log(typewriter);
let text=["Full Stack Developer","Currently Working On AI Models Integration"];
let speed =200;

let delaybetweentext=1000; 
let i=0;
let textindex=0;
let isDeleting=false;
 function typing(){
 
   let currenttext= text[textindex];

    if(isDeleting){
         typewriter.innerHTML=currenttext.substring(0,i-1);
         i--;
    }
    else{
         typewriter.innerHTML=currenttext.substring(0,i+1);
         i++;
    }
  
 
  let nextspeed =isDeleting?100:speed;
 if(!isDeleting && i==currenttext.length){//when our first index sentence complete then perform this 
     setTimeout(()=>{isDeleting=true},delaybetweentext);
     nextspeed=delaybetweentext;
 }
  else if(isDeleting && i==0){
     isDeleting=false;
     textindex=(textindex+1) %text.length //switch to the next index sentence 
  }

  setTimeout(typing,nextspeed);
}

 typing();

  
 (function setVh(){
  const set =()=>{
    document.documentElement.style.setProperty('--vh',`${window.innerHeight*0.01}px`);
  }
  set();
  window.addEventListener('resize',set);
 })();//this is IIFE means Inmediately Invoked function expression which is call function directly after defining it . 