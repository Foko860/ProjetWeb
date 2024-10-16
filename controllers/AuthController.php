// AuthController.php

require_once 'models/User.php';
require_once 'utils/Hashing.php';  // Pour le hachage et cryptage du mot de passe

class AuthController {
    
    public function login() {
        $email = $_POST['email'];
        $password = $_POST['password'];
        
        // Valide les données
        if (empty($email) || empty($password)) {
            echo json_encode(['message' => 'Tous les champs sont obligatoires.']);
            http_response_code(400);  // Bad Request
            return;
        }

        // Recherche l'utilisateur dans la base de données
        $user = User::findByEmail($email);
        if ($user && Hashing::verifyPassword($password, $user['mot_de_passe'])) {
            // Connexion réussie
            echo json_encode(['message' => 'Connexion réussie', 'user' => $user]);
        } else {
            echo json_encode(['message' => 'Email ou mot de passe incorrect']);
            http_response_code(401);  // Unauthorized
        }
    }

    public function register() {
        $nom = $_POST['nom'];
        $email = $_POST['email'];
        $password = $_POST['password'];
        $numero = $_POST['numero'];
        $id_parrain = $_POST['id_parrain'];  // Optionnel

        // Valide les données
        if (empty($nom) || empty($email) || empty($password) || empty($numero)) {
            echo json_encode(['message' => 'Tous les champs sont obligatoires.']);
            http_response_code(400);
            return;
        }

        // Vérifie si l'email existe déjà
        if (User::findByEmail($email)) {
            echo json_encode(['message' => 'Cet email est déjà utilisé.']);
            http_response_code(409);  // Conflict
            return;
        }

        // Hachage du mot de passe
        $hashedPassword = Hashing::hashPassword($password);

        // Création de l'utilisateur
        $user = new User();
        $user->nom = $nom;
        $user->email = $email;
        $user->mot_de_passe = $hashedPassword;
        $user->numero = $numero;
        $user->id_parrain = $id_parrain;
        $user->role = 'Etudiant';  // Rôle par défaut
        $user->status = 'Active';
        $user->points_de_fidelites = 0;  // Valeur par défaut

        // Sauvegarde dans la base de données
        if ($user->save()) {
            echo json_encode(['message' => 'Inscription réussie !']);
            http_response_code(201);  // Created
        } else {
            echo json_encode(['message' => 'Erreur lors de l\'inscription.']);
            http_response_code(500);  // Internal Server Error
        }
    }
}
