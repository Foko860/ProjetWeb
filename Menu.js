// Fichier: Menu.js

// Variables pour stocker les éléments du DOM
const searchInput = document.querySelector('.search-box input');
const categoryFilters = {
    plats: document.getElementById('plats-dropdown'),
    complements: document.getElementById('complements-dropdown'),
    boissons: document.getElementById('boissons-dropdown'),
    supplements: document.getElementById('supplements-dropdown')
};
const priceFilter = document.querySelector('.price-filter input');
const productCards = document.querySelectorAll('.product-card');

// Variables pour la fenêtre pop-up
const popup = document.getElementById('popup');
const popupProductName = document.getElementById('popup-product-name');
const popupProductPrice = document.getElementById('popup-product-price');
const addToCartBtn = document.getElementById('add-to-cart-btn');
const cancelBtn = document.getElementById('cancel-btn');
const cartList = document.getElementById('cart-list');

let selectedProduct = null; // Variable pour stocker le produit sélectionné

// Fonction pour filtrer les produits par nom (recherche)
function filterBySearch() {
    const searchText = searchInput.value.toLowerCase();

    productCards.forEach(card => {
        const productName = card.querySelector('h3').textContent.toLowerCase();
        if (productName.includes(searchText)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Fonction pour filtrer les produits par catégorie
function filterByCategory() {
    const selectedPlats = categoryFilters.plats.value;
    const selectedComplements = categoryFilters.complements.value;
    const selectedBoissons = categoryFilters.boissons.value;
    const selectedSupplements = categoryFilters.supplements.value;

    productCards.forEach(card => {
        const productName = card.querySelector('h3').textContent.toLowerCase();
        const shouldDisplay =
            (selectedPlats === '' || productName.includes(selectedPlats)) &&
            (selectedComplements === '' || productName.includes(selectedComplements)) &&
            (selectedBoissons === '' || productName.includes(selectedBoissons)) &&
            (selectedSupplements === '' || productName.includes(selectedSupplements));

        card.style.display = shouldDisplay ? 'block' : 'none';
    });
}

// Fonction pour filtrer les produits par prix
function filterByPrice() {
    const maxPrice = parseInt(priceFilter.value);

    productCards.forEach(card => {
        const priceText = card.querySelector('p').textContent;
        const productPrice = parseInt(priceText.replace(' XAF', ''));

        if (productPrice <= maxPrice) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Fonction pour ouvrir la fenêtre pop-up
function openPopup(productCard) {
    const productName = productCard.querySelector('h3').textContent;
    const productPrice = productCard.querySelector('p').textContent;

    selectedProduct = {
        name: productName,
        price: productPrice
    };

    popupProductName.textContent = productName;
    popupProductPrice.textContent = productPrice;
    popup.style.display = 'flex'; // Afficher la pop-up
}

// Fonction pour fermer la fenêtre pop-up
function closePopup() {
    popup.style.display = 'none';
    selectedProduct = null; // Réinitialiser le produit sélectionné
}

document.addEventListener('DOMContentLoaded', function () {
    const productCards = document.querySelectorAll('.product-card');

    // Ajouter le produit au panier
    function addToCart() {
        if (selectedProduct) {
            const cartItem = document.createElement('li');
            cartItem.textContent = `${selectedProduct.name} - ${selectedProduct.price}`;
            cartList.appendChild(cartItem);
            closePopup(); // Fermer la pop-up après l'ajout au panier
        }
    }

    // Ajouter l'événement au bouton "Ajouter au panier" pour ajouter le produit sélectionné
    addToCartBtn.addEventListener('click', addToCart);

    // Ajouter l'événement au bouton "Annuler" pour fermer la pop-up
    cancelBtn.addEventListener('click', closePopup);
});

// Variables pour le panier
let cart = [];

// Sélection des éléments HTML
const cartIcon = document.getElementById('cart-icon');
const cartContainer = document.getElementById('cart-container');
const cartItems = document.getElementById('cart-items');
const validateCartButton = document.getElementById('validate-cart');

// Fonction pour ajouter un produit au panier
function addToCart(productName, productPrice, quantity) {
    const existingCartItem = cart.find(item => item.name === productName);

    if (existingCartItem) {
        existingCartItem.quantity += quantity; // Mettre à jour la quantité si l'article existe déjà
    } else {
        cart.push({ name: productName, price: productPrice, quantity: quantity });
    }

    displayCartItems();
}

// Fonction pour afficher les éléments du panier
function displayCartItems() {
    cartItems.innerHTML = ''; // Vider la liste du panier

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${item.name} - ${item.quantity} x ${item.price} 
        <button onclick="removeFromCart(${index})">Retirer</button>`;
        cartItems.appendChild(li);
    });

    cartContainer.style.display = 'block'; // Afficher le panier
}

// Fonction pour retirer un produit du panier
function removeFromCart(index) {
    cart.splice(index, 1);
    displayCartItems();
}

// Gérer l'affichage du panier au clic sur l'icône
cartIcon.addEventListener('click', () => {
    cartContainer.style.display = cartContainer.style.display === 'block' ? 'none' : 'block';
});

// Gérer la validation du panier
validateCartButton.addEventListener('click', () => {
    if (cart.length > 0) {
        alert('Commande validée !');
        cart = []; // Vider le panier après validation
        displayCartItems();
    } else {
        alert('Votre panier est vide.');
    }
});

// Ajout d'une icône pour fermer le panier
const closeCartIcon = document.createElement('span');
closeCartIcon.innerHTML = '&times;';  // Symbole "X" pour fermer
closeCartIcon.classList.add('close-cart');
cartContainer.prepend(closeCartIcon);  // Ajouter l'icône de fermeture en haut du panier

// Fermer le panier au clic sur l'icône de fermeture
closeCartIcon.addEventListener('click', () => {
    cartContainer.style.display = 'none';
});

// Gestion des filtres
searchInput.addEventListener('input', filterBySearch);
categoryFilters.plats.addEventListener('change', filterByCategory);
categoryFilters.complements.addEventListener('change', filterByCategory);
categoryFilters.boissons.addEventListener('change', filterByCategory);
categoryFilters.supplements.addEventListener('change', filterByCategory);
priceFilter.addEventListener('input', filterByPrice);

// Sélecteurs de quantité (incrémentation/décrémentation)
document.addEventListener('DOMContentLoaded', function() {
    const incrementButtons = document.querySelectorAll('.increment-btn');
    const decrementButtons = document.querySelectorAll('.decrement-btn');

    // Incrémenter
    incrementButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentNode.querySelector('.quantity-input');
            let currentValue = parseInt(input.value);
            input.value = currentValue + 1;
        });
    });

    // Décrémenter
    decrementButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentNode.querySelector('.quantity-input');
            let currentValue = parseInt(input.value);
            if (currentValue > 1) {
                input.value = currentValue - 1;
            }
        });
    });

    // Ajouter au panier avec la quantité sélectionnée
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').innerText;
            const productPrice = productCard.querySelector('p').innerText;
            const quantity = parseInt(productCard.querySelector('.quantity-input').value);

            addToCart(productName, productPrice, quantity); // Ajouter au panier avec quantité
        });
    });
});

// Initialiser les filtres au chargement de la page
filterBySearch();
filterByCategory();
filterByPrice();
