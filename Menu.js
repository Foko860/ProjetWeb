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

    // productCards.forEach(card => {
    //     const productName = card.querySelector('h3').textContent.toLowerCase();
    //     if (productName.includes(searchText)) {
    //         card.style.display = 'block';
    //     } else {
    //         card.style.display = 'none';
    //     }
    // });
    // Ajouter un événement de clic sur chaque carte produit et son image
productCards.forEach(card => {
    const image = card.querySelector('img'); // Sélectionner l'image dans la carte
    const clickableArea = card; // Ou `image` si tu veux que seule l'image soit cliquable
    
    clickableArea.addEventListener('click', () => openPopup(card));
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
    console.log('Popup ouverte pour le produit:', card);
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

// Fonction pour ajouter un produit au panier
function addToCart() {
    if (selectedProduct) {
        const cartItem = document.createElement('li');
        cartItem.textContent = `${selectedProduct.name} - ${selectedProduct.price}`;
        cartList.appendChild(cartItem);
    }
    closePopup(); // Fermer la pop-up après ajout au panier
}

// Ajouter les événements aux boutons de la pop-up
addToCartBtn.addEventListener('click', addToCart);
cancelBtn.addEventListener('click', closePopup);

// Ajouter un événement de clic sur chaque carte produit pour ouvrir la fenêtre pop-up
productCards.forEach(card => {
    card.addEventListener('click', () => openPopup(card));
});

// Event listeners pour les filtres
searchInput.addEventListener('input', filterBySearch);
categoryFilters.plats.addEventListener('change', filterByCategory);
categoryFilters.complements.addEventListener('change', filterByCategory);
categoryFilters.boissons.addEventListener('change', filterByCategory);
categoryFilters.supplements.addEventListener('change', filterByCategory);
priceFilter.addEventListener('input', filterByPrice);

// Initialiser les filtres au chargement de la page
filterBySearch();
filterByCategory();
filterByPrice();
