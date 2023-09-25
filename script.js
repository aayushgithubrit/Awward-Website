// const scroll = new LocomotiveScroll({
//   el: document.querySelector('#main'),
//   smooth: true
// });

function firstPageAnim(){
  var tl = gsap.timeline();

  tl.from("#nav", {
    y: "-10",
    opacity: 0,
    duration: 1.5,
    ease: Expo.easeInOut,
  })

  .to(".boundingelem",{
    y: 0,
    ease:Expo.easeInOut,
    duration:2,
    delay: -1,
    stagger: 0.2,
  })
  .from("#herofooter", {
     y: -10,
     opacity: 0,
     duration: 1.5,
     delay: -1,
     ease: Expo.easeInOut,
  })
  
}

// jab mouse move hoo tau hum log skew kar paaye aur max. skeww and min. skew define kar payee,
// jab mouse move hoo tau chapta kii value badhe , aur jab mouse chalna band hoo jai tau chapta hata loo.
var timeout;

function circleChaptaKaro(){
  // define default scale value
  var xscale = 1;
  var yscale = 1;

  // check previous value
  var xprev = 0;
  var yprev = 0;

  window.addEventListener("mousemove",function(dets){
    clearTimeout(timeout);
    xscale = gsap.utils.clamp(.8,1.2 ,dets.clientX - xprev);
    yscale = gsap.utils.clamp(.8,1.2 ,dets.clientY - yprev);

      xprev = dets.clientX;
      yprev = dets.clientY;

      circlemousefollower(xscale, yscale);
      timeout = setTimeout(function(){
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px ,${dets.clientY}px) scale(1,1)`;
  
      },100); 
  });
} 


function circlemousefollower(xscale,yscale){
 window,addEventListener("mousemove",function(dets){
   document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px ,${dets.clientY}px) scale(${xscale}, ${yscale})`;
 });
}
circlemousefollower();
 firstPageAnim() ;
 circleChaptaKaro();


//  teeno element koo select karo ,uske badd teeno par mouse move lagoa,jab mousemove hoo tau ye pata karo kii mouse
// kaha par hai,jiska matlab hai kii mouse kii position pata karo,

// aab mouse kii x y position kai badle us image koo show karo aur move karo. 1

// and us image koo move karo,move karte waqt rotate karo.

// jaise jaise mouse tej chale waise waise rotation bhi tej hoo jaye.

document.querySelectorAll(".elem").forEach(function (elem){
  var rotate = 0;
  var diffrot = 0;
  elem.addEventListener("mouseleave",function(dets){
      gsap.to(elem.querySelector("img"),{
        opacity: 0,
        ease: Power3,
        duration: .5,
      });
     });

   elem.addEventListener("mousemove",function(dets){
  // kisi bhi div kii details nikalni hoo,matlab kitne top pai hai kitne left mai hai
  // tau usai find karne kai liye yse karete hai.

  // us div kaa naam likho aur . laga kar likho "getboundingclientrect".
   var diff = dets.clientY - elem.getBoundingClientRect().top;
    diffrot  = dets.clientX - rotate;
    rotate = dets.clientx;

  // we use "clamp function" because we need to rotate the value only 10 to 15degree
  // not more than that

  // wegive two value min. and  max. and third is jiskoo clamp karna hoo
  // hamare case mai "diff" loo karna hai. 
    gsap.to(elem.querySelector("img"),{
      opacity: 1,
      ease: Power3,
      top: diff,
      left: dets.clientX,
      rotate: gsap.utils.clamp(-30, 15, diffrot * 0.5),
    });
   });
});

