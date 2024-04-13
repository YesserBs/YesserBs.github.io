function effectuerInscription() {
    api = "https://yesser.pythonanywhere.com/inscription"
    let nom = document.getElementById("nom").value;
    let prenom = document.getElementById("prenom").value;
    let tel = document.getElementById("tel").value;
    let email = document.getElementById("email").value;
    let mdp = document.getElementById("mdp").value;

    let nouveau_utilisateur = {
        nom: nom,
        prenom: prenom,
        tel: tel,
        email: email,
        mdp: mdp
    };

    // Effectuer une requête POST vers l'API pour ajouter l'utilisateur
    fetch(api, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nouveau_utilisateur)
    })
    .then(response => {
        if (response.status === 201) {
            console.log("OK");
        } else {
            console.log(`Cet email est déjà utilisé ${response.status}`);
        }
    })
    .catch(error => console.error('Erreur lors de la requête:', error));
}
