document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('EVE').addEventListener('submit', function (e) {
      e.preventDefault();

      // Création de l'objet de données
      const data = {
          prenom: document.getElementById('prenom').value,
          nom: document.getElementById('nom').value,
          alt: parseInt(document.getElementById('alt').value),
          date: document.getElementById('date').value,
          question1: document.querySelector('input[name="question-1"]:checked')?.value,
          question2: document.getElementById('question-2').value,
          question3: document.getElementById('question-3').value,
          question4: document.getElementById('question-4').value,
          question5: document.getElementById('range1').value, // Satisfaction
          question6: document.getElementById('question-6').value,
          question7: document.getElementById('range2').value  // Prix PLEX
      };

      // Log des données pour debug
      console.log('Données à envoyer:', data);

      // Envoi des données à l'API
      fetch('/api/submit-satisfaction', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
      })
      .then(response => {
          if (!response.ok) {
              return response.json().then(error => Promise.reject(error));
          }
          return response.json();
      })
      .then(responseData => {
          console.log('Réponse du serveur:', responseData);
          alert('Formulaire soumis avec succès !');
          // Optionnel : réinitialiser le formulaire
          document.getElementById('EVE').reset();
      })
      .catch(error => {
          console.error('Erreur:', error);
          alert('Erreur lors de l\'envoi du formulaire : ' + 
                (error.message || error.details || 'Erreur inconnue'));
      });
  });
});