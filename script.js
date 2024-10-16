// script.js

document.addEventListener("DOMContentLoaded", () => {
    /* ----- Existing Module Hover Functionality ----- */
    const modules = document.querySelectorAll(".hero .module");

    // Define descriptions for each module
    const descriptions = [
        "Gather and Analyse Requirements",
        "Design System Architecture and Select Application Type",
        "Design User Experience and Conduct Usability Testing",
        "Integrate and Adapt Application System",
        "Optimise performance, scalability, security and privacy",
        "Plan for maintenance and evolution",
        "Address ethical considerations",
        "Research and apply emerging technologies",
        "Maintenance and updates"
    ];

    modules.forEach((module, index) => {
        let descriptionElement;
        let hoverTimeout;

        // Mouse enter event for the module
        module.addEventListener("mouseenter", () => {
            // Clear any pending timeout to prevent premature hiding
            clearTimeout(hoverTimeout);

            // Apply hover styles
            module.style.transition = "transform 0.3s ease, background-color 0.5s ease, color 0.5s ease";
            module.style.transform = "translate(-50%, -50%) translateY(10px)";
            module.style.backgroundColor = "white";
            module.style.color = "grey";

            // Create and append description element if it doesn't exist
            if (!descriptionElement) {
                descriptionElement = document.createElement("div");
                descriptionElement.className = "module-description";
                descriptionElement.textContent = descriptions[index];

                // Apply initial styles
                descriptionElement.style.position = "absolute";
                descriptionElement.style.top = "100%";
                descriptionElement.style.left = "50%";
                descriptionElement.style.transform = "translateX(-50%) translateY(40px)"; // Start further down
                descriptionElement.style.padding = "8px";
                descriptionElement.style.backgroundColor = "#fff";
                descriptionElement.style.color = "#333";
                descriptionElement.style.borderRadius = "5px";
                descriptionElement.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
                descriptionElement.style.opacity = "0";
                descriptionElement.style.visibility = "hidden";
                descriptionElement.style.transition = "opacity 0.4s ease, visibility 0.4s ease, transform 0.4s ease";
                descriptionElement.style.whiteSpace = "nowrap"; // Prevent text wrapping

                // Append to module
                module.appendChild(descriptionElement);
            }

            // Show description with animation
            setTimeout(() => {
                if (descriptionElement) {
                    descriptionElement.style.opacity = "1";
                    descriptionElement.style.visibility = "visible";
                    descriptionElement.style.transform = "translateX(-50%) translateY(10px)"; // Slide up to final position
                }
            }, 50); // Slight delay to trigger CSS transition
        });

        // Mouse leave event for the module
        const hideDescription = () => {
            clearTimeout(hoverTimeout); // Clear any pending hide

            // Schedule hiding the description
            hoverTimeout = setTimeout(() => {
                if (descriptionElement) {
                    // Revert hover styles
                    module.style.transform = "translate(-50%, -50%)";
                    module.style.backgroundColor = "";
                    module.style.color = "grey";

                    // Hide description with animation
                    descriptionElement.style.opacity = "0";
                    descriptionElement.style.visibility = "hidden";
                    descriptionElement.style.transform = "translateX(-50%) translateY(40px)"; // Move back down

                    // Remove description after transition
                    setTimeout(() => {
                        if (descriptionElement && descriptionElement.parentElement) {
                            module.removeChild(descriptionElement);
                            descriptionElement = null; // Clean up
                        }
                    }, 400); // Match with CSS transition duration
                }
            }, 100); // Delay to allow for smoother transition
        };

        // Attach mouseleave to the module
        module.addEventListener("mouseleave", hideDescription);
    });

    /* ----- Existing Slider Button Functionality ----- */
    const sliderButton = document.getElementById('slider-button');
    const pageContainer = document.querySelector('.page-container');
    const sliderIcon = sliderButton.querySelector('i'); // Select the icon inside the button (if using Font Awesome)

    // Define possible slide states
    const slideStates = ['main', 'new', 'third'];
    let currentStateIndex = 0; // Starts at 'main'

    // Function to update the slide state
    function updateSlideState(newIndex) {
        currentStateIndex = newIndex;

        // Remove all slide state classes
        pageContainer.classList.remove('slide-left', 'slide-middle', 'slide-right');

        // Determine new class based on the new index
        switch (slideStates[currentStateIndex]) {
            case 'main':
                pageContainer.classList.add('slide-right');
                break;
            case 'new':
                pageContainer.classList.add('slide-left');
                break;
            case 'third':
                pageContainer.classList.add('slide-middle');
                break;
            default:
                pageContainer.classList.add('slide-right');
        }

        // Update slider button icon and position
        updateSliderButton();
    }

    // Function to update the slider button's icon and position
    function updateSliderButton() {
        const currentState = slideStates[currentStateIndex];

        switch (currentState) {
            case 'main':
                // Position at bottom right
                sliderButton.classList.remove('slider-button-left');
                sliderButton.classList.add('slider-button-right');
                // Set icon to right arrow
                if (sliderIcon) {
                    sliderIcon.classList.remove('fa-arrow-left', 'fa-arrow-up');
                    sliderIcon.classList.add('fa-arrow-right');
                } else {
                    sliderButton.innerHTML = '▶';
                }
                break;
            case 'new':
                // Position at bottom left
                sliderButton.classList.remove('slider-button-right');
                sliderButton.classList.add('slider-button-left');
                // Set icon to left arrow
                if (sliderIcon) {
                    sliderIcon.classList.remove('fa-arrow-right', 'fa-arrow-up');
                    sliderIcon.classList.add('fa-arrow-left');
                } else {
                    sliderButton.innerHTML = '◀';
                }
                break;
            case 'third':
                // Position at bottom left
                sliderButton.classList.remove('slider-button-right');
                sliderButton.classList.add('slider-button-left');
                // Set icon to up arrow (indicating further navigation or return)
                if (sliderIcon) {
                    sliderIcon.classList.remove('fa-arrow-right', 'fa-arrow-left');
                    sliderIcon.classList.add('fa-arrow-up');
                } else {
                    sliderButton.innerHTML = '▲';
                }
                break;
            default:
                // Default to bottom right with right arrow
                sliderButton.classList.remove('slider-button-left');
                sliderButton.classList.add('slider-button-right');
                if (sliderIcon) {
                    sliderIcon.classList.remove('fa-arrow-left', 'fa-arrow-up');
                    sliderIcon.classList.add('fa-arrow-right');
                } else {
                    sliderButton.innerHTML = '▶';
                }
        }

        // Save current state to localStorage
        localStorage.setItem('slideState', slideStates[currentStateIndex]);
    }

    // Toggle Slide Function
    function toggleSlide() {
        // Move to the next state
        currentStateIndex = (currentStateIndex + 1) % slideStates.length;
        updateSlideState(currentStateIndex);
    }

    // Event Listener for Slider Button
    if (sliderButton && pageContainer) {
        sliderButton.addEventListener('click', toggleSlide);
    } else {
        console.warn("Slider Button or Page Container not found in the DOM.");
    }

    // Load slide state from localStorage on page load
    const savedSlideState = localStorage.getItem('slideState');
    if (savedSlideState && slideStates.includes(savedSlideState)) {
        currentStateIndex = slideStates.indexOf(savedSlideState);
        updateSlideState(currentStateIndex);
    } else {
        updateSlideState(currentStateIndex); // Initialize to 'main'
    }

    // Update button icon and position on window resize
    window.addEventListener('resize', () => {
        updateSliderButton();
    });

    /* ----- Existing Fixed Navigation Buttons Functionality ----- */
    // Previous Button
    const prevButtonNav = document.querySelector('.fixed-nav .prev-button');
    // Next Button
    const nextButtonNav = document.querySelector('.fixed-nav .next-button');

    // Function to navigate to a specific slide state
    function navigateTo(state) {
        const index = slideStates.indexOf(state);
        if (index !== -1) {
            currentStateIndex = index;
            updateSlideState(currentStateIndex);
        }
    }

    // Event Listener for Previous Button
    if (prevButtonNav) {
        prevButtonNav.addEventListener('click', () => {
            // Navigate to the previous slide state
            let newIndex = currentStateIndex - 1;
            if (newIndex < 0) {
                newIndex = slideStates.length - 1; // Loop to last state
            }
            navigateTo(slideStates[newIndex]);
        });
    }

    // Event Listener for Next Button
    if (nextButtonNav) {
        nextButtonNav.addEventListener('click', () => {
            // Navigate to the next slide state
            let newIndex = currentStateIndex + 1;
            if (newIndex >= slideStates.length) {
                newIndex = 0; // Loop to first state
            }
            navigateTo(slideStates[newIndex]);
        });
    }

    /* ----- Carousel Functionality ----- */
    const carouselInner = document.querySelector('.carousel-inner');
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevCarouselBtn = document.querySelector('.carousel-control.prev');
    const nextCarouselBtn = document.querySelector('.carousel-control.next');
    const indicators = document.querySelectorAll('.carousel-indicators .indicator');
    const carouselDescription = document.getElementById('carousel-description');

    let currentCarouselIndex = 0;

    // Autoplay Settings
    const autoplayInterval = 8000; // 8 seconds
    let autoplayTimer;

    // Function to update carousel position and active states
    function updateCarousel() {
        carouselInner.style.transform = `translateX(-${currentCarouselIndex * 100}%)`;

        carouselItems.forEach((item, index) => {
            item.classList.toggle('active', index === currentCarouselIndex);
        });

        indicators.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentCarouselIndex);
        });

        // Update description
        const activeItem = carouselItems[currentCarouselIndex];
        const descriptionText = activeItem.getAttribute('data-description') || "No description available.";
        carouselDescription.textContent = descriptionText;
    }

    // Function to start autoplay
    function startAutoplay() {
        autoplayTimer = setInterval(() => {
            nextCarouselBtn.click();
        }, autoplayInterval);
    }

    // Function to stop autoplay
    function stopAutoplay() {
        clearInterval(autoplayTimer);
    }

    // Function to reset autoplay (stop and start)
    function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
    }

    // Event Listeners for Carousel Navigation Buttons
    if (prevCarouselBtn && nextCarouselBtn) {
        prevCarouselBtn.addEventListener('click', () => {
            currentCarouselIndex = (currentCarouselIndex === 0) ? carouselItems.length - 1 : currentCarouselIndex - 1;
            updateCarousel();
        });

        nextCarouselBtn.addEventListener('click', () => {
            currentCarouselIndex = (currentCarouselIndex === carouselItems.length - 1) ? 0 : currentCarouselIndex + 1;
            updateCarousel();
        });
    } else {
        console.warn("Carousel navigation buttons not found in the DOM.");
    }

    // Event Listeners for Carousel Items Click
    carouselItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentCarouselIndex = index;
            updateCarousel();
            resetAutoplay(); // Reset autoplay countdown on item click
        });
    });

    // Event Listeners for Indicators
    indicators.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentCarouselIndex = index;
            updateCarousel();
            resetAutoplay(); // Reset autoplay countdown on indicator click
        });
    });

    // Optional: Swipe Support for Carousel (Mobile Devices)
    let touchStartXCarousel = 0;
    let touchEndXCarousel = 0;

    const carouselContainer = document.querySelector('.carousel-container');

    carouselContainer.addEventListener('touchstart', (e) => {
        touchStartXCarousel = e.changedTouches[0].screenX;
    }, false);

    carouselContainer.addEventListener('touchend', (e) => {
        touchEndXCarousel = e.changedTouches[0].screenX;
        handleCarouselGesture();
    }, false);

    function handleCarouselGesture() {
        if (touchEndXCarousel < touchStartXCarousel - 50) {
            // Swipe Left
            nextCarouselBtn.click();
            resetAutoplay(); // Reset autoplay on swipe
        }
        if (touchEndXCarousel > touchStartXCarousel + 50) {
            // Swipe Right
            prevCarouselBtn.click();
            resetAutoplay(); // Reset autoplay on swipe
        }
    }

    // Initialize Carousel
    updateCarousel();
    startAutoplay();
});
