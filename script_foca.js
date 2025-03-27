let focaData = [];  // Déclaration d'une variable globale pour stocker les données

// Fonction pour récupérer le fichier JSON et afficher les données
function fetchData() {
    fetch('foca.json')  // Charger le fichier foca.json
        .then(response => response.json())  // Convertir la réponse en JSON
        .then(data => {
            focaData = data;  // Stocker les données dans focaData
            displayTable(focaData);  // Afficher les données dans le tableau
        })
        .catch(error => {
            console.error("Erreur lors du chargement des données:", error);
        });
}

// Fonction pour afficher les données dans le tableau
function displayTable(data) {
    const tableBody = document.getElementById("dataTable").getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Vider le tableau avant de le remplir à nouveau

    data.forEach(item => {
        let row = tableBody.insertRow();
        
        // Insertion des cellules dans chaque ligne
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        let cell6 = row.insertCell(5);
        let cell7 = row.insertCell(6);
        let cell8 = row.insertCell(7);
        let cell9 = row.insertCell(8);
      
        // Remplissage des cellules avec les données
        cell1.textContent = item.rang;
        cell2.innerHTML = `<img src="${item.photo}" alt="${item.nom}" width="50">`;
        cell3.textContent = item.nom;
        cell4.textContent = item.prestige;
        cell5.innerHTML = `<img src="${item.relique_img}" alt="${item.relique_nom}" width="50">
  			<div class="tooltip">${item.relique_nom}</div>`;
        cell6.innerHTML = `<img src="${item.focalisation_attaque_img}" alt="${item.focalisation_attaque}" width="50">
			   <div class="tooltip">${item.focalisation_attaque}</div>`;
        cell7.innerHTML = `<img src="${item.focalisation_defense_img}" alt="${item.focalisation_defense}" width="50">
			   <div class="tooltip">${item.focalisation_defense}</div>`;
        cell8.textContent = item.vie;
        cell9.textContent = item.attaque;
        // Appliquer la classe dynamique selon la classe du personnage
        row.classList.add(item.classe);  // Ajoute la classe correspondante
    });
}

// Fonction de filtrage
function filterTable() {
    const searchValue = document.getElementById("searchInput").value.toLowerCase();
    const filteredData = focaData.filter(item => {
        // Filtrage basé sur plusieurs champs (nom, description, etc.)
        return item.nom.toLowerCase().includes(searchValue) || 
               item.prestige.toLowerCase().includes(searchValue) ||
               item.relique_nom.toLowerCase().includes(searchValue) ||
               item.focalisation_attaque.toLowerCase().includes(searchValue) ||
               item.focalisation_defense.toLowerCase().includes(searchValue) ||
               item.vie.toString().includes(searchValue) ||
               item.attaque.toString().includes(searchValue);
    });
    displayTable(filteredData);  // Afficher les résultats filtrés dans le tableau
}

// Initialiser le tableau avec les données
fetchData();
