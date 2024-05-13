// Infinite Image Slider -- Banner

// const banner = document.querySelector('.banner');
const listImage = document.querySelectorAll('.img-list');
const imgsBanner = document.querySelectorAll('.banner__img-item');
const imgsTopic = document.querySelectorAll('.topic-item');
const prevBtn = document.querySelectorAll('.control-prev');
const nextBtn = document.querySelectorAll('.control-next');
const listDot = document.querySelector('.banner__dot-list');
const dots = document.querySelectorAll('.banner__dot');




const lengthBanner = imgsBanner.length - 2;
let currentBanner = 1;
let widthBanner = imgsBanner[0].offsetWidth;

const lengthTopic = imgsTopic.length - 2;
let currentTopic = 1;
let widthTopic = imgsTopic[0].offsetWidth;

let isClickable = true;

var listControl = [
    {
        "listImage": listImage[0],
        "im": imgsBanner[0], // "im" is short for "image
        "nextButton": nextBtn[0],
        "prevButton": prevBtn[0],
        "width": widthBanner,
        "current": currentBanner,
        "length": lengthBanner 
    },
    {
        "listImage": listImage[1],
        "im": imgsTopic[0], // "im" is short for "image
        "nextButton": nextBtn[1],
        "prevButton": prevBtn[1],
        "width": widthTopic,
        "current": currentTopic,
        "length": lengthTopic
    }
]

function updateDotActive() {
    const dots = document.querySelectorAll('.banner__dot');
    dots.forEach((dot, index) => {
        if (index === listControl[0].current - 1) {
            dot.classList.add('banner__dot--active');
        } else {
            dot.classList.remove('banner__dot--active');
        }
    });
}

listControl.forEach((control, index) => {

    const handleChangeSlide = () => {
        if((index === 0 && control.current === control.length) || (index === 1 && control.current === control.length - 2)) {
            control.current++;
            control.listImage.style.transform = `translateX(${control.width * -1 * control.current}px)`;
            control.listImage.style.transition = 'transform 1s ease'; // Đảm bảo có animation
            control.current = 1;
            control.listImage.addEventListener('transitionend', resetToStart);
        } else{
            control.current++;
            control.listImage.style.transform = `translateX(${control.width* -1 * control.current}px)`;
        }
        updateDotActive();
    }

    function resetToStart() {
        control.listImage.removeEventListener('transitionend', resetToStart); // Xóa event listener để không lặp lại
        control.listImage.style.transition = 'none'; // Loại bỏ animation để reset không bị thấy
        control.listImage.style.transform = `translateX(${control.width * -1 * control.current}px)`;
        setTimeout(() => { // Khôi phục transition sau khi reset
            control.listImage.style.transition = 'transform 1s ease';
        }, 0);
    }

    function resetToEnd(){
        control.listImage.removeEventListener('transitionend', resetToEnd); // Xóa event listener để không lặp lại
        control.listImage.style.transition = 'none'; // Loại bỏ animation để reset không bị thấy
        control.listImage.style.transform = `translateX(${control.width * -1 * control.current}px)`;
        setTimeout(() => { // Khôi phục transition sau khi reset
            control.listImage.style.transition = 'transform 1s ease';
        }, 0);
    }
    

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(handleEventChangeSlide);
            listControl[0].current = index +1;
            listControl[0].listImage.style.transform = `translateX(${listControl[0].width* -1 * listControl[0].current}px)`;
            updateDotActive();
            handleEventChangeSlide = setInterval(() => {
                handleChangeSlide(listControl[0]);
            }, 12000);
        });
    });

    let handleEventChangeSlide = setInterval(() => {
        handleChangeSlide(control)
    }, 12000);

    window.addEventListener('load', () => {
        if(index === 0) {
            control.width = control.im.offsetWidth;
        }else{
            control.width = control.im.offsetWidth + 20;
        }
        control.listImage.style.transform = `translateX(${control.width * -1}px)`; // Đặt vị trí ban đầu
        control.listImage.style.transition = 'transform 1s ease'; // Đảm bảo có animation
        updateDotActive();
    });


    window.addEventListener('resize', () => {
        clearInterval(handleEventChangeSlide);
        if(index === 0) {
            control.width = control.im.offsetWidth;
        }else{
            control.width = control.im.offsetWidth + 20;
        }
        control.listImage.style.transform = `translateX(${control.width * -1 * control.current}px)`; // Đặt vị trí ban đầu
        handleEventChangeSlide = setInterval(() => {
            handleChangeSlide(control)
        }, 12000)
    });

    control.nextButton.addEventListener('click', () => {
        if (!isClickable) return;
        isClickable = false;
        clearInterval(handleEventChangeSlide);
        handleChangeSlide(control);
        handleEventChangeSlide = setInterval(() => {
            handleChangeSlide(control);
        }, 12000);
        setTimeout(() => {
            isClickable = true; // Khôi phục khả năng nhấn sau 1-2 giây
        }, 1000);
    });


    control.prevButton.addEventListener('click', () => {
        if (!isClickable) return;
        isClickable = false;
        clearInterval(handleEventChangeSlide);
        if(control.current === 1 ) {
            control.current--;
            control.listImage.style.transform = `translateX(${control.width* -1 * control.current}px)`;
            control.listImage.style.transition = 'transform 1s ease'; // Đảm bảo có animation
            if(index === 0) {
                control.current = control.length;
            }else{
                control.current = control.length - 2;
            }
            control.listImage.addEventListener('transitionend', resetToEnd);
        } else{
            control.current--;
            control.listImage.style.transform = `translateX(${control.width* -1 * control.current}px)`;
        }
        updateDotActive();
        handleEventChangeSlide = setInterval(() => {
            handleChangeSlide(control)
        }, 12000);
        setTimeout(() => {
            isClickable = true; // Khôi phục khả năng nhấn sau 1-2 giây
        }, 1000); 
    });
});





