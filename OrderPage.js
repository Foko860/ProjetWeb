// Fonction pour supprimer une commande
function deleteOrder(event) {
    const row = event.target.closest('tr');
    const itemName = row.cells[0].innerText;

    // Afficher un message de confirmation avant suppression
    const confirmation = confirm(`Êtes-vous sûr de vouloir supprimer la commande pour: ${itemName} ?`);
    
    if (confirmation) {
        row.remove(); // Supprimer la ligne du tableau
        showToast(`La commande pour ${itemName} a été supprimée.`);
    }
}

// Fonction pour éditer une commande
function editOrder(event) {
    const row = event.target.closest('tr');
    const itemName = row.cells[0].innerText;
    const quantity = row.cells[3].innerText;

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
            <td><button class="btn btn-sm btn-outline-secondary edit-btn"><i class="bi bi-pencil"></i></button>
            <button class=" btn-sm btn-outline-secondary delete-btn"><i class="bi bi-trash"></i></button>
            </td>
            
        `;
        table.appendChild(newRow);

        // Ajouter l'événement d'édition à la nouvelle commande
        newRow.querySelector('.edit-btn').addEventListener('click', editOrder);
        newRow.querySelector('.delete-btn').addEventListener('click', deleteOrder);

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

// Fonction pour afficher les options de modification
function showModificationOptions(event) {
    const row = event.target.closest('tr');
    const itemName = row.cells[0].innerText;
    const itemDescription = row.cells[1].innerText;
    const itemPrice = row.cells[2].innerText;
    const itemQuantity = row.cells[3].innerText;

    // Création de la fenêtre pop-up avec des options de modification
    const popup = document.createElement('div');
    popup.classList.add('popup');
    
    popup.innerHTML = `
        <div class="popup-content">
            <h3>Modifier l'élément: ${itemName}</h3>
            <label for="newPrice">Nouveau prix:</label>
            <input type="text" id="newPrice" value="${itemPrice.replace(' XAF', '')}">

            <label for="newQuantity">Nouvelle quantité:</label>
            <input type="number" id="newQuantity" value="${itemQuantity}">

            <label for="newDescription">Nouvelle description:</label>
            <input type="text" id="newDescription" value="${itemDescription}">


            <button id="saveChangesBtn">Sauvegarder</button>
            <button id="cancelChangesBtn">Annuler</button>
        </div>
    `;

    // Ajout du popup au body
    document.body.appendChild(popup);

    // Fonction pour sauvegarder les modifications
    document.getElementById('saveChangesBtn').addEventListener('click', function() {
        const newPrice = document.getElementById('newPrice').value;
        const newQuantity = document.getElementById('newQuantity').value;
        const newDescription = document.getElementById('newDescription').value;

        // Mise à jour des cellules avec les nouvelles valeurs
        row.cells[2].innerText = `${newPrice} XAF`;
        row.cells[3].innerText = newQuantity;
        row.cells[1].innerText = newDescription;

        // Message de succès
        showToast("Modification réussie !");
        document.body.removeChild(popup); // Fermer la fenêtre pop-up après modification
    });

    // Annuler les modifications
    document.getElementById('cancelChangesBtn').addEventListener('click', function() {
        document.body.removeChild(popup); // Fermer la fenêtre pop-up sans modifier
    });
}

// Ajouter l'événement de clic aux boutons de modification (icône crayon)et de suppression
document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', showModificationOptions);
});
document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', deleteOrder);
});



// Ajouter l'événement d'écoute sur le champ de recherche
document.getElementById('searchInput').addEventListener('input', searchOrders);

// Ajouter des événements aux boutons d'édition existants
document.querySelectorAll('.edit-btn').forEach(button => {
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

