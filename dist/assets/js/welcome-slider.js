import{S as r}from"./swiper-core.js";import{N as a,P as i}from"./pagination.js";import{A as s}from"./autoplay.js";function p(){const n=document.querySelectorAll(".slider-welcome__slide").length;function t(l){const e=(l+1).toString().padStart(2,"0"),o=n.toString().padStart(2,"0");document.querySelector(".counter").innerHTML=`
            <span class="counter__current">${e}</span> 
            | 
            <span class="counter__total">${o}</span>
        `}new r(".slider-welcome__swiper",{slidesPerView:1,loop:!0,navigation:{nextEl:".slider-welcome__next",prevEl:".slider-welcome__prew"},pagination:{el:".dots",type:"bullets",clickable:!0,bulletClass:"dot",bulletActiveClass:"dot_active",renderBullet:function(l,e){return'<div class="'+e+'"></div>'}},mousewheel:!0,keyboard:!0,modules:[s,a,i],autoplay:{delay:2500,disableOnInteraction:!1},on:{init:function(){t(this.realIndex)},slideChange:function(){t(this.realIndex)}}})}export{p as default};
