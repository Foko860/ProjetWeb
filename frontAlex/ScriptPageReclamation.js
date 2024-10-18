let table = document.getElementById("reclamationsTable").getElementsByTagName('tbody')[0];

function addReclamation() {
    let orderId = document.getElementById("orderId").value;
    let name = document.getElementById("name").value;
    let reclamation = document.getElementById("reclamation").value;
    let statut = document.getElementById("statut").value;

    let newRow = table.insertRow();

    newRow.insertCell(0).innerText = orderId;
    newRow.insertCell(1).innerText = name;
    newRow.insertCell(2).innerText = reclamation;
    newRow.insertCell(3).innerText = statut;

    // Ajouter les boutons de modification et de suppression
    let actionsCell = newRow.insertCell(4);
    actionsCell.innerHTML = `<button onclick="editReclamation(this)">Modifier</button>
                             <button onclick="deleteReclamation(this)">Supprimer</button>`;

    // Réinitialiser le formulaire
    document.getElementById("addReclamationForm").reset();
}

function editReclamation(button) {
    let row = button.parentNode.parentNode;
    document.getElementById("orderId").value = row.cells[0].innerText;
    document.getElementById("name").value = row.cells[1].innerText;
    document.getElementById("reclamation").value = row.cells[2].innerText;
    document.getElementById("statut").value = row.cells[3].innerText;

    // Supprimer la ligne existante pour la réinsérer avec les nouvelles valeurs
    deleteReclamation(button);
}

function deleteReclamation(button) {
    let row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}