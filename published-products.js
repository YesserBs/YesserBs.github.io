
// ID de l'utilisateur dont vous voulez récupérer les produits
var id_u = localStorage.getItem('userId');

const apiUrl = 'https://yesser.pythonanywhere.com/' + id_u + '/produits';

// Variable pour stocker les produits publiés par l'utilisateur
let published_products = [];

// Fonction pour récupérer les produits par utilisateur depuis l'API
async function getProduitsUtilisateur() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données.');
        }
        const produits = await response.json();
        published_products = produits.map(produit => {
            return {
                id: produit.id,
                name: produit.nom,
                price: produit.id, // Remplacer par le prix réel si disponible
                image: produit.image, // Ajouter l'URL de l'image si disponible
                details: produit.description, // Remplacer par les détails réels si disponibles
                id_utilisateur: produit.id_utilisateur
            };
        });
        console.log("Produits publiés par l'utilisateur " + id_u + " :");
        console.log(published_products); // Affichage des produits dans la console

        // Affichage des produits dans le HTML
        const publishedProductsContainer = document.getElementById('published_products');
        published_products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.innerHTML = `<br>
                <a href="product-details.html?id=${product.id}">
                    <p>${product.name} - $${product.price.toFixed(2)}</p>
                    <img src="${product.image}" alt="${product.name}" style="max-width: 100px; max-height: 100px;">
                </a>
            `;
            publishedProductsContainer.appendChild(productElement);
        });
    } catch (error) {
        console.error('Une erreur est survenue :', error);
    }
}

// Appel de la fonction pour récupérer et afficher les produits
getProduitsUtilisateur();
