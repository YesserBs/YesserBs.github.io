const productsContainer = document.getElementById('products-container');
const apiUrl = 'https://yesser.pythonanywhere.com/api/products';

// Fonction pour récupérer les produits paginés
//----------------------------- Checking the cookie -----------------------------
function getPaginatedProducts(page, pageSize) {
  var userId = localStorage.getItem('userId');
  var userName = localStorage.getItem('userName');

  // Vérifier si les informations sont présentes
  if (userId && userName) {
      // Les informations de l'utilisateur sont disponibles, vous pouvez les utiliser comme nécessaire
      console.log("ID de l'utilisateur:", userId);
      console.log("Nom de l'utilisateur:", userName);
      var titre = document.getElementById('bonjour');
      titre.innerHTML = "Bonjour " + userName;
  } else {
      // Les informations de l'utilisateur ne sont pas présentes dans le stockage local
      console.log("Aucune information d'utilisateur trouvée dans le stockage local.");
  }
  //-----------------------------
  fetch(`${apiUrl}?page=${page}&page_size=${pageSize}`)
    .then(response => response.json())
    .then(data => {
      console.log("Données récupérées depuis l'API :", data); // Ajout de cette ligne pour vérification
      
      data.forEach(product => {
        console.log("Product :", product); // Ajout de cette ligne pour vérification
        
        const productElement = document.createElement('div');
        productElement.innerHTML = `
          <a href="product-details.html?id=${product.id}">
            <p>${product.nom} - $${product.prix.toFixed(2)}</p>
            <img src="${product.image}" alt="${product.nom}" style="max-width: 100px; max-height: 100px;">
          </a>
        `;
        productsContainer.appendChild(productElement);
      });
    })
    .catch(error => console.error('Error fetching products:', error));
}

// Appel de la fonction avec des valeurs de test pour page et pageSize
getPaginatedProducts(1, 10);
