export default {
  async fetch(request, env) {
    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };
    if (request.method === "OPTIONS") return new Response(null, { headers: cors });
    const url = new URL(request.url);
    if (url.pathname !== "/api/generate") return reply({ error: "Not found" }, 404, cors);
    if (request.method !== "POST") return reply({ error: "POST talab qilinadi" }, 405, cors);
    if (!env.GEMINI_API_KEY) return reply({ error: "Serverda GEMINI_API_KEY sozlanmagan" }, 500, cors);
    try {
      const body = await request.json();
      const topic = String(body.topic || "").trim().slice(0, 240);
      const count = Math.max(3, Math.min(20, Number(body.count) || 8));
      if (!topic) return reply({ error: "Mavzuni kiriting" }, 400, cors);
      const prompt = `Sen professional taqdimot muallifisan. Faqat o‘zbek tilida yoz. Mavzu: ${topic}. Aynan ${count} ta slayd tayyorla. Javob faqat JSON bo‘lsin, markdown ishlatma, shakli: {"slides":[{"title":"...","body":"..."}]}. Har slaydning body qismi 2-4 ta aniq, foydali jumla yoki punkt bo‘lsin. 1-slayd kirish, oxirgi slayd xulosa bo‘lsin. Faktlarni uydirma; noaniq ma’lumotlarda ehtiyotkor bo‘l.`;
      const r = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + encodeURIComponent(env.GEMINI_API_KEY), {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseMimeType: "application/json", temperature: 0.65 } })
      });
      const result = await r.json();
      if (!r.ok) return reply({ error: result.error?.message || "AI provayder xatosi" }, 502, cors);
      const raw = result.candidates?.[0]?.content?.parts?.map(p => p.text || "").join("") || "";
      let parsed;
      try { parsed = JSON.parse(raw); } catch { return reply({ error: "AI javobini o‘qib bo‘lmadi. Qayta urinib ko‘ring." }, 502, cors); }
      const slides = Array.isArray(parsed.slides) ? parsed.slides.slice(0, count).map(s => ({ title: String(s.title || "Slayd").slice(0, 120), body: String(s.body || "").slice(0, 3000) })) : [];
      if (!slides.length) return reply({ error: "AI slayd yaratmadi" }, 502, cors);
      return reply({ slides }, 200, cors);
    } catch (e) { return reply({ error: "So‘rovni bajarib bo‘lmadi. Mavzuni tekshirib, qayta urinib ko‘ring." }, 400, cors); }
  }
};
function reply(data, status, cors) { return new Response(JSON.stringify(data), { status, headers: { ...cors, "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" } }); }
