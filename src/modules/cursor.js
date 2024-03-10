// Copyright 2024 Reika Akuzawa. All rights reserved.

import { cursor, normalCursor, pointerCursor, hoverEffectElements, resultScreen, msPos } from './variables.js';

/* EVENT LISTENERS */
// mouse stalker activate for non-touch devices
if (window.matchMedia("(pointer: fine)")) {
    document.body.addEventListener("mouseover", customCursorActivate);
} 

// show cursor on mouseenter and hide on mouseleave
document.body.addEventListener('mouseenter', () => {
    cursor.classList.add('show');
});

document.body.addEventListener('mouseleave', () => {
    cursor.classList.remove('show');
});

//  change cursor to pointer on hover
hoverEffectElements.forEach((element) => {
    element.addEventListener("mouseover", () => {
        toggleCursor(element);
    });
    element.addEventListener("mouseout", () => {
        toggleCursor(element);
    });
    element.addEventListener("mousedown", () => {
        changeCursorColor('dark');
    });
    element.addEventListener("mouseup", () => {
        removeCursorColor('dark');
    });
}); 

// change cursor color by entering result screen
resultScreen.addEventListener('mouseover', () => {
    changeCursorColor('pink');
});

resultScreen.addEventListener('mouseout', () => {
    removeCursorColor('pink');
});


 // activate custom cursor 
function customCursorActivate() {
    cursor.classList.add("isActive");
  
    document.removeEventListener("mouseover", customCursorActivate);
  
    // set mouse position by mousemove
    document.addEventListener("mousemove", mousemove);
  
    requestAnimationFrame(update);
 }
  
function mousemove(e) {
    msPos.x = e.clientX;
    msPos.y = e.clientY;
}
  
  // update function
function update() {
    // round to 0.1
    const mouseX = Math.round(msPos.x);
    const mouseY = Math.round(msPos.y);

    // update mouse position
    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) scale(1)`;

    // start animation
    requestAnimationFrame(update);
}
  
// Toggle cursor
function toggleCursor(hoveredElement) {
    normalCursor.classList.toggle('hidden');
    pointerCursor.classList.toggle('hidden');
}

// Change cursor color
function changeCursorColor(color) {
    cursor.classList.add(color);
}

function removeCursorColor(color) {
    cursor.classList.remove(color);
}