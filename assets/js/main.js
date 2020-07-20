// ANIMATIONS

// Navbar Open & Close

const openNav = () => {
    $(".navbar-content").css("width", "25vw");
}

const closeNav = () => {
    $(".navbar-content").css("width", "0");
}

// Footer
$(document).ready(() => {

    $.get("./footer.html", function (data) {
        $("#footer").html(data)
    });

});