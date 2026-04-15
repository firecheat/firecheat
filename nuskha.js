let nuskhaList = [];
let filteredNuskha = [];

function loadNuskha() {
  const content = document.getElementById('mainContent');
  content.innerHTML = `
    <div class="bg-white rounded-3xl p-4 shadow mb-6 flex items-center">
      <span class="text-2xl mr-3">🔍</span>
      <input id="nuskhaSearch" type="text" placeholder="Search نسخہ..." 
             class="flex-1 bg-transparent outline-none text-lg" onkeyup="filterNuskha()">
    </div>
    <div id="nuskhaContainer" class="space-y-4"></div>
  `;

  loadNuskhaData();
}

function loadNuskhaData() {
  db.ref('nuskhas').on('value', (snapshot) => {
    nuskhaList = [];
    const data = snapshot.val() || {};

    Object.keys(data).forEach(key => {
      const item = data[key];
      item.key = key;
      item.isFavorite = localStorage.getItem('fav_' + key) === 'true';
      nuskhaList.push(item);
    });

    filteredNuskha = [...nuskhaList];
    renderNuskhaList();
  });
}

function renderNuskhaList() {
  const container = document.getElementById('nuskhaContainer');
  container.innerHTML = '';

  filteredNuskha.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = "bg-white rounded-3xl shadow p-4 flex gap-4 card cursor-pointer";
    div.innerHTML = `
      <div class="w-20 h-20 flex-shrink-0 rounded-2xl overflow-hidden">
        <img src="${item.imageUrl || 'assets/ic_nuskha.png'}" 
             class="w-full h-full object-cover">
      </div>
      <div class="flex-1 flex flex-col justify-center">
        <div class="flex justify-between items-center">
          <span class="text-[#1B5E20] font-bold text-lg">${index + 1}</span>
          
          <!-- صرف Heart Icon (Count ہٹا دیا گیا ہے) -->
          <div onclick="event.stopImmediatePropagation(); toggleFavorite('${item.key}')" 
               class="text-2xl cursor-pointer">
            ${item.isFavorite ? '❤️' : '♡'}
          </div>
        </div>
        
        <!-- صرف Title -->
        <h3 class="font-bold text-[17px] mt-2 leading-tight">${item.title || ''}</h3>
      </div>
    `;
    div.onclick = () => showNuskhaDetail(item);
    container.appendChild(div);
  });
}

function toggleFavorite(key) {
  const item = nuskhaList.find(i => i.key === key);
  if (!item) return;

  const newState = !item.isFavorite;
  item.isFavorite = newState;
  localStorage.setItem('fav_' + key, newState);

  // Firebase میں count اپ ڈیٹ (اگر بعد میں دوبارہ چاہیے تو رکھ سکتے ہیں)
  db.ref(`nuskhas/${key}/favoriteCount`).transaction((currentCount) => {
    let count = currentCount || 0;
    return newState ? count + 1 : Math.max(0, count - 1);
  });

  renderNuskhaList();   // UI ریفریش
}

function filterNuskha() {
  const query = document.getElementById('nuskhaSearch').value.toLowerCase().trim();
  if (!query) {
    filteredNuskha = [...nuskhaList];
  } else {
    filteredNuskha = nuskhaList.filter(item => 
      (item.title || '').toLowerCase().includes(query) ||
      (item.keywords || '').toLowerCase().includes(query)
    );
  }
  renderNuskhaList();
}

function showNuskhaDetail(item) {
  document.getElementById('mainContent').innerHTML = `
    <button onclick="loadPage('nuskha')" class="mb-4 text-[#1B5E20] font-bold">← واپس</button>
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