// Store all gallery images
const images = document.querySelectorAll(".gallery-item img");

const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightbox-img");

let currentIndex = 0;


// Open Lightbox
function openLightbox(index) {

    currentIndex = index;

    lightboxImage.src = images[currentIndex].src;

    lightbox.classList.add("show");

}


// Close Lightbox
function closeLightbox() {

    lightbox.classList.remove("show");

}


// Change Image
function changeImage(direction) {

    currentIndex += direction;

    // If reached last image
    if (currentIndex >= images.length) {
        currentIndex = 0;
    }

    // If reached first image
    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    }

    lightboxImage.src = images[currentIndex].src;

}


// Keyboard Navigation
document.addEventListener("keydown", function(event) {

    if (!lightbox.classList.contains("show")) {
        return;
    }

    if (event.key === "ArrowRight") {
        changeImage(1);
    }

    if (event.key === "ArrowLeft") {
        changeImage(-1);
    }

    if (event.key === "Escape") {
        closeLightbox();
    }

});


// Close lightbox when clicking outside image
lightbox.addEventListener("click", function(event) {

    if (event.target === lightbox) {
        closeLightbox();
    }

});


// Category Filtering

const filterButtons = document.querySelectorAll(".filter-btn");

const galleryItems = document.querySelectorAll(".gallery-item");


filterButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        // Remove active class
        filterButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        // Add active class
        button.classList.add("active");

        const filter = button.dataset.filter;

        galleryItems.forEach(function(item) {

            const category = item.dataset.category;

            if (filter === "all" || category === filter) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }

        });

    });

});