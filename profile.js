var apiUrl = 'https://yesser.pythonanywhere.com/utilisateur/' + localStorage.getItem('userId');

fetch(apiUrl, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(response => {
  if (!response.ok) {
    throw new Error('La requête a échoué');
  }
  return response.json();
})
.then(data => {
  console.log('Données de l\'utilisateur :', data);
  var utilisateur = {
    nom: data.nom,
    prenom: data.prenom,
    telephone: data.tel
  };

  // Met à jour les éléments HTML avec les informations de l'utilisateur
  updateUserInfo(utilisateur);
})
.catch(error => {
  console.error('Erreur :', error);
});

function updateUserInfo(utilisateur) {
  document.getElementById('nom').textContent = utilisateur.nom;
  document.getElementById('prenom').textContent = utilisateur.prenom;
  document.getElementById('telephone').textContent = utilisateur.telephone;
}

function clearLocalStorageAndRedirect() {
  localStorage.clear();
  window.location.href = "connexion.html"; // Remplacez "nouvelle_page.html" par l'URL de la page vers laquelle vous voulez rediriger.
}
