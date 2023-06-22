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
        var isHorizontalScrolling = false;

        contentWidth = content.outerWidth() + parseInt(content.css('margin-left')) + parseInt(content.css('margin-right')) + parseInt(content.css('padding-left')) + parseInt(content.css('padding-right') + parseInt(container.css('padding-left')) + parseInt(container.css('padding-right')));

        container.on('scroll', function (e) {
            if (isHorizontalScrolling) {
                console.log('horizontal scrolling');
                e.preventDefault();
                return false;
            }

            // Check if the horizontal scroll has reached the end
            if (container.scrollLeft() >= contentWidth) {
                // Allow vertical scrolling when the end is reached
                console.log('end reached. \t Status: scrollLeft: ' + container.scrollLeft() + ' innerWidth: ' + container.innerWidth() + ' outerWidth: ' + outerWidth);
                isHorizontalScrolling = false;
                e.preventDefault();
                // e.stopPropagation();
                // e.stopImmediatePropagation();
            }
        });

        container.on('wheel', function (e) {
            if (container.scrollLeft() >= contentWidth) {
                return;
            }

            if (container.is(e.target) || container.has(e.target).length > 0) {
                var delta = e.originalEvent.deltaY;
                var scrollAmount = delta * 1;

                container.scrollLeft(container.scrollLeft() + scrollAmount);
                e.preventDefault();
                isHorizontalScrolling = true;

                setTimeout(function () {
                    isHorizontalScrolling = false;
                }, 100);
            }
        });
    });
});
