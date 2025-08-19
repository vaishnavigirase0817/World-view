// Destination data with comprehensive information
const destinations = {
  tokyo: {
    name: "Tokyo, Japan",
    continent: "asia",
    coordinates: [35.6762, 139.6503],
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop",
    description: "A bustling metropolis blending ultra-modern and traditional culture.",
    weather: { temp: 22, condition: "Clear", humidity: 58, windSpeed: 8 },
    video: "https://www.youtube.com/embed/6DQxRQb9dCE",
    cuisine: [
      { name: "Sushi", emoji: "🍣" },
      { name: "Ramen", emoji: "🍜" },
      { name: "Tempura", emoji: "🍤" },
      { name: "Mochi", emoji: "🍡" }
    ],
    tips: [
      "Experience the famous Shibuya crossing",
      "Visit traditional temples in Asakusa district",
      "Try authentic sushi at Tsukiji Fish Market",
      "Take the bullet train for a unique experience"
    ]
  },
  newyork: {
    name: "New York, USA",
    continent: "america",
    coordinates: [40.7128, -74.0060],
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop",
    description: "The Big Apple - a vibrant city that never sleeps.",
    weather: { temp: 15, condition: "Cloudy", humidity: 72, windSpeed: 15 },
    video: "https://www.youtube.com/embed/h3fUgOKFMNU",
    cuisine: [
      { name: "Pizza", emoji: "🍕" },
      { name: "Bagels", emoji: "🥯" },
      { name: "Hot Dogs", emoji: "🌭" },
      { name: "Cheesecake", emoji: "🍰" }
    ],
    tips: [
      "Visit Central Park for a peaceful escape",
      "See a Broadway show in Times Square",
      "Take the Staten Island Ferry for Statue of Liberty views",
      "Explore diverse neighborhoods like SoHo and Greenwich Village"
    ]
  },
  london: {
    name: "London, UK",
    continent: "europe",
    coordinates: [51.5074, -0.1278],
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop",
    description: "A historic city with royal palaces, world-class museums, and iconic landmarks.",
    weather: { temp: 12, condition: "Rainy", humidity: 78, windSpeed: 18 },
    video: "https://www.youtube.com/embed/36DCuT1KxM4",
    cuisine: [
      { name: "Fish & Chips", emoji: "🐟" },
      { name: "Tea & Scones", emoji: "🫖" },
      { name: "Bangers & Mash", emoji: "🌭" },
      { name: "Shepherd's Pie", emoji: "🥧" }
    ],
    tips: [
      "Visit Buckingham Palace for the Changing of the Guard",
      "Explore the British Museum's vast collections",
      "Take a ride on the London Eye for panoramic views",
      "Enjoy afternoon tea at a traditional tea room"
    ]
  },
  sydney: {
    name: "Sydney, Australia",
    continent: "oceania",
    coordinates: [-33.8688, 151.2093],
    image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&h=600&fit=crop",
    description: "Harbor city famous for its Opera House, beaches, and laid-back lifestyle.",
    weather: { temp: 25, condition: "Sunny", humidity: 60, windSpeed: 14 },
    video: "https://www.youtube.com/embed/XkYRI48bXRw",
    cuisine: [
      { name: "Meat Pies", emoji: "🥧" },
      { name: "Pavlova", emoji: "🍰" },
      { name: "Barramundi", emoji: "🐟" },
      { name: "Tim Tams", emoji: "🍪" }
    ],
    tips: [
      "Climb the Sydney Harbour Bridge for stunning views",
      "Catch a performance at the iconic Opera House",
      "Surf at Bondi Beach or relax at Manly Beach",
      "Explore the Royal Botanic Gardens"
    ]
  }
};

// Global variables
let currentDestination = null;
let currentMap = null;
let favorites = JSON.parse(localStorage.getItem('travelFavorites')) || [];
let currentTab = 'overview';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
  loadFavorites();
  updateFavoritesList();
});

// Main function to display destination information
function showPlace() {
  const selectedPlace = document.getElementById('place').value;
  currentDestination = selectedPlace;
  
  const destination = destinations[selectedPlace];
  if (!destination) return;

  const detailsSection = document.getElementById('details');
  
  detailsSection.innerHTML = `
    <div class="destination-content">
      <div class="destination-info">
        <h3>${destination.name}</h3>
        <img src="${destination.image}" alt="${destination.name}" loading="lazy">
        
        <div class="weather-widget">
          <h4><i class="fas fa-cloud-sun"></i> Current Weather</h4>
          <div class="temperature">${destination.weather.temp}°C</div>
          <p>${destination.weather.condition}</p>
          <div class="weather-details">
            <div class="weather-item">
              <i class="fas fa-tint"></i>
              <div>${destination.weather.humidity}%</div>
              <small>Humidity</small>
            </div>
            <div class="weather-item">
              <i class="fas fa-wind"></i>
              <div>${destination.weather.windSpeed} km/h</div>
              <small>Wind</small>
            </div>
          </div>
        </div>
      </div>
      
      <div class="destination-details">
        <div class="info-tabs">
          <button class="tab-btn active" onclick="switchTab('overview')">Overview</button>
          <button class="tab-btn" onclick="switchTab('cuisine')">Cuisine</button>
          <button class="tab-btn" onclick="switchTab('tips')">Travel Tips</button>
          <button class="tab-btn" onclick="switchTab('map')">Map</button>
        </div>
        
        <div id="tabContent" class="tab-content">
          ${getTabContent('overview', destination)}
        </div>
      </div>
    </div>
  `;
  
  updateFavoriteButton();
  if (currentTab === 'map') {
    setTimeout(() => initializeMap(destination), 100);
  }
}

// Get content for different tabs
function getTabContent(tab, destination) {
  switch(tab) {
    case 'overview':
      return `
        <h4>About ${destination.name}</h4>
        <p>${destination.description}</p>
        <iframe src="${destination.video}" allowfullscreen></iframe>
      `;
    
    case 'cuisine':
      return `
        <h4><i class="fas fa-utensils"></i> Local Cuisine</h4>
        <div class="cuisine-grid">
          ${destination.cuisine.map(food => `
            <div class="cuisine-item">
              <div style="font-size: 2rem;">${food.emoji}</div>
              <strong>${food.name}</strong>
            </div>
          `).join('')}
        </div>
        <p style="margin-top: 20px;">Experience the authentic flavors of ${destination.name} through these traditional dishes.</p>
      `;
    
    case 'tips':
      return `
        <h4><i class="fas fa-lightbulb"></i> Travel Tips</h4>
        <ul class="tips-list">
          ${destination.tips.map(tip => `<li><i class="fas fa-check-circle" style="color: #667eea; margin-right: 10px;"></i>${tip}</li>`).join('')}
        </ul>
      `;
    
    case 'map':
      return `
        <h4><i class="fas fa-map-marked-alt"></i> Interactive Map</h4>
        <div id="map"></div>
        <p style="margin-top: 15px;">Explore ${destination.name} with this interactive map. Click and drag to navigate around the area.</p>
      `;
    
    default:
      return '';
  }
}

// Switch between tabs
function switchTab(tab) {
  currentTab = tab;
  const destination = destinations[currentDestination];
  
  // Update tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  
  // Update content
  document.getElementById('tabContent').innerHTML = getTabContent(tab, destination);
  
  // Initialize map if map tab is selected
  if (tab === 'map') {
    setTimeout(() => initializeMap(destination), 100);
  }
}

// Initialize interactive map
function initializeMap(destination) {
  if (currentMap) {
    currentMap.remove();
  }
  
  currentMap = L.map('map').setView(destination.coordinates, 12);
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(currentMap);
  
  L.marker(destination.coordinates)
    .addTo(currentMap)
    .bindPopup(`<strong>${destination.name}</strong><br>${destination.description}`)
    .openPopup();
}

// Search functionality
function searchDestinations() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase();
  const select = document.getElementById('place');
  
  // Filter options based on search term
  Array.from(select.options).forEach(option => {
    const destination = destinations[option.value];
    if (destination && destination.name.toLowerCase().includes(searchTerm)) {
      option.style.display = 'block';
    } else {
      option.style.display = 'none';
    }
  });
  
  // If exact match found, select it
  const exactMatch = Object.keys(destinations).find(key => 
    destinations[key].name.toLowerCase().includes(searchTerm)
  );
  
  if (exactMatch) {
    select.value = exactMatch;
    showPlace();
  }
}

// Filter destinations by continent
function filterByContinent(continent) {
  const select = document.getElementById('place');
  
  // Update active filter button
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  
  // Show/hide options based on continent
  Array.from(select.options).forEach(option => {
    const destination = destinations[option.value];
    if (continent === 'all' || (destination && destination.continent === continent)) {
      option.style.display = 'block';
    } else {
      option.style.display = 'none';
    }
  });
  
  // Reset selection if current selection is hidden
  if (select.selectedOptions[0] && select.selectedOptions[0].style.display === 'none') {
    select.selectedIndex = 0;
    document.getElementById('details').innerHTML = `
      <div class="welcome-message">
        <h2>Select a destination from the ${continent === 'all' ? 'list' : continent} to explore!</h2>
      </div>
    `;
  }
}

// Favorites functionality
function toggleFavorite() {
  if (!currentDestination) return;
  
  const destination = destinations[currentDestination];
  const favoriteIndex = favorites.findIndex(fav => fav.id === currentDestination);
  
  if (favoriteIndex === -1) {
    // Add to favorites
    favorites.push({
      id: currentDestination,
      name: destination.name,
      image: destination.image
    });
    showNotification(`${destination.name} added to favorites! ❤️`);
  } else {
    // Remove from favorites
    favorites.splice(favoriteIndex, 1);
    showNotification(`${destination.name} removed from favorites`);
  }
  
  localStorage.setItem('travelFavorites', JSON.stringify(favorites));
  updateFavoritesList();
  updateFavoriteButton();
}

// Update favorites list display
function updateFavoritesList() {
  const favoritesList = document.getElementById('favoritesList');
  
  if (favorites.length === 0) {
    favoritesList.innerHTML = '<p style="text-align: center; color: #666;">No favorites yet. Start exploring and add some destinations!</p>';
    return;
  }
  
  favoritesList.innerHTML = favorites.map(favorite => `
    <div class="favorite-item" onclick="loadFavorite('${favorite.id}')">
      <i class="fas fa-heart"></i> ${favorite.name}
    </div>
  `).join('');
}

// Load a favorite destination
function loadFavorite(destinationId) {
  document.getElementById('place').value = destinationId;
  showPlace();
  
  // Scroll to details section
  document.getElementById('details').scrollIntoView({ behavior: 'smooth' });
}

// Update favorite button appearance
function updateFavoriteButton() {
  const favoriteBtn = document.getElementById('favoriteBtn');
  const isFavorite = favorites.some(fav => fav.id === currentDestination);
  
  if (isFavorite) {
    favoriteBtn.innerHTML = '<i class="fas fa-heart"></i> Remove from Favorites';
    favoriteBtn.style.background = 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)';
  } else {
    favoriteBtn.innerHTML = '<i class="far fa-heart"></i> Add to Favorites';
    favoriteBtn.style.background = 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)';
  }
}

// Load favorites from localStorage
function loadFavorites() {
  const storedFavorites = localStorage.getItem('travelFavorites');
  if (storedFavorites) {
    favorites = JSON.parse(storedFavorites);
  }
}

// Show notification
function showNotification(message) {
  // Create notification element
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 15px 25px;
    border-radius: 10px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    font-weight: 500;
    animation: slideIn 0.3s ease-out;
  `;
  
  notification.textContent = message;
  document.body.appendChild(notification);
  
  // Add slide-in animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `;
  document.head.appendChild(style);
  
  // Remove notification after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideIn 0.3s ease-out reverse';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Enhanced search with Enter key support
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        searchDestinations();
      }
    });
  }
});

// Add smooth scrolling for better UX
function smoothScrollToSection(elementId) {
  document.getElementById(elementId).scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
}

// Random destination feature
function exploreRandom() {
  const destinationKeys = Object.keys(destinations);
  const randomKey = destinationKeys[Math.floor(Math.random() * destinationKeys.length)];
  
  document.getElementById('place').value = randomKey;
  showPlace();
  showNotification(`🎲 Random destination: ${destinations[randomKey].name}!`);
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
  // Ctrl/Cmd + F for search
  if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
    e.preventDefault();
    document.getElementById('searchInput').focus();
  }
  
  // Ctrl/Cmd + R for random destination
  if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
    e.preventDefault();
    exploreRandom();
  }
});

// Add loading states for better UX
function showLoadingState() {
  const detailsSection = document.getElementById('details');
  detailsSection.innerHTML = `
    <div style="text-align: center; padding: 50px;">
      <div style="font-size: 3rem; margin-bottom: 20px;">
        <i class="fas fa-spinner fa-spin"></i>
      </div>
      <h3>Loading destination...</h3>
      <p>Preparing your virtual journey!</p>
    </div>
  `;
}

// Enhanced showPlace with loading state
const originalShowPlace = showPlace;
showPlace = function() {
  showLoadingState();
  setTimeout(originalShowPlace, 500); // Add slight delay for better UX
};
