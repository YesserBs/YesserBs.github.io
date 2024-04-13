async function afficherPublisher(idProduit) {
    let apiUrl = 'https://yesser.pythonanywhere.com/publisher/' + idProduit;

    try {
        let response = await fetch(apiUrl);

        if (response.status === 200) {
            let publisherInfo = await response.json();
            return publisherInfo;
        } else {
            console.log(`Erreur lors de la requête. Code d'erreur: ${response.status}`);
        }
    } catch (error) {
        console.error('Erreur lors de la requête:', error);
    }
}

(async () => {
    const productId = new URLSearchParams(window.location.search).get('id');

    const productApiUrl = 'https://yesser.pythonanywhere.com/get_product_by_id/' + productId;

    try {
        let productResponse = await fetch(productApiUrl);
        if (productResponse.ok) {
            let productData = await productResponse.json();
            console.log('Données du produit :', productData);

            let publisher = await afficherPublisher(productData.id_utilisateur);
            if (publisher) {
                console.log('Données de l\'utilisateur :', publisher);

                // Affichage des données dans le HTML
                const productDetailsContainer = document.getElementById('product-details');
                productDetailsContainer.innerHTML = `
                    <h2>${productData.nom}</h2>
                    <p>Prix: $${productData.prix.toFixed(2)}</p>
                    <img src="${productData.image}" alt="${productData.name}" style="max-width: 200px; max-height: 200px;">
                    <p>${productData.description}</p>
                `;

                const propElement = document.getElementById("prop");
                propElement.textContent = `Propriétaire: ${publisher.nom} ${publisher.prenom}`;

                const telElement = document.getElementById("tel");
                telElement.textContent = `Téléphone: ${publisher.tel}`;
            } else {
                console.log("Aucun éditeur trouvé.");
            }
        } else {
            throw new Error(`Erreur ${productResponse.status} lors de la récupération du produit.`);
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des données du produit :', error.message);
    }
})();
