const chara = document.querySelector('.chara');
const stopScrollHeight = 960; // Adjust this value to set the scroll position where movement should stop

const initialScale = 1; // Initial scale of the element
const maxScale = 1.5; // Maximum scale of the element

document.addEventListener('scroll', function() {
    let value = window.scrollY;

    // Check if scroll position is less than or equal to the stopScrollHeight
    if (value <= stopScrollHeight) {
        chara.style.marginLeft = value * 0.56 + 'px';
        chara.style.marginTop = value * 1.1 + 'px';  
    }
    if (value <= stopScrollHeight) {
      let scaleFactor = 1 + (value / stopScrollHeight) * (maxScale - initialScale);
      scaleFactor = Math.min(scaleFactor, maxScale);
      chara.style.transform = 'scale(' + scaleFactor + ')';
      chara.style.transformOrigin = 'center';
      
    }
});

  
