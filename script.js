document.addEventListener('DOMContentLoaded', () => {
    // Hamburger Menu functionality
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const mainNav = document.getElementById('mainNav');
    const navLinks = document.querySelector('.main-nav .nav-links');

    hamburgerMenu.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        hamburgerMenu.classList.toggle('active');
        const isExpanded = hamburgerMenu.classList.contains('active');
        hamburgerMenu.setAttribute('aria-expanded', isExpanded);
        // Toggle body scroll to prevent scrolling when menu is open
        document.body.style.overflow = isExpanded ? 'hidden' : '';
    });

    // Close mobile menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                hamburgerMenu.classList.remove('active');
                hamburgerMenu.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    });

    // Dropdown functionality for "Shop" link (desktop and touch)
    const shopNavLink = document.getElementById('shopNavLink');
    const shopDropdown = document.getElementById('shopDropdown');

    shopNavLink.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default link behavior for parent
        // Toggle 'active' class on the parent li to show/hide dropdown
        shopNavLink.parentElement.classList.toggle('active');
        const isExpanded = shopNavLink.parentElement.classList.contains('active');
        shopNavLink.setAttribute('aria-expanded', isExpanded);
    });

    // Close dropdown if clicked outside
    document.addEventListener('click', (event) => {
        if (!shopNavLink.parentElement.contains(event.target) && !shopDropdown.contains(event.target)) {
            shopNavLink.parentElement.classList.remove('active');
            shopNavLink.setAttribute('aria-expanded', 'false');
        }
    });

    // Hero Slider functionality
    const heroSlider = document.getElementById('heroSlider');
    const slides = heroSlider.querySelectorAll('.slide');
    const sliderDotsContainer = document.querySelector('.slider-dots');
    let currentSlide = 0;
    let slideInterval;

    // Create slider dots
    slides.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.setAttribute('role', 'tab');
        dot.setAttribute('aria-controls', `slide${index + 1}`);
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dot.addEventListener('click', () => goToSlide(index));
        sliderDotsContainer.appendChild(dot);
    });

    const dots = sliderDotsContainer.querySelectorAll('.dot');

    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to the current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');

        // Update aria-label for current slide
        slides.forEach((slide, idx) => {
            if (idx === index) {
                slide.setAttribute('aria-label', `${idx + 1} of ${slides.length}`);
                slide.setAttribute('aria-hidden', 'false');
            } else {
                slide.setAttribute('aria-hidden', 'true');
            }
        });

        // Update aria-selected for dots
        dots.forEach((dot, idx) => {
            if (idx === index) {
                dot.setAttribute('aria-selected', 'true');
                dot.setAttribute('tabindex', '0'); // Make current dot focusable
            } else {
                dot.setAttribute('aria-selected', 'false');
                dot.setAttribute('tabindex', '-1'); // Make other dots unfocusable
            }
        });

        currentSlide = index;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function goToSlide(index) {
        clearInterval(slideInterval); // Clear interval on manual navigation
        showSlide(index);
        startSlider(); // Restart interval
    }

    function startSlider() {
        slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    showSlide(currentSlide); // Show initial slide
    startSlider(); // Start auto-play

    // Implement simple add to cart (for demonstration)
    const cartCount = document.querySelector('.cart-count');
    let itemCount = 0;

    document.querySelectorAll('.add-to-cart-btn-small').forEach(button => {
        button.addEventListener('click', () => {
            itemCount++;
            cartCount.textContent = itemCount;
            cartCount.setAttribute('aria-label', `Shopping Cart with ${itemCount} items`);
            alert('Item added to cart!'); // Simple confirmation
        });
    });

    // Basic form submission example for newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    const newsletterEmailInput = document.getElementById('newsletterEmail');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const email = newsletterEmailInput.value;
            if (email) {
                alert(`Thank you for subscribing, ${email}!`);
                newsletterEmailInput.value = ''; // Clear the input
            }
        });
    }

    const newsletterFormFooter = document.querySelector('.newsletter-form-footer');
    const newsletterEmailFooterInput = document.getElementById('newsletterEmailFooter');

    if (newsletterFormFooter) {
        newsletterFormFooter.addEventListener('submit', (event) => {
            event.preventDefault();
            const email = newsletterEmailFooterInput.value;
            if (email) {
                alert(`Thank you for subscribing, ${email}!`);
                newsletterEmailFooterInput.value = ''; // Clear the input
            }
        });
    }
});
