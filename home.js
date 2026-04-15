function loadHome() {
  const content = document.getElementById('mainContent');
  content.innerHTML = `<div id="homeSections"></div>`;
  loadHomeSections();
}

function loadHomeSections() {
  const container = document.getElementById('homeSections');
  container.innerHTML = `
    <div id="fruitsSection" class="mb-2"></div>
    <div id="nutsSection" class="mb-2"></div>
    <div id="herbsSection" class="mb-2"></div>
  `;

  loadCategorySection('fruits', 'fruitsSection');
  loadCategorySection('nuts', 'nutsSection');
  loadCategorySection('herbs', 'herbsSection');
}

function loadCategorySection(cat, sectionId) {
  const section = document.getElementById(sectionId);
  section.innerHTML = `
    <div id="${cat}Container" class="horizontal-scroll flex gap-4 pb-6 snap-x snap-mandatory overflow-x-auto"></div>
  `;

  db.ref(`herbal_book/${cat}`).on('value', (snap) => {
    const data = snap.val() || {};
    const cont = document.getElementById(`${cat}Container`);
    cont.innerHTML = '';

    Object.keys(data).forEach(key => {
      const item = data[key];
      const div = document.createElement('div');
      div.className = "min-w-[88%] card bg-white rounded-3xl shadow-lg overflow-hidden snap-start relative";
      div.innerHTML = `
        <img src="${item.imageUrl || ''}" class="w-full h-40 object-cover">

        <!-- ٹائٹل تصویر کے اوپر -->
        <div class="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/60 to-transparent p-4">
          <h3 class="font-bold text-white text-xl leading-tight drop-shadow-md">
            ${item.title || ''}
          </h3>
        </div>
      `;
      div.onclick = () => showHomeDetail(item);
      cont.appendChild(div);
    });

    // Auto Slide
    autoSlide(`${cat}Container`);
  });
}

function autoSlide(containerId) {
  const container = document.getElementById(containerId);
  let index = 0;
  setInterval(() => {
    const cards = container.children;
    if (cards.length > 0) {
      index = (index + 1) % cards.length;
      container.scrollTo({
        left: cards[index].offsetLeft,
        behavior: 'smooth'
      });
    }
  }, 3000);
}

function showHomeDetail(item) {
  document.getElementById('mainContent').innerHTML = `
    <button onclick="loadPage('home')" class="mb-4 text-[#1B5E20] font-bold text-lg">← واپس</button>
    <div class="bg-white rounded-3xl shadow-xl overflow-hidden">
      <img src="${item.imageUrl}" class="w-full h-40 object-cover">
      <div class="p-6">
        <h1 class="text-3xl font-bold mb-5">${item.title}</h1>
        <div class="text-[17px] leading-relaxed whitespace-pre-line">${(item.description || '').replace(/\\n/g, '\n')}</div>
      </div>
    </div>
  `;
}

function filterHome() {
  console.log("Home search filtering...");
}