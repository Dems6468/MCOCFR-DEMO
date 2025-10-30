// Configuration
const API_URL = 'https://mcoc-api-production.up.railway.app'; // À MODIFIER avec l'URL de ton API Railway
let currentUser = null;
let currentGuild = null;
let users = [];
let champions = [];
let championsList = [];
let isAdmin = false;

// Éléments DOM
const loginPage = document.getElementById('loginPage');
const guildSelectPage = document.getElementById('guildSelectPage');
const mainPage = document.getElementById('mainPage');
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const userInfo = document.getElementById('userInfo');
const addChampionBtn = document.getElementById('addChampionBtn');
const addChampionModal = document.getElementById('addChampionModal');
const editGroupModal = document.getElementById('editGroupModal');
const groupsContainer = document.getElementById('groupsContainer');
const searchInput = document.getElementById('searchInput');

// Charger la liste des champions
async function loadChampionsList() {
    try {
        const response = await fetch('champions.json');
        const data = await response.json();
        championsList = data.champions;
    } catch (error) {
        console.error('Erreur chargement champions.json:', error);
        championsList = [];
    }
}

// Initialisation
async function init() {
    await loadChampionsList();
    checkAuth();
}

// Vérifier l'authentification
async function checkAuth() {
    try {
        const response = await fetch(`${API_URL}/auth/user`, {
            credentials: 'include'
        });
        
        if (response.ok) {
            currentUser = await response.json();
            await loadUserGuilds();
        } else {
            showPage(loginPage);
        }
    } catch (error) {
        console.error('Erreur authentification:', error);
        showPage(loginPage);
    }
}

// Charger les guildes de l'utilisateur
async function loadUserGuilds() {
    try {
        const response = await fetch(`${API_URL}/api/user-guilds`, {
            credentials: 'include'
        });
        
        const guilds = await response.json();
        
        if (guilds.length === 0) {
            alert('Vous n\'êtes membre d\'aucune alliance utilisant ce bot.');
            showPage(loginPage);
            return;
        }
        
        if (guilds.length === 1) {
            currentGuild = guilds[0].id;
            await loadMainPage();
        } else {
            displayGuildSelection(guilds);
        }
    } catch (error) {
        console.error('Erreur chargement guildes:', error);
        showPage(loginPage);
    }
}

// Afficher la sélection de guilde
function displayGuildSelection(guilds) {
    const guildsList = document.getElementById('guildsList');
    guildsList.innerHTML = '';
    
    guilds.forEach(guild => {
        const card = document.createElement('div');
        card.className = 'guild-card';
        card.innerHTML = `
            <h3>${guild.name}</h3>
            <p>${guild.id}</p>
        `;
        card.onclick = () => selectGuild(guild.id);
        guildsList.appendChild(card);
    });
    
    showPage(guildSelectPage);
}

// Sélectionner une guilde
async function selectGuild(guildId) {
    currentGuild = guildId;
    await loadMainPage();
}

// Charger la page principale
async function loadMainPage() {
    userInfo.textContent = `${currentUser.username}`;
    await checkAdminStatus();
    await loadData();
    displayGroups();
    showPage(mainPage);
}

// Vérifier si l'utilisateur est admin
async function checkAdminStatus() {
    // Pour l'instant, on suppose que l'utilisateur est admin
    // L'API vérifiera les permissions pour chaque action
    isAdmin = true;
    addChampionBtn.style.display = isAdmin ? 'block' : 'none';
}

// Charger les données
async function loadData() {
    try {
        const [usersResponse, championsResponse] = await Promise.all([
            fetch(`${API_URL}/api/users/${currentGuild}`, { credentials: 'include' }),
            fetch(`${API_URL}/api/champions/${currentGuild}`, { credentials: 'include' })
        ]);
        
        users = await usersResponse.json();
        champions = await championsResponse.json();
    } catch (error) {
        console.error('Erreur chargement données:', error);
    }
}

// Afficher les groupes
function displayGroups() {
    const groups = {};
    
    users.forEach(user => {
        if (!groups[user.groupe]) {
            groups[user.groupe] = [];
        }
        groups[user.groupe].push(user);
    });
    
    groupsContainer.innerHTML = '';
    
    Object.keys(groups).sort((a, b) => a - b).forEach(groupNum => {
        const groupSection = document.createElement('div');
        groupSection.className = 'group-section';
        
        const groupHeader = document.createElement('div');
        groupHeader.className = 'group-header';
        groupHeader.innerHTML = `
            <h2>Groupe ${groupNum}</h2>
            <span>${groups[groupNum].length} joueur(s)</span>
        `;
        
        const groupContent = document.createElement('div');
        groupContent.className = 'group-content';
        
        const playersGrid = document.createElement('div');
        playersGrid.className = 'players-grid';
        
        groups[groupNum].forEach(user => {
            const userChampions = champions.filter(c => c.user_id === user.user_id);
            const playerCard = createPlayerCard(user, userChampions);
            playersGrid.appendChild(playerCard);
        });
        
        groupContent.appendChild(playersGrid);
        groupSection.appendChild(groupHeader);
        groupSection.appendChild(groupContent);
        groupsContainer.appendChild(groupSection);
    });
}

// Créer une carte joueur
function createPlayerCard(user, userChampions) {
    const card = document.createElement('div');
    card.className = 'player-card';
    
    const header = document.createElement('div');
    header.className = 'player-header';
    
    const name = document.createElement('div');
    name.className = 'player-name';
    name.textContent = user.username;
    
    const actions = document.createElement('div');
    actions.className = 'player-actions';
    
    if (isAdmin) {
        const editBtn = document.createElement('button');
        editBtn.className = 'btn-edit';
        editBtn.textContent = '✏️ Groupe';
        editBtn.onclick = () => openEditGroupModal(user);
        actions.appendChild(editBtn);
    }
    
    header.appendChild(name);
    header.appendChild(actions);
    
    const championsList = document.createElement('div');
    championsList.className = 'champions-list';
    
    if (userChampions.length === 0) {
        championsList.innerHTML = '<div class="no-champions">Aucun champion</div>';
    } else {
        userChampions.forEach(champion => {
            const item = createChampionItem(champion);
            championsList.appendChild(item);
        });
    }
    
    card.appendChild(header);
    card.appendChild(championsList);
    
    return card;
}

// Créer un item champion
function createChampionItem(champion) {
    const item = document.createElement('div');
    item.className = 'champion-item';
    
    const info = document.createElement('div');
    info.className = 'champion-info';
    
    const image = document.createElement('div');
    image.className = 'champion-image';
    image.textContent = '⭐';
    
    const details = document.createElement('div');
    details.className = 'champion-details';
    
    const name = document.createElement('div');
    name.className = 'champion-name';
    name.textContent = champion.nom;
    
    const stats = document.createElement('div');
    stats.className = 'champion-stats';
    stats.textContent = `${champion.rarete}★ R${champion.rang}`;
    if (champion.ascension > 0) stats.textContent += ` A${champion.ascension}`;
    if (champion.eveille) stats.textContent += ` 🔥`;
    if (champion.competence_eveil > 0) stats.textContent += ` (${champion.competence_eveil})`;
    
    details.appendChild(name);
    details.appendChild(stats);
    
    info.appendChild(image);
    info.appendChild(details);
    
    if (isAdmin) {
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn-danger';
        deleteBtn.textContent = '🗑️';
        deleteBtn.onclick = () => deleteChampion(champion.id);
        item.appendChild(info);
        item.appendChild(deleteBtn);
    } else {
        item.appendChild(info);
    }
    
    return item;
}

// Ouvrir modal ajout champion
function openAddChampionModal() {
    const playerSelect = document.getElementById('playerSelect');
    playerSelect.innerHTML = '';
    
    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.user_id;
        option.textContent = `${user.username} (Groupe ${user.groupe})`;
        playerSelect.appendChild(option);
    });
    
    const championSelect = document.getElementById('championSelect');
    championSelect.innerHTML = '';
    
    championsList.forEach(champ => {
        const option = document.createElement('option');
        option.value = champ.nom;
        option.dataset.image = champ.image;
        option.textContent = champ.nom;
        championSelect.appendChild(option);
    });
    
    addChampionModal.classList.add('active');
}

// Ouvrir modal modification groupe
function openEditGroupModal(user) {
    document.getElementById('editUserId').value = user.id;
    document.getElementById('groupSelect').value = user.groupe;
    editGroupModal.classList.add('active');
}

// Ajouter un champion
async function addChampion(e) {
    e.preventDefault();
    
    const userId = document.getElementById('playerSelect').value;
    const championName = document.getElementById('championSelect').value;
    const championOption = document.querySelector(`#championSelect option[value="${championName}"]`);
    const imageUrl = championOption.dataset.image;
    const rarete = document.getElementById('rareteSelect').value;
    const rang = document.getElementById('rangSelect').value;
    const ascension = document.getElementById('ascensionInput').value;
    const eveille = document.getElementById('eveilleCheckbox').checked;
    const competence = document.getElementById('competenceInput').value;
    
    try {
        const response = await fetch(`${API_URL}/api/champions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                user_id: userId,
                guild_id: currentGuild,
                nom: championName,
                rarete: parseInt(rarete),
                rang: parseInt(rang),
                ascension: parseInt(ascension),
                eveille: eveille,
                competence_eveil: parseInt(competence),
                image_url: imageUrl
            })
        });
        
        if (response.ok) {
            addChampionModal.classList.remove('active');
            await loadData();
            displayGroups();
        } else {
            const error = await response.json();
            alert(`Erreur: ${error.error}`);
        }
    } catch (error) {
        console.error('Erreur ajout champion:', error);
        alert('Erreur lors de l\'ajout du champion');
    }
}

// Modifier le groupe
async function editGroup(e) {
    e.preventDefault();
    
    const userId = document.getElementById('editUserId').value;
    const newGroup = document.getElementById('groupSelect').value;
    
    try {
        const response = await fetch(`${API_URL}/api/users/${userId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                groupe: parseInt(newGroup),
                guildId: currentGuild
            })
        });
        
        if (response.ok) {
            editGroupModal.classList.remove('active');
            await loadData();
            displayGroups();
        } else {
            const error = await response.json();
            alert(`Erreur: ${error.error}`);
        }
    } catch (error) {
        console.error('Erreur modification groupe:', error);
        alert('Erreur lors de la modification');
    }
}

// Supprimer un champion
async function deleteChampion(championId) {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce champion ?')) return;
    
    try {
        const response = await fetch(`${API_URL}/api/champions/${championId}?guildId=${currentGuild}`, {
            method: 'DELETE',
            credentials: 'include'
        });
        
        if (response.ok) {
            await loadData();
            displayGroups();
        } else {
            const error = await response.json();
            alert(`Erreur: ${error.error}`);
        }
    } catch (error) {
        console.error('Erreur suppression champion:', error);
        alert('Erreur lors de la suppression');
    }
}

// Recherche
function handleSearch() {
    const query = searchInput.value.toLowerCase();
    const playerCards = document.querySelectorAll('.player-card');
    
    playerCards.forEach(card => {
        const playerName = card.querySelector('.player-name').textContent.toLowerCase();
        if (playerName.includes(query)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Déconnexion
async function logout() {
    try {
        await fetch(`${API_URL}/auth/logout`, { credentials: 'include' });
        currentUser = null;
        currentGuild = null;
        showPage(loginPage);
    } catch (error) {
        console.error('Erreur déconnexion:', error);
    }
}

// Afficher une page
function showPage(page) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    page.classList.add('active');
}

// Event listeners
loginBtn.onclick = () => {
    window.location.href = `${API_URL}/auth/discord`;
};

logoutBtn.onclick = logout;
addChampionBtn.onclick = openAddChampionModal;

document.getElementById('addChampionForm').onsubmit = addChampion;
document.getElementById('editGroupForm').onsubmit = editGroup;

searchInput.oninput = handleSearch;

// Fermer les modals
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.onclick = function() {
        this.closest('.modal').classList.remove('active');
    };
});

window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
    }
};

// Démarrage
init();
