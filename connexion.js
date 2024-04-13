function verifierConnexion() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    
    // Créer un objet JSON avec les données
    var data = {
        email: email,
        mdp: password
    };
    
    // Envoyer la requête POST à l'endpoint
    fetch('https://yesser.pythonanywhere.com/connexion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            // Si la réponse n'est pas OK, afficher un message d'erreur
            throw new Error('Erreur lors de la requête: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        // Vérifier si la réponse contient un message d'erreur
        if (data.hasOwnProperty('message')) {
            // Afficher le message d'erreur
            console.error('Erreur de connexion:', data.message);
            // Afficher le message d'erreur à l'utilisateur
            document.getElementById("messageErreur").innerText = data.message;
        } else {
            // Traiter la réponse JSON reçue si les informations sont valides
            console.log(data); // Faites quelque chose avec les données de l'utilisateur
            localStorage.setItem('userId', data.id);
            localStorage.setItem('userName', data.nom);
            window.location.href = "main.html";
        }
    })
    .catch(error => {
        // Gérer les erreurs lors de l'envoi de la requête
        console.error('Erreur lors de la requête:', error);
        //document.getElementById("messageErreur").innerText = "Erreur lors de la connexion. Veuillez réessayer.";
        document.getElementById("messageErreur").innerText = "Erreur lors de la connexion. Veuillez réessayer.";
    });
}
