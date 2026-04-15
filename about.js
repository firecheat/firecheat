function loadAbout() {
  const content = document.getElementById('mainContent');
  content.innerHTML = `
    <div class="p-4">


      <div class="bg-white rounded-3xl shadow p-6 text-center mb-6">
        <img src="assets/hakeem_photo.png" class="mx-auto w-28 h-36 object-cover rounded-2xl mb-4">
        <h2 class="text-2xl font-bold text-[#1B5E20]">حکیم ناصر علی جہلم (UK)</h2>
        <p class="mt-4 text-gray-700 leading-relaxed">
          یہ نسخہ جات حکیم ناصر علی صاحب کے تجربات اور طبی معلومات پر مبنی ہیں۔ انہوں نے دیسی طب کے میدان میں قابلِ قدر خدمات انجام دی ہیں۔
        </p>
      </div>

      <div class="bg-white rounded-3xl shadow p-6">
        <h3 class="text-center text-[#1B5E20] font-bold mb-6">🌐 Social Links</h3>
        <div class="flex justify-center gap-8 flex-wrap">
          <img onclick="window.open('https://www.tiktok.com/@nasir.ali.jhelum.uk','_blank')" 
               src="assets/ic_tiktok.png" class="w-14 h-14 cursor-pointer">
          <img onclick="window.open('https://wa.me/447305924872','_blank')" 
               src="assets/ic_whatsapp.png" class="w-14 h-14 cursor-pointer">
          <img onclick="window.open('https://youtube.com/@nasiralibd157slbradford','_blank')" 
               src="assets/ic_youtube.png" class="w-14 h-14 cursor-pointer">
          <img onclick="window.open('https://www.facebook.com/share/1ArQCKUj4b/','_blank')" 
               src="assets/ic_facebook.png" class="w-14 h-14 cursor-pointer">
          <img onclick="window.open('https://www.instagram.com/invites/contact/?utm_source=ig_contact_invite&utm_medium=copy_link&utm_content=bqg54fz','_blank')" 
               src="assets/ic_instagram.png" class="w-14 h-14 cursor-pointer">
        </div>
      </div>

      <div class="text-center mt-8 text-sm text-gray-500">
        مرتّب و مدون: محمد اصغر
      </div>
    </div>
  `;
}