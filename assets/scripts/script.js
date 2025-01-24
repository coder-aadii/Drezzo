// Infinite Scroll Example (using jQuery)
$(window).on('scroll', function () {
    if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
        // Trigger load more products if user reaches bottom of the page
        loadMoreProducts();
    }
});

function loadMoreProducts() {
    // AJAX request to fetch more products
    $.ajax({
        url: "path/to/api/products",  // Replace with the actual API endpoint or data URL
        method: "GET",
        success: function (data) {
            // Add the new products to the page dynamically
            $('#product-grid').append(data); // Assuming you append the new product HTML to the grid
        },
        error: function () {
            console.log("Error loading more products.");
        }
    });
}

// Floating Filter Toggle (Show/Hide)
document.getElementById('open-filters').addEventListener('click', function () {
    document.getElementById('floating-filters').classList.remove('hidden');  // Show the filters panel
});

document.getElementById('close-filters').addEventListener('click', function () {
    document.getElementById('floating-filters').classList.add('hidden');  // Hide the filters panel
});

// Fetch the products from product.json located in the root directory
fetch('/product.json')  // Update to point to the root directory
    .then(response => response.json())
    .then(products => {
        // Select the product grid container
        const productGridContainer = document.getElementById('product-grid-container');

        // Loop through the products and create HTML for each product
        products.forEach(product => {
            // Generate a string for size options
            const sizeOptions = product.size_options.join(", ");
            // Generate a string for color options
            const colorOptions = product.color_options.join(", ");

            const productCard = `
                    <div class="col-md-4">
                        <div class="product-card">
                            <a href="/pages/product-detail.html?id=${product.id}" class="product-link">
                                <div class="product-img">
                                    <img src="${product.image_url}" alt="${product.name}">
                                    <div class="product-hover">
                                        <button class="btn-add-to-cart">Add to Cart</button>
                                        <button class="btn-quick-view">Quick View</button>
                                    </div>
                                </div>
                                <div class="product-info">
                                    <h5 class="product-name">${product.name}</h5>
                                    <p class="product-category">${product.category}</p>
                                    <p class="product-price">₹${product.price}</p>
                                    <p class="product-description">${product.description}</p>
                                    <p class="product-size">Sizes: ${sizeOptions}</p>
                                    <p class="product-colors">Available Colors: ${colorOptions}</p>
                                    <p class="product-availability">${product.availability}</p>
                                    <p class="product-delivery">${product.delivery_info}</p>
                                </div>
                            </a>
                        </div>
                    </div>
                `;

            // Append the product card to the grid
            productGridContainer.innerHTML += productCard;
        });
    })
    .catch(error => {
        console.error('Error fetching the product data:', error);
    });
