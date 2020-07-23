// ANIMATIONS

// Navbar Open & Close

const openNav = () => {
    // $(".navbar-content").css("width", "25vw");
    $(".navbar").addClass("open");
    $(".navbar-page-wrapper").fadeIn(1000)
}

const closeNav = () => {
    // $(".navbar-content").css("width", "0");
    $(".navbar").removeClass("open");
    $(".navbar-page-wrapper").fadeOut(1000)
}

$(".navbar-page-wrapper").click(() => {
    closeNav();
})

// Hide Navbar on Scroll

var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0";
    } else {
        document.getElementById("navbar").style.top = "-75px";
    }
    prevScrollpos = currentScrollPos;
}

// Footer
$(document).ready(() => {

    $.get("./footer.html", function (data) {
        $("#footer").html(data)
    });

});

// Feedback Forms

$("form .form-rating span").click(function () {
    $("form .form-rating span").removeClass("clicked");
    $(this).addClass("clicked");
});


// Application Form