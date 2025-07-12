export default function exploreSlider() {
  const slider = document.querySelector(".explore__images input");
  const img = document.querySelector(".before-img");
  const dragLine = document.querySelector(".slider-comparison");

  slider.oninput = ()=>{
    let sliderVal = slider.value;
    dragLine.style.left = sliderVal + "%";
    img.style.width = sliderVal + "%";
  }
}