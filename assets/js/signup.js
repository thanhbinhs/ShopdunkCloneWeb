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
const menuBottom = document.querySelector(".menu__bottom")

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
        headerMenuBar.style.display = "none"
    }
})


window.addEventListener('resize', function() {
    if (window.innerWidth >= 1024) {
        headerMenuBar.style.display = "none"
    }
    if (window.innerWidth <= 500) {
        menuBottom.style.display = "block"
    } else {
        menuBottom.style.display = "none"
    }
})