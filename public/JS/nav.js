var flag=1;
let icon=document.querySelector('.icon');
 icon.addEventListener('click',()=>{
   document.getElementsByClassName('navbar')[0].style.transform="translateX(0vw)";
   
   if( (flag%2 !=0)){
  setTimeout(()=>{
    icon.classList.add('ri-close-large-line');
    icon.style.left="13vw";
    
  },200)
}
else{
  
  setTimeout(()=>{
      document.getElementsByClassName('navbar')[0].style.transform="translateX(-19vw)";

    })
  icon.classList.remove('ri-close-large-line')
   icon.style.left="2vw";
    


}
 flag++;
 })
