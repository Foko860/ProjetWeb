document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('message');

    // Validation simple
    if (!email || !password) {
        message.textContent = 'Veuillez remplir tous les champs.';
        message.style.color = 'red';
        return;
    }

     // Validation de l'email avec la regex simplifiée
     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
     if (!emailRegex.test(email)) {
         message.textContent = 'Veuillez entrer un email valide.';
         message.style.color = 'red';
         return;
     }

    // Simulation d'une connexion réussie
    if (email === 'user@example.com' && password === 'password') {
        message.textContent = 'Connexion réussie !';
        message.style.color = 'green';
        // Redirection ou autre action...
    } else {
        message.textContent = 'Email ou mot de passe incorrect.';
        message.style.color = 'red';
    }
});