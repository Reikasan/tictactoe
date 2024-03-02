const cursor = document.querySelector('.cursor');
const normalCursor = cursor.querySelector('.cursor--normal');
const pointerCursor = cursor.querySelector('.cursor--pointer');
const hoverEffectElements = document.querySelectorAll('.pointer');
const body = document.querySelector('body');

let msPos = {
    // mouse position
    mouse: {
      x: document.documentElement.clientWidth / 2,
      y: document.documentElement.clientHeight / 2
    }
};
  
// mouse stalker activate for non-touch devices
if (window.matchMedia("(pointer: fine)")) {
    document.addEventListener("mouseover", customCursorActivate);
}
  
// show cursor on mouseenter and hide on mouseleave
document.addEventListener('mouseenter', () => {
    cursor.classList.add('show');
});

document.addEventListener('mouseleave', () => {
    cursor.classList.remove('show');
});

 // custom cursor and mouse stalker activate
function customCursorActivate() {
    cursor.classList.add("isActive");
  
    document.removeEventListener("mouseover", customCursorActivate);
  
    // set mouse position by mousemove
    document.addEventListener("mousemove", mousemove);
  
    requestAnimationFrame(update);
 }
  
function mousemove(e) {
    msPos.mouse.x = e.clientX;
    msPos.mouse.y = e.clientY;
}
  
  // update function
function update() {
    // round to 0.1
    const mouseX = Math.round(msPos.mouse.x);
    const mouseY = Math.round(msPos.mouse.y);

    // update mouse position
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(1)`;

    // start animation
    requestAnimationFrame(update);
}
  
//  add event listener to each selected area
hoverEffectElements.forEach((element) => {
    element.addEventListener("mouseover", () => {
        toggleCursor(element);
    });
    element.addEventListener("mouseout", () => {
        toggleCursor(element);
    });
    element.addEventListener("mousedown", () => {
        changeCursorColor(element);
    });
    element.addEventListener("mouseup", () => {
        removeCursorColor(element);
    });
}); 

// Toggle cursor
function toggleCursor(hoveredElement) {
    normalCursor.classList.toggle('hidden');
    pointerCursor.classList.toggle('hidden');
}

// Change cursor color
function changeCursorColor(hoveredElement) {
    pointerCursor.style.color = '#578b7e';
}

function removeCursorColor(hoveredElement) {
    pointerCursor.style.color = '#84A59D';
}