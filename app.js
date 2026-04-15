let currentPage = 'home';

function setActiveNav(navId) {
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.remove('nav-active');
  });
  document.getElementById(navId).classList.add('nav-active');
}

function loadPage(page) {
  currentPage = page;
  setActiveNav(`nav-${page}`);
  const content = document.getElementById('mainContent');

  if (page === 'home') loadHome();
  else if (page === 'nuskha') loadNuskha();
  else if (page === 'category') loadCategory();
  else if (page === 'favorite') loadFavorite();
  else if (page === 'about') loadAbout();
}

// User Counter (جیسا MainActivity میں تھا)
db.ref('app_users').on('value', snapshot => {
  document.getElementById('userCounter').textContent = `Book-Users: ${snapshot.numChildren()}`;
});

window.onload = () => loadPage('home');