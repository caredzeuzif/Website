document.addEventListener('DOMContentLoaded', function() {

    // --- Hero Slider Functionality ---
    const slides = document.querySelectorAll('.hero-slider .slide');
    const sliderDotsContainer = document.querySelector('.slider-dots');
    let currentSlide = 0;
    let slideInterval;

    function createDots() {
        slides.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                clearInterval(slideInterval); // Stop auto-slide on manual navigation
                goToSlide(index);
                startAutoSlide(); // Resume auto-slide
            });
            sliderDotsContainer.appendChild(dot);
        });
    }

    function goToSlide(n) {
        slides[currentSlide].classList.remove('active');
        sliderDotsContainer.children[currentSlide].classList.remove('active');

        currentSlide = (n + slides.length) % slides.length;

        slides[currentSlide].classList.add('active');
        sliderDotsContainer.children[currentSlide].classList.add('active');
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    // Initialize slider
    if (slides.length > 0) {
        slides[0].classList.add('active'); // Ensure first slide is active initially
        createDots();
        startAutoSlide();
    }


    // --- Hamburger Menu Toggle ---
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const mainNav = document.getElementById('mainNav');
    const navLinks = document.querySelector('.main-nav .nav-links');

    if (hamburgerMenu && navLinks) {
        hamburgerMenu.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburgerMenu.classList.toggle('open'); // Optional: for animating hamburger icon
        });

        // Close nav when a link is clicked (for single-page navigation or if desired)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) { // Only close on mobile
                    navLinks.classList.remove('active');
                    hamburgerMenu.classList.remove('open');
                }
            });
        });

        // Close dropdowns if they are open on larger screens
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navLinks.classList.remove('active');
                hamburgerMenu.classList.remove('open');
                document.querySelectorAll('.dropdown-content').forEach(content => {
                    content.style.display = ''; // Reset display style
                });
            }
        });
    }


    // --- Newsletter Form Submission (Client-Side Example) ---
    const newsletterForms = document.querySelectorAll('.newsletter-form, .newsletter-form-footer');

    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent actual form submission

            const emailInput = form.querySelector('input[type="email"]');
            if (emailInput.value && emailInput.checkValidity()) {
                alert(`Thank you for subscribing, ${emailInput.value}! Welcome to the Kenzeuz Tribe!`);
                emailInput.value = ''; // Clear the input
                // In a real application, you would send this email to your backend/email marketing service
                // e.g., using fetch API:
                /*
                fetch('/subscribe-newsletter', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({ email: emailInput.value })
                })
                .then(response => response.json())
                .then(data => console.log('Subscription response:', data))
                .catch(error => console.error('Subscription error:', error));
                */
            } else {
                alert("Please enter a valid email address to subscribe.");
            }
        });
    });

    // --- Simple Add to Cart Notification (Client-Side Example) ---
    // This is purely for demonstration; real cart logic requires a backend.
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn-small');
    const cartCountElement = document.querySelector('.cart-count');
    let currentCartCount = parseInt(cartCountElement.innerText);

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            currentCartCount++;
            cartCountElement.innerText = currentCartCount;
            alert('Item added to cart!'); // A simple pop-up, not ideal for UX
            // A better UX would be a small temporary notification or a slide-in mini-cart.
        });
    });

});
