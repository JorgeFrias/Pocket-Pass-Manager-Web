/// Runs when page is scrolled and the element is visible
function revealJQuery() {
    var reveals = $(".reveal-fade-in, .reveal-scale, .reveal-slide-up");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            $(reveals[i]).addClass("active");
        } else {
            $(reveals[i]).removeClass("active");
        }
    }
}

/// Runs on document ready
function revealJQueryAuto() {
    var reveals = $(".reveal-auto-slide-down, .reveal-auto-slide-down-1, .reveal-auto-slide-down-2, .reveal-auto-slide-down-3, .reveal-auto-slide-down-4, .reveal-auto-opacity");

    for (var i = 0; i < reveals.length; i++) {
        $(reveals[i]).addClass("active");
    }
}

// Add event listener to window using revealJQuery func
window.addEventListener("scroll", revealJQuery);

// On document ready run revealJQueryAuto func
$(document).ready(function () {
    revealJQueryAuto();
});

$(document).ready(function () {
    var container = $('.scrolling-container');
    var buttonLeft = $('.scrolling-button-left');
    var buttonRight = $('.scrolling-button-right');
    var previewColum = $('.scrolling-content .col');
    
    buttonLeft.on('click', function () {
        var previewWidth = previewColum.width();
        container.animate({
            scrollLeft: '-=' + previewWidth
        }, 300);
    });

    buttonRight.on('click', function () {
        var previewWidth = previewColum.width();
        container.animate({
            scrollLeft: '+=' + previewWidth
        }, 300);
    });
});