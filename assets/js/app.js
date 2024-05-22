// Infinite Image Slider -- Banner

const banner = document.querySelector('.banner');
const topic = document.querySelector('.topic');
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


let isMouseDown = false
let startX, scrollLeft

var listControl = [{
        "main": banner,
        "listImage": listImage[0],
        "im": imgsBanner[0], // "im" is short for "image
        "nextButton": nextBtn[0],
        "prevButton": prevBtn[0],
        "width": widthBanner,
        "current": currentBanner,
        "length": lengthBanner
    },
    {
        "main": topic,
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

function changeImageURLs() {
    const images = document.querySelectorAll('img[data-small][data-large]');
    images.forEach(img => {
        if (window.innerWidth >= 700) {
            img.src = img.getAttribute('data-large');
        } else {
            img.src = img.getAttribute('data-small');
        }
    });
}

// Thực hiện thay đổi khi trang được tải lần đầu
window.onload = changeImageURLs;

// Lắng nghe sự kiện thay đổi kích thước cửa sổ
window.onresize = changeImageURLs;


listControl.forEach((control, index) => {
    let delay = 0;
    if (index === 0) {
        delay = 12;
    } else {
        delay = 7;
    }

    const handleChangeSlide = () => {
        if ((index === 0 && control.current === control.length) || (index === 1 && control.current === control.length - 2)) {
            control.current++;
            control.listImage.style.transform = `translateX(${control.width * -1 * control.current}px)`;
            control.listImage.style.transition = 'transform 1s ease'; // Đảm bảo có animation
            control.current = 1;
            control.listImage.addEventListener('transitionend', resetToStart);
        } else {
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

    function resetToEnd() {
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
            listControl[0].current = index + 1;
            listControl[0].listImage.style.transform = `translateX(${listControl[0].width* -1 * listControl[0].current}px)`;
            updateDotActive();
            handleEventChangeSlide = setInterval(() => {
                handleChangeSlide(listControl[0]);
            }, delay * 1000);
        });
    });

    let handleEventChangeSlide = setInterval(() => {
        handleChangeSlide(control)
    }, delay * 1000);



    window.addEventListener('load', () => {

        if (index === 0) {
            control.width = control.im.offsetWidth;
        } else {
            control.width = control.im.offsetWidth + 20;
        }
        control.listImage.style.transform = `translateX(${control.width * -1}px)`; // Đặt vị trí ban đầu
        control.listImage.style.transition = 'transform 1s ease'; // Đảm bảo có animation
        updateDotActive();

    });


    window.addEventListener('resize', () => {

        clearInterval(handleEventChangeSlide);
        if (index === 0) {
            control.width = control.im.offsetWidth;
        } else {
            control.width = control.im.offsetWidth + 20;
        }
        control.listImage.style.transform = `translateX(${control.width * -1 * control.current}px)`; // Đặt vị trí ban đầu
        handleEventChangeSlide = setInterval(() => {
            handleChangeSlide(control)
        }, delay * 1000);
    });

    // Sự kiện mousedown
    control.main.addEventListener('mousedown', handleMouseDown);
    // Sự kiện mouseleave
    control.main.addEventListener('mouseleave', handleMouseLeave);
    // Sự kiện mouseup
    control.main.addEventListener('mouseup', handleMouseUp);
    // Sự kiện mousemove
    control.main.addEventListener('mousemove', handleMouseMove);

    // Sự kiện touchstart
    control.main.addEventListener('touchstart', handleTouchStart);
    // Sự kiện touchend
    control.main.addEventListener('touchend', handleTouchEnd);
    // Sự kiện touchmove
    control.main.addEventListener('touchmove', handleTouchMove);



    function handleMouseDown(e) {
        clearInterval(handleEventChangeSlide);
        isMouseDown = true;
        startX = e.pageX - control.main.offsetLeft;
        scrollLeft = control.main.scrollLeft;
        handleEventChangeSlide = setInterval(() => {
            handleChangeSlide(control);
        }, 12000);
    }

    function handleMouseLeave() {
        isMouseDown = false;
    }

    function handleMouseUp() {
        isMouseDown = false;
    }

    function handleMouseMove(e) {
        if (!isMouseDown) return;
        clearInterval(handleEventChangeSlide);
        const x = e.pageX - control.main.offsetLeft;
        walk = (x - startX);
        control.listImage.style.transition = 'none';
        control.listImage.style.transform = `translateX(${control.width * -1 * control.current + walk}px)`;
        console.log(Math.abs(scrollLeft - walk) + ' ' + control.width / 5);
        if (Math.abs(scrollLeft - walk) < control.width / 8) {
            console.log('reset');
            control.main.addEventListener('mouseup', resetMain);
        } else {
            console.log('not reset');
            control.main.addEventListener('mouseup', nextMain);
        }
        handleEventChangeSlide = setInterval(() => {
            handleChangeSlide(control);
        }, 12000);
        scrollLeft = 0;
    }

    function handleTouchStart(e) {
        const touch = e.touches[0];
        clearInterval(handleEventChangeSlide);
        isMouseDown = true;
        startX = touch.pageX - control.main.offsetLeft;
        scrollLeft = control.main.scrollLeft;
        handleEventChangeSlide = setInterval(() => {
            handleChangeSlide(control);
        }, 12000);
        e.preventDefault(); // Ngăn chặn hành vi mặc định của trình duyệt
    }

    function handleTouchEnd(e) {
        isMouseDown = false;
        e.preventDefault(); // Ngăn chặn hành vi mặc định của trình duyệt
    }

    function handleTouchMove(e) {
        clearInterval(handleEventChangeSlide);
        if (!isMouseDown) return;
        const touch = e.touches[0];
        const x = touch.pageX - control.main.offsetLeft;
        walk = (x - startX);
        control.listImage.style.transition = 'none';
        control.listImage.style.transform = `translateX(${control.width * -1 * control.current + walk}px)`;
        console.log(Math.abs(scrollLeft - walk) + ' ' + control.width / 5);
        if (Math.abs(scrollLeft - walk) < control.width / 8) {
            console.log('reset');
            control.main.addEventListener('touchend', resetMain);
        } else {
            console.log('not reset');
            control.main.addEventListener('touchend', nextMain);
        }
        handleEventChangeSlide = setInterval(() => {
            handleChangeSlide(control);
        }, 12000);
        scrollLeft = 0;
        e.preventDefault(); // Ngăn chặn hành vi mặc định của trình duyệt
    }

    function resetMain() {
        console.log('reset main');
        control.main.removeEventListener('mouseup', resetMain);
        isMouseDown = false;
        control.listImage.style.transition = 'transform 1s ease';
        control.listImage.style.transform = `translateX(${control.width * -1 * control.current - scrollLeft}px)`;
    }

    function nextMain() {
        console.log('next main');
        control.main.removeEventListener('mouseup', nextMain);
        isMouseDown = false;
        control.listImage.style.transition = 'transform 1s ease';
        if (walk < 0) {
            handleChangeSlide(control);
        } else {
            handlePrevSlide(control);
        }
        updateDotActive();
    }


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

    function handlePrevSlide(control) {
        if (control.current === 1) {
            control.current--;
            control.listImage.style.transform = `translateX(${control.width* -1 * control.current}px)`;
            control.listImage.style.transition = 'transform 1s ease'; // Đảm bảo có animation
            if (index === 0) {
                control.current = control.length;
            } else {
                control.current = control.length - 2;
            }
            control.listImage.addEventListener('transitionend', resetToEnd);
        } else {
            control.current--;
            control.listImage.style.transform = `translateX(${control.width* -1 * control.current}px)`;
        }
        updateDotActive();
    }

    control.prevButton.addEventListener('click', () => {
        if (!isClickable) return;
        isClickable = false;
        clearInterval(handleEventChangeSlide);
        handlePrevSlide(control);
        handleEventChangeSlide = setInterval(() => {
            handleChangeSlide(control)
        }, delay * 1000);
        setTimeout(() => {
            isClickable = true; // Khôi phục khả năng nhấn sau 1-2 giây
        }, 1000);
    });
});


const gotoBack = document.querySelector(".gotop-btn")

window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;

    if (scrollPosition >= 1000) {
        gotoBack.style.display = "block"
    } else {
        gotoBack.style.display = "none"

    }
});


const headerMenuBarIcon = document.querySelectorAll(".menu__bar-icon-link")
const headerMenuBarLisr = document.querySelectorAll(".menu__service")

headerMenuBarIcon.forEach((btn, index) => {
    btn.addEventListener('click', function() {
        if (headerMenuBarLisr[index].style.display === "none") {
            headerMenuBarLisr[index].style.display = "flex"
        } else {
            headerMenuBarLisr[index].style.display = "none"
        }
    })

})


// Change Class Tag Menu Bar

const tagMenuBar = document.querySelector(".header__navbar-icon--change")
const headerMenuBar = document.querySelector(".header__menu-bar")

tagMenuBar.addEventListener('click', function() {
    headerMenuBar.style.display = "block"
    if (headerMenuBar.style.animationName === "wipeIn") {
        tagMenuBar.classList.replace("fa-bars", "fa-xmark")
        headerMenuBar.style.animationName = "wipeOut"
        headerMenuBar.style.animationDuration = "1s"

    } else {
        tagMenuBar.classList.replace("fa-xmark", "fa-bars")
        headerMenuBar.style.animationName = "wipeIn"
        headerMenuBar.style.animationDuration = "1s"

    }
})


window.addEventListener('resize', function() {
    if (window.innerWidth >= 1024) {
        headerMenuBar.style.display = "none"
    }
})