// Fonction pour récupérer les données de personnages depuis un fichier JSON
async function fetchDebuffsData() {
    try {
        const response = await fetch('championsData.json'); // Le fichier JSON est dans le même répertoire
        if (!response.ok) {
            throw new Error('Échec de la récupération des données');
        }
        const debuffsData = await response.json(); // Convertir la réponse en JSON
        return debuffsData;
    } catch (error) {
        console.error(error);
        return []; // Retourne un tableau vide en cas d'erreur
    }
}

let selectedImmunities = new Set();

async function populateImmunityButtons() {
    const debuffsData = await fetchDebuffsData();
    const filterContainer = document.getElementById('buff-buttons');

    let uniqueImmunities = new Set();
    debuffsData.forEach(character => {
        Object.keys(character.buff).forEach(buff => uniqueImmunities.add(buff));
    });

    uniqueImmunities = Array.from(uniqueImmunities).sort();

    filterContainer.innerHTML = uniqueImmunities.map(buff =>
        `<button class="buff-btn" data-buff="${buff}">${buff}</button>`
    ).join('');

    document.getElementById('clear-filters').addEventListener('click', () => clearFilters(debuffsData));

    document.querySelectorAll('.buff-btn').forEach(button => {
        button.addEventListener('click', () => toggleImmunity(button, debuffsData));
    });
}

function toggleImmunity(button, debuffsData) {
    const buff = button.dataset.buff;

    if (selectedImmunities.has(buff)) {
        selectedImmunities.delete(buff);
        button.classList.remove("active");

        // Si c'était le dernier filtre sélectionné, on vide l'affichage
        if (selectedImmunities.size === 0) {
            clearFilters();
            return;
        }
    } else {
        selectedImmunities.add(buff);
        button.classList.add("active");
    }

    filterBySelectedImmunities(debuffsData);
}


function filterBySelectedImmunities(debuffsData) {
    const personnagesList = document.getElementById('personnages-list');
    personnagesList.innerHTML = '';

    if (selectedImmunities.size === 0) {
        displayAllCharacters(debuffsData);
        return;
    }

    const filteredCharacters = debuffsData.filter(character =>
        [...selectedImmunities].every(buff => Object.keys(character.buff).includes(buff))
    );

    let relatedImmunities = new Set();
    filteredCharacters.forEach(character =>
        Object.keys(character.buff).forEach(buff => relatedImmunities.add(buff))
    );

    document.querySelectorAll('.buff-btn').forEach(button => {
        button.style.opacity = relatedImmunities.has(button.dataset.buff) ? "1" : "0.3";
    });

    if (filteredCharacters.length === 0) {
        personnagesList.innerHTML = '<p>Aucun personnage trouvé.</p>';
    } else {
        filteredCharacters.forEach(character => {
            const buffImages = Object.keys(character.buff).map(buff => `
                <div class="debuff-icon-container" style="position: relative;">
                    <img src="${debuffIcons[buff]}" alt="${buff}" class="debuff-icon" onclick="toggleDebuffInfo(event, '${buff}')"/>
                    <div class="debuff-tooltip" style="display:none; position: absolute; top: 25px; background-color: #333; color: white; padding: 5px; border-radius: 5px; font-size: 14px; text-align: center;">
                        <img src="${debuffIcons[buff]}" alt="${buff}" style="width: 30px; height: 30px; margin-bottom: 5px;"><br/>
                        <strong>${buff}</strong><br/>
                        ${character.buff[buff] ? character.buff[buff].join(', ') : ''}
                    </div>
                </div>
            `).join('');
            
            const characterClass = character.classe.toLowerCase(); // Assure-toi que la classe est en minuscule
            personnagesList.innerHTML += `
                <div class="personnage-card ${characterClass}">
                    <div class="photo-container">
                        <img src="${character.photo}" alt="${character.nom}">
                    </div>
                    <h3>${character.nom}</h3>
                    <div class="buff-icons">${buffImages}</div>
                </div>
            `;
        });
    }
}

function displayAllCharacters(debuffsData) {
    const personnagesList = document.getElementById('personnages-list');
    personnagesList.innerHTML = '';

    debuffsData.forEach(character => {
        const buffImages = Object.keys(character.buff).map(buff => `
            <div class="debuff-icon-container" style="position: relative;">
                <img src="${debuffIcons[buff]}" alt="${buff}" class="debuff-icon" onclick="toggleDebuffInfo(event, '${buff}')"/>
                <div class="debuff-tooltip">
                    <img src="${debuffIcons[buff]}" alt="${buff}"><br/>
                    <strong>${buff}</strong><br/>
                    ${character.buff[buff] ? character.buff[buff].join(', ') : ''}
                </div>
            </div>
        `).join('');

        const characterClass = character.classe.toLowerCase();

        personnagesList.innerHTML += `
            <div class="personnage-card ${characterClass}">
                <div class="photo-container">
                    <img src="${character.photo}" alt="${character.nom}">
                </div>
                <h3>${character.nom}</h3>
                <div class="buff-icons">${buffImages}</div>
            </div>
        `;
    });
}

function clearFilters() {
    selectedImmunities.clear();
    document.querySelectorAll('.buff-btn').forEach(button => {
        button.classList.remove("active");
        button.style.opacity = "1";
    });

    document.getElementById('personnages-list').innerHTML = '<p>.</p>'; // Affiche un message vide
}


populateImmunityButtons();




const debuffIcons = {
   "Modification Précision Compétence":"debuff/AAM.png",
"Réduction Précision Compétence":"debuff/AAM.png",
"Réduction Taux de Pouvoir de Compétence":"debuff/Drainpouvoir.png",
"Brise-Armure":"debuff/brise_armure.png",
"Armure Pulverisée":"debuff/armure_pulverisee.png",
"Saignement":"debuff/Saignement.png",
"Buffs":"debuff/buffs.png",
"Vague de Froid":"debuff/vague_de_froid.png",
"Modification Taux de Pouvoir":"debuff/Drainpouvoir.png",
"Réduction Taux de Pouvoir":"debuff/Drainpouvoir.png",
"Traumatisme":"debuff/Traumatisme.png",
"Immunité Mort":"debuff/mort.png",
"Débuffs":"debuff/debuff.png",
"Dégénerescence":"debuff/degen.png",
"Désorienter":"debuff/desoriente.png",
"Amollir ":"debuff/Drainpouvoir.png",
"Réduction de Précision de Compétence Evasion":"debuff/evade.png",
"Epuisement":"debuff/exhau.png",
"Défaillance":"debuff/defaillance.png",
"Destin Scellé":"debuff/des.png",
"Fatigue":"debuff/fatigue.png",
"Engelure":"debuff/engelure.png",
"Bloque Soin":"debuff/healb.png",
"Incinération":"debuff/incinération.png",
"Enrager":"debuff/provoc.png",
"Dégats Instantanés":"debuff/direct.png",
"Intimidation":"debuff/inti.png",
"Neutralisation":"debuff/neutra.png",
"Flammes Nova":"debuff/nova.png",
"Purge":"debuff/nullify.png",
"Pétrifier":"debuff/petrif.png",
"Poison":"debuff/poison.png",
"Brûle Pouvoir":"debuff/Brulepouvoir.png",
"Drain Pouvoir":"debuff/Drainpouvoir.png",
"Bloque Pouvoir":"debuff/Bloquepouvoir.png",
"Vol Pouvoir":"debuff/volpouvoir.png",
"Dards Puissants":"debuff/dards.png",
"Précision":"debuff/preci.png",
"Modification du Taux de Soin":"debuff/regenmodif.png",
"Reduction du Taux de Soin":"debuff/regenmodif.png",
"Contrôles Inversés":"debuff/ci.png",
"Rupture":"debuff/rupture.png",
"Décharges":"debuff/decharge.png",
"Ralentissement":"debuff/Slow.png",
"Bloque Super-Pouvoir":"debuff/bloquesp.png",
"Chancellement":"debuff/purge.png",
"Etourdissement":"debuff/stun.png",
"Provocation":"debuff/taunt.png",
"Réduction de Précision des Effets Directs":"debuff/rped.png",


};

async function displayDebuffs(event) {
    const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
    const personnagesList = document.getElementById('personnages-list');
    personnagesList.innerHTML = '';

    const debuffsData = await fetchDebuffsData();

    // Si "all" est sélectionné ou rien n'est sélectionné, afficher tous les personnages
    if (selectedOptions.includes('all') || selectedOptions.length === 0) {
        displayAllCharacters(debuffsData);
        return;
    }

    // Filtrer les personnages qui possèdent **toutes** les immunités sélectionnées
    const filteredDebuffs = debuffsData.filter(p => 
        selectedOptions.every(buff => Object.keys(p.buff).includes(buff))
    );

    // Affichage des résultats
    if (filteredDebuffs.length === 0) {
        personnagesList.innerHTML = '<p>Aucun personnage trouvé pour ces immunités.</p>';
    } else {
        filteredDebuffs.forEach(character => {
            const buffImages = Object.keys(character.buff).map(buff => `
                <div class="debuff-icon-container" style="position: relative;">
                    <img src="${debuffIcons[buff]}" alt="${buff}" class="debuff-icon" onclick="toggleDebuffInfo(event, '${buff}')"/>
                    <div class="debuff-tooltip" style="display:none; position: absolute; top: 25px; background-color: #333; color: white; padding: 5px; border-radius: 5px; font-size: 14px; text-align: center;">
                        <img src="${debuffIcons[buff]}" alt="${buff}" style="width: 30px; height: 30px; margin-bottom: 5px;"><br/>
                        <strong>${buff}</strong><br/>
                        ${character.buff[buff] ? character.buff[buff].join(', ') : ''}
                    </div>
                </div>
            `).join('');

            const characterClass = character.classe.toLowerCase();

            personnagesList.innerHTML += `
                <div class="personnage-card ${characterClass}">
                    <div class="photo-container">
                        <img src="${character.photo}" alt="${character.nom}">
                    </div>
                    <h3>${character.nom}</h3>
                    <div class="buff-icons">${buffImages}</div>
                </div>
            `;
        });
    }
}

// Fonction pour afficher tous les personnages
function displayAllCharacters(debuffsData) {
    const personnagesList = document.getElementById('personnages-list');
    personnagesList.innerHTML = '';

    debuffsData.forEach(character => {
        const buffImages = Object.keys(character.buff).map(buff => `
            <div class="debuff-icon-container" style="position: relative;">
                <img src="${debuffIcons[buff]}" alt="${buff}" class="debuff-icon" onclick="toggleDebuffInfo(event, '${buff}')"/>
                <div class="debuff-tooltip" style="display:none; position: absolute; top: 25px; background-color: #333; color: white; padding: 5px; border-radius: 5px; font-size: 14px; text-align: center;">
                    <img src="${debuffIcons[buff]}" alt="${buff}" style="width: 30px; height: 30px; margin-bottom: 5px;"><br/>
                    <strong>${buff}</strong><br/>
                    ${character.buff[buff] ? character.buff[buff].join(', ') : ''}
                </div>
            </div>
        `).join('');

        const characterClass = character.classe.toLowerCase();

        personnagesList.innerHTML += `
            <div class="personnage-card ${characterClass}">
                <div class="photo-container">
                    <img src="${character.photo}" alt="${character.nom}">
                </div>
                <h3>${character.nom}</h3>
                <div class="buff-icons">${buffImages}</div>
            </div>
        `;
    });
}

// Mettre à jour l'écouteur d'événement
document.getElementById('buff-filter').addEventListener('change', displayDebuffs);

// Affichage initial sans filtre
displayDebuffs({ target: { selectedOptions: [{ value: 'all' }] } });


// Fonction pour afficher/masquer l'info du débuff (tooltip)
function toggleDebuffInfo(event, buff) {
    const tooltip = event.target.nextElementSibling; // Trouve le tooltip juste après l'icône
    const allTooltips = document.querySelectorAll('.debuff-tooltip');
    
    // Ferme tous les tooltips ouverts sauf celui sur lequel on a cliqué
    allTooltips.forEach(tip => {
        if (tip !== tooltip) {
            tip.style.display = 'none';
        }
    });

    // Si le tooltip est déjà visible, le fermer
    tooltip.style.display = tooltip.style.display === 'block' ? 'none' : 'block';
}

// Ajouter un gestionnaire d'événements pour fermer les infos en dehors
document.addEventListener('click', function(event) {
    const tooltip = document.querySelector('.debuff-tooltip');
    if (tooltip && !tooltip.contains(event.target) && !event.target.classList.contains('debuff-icon')) {
        tooltip.style.display = 'none';
    }
});

// Initialiser l'affichage des debuffs (sans filtre)
document.getElementById('buff-filter').addEventListener('change', displayDebuffs);

// Appel initial sans filtre
displayDebuffs({ target: { value: 'all' } });
// Ferme le tooltip si on clique ailleurs
document.addEventListener('click', function (event) {
    const allTooltips = document.querySelectorAll('.debuff-tooltip');

    allTooltips.forEach(tooltip => {
        // Vérifie si le clic n'est PAS sur une icône de débuff ni sur un tooltip déjà ouvert
        if (!event.target.classList.contains('debuff-icon') && !tooltip.contains(event.target)) {
            tooltip.style.display = 'none';
        }
    });
});
document.getElementById('toggle-filter').addEventListener('click', function () {
    const filterMenu = document.getElementById('filter-menu');
    
    // Basculer la classe 'hidden'
    filterMenu.classList.toggle('hidden');
});
