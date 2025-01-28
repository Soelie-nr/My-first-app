document.getElementById("user-form").addEventListener("submit", async function (event) {
  event.preventDefault();

  const payload = {
    prenom: document.getElementById("first-name").value,
    nom: document.getElementById("prenom").value,
    alt: parseInt(document.getElementById("alt").value),
    question1: document.getElementById("question-1").value,
    question2: document.getElementById("question-2").value,
  };

  // Envoi au serveur
  const response = await fetch("http://localhost:3000/submit-form", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const result = await response.json();
  alert(result.message);
});