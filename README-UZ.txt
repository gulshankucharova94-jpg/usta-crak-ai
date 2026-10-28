USTA CRAK — AI SLAYD YARATUVCHI

Muhim: AI ishlashi uchun Google Gemini API kaliti va Cloudflare Worker kerak. API kalitini index.html yoki GitHub repo ichiga yozmang.

1) GEMINI API KALITI
- https://aistudio.google.com/ saytiga kiring.
- Google akkaunt bilan kiring va API key yarating.
- Kalitni hech kimga yubormang va GitHub'ga joylamang.
- Bepul foydalanish imkoniyati/limitlari hudud va modelga qarab o'zgarishi mumkin.

2) CLOUDFLARE WORKER (AI SERVER)
- https://dash.cloudflare.com/ ga kiring (akkaunt bo'lmasa bepul oching).
- Workers & Pages -> Create -> Create Worker.
- Worker nomini masalan usta-crak-ai qiling va deploy qiling.
- Worker sahifasida Edit code bo'limiga o'tib, worker/worker.js faylidagi butun kodni joylang va Deploy bosing.
- Worker Settings -> Variables and Secrets (yoki Settings -> Variables) bo'limida GEMINI_API_KEY nomli secret yarating, qiymatiga Google AI Studio kalitini qo'ying. Save/Deploy qiling.
- Worker URL manzilini nusxalang. Masalan: https://usta-crak-ai.<account>.workers.dev

3) HTML'NI ULASH
- index.html faylini matn muharririda oching.
- const AI_API_URL='PASTE_CLOUDFLARE_WORKER_URL_HERE'; qatorini toping.
- Ichidagi qiymatni Worker URL'ingizga almashtiring, masalan:
  const AI_API_URL='https://usta-crak-ai.example.workers.dev';
  Oxiriga /api/generate yozmang; sayt o'zi qo'shadi.

4) SUPABASE JADVALI
- https://supabase.com/dashboard/ saytida mavjud loyihangizni oching.
- SQL Editor -> New query ni bosing.
- supabase.sql fayl mazmunini joylab Run bosing.
- Authentication sozlamasida Email provider yoqilganini tekshiring.

5) GITHUB'GA JOYLASH
- GitHub'da yangi public repository yarating, masalan usta-crak.
- index.html va qolgan fayllarni repo'ga yuklang (worker papkasi ham qolishi mumkin, ammo secretni aslo joylamang).
- Settings -> Pages -> Deploy from a branch -> main -> /(root) -> Save.
- GitHub Pages URL tayyor bo'lgach, Supabase -> Authentication -> URL Configuration ichida Site URL va Redirect URLs ga shu URL'ni qo'shing.

6) SINOV
- Saytni oching, ro'yxatdan o'ting va tizimga kiring.
- Taqdimot nomi va AI mavzusini yozing, 3–20 slayd tanlang, "AI bilan slayd yaratish" ni bosing.

ESLATMA
- AI API bepul limiti kafolatlanmaydi; Google AI Studio'da mavjud limit va shartlarni tekshiring.
- Bu versiya AI orqali matnli slaydlar yaratadi va ularni Supabase'ga saqlaydi. PowerPoint (.pptx) eksporti ham mavjud; u brauzerda pptxgenjs kutubxonasini yuklaydi.
- GitHub Pages faqat statik frontend uchun. API kalit doim Cloudflare Worker secret sifatida qolishi kerak.
