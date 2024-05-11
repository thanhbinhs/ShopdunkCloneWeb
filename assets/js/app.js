// Infinite Image Slider

const listImage = document.querySelector('.banner__img-list');
const imgs = document.querySelectorAll('.banner__img-item');
const prevBtn = document.querySelector('.banner__control-prev');
const nextBtn = document.querySelector('.banner__control-next');
const listDot = document.querySelector('.banner__dot-list');
const width = imgs[0].offsetWidth;

const listChildrens = [...listImage.children];

const length = imgs.length;
let current = 0;
let right = false;
let left = false;
let imgPerView = Math.round(listImage.offsetWidth / width);

function updateDotActive() {
    const dots = document.querySelectorAll('.banner__dot');
    dots.forEach((dot, index) => {
        if (index == current) {
            dot.classList.add('banner__dot--active');
        } else {
            dot.classList.remove('banner__dot--active');
        }
    });
}


const handleChangeSlide = () => {
    if(current == length - 1) {
        listImage.style.transform = `translateX(0px)`;
    } else{
        current++;
        listImage.style.transform = `translateX(${width* -1 * current}px)`;
    }
    updateDotActive();
}

const dots = document.querySelectorAll('.banner__dot');

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        clearInterval(handleEventChangeSlide);
        current = index;
        listImage.style.transform = `translateX(${width* -1 * current}px)`;
        updateDotActive();
        handleEventChangeSlide = setInterval(() => {
            handleChangeSlide();
        }, 12000);
    });
});

let handleEventChangeSlide = setInterval(() => {
    handleChangeSlide()
}, 12000);

prevBtn.addEventListener('click', () => {
    clearInterval(handleEventChangeSlide);
    if(current == 0) {
        current = length - 1;
        listImage.style.transform = `translateX(${width* -1 * current}px)`;
    } else{
        current--;
        listImage.style.transform = `translateX(${width* -1 * current}px)`;
    }
    updateDotActive();
    handleEventChangeSlide = setInterval(() => {
        handleChangeSlide()
    }, 12000);
});

nextBtn.addEventListener('click', () => {
    clearInterval(handleEventChangeSlide);
    handleChangeSlide();
    handleEventChangeSlide = setInterval(() => {
        handleChangeSlide();
    }, 12000);

});



