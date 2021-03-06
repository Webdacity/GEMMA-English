const api_url = "https://gemma-backend.herokuapp.com";
// const api_url = "http://localhost:3000";


// ANIMATIONS

// Navbar Open & Close

const openNav = () => {
    $(".navbar").addClass("open");
    $(".navbar-page-wrapper").fadeIn(1000)
}

const closeNav = () => {
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

// Page Loader

const showLoader = () => {
    $(".loader").fadeIn(1000);
}

const hideLoader = () => {
    $(".loader").fadeOut(1000);
}

window.onload = (event) => {
    hideLoader()
};

// Footer
$(document).ready(() => {

    $.get("./footer.html", function (data) {
        $("#footer").html(data)
    });

});

// Feedback Forms

$("form .form-rating span").click(function () {
    $(this).closest(".form-rating").find("span").removeClass("clicked");
    $(this).addClass("clicked");
});

// Video
const pageName = window.location.pathname;
if (pageName === "/" || pageName === "/index.html" || pageName === "/about.html") {
    const iframe = document.querySelector('.video-frame iframe');
    const player = new Vimeo.Player(iframe);

    $(".video-frame .video-overlay button").click(() => {
        $(".video-overlay").fadeOut("slow");
        player.play()
    })
}


// ----------------------------------------------
// FORMS

// Send Ping to Wake Server

if (pageName === "/feedback.html" || pageName === "/application.html") {
    axios({
        method: "get",
        url: "https://gemma-backend.herokuapp.com/ping"
    })
        .then(result => {
            console.log("Server Pinged: " + result.status)
        })
}

// Modal 

const showSubmissionModal = (text) => {
    $('#submission-modal p').html(text);
    $('#submission-modal').modal('toggle');

}

// Validation

// Validate Form
const validateForm = (formToVal, formURL) => {
    let form = document.getElementById(formToVal);
    let email = $(".order-form [name='email_address']").val();
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (form.checkValidity() === false) {
        console.log("Validation Fail")
        event.preventDefault();
        event.stopPropagation();
        alert("Please ensure that you've completed all the fields.")
    } else {
        console.log("Validation Success")
        submitForm(formToVal, formURL);
    }
    form.classList.add('was-validated');
};

const submitForm = (formID, formURL) => {
    event.preventDefault();

    let formData = $(`#${formID}`).serializeArray();

    if (formID === "website-form") {
        sendForm(formData, formURL)
    }

    // Sessions Form
    else if (formID === "session-form") {

        // check for session ratings
        for (let i = 1; i <= 3; i++) {
            if ($(`#question${i}-rating span.clicked`).html() === undefined) {
                formData.push({
                    name: `question${i}-rating`,
                    value: "No Rating"
                })
            } else {
                formData.push({
                    name: `question${i}-rating`,
                    value: $(`#question${i}-rating span.clicked`).html()
                })
            }

        }

        formData.push({
            name: "german-feedback",
            value: false
        })

        sendForm(formData, formURL)
    }

    // Application Form
    else if (formID === "application-form") {

        // Symptoms
        let symptomLength = $("#symptom-checks").find("input").length;
        let symptoms = []
        for (let j = 1; j <= symptomLength + 1; j++) {
            if ($(`#symptom-checks .form-check:nth-child(${j}) input`).is(":checked")) {
                symptoms.push($(`#symptom-checks .form-check:nth-child(${j}) label`).html());
            }
        }

        formData.push({
            name: "question6-1",
            value: symptoms
        });

        formData.push({
            name: "cost-terms",
            value: "I agree to the terms of cancellation."
        });

        formData.push({
            name: "medical-terms",
            value: "I have read the recommendation for medical testing"
        });

        formData.push({
            name: "privacy-terms",
            value: "I have read the terms of the Privacy Policy"
        });

        let videoTerms = [];
        for (let k = 0; k <= 3; k++) {
            if ($(`#video-consent >div:nth-child(${k}) input`).is(":checked")) {
                videoTerms.push($(`#video-consent >div:nth-child(${k}) label`).html())
            }
        }

        formData.push({
            name: "video-terms",
            value: videoTerms
        })

        formData.push({
            name: "german-application",
            value: false
        })

        sendForm(formData, formURL)
    }
}

// Send Form Data

const sendForm = (formData, formURL) => {

    showLoader();
    axios({
        method: "post",
        url: `${api_url}${formURL}`,
        data: formData
    })
        .then(result => {
            console.log(result.data);
            hideLoader()
            if (result.status === 500) {
                alert(result.data.message)
            } else {
                showSubmissionModal("Thank you for your submission!");
            }
        });

}

const fillFIelds = () => {
    $("form textarea").val("Test Answer")
    $("form input").val("Test Answer")
}