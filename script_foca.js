 let focaData = [];  // Déclaration d'une variable globale pour stocker les données
    let sortOrder = { rang: true, nom: true, prestige: true };  // Pour savoir si c'est croissant ou décroissant

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
                   item.focalisation_defense.toLowerCase().includes(searchValue);
        });
        displayTable(filteredData);  // Afficher les résultats filtrés dans le tableau
    }

   function sortTable(column) {
    const isAscending = sortOrder[column];  // Obtenir l'état actuel du tri (croissant ou décroissant)

    // Tri des données
    const sortedData = [...focaData].sort((a, b) => {
        let valA = a[column];
        let valB = b[column];

        // Si c'est la colonne 'rang', on effectue un tri numérique
        if (column === 'rang') {
            valA = parseInt(valA, 10);  // Convertir en entier
            valB = parseInt(valB, 10);  // Convertir en entier
        }

        // Si les valeurs sont des nombres (par exemple rang, attaque, etc.)
        if (typeof valA === 'number' && typeof valB === 'number') {
            return isAscending ? valA - valB : valB - valA;
        }

        // Si les valeurs sont des chaînes de caractères (par exemple nom, prestige)
        if (typeof valA === 'string' && typeof valB === 'string') {
            return isAscending ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }

        return 0;
    });

    // Mettre à jour l'ordre de tri pour la prochaine fois
    sortOrder[column] = !isAscending;

    // Afficher les données triées
    displayTable(sortedData);
}

    // Initialiser le tableau avec les données
    fetchData();
