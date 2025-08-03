import{S as r}from"./swiper-core.js";import{N as i,P as s}from"./pagination.js";function u(){const l=document.querySelectorAll(".slider-welcome__slide").length;function t(n){const e=(n+1).toString().padStart(2,"0"),o=l.toString().padStart(2,"0");document.querySelector(".counter").innerHTML=`
            <span class="counter__current">${e}</span> 
            | 
            <span class="counter__total">${o}</span>
        `}new r(".slider-welcome__swiper",{slidesPerView:1,loop:!0,navigation:{nextEl:".slider-welcome__next",prevEl:".slider-welcome__prew"},pagination:{el:".dots",type:"bullets",clickable:!0,bulletClass:"dot",bulletActiveClass:"dot_active",renderBullet:function(n,e){return'<div class="'+e+'"></div>'}},mousewheel:!0,keyboard:!0,modules:[i,s],on:{init:function(){t(this.realIndex)},slideChange:function(){t(this.realIndex)}}})}export{u as default};
