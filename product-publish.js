
function effectuerPublication() {
    api = "https://yesser.pythonanywhere.com/produit";

    const nom = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const image = document.getElementById("image").value;
    const prix = parseFloat(document.getElementById("price").value);
    const id_utilisateur = localStorage.getItem('userId');
    alert(id_utilisateur);

    const nouveau_produit = {
        nom: nom,
        description: description,
        image: image,
        prix: prix,
        id_utilisateur: id_utilisateur
    };

    // Effectuer une requête POST vers l'API pour ajouter le produit
    fetch(api, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nouveau_produit)
    })
    .then(response => {
        if (response.status === 201) {
            console.log("OK");
        } else {
            console.log(`Erreur lors de l'ajout du produit: ${response.status}`);
        }
    })
    .catch(error => console.error('Erreur lors de la requête:', error));
}
