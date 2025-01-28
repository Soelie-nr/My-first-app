document.getElementById('EVE').addEventListener('submit', function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  const data = {};

  formData.forEach((value, key) => {
    data[key] = value;
  });

  fetch('/submit-satisfaction', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => {
    alert('Formulaire soumis avec succès !');
  })
  .catch(error => {
    alert('Erreur lors de l\'envoi du formulaire : ' + error);
  });
});
