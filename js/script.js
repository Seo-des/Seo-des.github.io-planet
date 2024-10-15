const stretchElements = document.querySelectorAll('.move');
const initialSizes = {};

stretchElements.forEach(element => {
    const rect = element.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    initialSizes[element] = {
        width: (rect.width / viewportWidth) * 77,
        height: (rect.height / viewportHeight) * 77
    };
});

let isUpdating = false;

const updateStretch = (event) => {
    if (isUpdating) return; // Prevent multiple updates in the same frame
    isUpdating = true;

    requestAnimationFrame(() => {
        const scrollX = window.scrollX;
        const scrollY = window.scrollY;

        stretchElements.forEach((element) => {
            const rect = element.getBoundingClientRect();
            const mouseX = event.clientX + scrollX || scrollX + window.innerWidth / 2;
            const mouseY = event.clientY + scrollY || scrollY + window.innerHeight / 2;
            const centerX = rect.left + scrollX + rect.width / 2;
            const centerY = rect.top + scrollY + rect.height / 2;
            const distanceX = Math.abs(mouseX - centerX);
            const distanceY = mouseY - centerY; // Positive if below center, negative if above

            const maxStretchPercentage = 5;

            const initialWidthPercentage = initialSizes[element].width;
            const initialHeightPercentage = initialSizes[element].height;

            // Calculate new width based on horizontal distance
            const newWidthPercentage = Math.min(
                initialWidthPercentage + (distanceX / window.innerWidth) * maxStretchPercentage,
                initialWidthPercentage + maxStretchPercentage
            );

            // For height, stretch down when mouse goes down, and contract when moving up
            let newHeightPercentage = initialHeightPercentage;

            if (distanceY > 0) { // Mouse is below the center
                newHeightPercentage += (distanceY / window.innerHeight) * maxStretchPercentage;
            } else if (distanceY < 0) { // Mouse is above the center
                newHeightPercentage = Math.max(initialHeightPercentage, newHeightPercentage + (distanceY / window.innerHeight) * maxStretchPercentage);
            }

            element.style.width = `${newWidthPercentage}%`;
            element.style.height = `${newHeightPercentage}%`;
        });

        isUpdating = false; // Allow for the next update
    });
};

document.addEventListener('mousemove', updateStretch);
document.addEventListener('scroll', updateStretch);

let nextButton = document.getElementById('next');
let prevButton = document.getElementById('prev');
let carousel = document.querySelector('.carousel');
let listHTML = document.querySelector('.carousel .list');
let seeMoreButtons = document.querySelectorAll('.seeMore');
let backButton = document.getElementById('back');

nextButton.onclick = function(){
    showSlider('next');
}
prevButton.onclick = function(){
    showSlider('prev');
}
let unAcceppClick;
const showSlider = (type) => {
    nextButton.style.pointerEvents = 'none';
    prevButton.style.pointerEvents = 'none';

    carousel.classList.remove('next', 'prev');
    let items = document.querySelectorAll('.carousel .list .item');
    if(type === 'next'){
        listHTML.appendChild(items[0]);
        carousel.classList.add('next');
    }else{
        listHTML.prepend(items[items.length - 1]);
        carousel.classList.add('prev');
    }
    clearTimeout(unAcceppClick);
    unAcceppClick = setTimeout(()=>{
        nextButton.style.pointerEvents = 'auto';
        prevButton.style.pointerEvents = 'auto';
    }, 2000)
}
seeMoreButtons.forEach((button) => {
    button.onclick = function(){
        carousel.classList.remove('next', 'prev');
        carousel.classList.add('showDetail');
    }
});
backButton.onclick = function(){
    carousel.classList.remove('showDetail');
}
