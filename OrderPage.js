// Fichier: OrderPage.js

// Fonction pour éditer une commande
function editOrder(event) {
    const row = event.target.closest('tr');
    const itemName = row.cells[0].innerText;
    const quantity = row.cells[3].innerText;
    
    // Afficher un prompt pour modifier la quantité
    const newQuantity = prompt(`Modifier la quantité pour: ${itemName}`, quantity);

    if (newQuantity != null) {
        row.cells[3].innerText = newQuantity;
        alert(`La quantité de ${itemName} a été modifiée à ${newQuantity}.`);
    }
}

// Fonction pour créer une nouvelle commande via la modale
function createOrder() {
    const itemName = document.getElementById('itemName').value;
    const itemDescription = document.getElementById('itemDescription').value || '/';
    const itemPrice = document.getElementById('itemPrice').value;
    const itemQuantity = document.getElementById('itemQuantity').value;

    if (itemName && itemPrice && itemQuantity) {
        const table = document.querySelector('tbody');
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${itemName}</td>
            <td>${itemDescription}</td>
            <td>${itemPrice} XAF</td>
            <td>${itemQuantity}</td>
            <td><button class="btn btn-sm btn-outline-secondary"><i class="bi bi-pencil"></i></button></td>
        `;
        table.appendChild(newRow);

        // Ajouter l'événement d'édition à la nouvelle commande
        newRow.querySelector('button').addEventListener('click', editOrder);

        // Réinitialiser le formulaire
        document.getElementById('createOrderForm').reset();

        // Fermer la modale après soumission
        const modal = bootstrap.Modal.getInstance(document.getElementById('createOrderModal'));
        modal.hide();

        // Afficher la notification de succès (Toast)
        showToast("Nouvelle commande ajoutée avec succès !");
    } else {
        showToast("Veuillez remplir tous les champs !");
    }
}

// Fonction pour gérer la pagination
function handlePagination(event) {
    event.preventDefault();
    alert(`Vous avez cliqué sur la page: ${event.target.innerText}`);
}

// Fonction pour afficher le toast
function showToast(message) {
    const toastElement = document.getElementById('orderToast');
    const toastBody = toastElement.querySelector('.toast-body');
    toastBody.textContent = message;

    const toast = new bootstrap.Toast(toastElement);
    toast.show();
}

// Fonction de recherche améliorée avec filtres
function searchOrders() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filterOption = document.querySelector('select').value; // Récupère l'option sélectionnée
    const tableRows = document.querySelectorAll('tbody tr');

    tableRows.forEach(row => {
        const itemName = row.cells[0].innerText.toLowerCase();
        const itemDescription = row.cells[1].innerText.toLowerCase();
        const itemPrice = row.cells[2].innerText.toLowerCase();
        const itemQuantity = row.cells[3].innerText.toLowerCase();

        let matchFound = false;

        // Appliquer le filtre en fonction de l'option sélectionnée
        if (filterOption === 'order-id' && itemName.includes(searchInput)) {
            matchFound = true;
        } else if (filterOption === 'status' && itemDescription.includes(searchInput)) {
            matchFound = true;
        } else if (searchInput === '') { // Afficher toutes les lignes si la recherche est vide
            matchFound = true;
        }

        row.style.display = matchFound ? '' : 'none';
    });
}

// Ajouter l'événement d'écoute sur le champ de recherche
document.getElementById('searchInput').addEventListener('input', searchOrders);

// Ajouter des événements aux boutons d'édition existants
document.querySelectorAll('.btn-outline-secondary').forEach(button => {
    button.addEventListener('click', editOrder);
});

// Ajouter un événement au bouton "Create order" pour ouvrir la modale
document.querySelector('.btn-warning').addEventListener('click', () => {
    const createOrderModal = new bootstrap.Modal(document.getElementById('createOrderModal'));
    createOrderModal.show();
});

// Ajouter un événement au bouton "Ajouter commande" pour soumettre le formulaire
document.getElementById('submitOrder').addEventListener('click', createOrder);

// Ajouter des événements de pagination
document.querySelectorAll('.page-link').forEach(pageLink => {
    pageLink.addEventListener('click', handlePagination);
});

// Ajouter un événement pour la recherche
document.getElementById('searchInput').addEventListener('input', searchOrders);
