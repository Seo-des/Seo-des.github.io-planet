const chara = document.querySelector('.chara');
const stopScrollHeight = 960; // Adjust this value to set the scroll position where movement should stop

document.addEventListener('scroll', function() {
    let value = window.scrollY;

    // Check if scroll position is less than or equal to the stopScrollHeight
    if (value <= stopScrollHeight) {
        chara.style.marginLeft = value * 0.7 + 'px';
        chara.style.marginTop = value * 1 + 'px';
    }
});
