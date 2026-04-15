function loadFavorite() {
  const content = document.getElementById('mainContent');
  content.innerHTML = `
    <h2 class="text-2xl font-bold text-[#1B5E20] mb-6 px-2">⭐ Favorite نسخہ جات</h2>
    <div id="favoriteContainer" class="space-y-4"></div>
  `;

  loadFavoritesData();
}

function loadFavoritesData() {
  db.ref('nuskhas').once('value', (snapshot) => {
    const data = snapshot.val() || {};
    const favList = [];

    Object.keys(data).forEach(key => {
      const item = data[key];
      item.key = key;
      item.isFavorite = localStorage.getItem('fav_' + key) === 'true';
      if (item.isFavorite) favList.push(item);
    });

    renderFavorites(favList);
  });
}

function renderFavorites(list) {
  const container = document.getElementById('favoriteContainer');
  container.innerHTML = '';

  if (list.length === 0) {
    container.innerHTML = `<p class="text-center text-gray-500 py-10">کوئی پسندیدہ نسخہ نہیں ہے</p>`;
    return;
  }

  list.forEach(item => {
    const div = document.createElement('div');
    div.className = "bg-white rounded-3xl shadow p-4 flex gap-4 card cursor-pointer";
    div.innerHTML = `
      <div class="w-20 h-20 flex-shrink-0 rounded-2xl overflow-hidden">
        <img src="${item.imageUrl || 'assets/ic_nuskha.png'}" 
             class="w-full h-full object-cover">
      </div>
      <div class="flex-1 flex flex-col justify-center">
        <div class="flex justify-between items-center">
          <h3 class="font-bold text-[17px] leading-tight">${item.title || ''}</h3>
          
          <!-- Unfavorite Heart Icon -->
          <div onclick="event.stopImmediatePropagation(); removeFromFavorite('${item.key}')" 
               class="text-2xl cursor-pointer">
            🖤
          </div>
        </div>
      </div>
    `;
    div.onclick = () => showNuskhaDetail(item);
    container.appendChild(div);
  });
}

function removeFromFavorite(key) {
  // Local storage سے favorite ہٹائیں
  localStorage.setItem('fav_' + key, 'false');

  // Firebase میں favoriteCount کم کریں
  db.ref(`nuskhas/${key}/favoriteCount`).transaction((currentCount) => {
    let count = currentCount || 0;
    return Math.max(0, count - 1);
  });

  // لسٹ فوراً ریفریش کریں
  loadFavoritesData();
}

function showNuskhaDetail(item) {
  document.getElementById('mainContent').innerHTML = `
    <button onclick="loadPage('favorite')" class="mb-4 text-[#1B5E20] font-bold">← واپس</button>
    <div class="bg-white rounded-3xl shadow overflow-hidden">
      <img src="${item.imageUrl || ''}" class="w-full h-64 object-cover">
      <div class="p-6">
        <h1 class="text-3xl font-bold mb-4">${item.title || ''}</h1>
        <div class="text-lg leading-relaxed whitespace-pre-line text-gray-800">
          ${(item.description || '').replace(/\\n/g, '\n')}
        </div>
      </div>
    </div>
  `;
}