function loadCategory() {
  const content = document.getElementById('mainContent');
  content.innerHTML = `
    <div class="h-[400px] flex items-center justify-center">
      <div class="bg-white rounded-3xl shadow p-10 text-center max-w-xs">
        <h2 class="text-3xl font-bold text-[#1B5E20] mb-4">Category</h2>
        <p class="text-gray-600">Coming Soon...</p>
      </div>
    </div>
  `;
}