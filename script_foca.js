// Exemple de données JSON avec les nouvelles colonnes
const jsonData = [
    {
        "rang": 1,
        "photo": "faces/portrait_onslaughtb0fe.png",
        "nom": "Onslaught",
        "prestige": "28025",
        "relique_nom": "Mister Sinister",
        "relique_img": "reliques/relic_portrait_mistersinister_current.png",
        "focalisation_attaque": "Dégâts spéciaux",
        "focalisation_attaque_img": "focalisation/Dspe.png",
        "focalisation_defense": "Perforation",
        "focalisation_defense_img": "focalisation/perfo.png",
        "vie": 86691,
        "attaque": 5433,
        "classe": "mutante"
    },
    {
        "rang": 2,
        "photo": "faces/portrait_ironman_infamous0cd3.png",
        "nom": "Iron Man (Infamous)",
        "prestige": "27894",
        "relique_nom": "Hulkbuster",
        "relique_img": "reliques/relic_portrait_hulkbuster_movie.png",
        "focalisation_attaque": "Taux de coups critiques",
        "focalisation_attaque_img": "focalisation/Tcoupcrit.png",
        "focalisation_defense": "Classe d'armure",
        "focalisation_defense_img": "focalisation/armure.png",
        "vie": 72633,
        "attaque": 6473,
        "classe": "tech"
    },
    {
        "rang": 3,
        "photo": "faces/portrait_shathra73f6.png",
        "nom": "Shathra",
        "prestige": "27870",
        "relique_nom": "Scarlet Witch",
        "relique_img": "reliques/relic_portrait_scarletwitch_classic.png",
        "focalisation_attaque": "Taux de coups critiques",
        "focalisation_attaque_img": "focalisation/Tcoupcrit.png",
        "focalisation_defense": "Résistance physique",
        "focalisation_defense_img": "focalisation/resistphy.png",
        "vie": 89229,
        "attaque": 6257,
        "classe": "mystique"
    },
    {
        "rang": 4,
        "photo": "faces/portrait_silversurfer72df.png",
        "nom": "Silver Surfer",
        "prestige": "27865",
        "relique_nom": "Thor",
        "relique_img": "reliques/relic_portrait_thor_new.png",
        "focalisation_attaque": "Taux de coups critiques",
        "focalisation_attaque_img": "focalisation/Tcoupcrit.png",
        "focalisation_defense": "Résistance énergétique",
        "focalisation_defense_img": "focalisation/resistener.png",
        "vie": 81419,
        "attaque": 5606,
        "classe": "cosmique"
    },
    {
        "rang": 5,
        "photo": "faces/portrait_quicksilver3e1f.png",
        "nom": "Vif-Argent",
        "prestige": "27810",
        "relique_nom": "Hulk",
        "relique_img": "reliques/relic_portrait_hulk_green.png",
        "focalisation_attaque": "Efficacité du blocage",
        "focalisation_attaque_img": "focalisation/blocage.png",
        "focalisation_defense": "Perforation",
        "focalisation_defense_img": "focalisation/perfo.png",
        "vie": 82395,
        "attaque": 6676,
        "classe": "science"
    },
    {
        "rang": 6,
        "photo": "faces/portrait_danimoonstar6c9a.png",
        "nom": "Dani Moonstar",
        "prestige": "27803",
        "relique_nom": "Gambit",
        "relique_img": "reliques/relic_portrait_gambit_classic.png",
        "focalisation_attaque": "Dégâts spéciaux",
        "focalisation_attaque_img": "focalisation/Dspe.png",
        "focalisation_defense": "Résistance physique",
        "focalisation_defense_img": "focalisation/resistphy.png",
        "vie": 89815,
        "attaque": 6473,
        "classe": "mutante"
    },
    {
        "rang": 7,
        "photo": "faces/portrait_sunspot9577.png",
        "nom": "Sunspot",
        "prestige": "27782",
        "relique_nom": "Storm",
        "relique_img": "reliques/relic_portrait_storm_current.png",
        "focalisation_attaque": "Dégâts spéciaux",
        "focalisation_attaque_img": "focalisation/Dspe.png",
        "focalisation_defense": "Perforation",
        "focalisation_defense_img": "focalisation/perfo.png",
        "vie": 69509,
        "attaque": 5491,
        "classe": "mutante"
    },
    {
        "rang": 8,
        "photo": "faces/portrait_okoye4b66.png",
        "nom": "Okoye",
        "prestige": "27670",
        "relique_nom": "Winter Soldier",
        "relique_img": "reliques/relic_portrait_winter_soldier.png",
        "focalisation_attaque": "Taux de coups critiques",
        "focalisation_attaque_img": "focalisation/Tcoupcrit.png",
        "focalisation_defense": "Résistance physique",
        "focalisation_defense_img": "focalisation/resistphy.png",
        "vie": 86300,
        "attaque": 6300,
        "classe": "virtuose"
    },

];


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
    const filteredData = jsonData.filter(item => {
        // Filtrage basé sur plusieurs champs (nom, description, etc.)
        return item.nom.toLowerCase().includes(searchValue) || 
               item.prestige.toLowerCase().includes(searchValue) ||
               item.relique_nom.toLowerCase().includes(searchValue) ||
               item.focalisation_attaque.toLowerCase().includes(searchValue) ||
               item.focalisation_defense.toLowerCase().includes(searchValue) ||
               item.vie.toString().includes(searchValue) ||
               item.attaque.toString().includes(searchValue);
    });
    displayTable(filteredData);
}

// Initialiser le tableau avec les données
displayTable(jsonData);
