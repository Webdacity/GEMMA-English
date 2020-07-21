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

// Footer
$(document).ready(() => {

    $.get("./footer.html", function (data) {
        $("#footer").html(data)
    });

});