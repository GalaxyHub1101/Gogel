// script.js
const searchInput = document.getElementById('search-input');
const recentSearchesContainer = document.createElement('div');
recentSearchesContainer.id = 'recent-searches-container';
const recentSearchesTitle = document.createElement('h2');
recentSearchesTitle.textContent = 'Recent Searches';
const recentSearchesList = document.createElement('ul');
recentSearchesList.id = 'recent-searches-list';
const clearHistoryButton = document.createElement('button');
clearHistoryButton.textContent = 'Clear History';
clearHistoryButton.classList.add('clear-history-button');

recentSearchesContainer.appendChild(recentSearchesTitle);
recentSearchesContainer.appendChild(recentSearchesList);
recentSearchesContainer.appendChild(clearHistoryButton);

document.querySelector('.search-container').after(recentSearchesContainer);

let recentSearches = localStorage.getItem('recentSearches');
recentSearches = recentSearches ? JSON.parse(recentSearches) : [];

function displayRecentSearches() {
  recentSearchesList.innerHTML = '';
  if (recentSearches.length > 0) {
    recentSearches.forEach(search => {
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.href = `https://duckduckgo.com/?q=${encodeURIComponent(search)}`;
      link.textContent = search;
      listItem.appendChild(link);
      recentSearchesList.appendChild(listItem);
    });
    recentSearchesContainer.style.display = 'block';
  } else {
    recentSearchesContainer.style.display = 'none';
  }
}

function updateRecentSearches(searchTerm) {
  if (!recentSearches.includes(searchTerm)) {
    recentSearches.unshift(searchTerm);
    if (recentSearches.length > 5) { // Limit to 5 recent searches
      recentSearches.pop();
    }
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    displayRecentSearches();
  }
}

function performSearch() {
  const searchTerm = searchInput.value.trim();

  if (searchTerm) {
    updateRecentSearches(searchTerm);
    if (searchTerm.endsWith('.com') || searchTerm.endsWith('.co.uk')) {
      let url = searchTerm;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'http://' + url;
      }
      window.location.href = url;
    } else {
      const duckduckgoUrl = 'https://duckduckgo.com/?q=' + encodeURIComponent(searchTerm);
      window.location.href = duckduckgoUrl;
    }
  } else {
    alert('Please enter a search term or website address.');
  }
}

searchInput.addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    performSearch();
  }
});

clearHistoryButton.addEventListener('click', () => {
  recentSearches = [];
  localStorage.removeItem('recentSearches');
  displayRecentSearches();
});

// JavaScript for Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('mobile-active');
});

// Initial display of recent searches
displayRecentSearches();
