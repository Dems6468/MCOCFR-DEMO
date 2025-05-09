document.addEventListener("DOMContentLoaded", function() {
    // Charger le fichier JSON championsData
    fetch('championsData.json')
        .then(response => response.json())
        .then(data => {
            const personnageList = document.getElementById('personnage-list');
            const searchInput = document.getElementById('search-input');

        // Fonction pour afficher les personnages
        function displayCharacters(list) {
            personnageList.innerHTML = ''; // Réinitialise la liste à chaque affichage
            list.forEach(perso => {
                const persoElement = document.createElement('div');
                persoElement.classList.add('personnage-card', perso.classe); // Ajoute la classe dynamique ici
                
                persoElement.innerHTML = `
                <a href="characterchampion.html?nom=${encodeURIComponent(perso.nom)}">
                    <div class="photo-container">
                        <img src="${perso.photo}" alt="${perso.nom}" class="personnage-photo">
                    </div>
                </a>
                <h3>${perso.nom}</h3> <!-- Le nom n'est plus dans une balise <a> -->
            `;
        
                // Ajout de l'icône de classe2 (si présente)
                if (perso.classe2) {
                    const classeContainer = document.createElement('div');
                    classeContainer.classList.add('personnage-classe2');
        
                    const iconImg = document.createElement('img');
                    iconImg.src = perso.classe2;  // <- Chemin de l'image
                    iconImg.alt = perso.nom;
                    iconImg.classList.add('classe-icon'); // Ajoute une classe pour le style
        
                    classeContainer.appendChild(iconImg);
                    persoElement.appendChild(classeContainer);
                }
        
                personnageList.appendChild(persoElement);
            });
        }
        

            // Fonction pour trier les personnages par nom
            function sortCharacters(order, filteredData) {
                const sorted = [...filteredData];
                sorted.sort((a, b) => {
                    const nameA = a.nom.toUpperCase();
                    const nameB = b.nom.toUpperCase();

                    if (order === 'asc') {
                        return nameA < nameB ? -1 : 1;
                    } else {
                        return nameA > nameB ? -1 : 1;
                    }
                });
                return sorted;
            }

            // Fonction de filtrage des personnages par classe
            function filterByClass(classFilter) {
                if (!classFilter || classFilter === 'all') return data; // Si aucune classe n'est sélectionnée, retourne tout
                return data.filter(perso => perso.classe === classFilter); // Filtrage par classe
            }

            // Fonction de recherche dynamique (filtrer par nom)
            function searchByName(searchText, filteredData) {
                if (!searchText) return filteredData; // Si aucun texte n'est écrit, retourne la liste filtrée actuelle
                return filteredData.filter(perso =>
                    perso.nom.toLowerCase().includes(searchText.toLowerCase())
                ); // Filtrage par nom
            }

            // Gestion du tri, du filtre et de la recherche
            const sortSelect = document.getElementById('sort-names');
            const classSelect = document.getElementById('filter-class');

            // Fonction de mise à jour de la liste après un changement de tri, de filtre ou de recherche
            function updateList() {
                const order = sortSelect.value;  // Récupère la valeur de tri (ascendant ou descendant)
                const classFilter = classSelect.value; // Récupère la valeur du filtre de classe
                const searchText = searchInput.value; // Récupère la valeur de la barre de recherche

                // Appliquer le filtre de classe
                let filteredData = filterByClass(classFilter);

                // Appliquer la recherche par nom
                filteredData = searchByName(searchText, filteredData);

                // Appliquer le tri sur les données filtrées et recherchées
                const sortedData = sortCharacters(order, filteredData);

                // Afficher les personnages après filtrage, recherche et tri
                displayCharacters(sortedData);
            }

            // Événements pour le tri, le filtre et la recherche
            sortSelect.addEventListener('change', updateList);
            classSelect.addEventListener('change', updateList);
            searchInput.addEventListener('input', updateList); // Écouteur pour la barre de recherche

            // Afficher les personnages par défaut (non triés, non filtrés)
            displayCharacters(data);
        })
        .catch(error => console.error('Erreur de chargement du JSON:', error));
});

document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll('.carousel-image');
    let currentIndex = 0;

    // Fonction pour afficher l'image courante
    function showImage(index) {
        images.forEach((img, i) => {
            if (i === index) {
                img.style.display = 'block';  // Afficher l'image courante
            } else {
                img.style.display = 'none';  // Cacher les autres images
            }
        });
    }

    // Initialiser l'affichage de la première image
    showImage(currentIndex);

    // Bouton "Suivant"
    document.getElementById('nextBtn').addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % images.length;  // Passer à l'image suivante
        showImage(currentIndex);
    });

    // Bouton "Précédent"
    document.getElementById('prevBtn').addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;  // Passer à l'image précédente
        showImage(currentIndex);
    });
});

