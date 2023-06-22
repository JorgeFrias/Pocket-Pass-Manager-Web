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
$(document).ready(function() {
    revealJQueryAuto();
});

// Scroll horizontal
$(document).ready(function () {
    $(document).ready(function () {
        var container = $('.scrolling-container');
        var content = $('.scrolling-content');

        container.on('wheel', function (e) {
            // Add up all children width + margins + paddings
            var scrollWidth = container.get(0).scrollWidth - container.outerWidth();
            
            // Determine if the user is scrolling up or down
            var isScrollingUp = e.originalEvent.deltaY < 0;
                
            // - Scrolling down - end reached by -> regular scrolling
            if (!isScrollingUp && container.scrollLeft() >= scrollWidth) {
                return;
            // - Scrolling up - start reached -> regular scrolling
            } else if (isScrollingUp && container.scrollLeft() <= 0) {
                return;
            }
            
            // - Scrolling down and end not reached -> horizontal scrolling
            // - Scrolling up and start not reached -> horizontal scrolling
            if (container.is(e.target) || container.has(e.target).length > 0) {
                var delta = e.originalEvent.deltaY;
                var scrollAmount = delta * 1;

                container.scrollLeft(container.scrollLeft() + scrollAmount);
                e.preventDefault();
            }
        });
    });
});
