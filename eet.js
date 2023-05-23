
(function() {
    function fireEetEvent(event) {
        if (event !== undefined) {
            try {
                event = JSON.parse(event);
            } catch (e) {
                // ignore, use element as it is
            }
            window.dataLayer = window.dataLayer || [];
            if (event.length === undefined) {
                event = [event];
            }
            var ecommerceCleared = false;
            for (e in event) {
                if (event[e].ecommerce !== undefined && !ecommerceCleared) {
                    window.dataLayer.push({ecommerce: null});
                    ecommerceCleared = true;
                }
                window.dataLayer.push(event[e]);
            }
        }
    }

    function setupViewportIntersectionEvent() {
        const intersetionElements = document.querySelectorAll('[data-eet-intersection]');

        observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.intersectionRatio > 0 && !entry.target.classList.contains('intersection-viewed')) {
                    entry.target.classList.add('intersection-viewed');
                    fireEetEvent(entry.target.dataset.eetIntersection);
                }
            });
        });
        intersetionElements.forEach(image => {
            observer.observe(image);
        });
    }

    function setupClickEvent() {
        const clickElements = document.querySelectorAll('[data-eet-click]');
        clickElements.forEach(element => {
            element.addEventListener('click', function() {
                fireEetEvent(element.dataset.eetClick);
            });
        });
    }

    function setupPageViewEvent() {
        const pageViewElements = document.querySelectorAll('[data-eet-pageview]');
        pageViewElements.forEach(element => {
            fireEetEvent(element.dataset.eetPageview);
        });
    }

    if (document.readyState !== 'loading') {
        setupPageViewEvent();
        setupViewportIntersectionEvent();
        setupClickEvent();
    } else {
        document.addEventListener('DOMContentLoaded', function () {
            setupPageViewEvent();
            setupViewportIntersectionEvent();
            setupClickEvent();
        });
    }

})();