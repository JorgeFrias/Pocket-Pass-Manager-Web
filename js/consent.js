// GDPR: Google Analytics loads only after the visitor accepts. The choice is kept in localStorage.
(function () {
    var KEY = 'ppm-analytics-consent';
    var GA_ID = 'G-0TLS07194K';

    function getChoice() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
    function setChoice(v) { try { localStorage.setItem(KEY, v); } catch (e) { } }

    function loadAnalytics() {
        if (window.gtag) return;
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () { dataLayer.push(arguments); };
        gtag('js', new Date());
        gtag('config', GA_ID);
        var s = document.createElement('script');
        s.async = true;
        s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
        document.head.appendChild(s);
    }

    // Withdrawing consent removes the cookies Analytics already set.
    function clearAnalyticsCookies() {
        document.cookie.split(';').forEach(function (c) {
            var name = c.split('=')[0].trim();
            if (name.indexOf('_ga') !== 0) return;
            var host = location.hostname.replace(/^www\./, '');
            ['', '; domain=' + host, '; domain=.' + host].forEach(function (d) {
                document.cookie = name + '=; Max-Age=0; path=/' + d;
            });
        });
    }

    function hideBanner() {
        var b = document.getElementById('consent-banner');
        if (b) b.remove();
    }

    function choose(accepted) {
        var wasAccepted = getChoice() === 'granted';
        setChoice(accepted ? 'granted' : 'denied');
        hideBanner();
        if (accepted) {
            loadAnalytics();
        } else if (wasAccepted) {
            clearAnalyticsCookies();
            location.reload(); // unloads the Analytics script already running
        }
    }

    function showBanner() {
        if (document.getElementById('consent-banner')) return;
        var b = document.createElement('div');
        b.id = 'consent-banner';
        b.setAttribute('role', 'dialog');
        b.setAttribute('aria-label', 'Cookie consent');
        b.innerHTML =
            '<p>We use Google Analytics cookies to count visits to this website. The Pocket Pass Manager app ' +
            'itself collects no data. <a href="privacy.html#website">Privacy Policy</a></p>' +
            '<div class="consent-buttons">' +
            '<button type="button" data-consent="denied">Decline</button>' +
            '<button type="button" data-consent="granted">Accept</button>' +
            '</div>';
        b.addEventListener('click', function (e) {
            var v = e.target.getAttribute('data-consent');
            if (v) choose(v === 'granted');
        });
        document.body.appendChild(b);
    }

    // Footer "Cookie settings" links to /#cookie-settings, so it also works from the other pages.
    document.addEventListener('click', function (e) {
        var a = e.target.closest && e.target.closest('a[href$="#cookie-settings"]');
        if (!a) return;
        e.preventDefault();
        showBanner();
    });

    var choice = getChoice();
    if (choice === 'granted') loadAnalytics();
    if (choice === 'denied') clearAnalyticsCookies(); // GA can rewrite a cookie while the page unloads
    if (!choice || location.hash === '#cookie-settings') document.addEventListener('DOMContentLoaded', showBanner);
})();
