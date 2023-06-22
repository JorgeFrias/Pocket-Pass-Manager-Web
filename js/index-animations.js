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

// Scroll horizontal
/// Determines if the element is approximately centered vertically on the viewport
function isElementCenteredVertically(element) {
    // Only scroll if the container is in the viewport center
    var windowHeight = $(window).height();
    var containerHeight = element.outerHeight();
    var scrollTop = $(window).scrollTop();

    var exactCenterPosition = scrollTop + (windowHeight / 2) - (containerHeight / 2);
    var errorMargin = windowHeight * 0.2; // 10% of the window height

    var lowerBound = exactCenterPosition - errorMargin;
    var upperBound = exactCenterPosition + errorMargin;
    var containerTop = element.offset().top;

    return (containerTop >= lowerBound && containerTop <= upperBound);
}


$(document).ready(function () {
    $(document).ready(function () {
        var container = $('.scrolling-container');
        
        document.addEventListener('wheel', function(e) {
            // Only scroll if the container is in the viewport center
            if (!isElementCenteredVertically(container)) {
                return true;
            }

            $e = $.Event(e);

            // If is scrolling horizontally let it pass
            if ($e.originalEvent.deltaX !== 0) {
                return;
            }

            // Add up all children width + margins + paddings
            var scrollWidth = container.get(0).scrollWidth - container.outerWidth();

            // Determine if the user is scrolling up or down
            var isScrollingUp = $e.originalEvent.deltaY < 0;

            // - Scrolling down - end reached by -> regular scrolling
            if (!isScrollingUp && container.scrollLeft() >= scrollWidth) {
                return;
                // - Scrolling up - start reached -> regular scrolling
            } else if (isScrollingUp && container.scrollLeft() <= 0) {
                return;
            }

            // - Scrolling down and end not reached -> horizontal scrolling
            // - Scrolling up and start not reached -> horizontal scrolling
            var delta = $e.originalEvent.deltaY;
            var scrollAmount = delta * 1;

            container.scrollLeft(container.scrollLeft() + scrollAmount);
            $e.preventDefault();

        }, { passive: false });
    });
});
