document.getElementById('EVE').addEventListener('submit', function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = {};

  app.post('/submit-satisfaction', async (req, res) => {
    try {
      const newSatisfaction = new Satisfaction(req.body); // Créez un nouvel enregistrement avec les données du formulaire
      await newSatisfaction.save(); // Sauvegardez-le dans la base de données MongoDB
      res.status(200).json({ message: 'Formulaire soumis avec succès !' }); // Retournez un message de succès
    } catch (err) {
      console.error("Erreur lors de l'enregistrement:", err);
      res.status(500).json({ message: 'Erreur lors de l\'enregistrement du formulaire.' }); // Retournez un message d'erreur
    }
  });

  formData.forEach((value, key) => {
    // Si le champ est un range, on prend sa valeur spécifique
    if (key === 'range1') {
      data.question5 = value; // Ajout de la question 5
    } else if (key === 'range2') {
      data.question7 = value; // Ajout de la question 7
    } else {
      data[key] = value; // Pour tous les autres champs
    }
  });

  // Ajouter la date sélectionnée
  data.date = document.querySelector('input[type="date"]').value;

  // Ajouter la valeur de la question 1 (radio)
  const question1Value = document.querySelector('input[name="question-1"]:checked')?.value;
  if (question1Value) {
    data.question1 = question1Value;
  }

  // Ajouter les autres questions qui utilisent des textarea
  data.question2 = document.getElementById('question-2').value;
  data.question3 = document.getElementById('question-3').value;
  data.question4 = document.getElementById('question-4').value;
  data.question6 = document.getElementById('question-6').value;

  // Envoi des données à l'API backend
  fetch('/submit-satisfaction', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // Envoi sous forme de JSON
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(error => Promise.reject(error));
    }
    return response.json();
  })
  .then(data => {
    alert(data.message); // Message reçu du serveur
  })
  .catch(error => {
    alert('Erreur lors de l\'envoi du formulaire : ' + (error.message || error.details));
  });
});
