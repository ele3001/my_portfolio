// Récupération des boutons et des éléments d'affichage
const buttons = document.querySelectorAll('.picto-button');
const displayImage = document.getElementById('display-image');
const displayText = document.getElementById('display-text');

// Gestion du clic sur chaque bouton
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const image = button.getAttribute('data-image'); // Image associée
    const text = button.getAttribute('data-text');   // Texte associé

    // Mise à jour de l'image et du texte
    displayImage.src = image;
    displayText.textContent = text;
  });
});
