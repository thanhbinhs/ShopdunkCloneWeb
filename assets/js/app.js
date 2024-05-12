// Infinite Image Slider -- Banner

const banner = document.querySelector('.banner');
const listImage = document.querySelector('.banner__img-list');
const imgs = document.querySelectorAll('.banner__img-item');
const prevBtn = document.querySelector('.banner__control-prev');
const nextBtn = document.querySelector('.banner__control-next');
const listDot = document.querySelector('.banner__dot-list');

const length = imgs.length - 2;
let current = 1;
const width = imgs[0].offsetWidth;

let isClickable = true;

window.addEventListener('load', () => {
    const width = imgs[0].offsetWidth;
    listImage.style.transform = `translateX(${width * -1}px)`; // Đặt vị trí ban đầu
    listImage.style.transition = 'transform 1s ease'; // Đảm bảo có animation
    updateDotActive();
    // banner.style.display = '';
});

window.addEventListener('resize', () => {
    clearInterval(handleEventChangeSlide);
    const width = imgs[0].offsetWidth;
    listImage.style.transform = `translateX(${width * -1 * current}px)`; // Đặt lại vị trí khi resize
    handleEventChangeSlide = setInterval(() => {
        handleChangeSlide()
    }, 12000)
});

function updateDotActive() {
    const dots = document.querySelectorAll('.banner__dot');
    dots.forEach((dot, index) => {
        if (index === current - 1) {
            dot.classList.add('banner__dot--active');
        } else {
            dot.classList.remove('banner__dot--active');
        }
    });
}

const handleChangeSlide = () => {
    if(current === length) {
        current++;
        listImage.style.transform = `translateX(${width * -1 * current}px)`;
        listImage.style.transition = 'transform 1s ease'; // Đảm bảo có animation
        current = 1;
        listImage.addEventListener('transitionend', resetToStart);
    } else{
        current++;
        listImage.style.transform = `translateX(${width* -1 * current}px)`;
    }
    updateDotActive();
}

function resetToStart() {
    listImage.removeEventListener('transitionend', resetToStart); // Xóa event listener để không lặp lại
    listImage.style.transition = 'none'; // Loại bỏ animation để reset không bị thấy
    listImage.style.transform = `translateX(${width * -1 * current}px)`;
    setTimeout(() => { // Khôi phục transition sau khi reset
      listImage.style.transition = 'transform 1s ease';
    }, 0);
  }


const dots = document.querySelectorAll('.banner__dot');

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        clearInterval(handleEventChangeSlide);
        current = index +1;
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
    if (!isClickable) return;
    isClickable = false;
    clearInterval(handleEventChangeSlide);
    if(current === 1) {
        current--;
        listImage.style.transform = `translateX(${width* -1 * current}px)`;
        listImage.style.transition = 'transform 1s ease'; // Đảm bảo có animation
        current = length;
        listImage.addEventListener('transitionend', resetToEnd);
    } else{
        current--;
        listImage.style.transform = `translateX(${width* -1 * current}px)`;
    }
    updateDotActive();
    handleEventChangeSlide = setInterval(() => {
        handleChangeSlide()
    }, 12000);
    setTimeout(() => {
        isClickable = true; // Khôi phục khả năng nhấn sau 1-2 giây
    }, 1000); 
});


function resetToEnd(){
    listImage.removeEventListener('transitionend', resetToEnd); // Xóa event listener để không lặp lại
    listImage.style.transition = 'none'; // Loại bỏ animation để reset không bị thấy
    listImage.style.transform = `translateX(${width * -1 * current}px)`;
    setTimeout(() => { // Khôi phục transition sau khi reset
      listImage.style.transition = 'transform 1s ease';
    }, 0);
}

nextBtn.addEventListener('click', () => {
    if (!isClickable) return;
    isClickable = false;
    clearInterval(handleEventChangeSlide);
    handleChangeSlide();
    handleEventChangeSlide = setInterval(() => {
        handleChangeSlide();
    }, 12000);
    setTimeout(() => {
        isClickable = true; // Khôi phục khả năng nhấn sau 1-2 giây
    }, 1000);
});


