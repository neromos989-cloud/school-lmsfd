/* School lms: Jendela AI auto guru.
   Taruh file ini di repo aplikasi, lalu tambahkan sebelum </body>:
   <script src="school-lms-ai.js" defer></script> */

(function () {
  "use " + "strict";

  // --- PENGATURAN: URL Worker sudah terpasang otomatis ---
  const CONFIG = {
    API_URL: "https://steep-cake-fe3e.neromos989.workers.dev",
    QUESTION_SELECTOR: "",
    AUTO_ANSWER: true,
    MAX_IMAGES: 20,
    TITLE: "School Lms",
    // Mode guru diaktifkan permanen agar widget selalu muncul
    isTeacher: () => true,
  };

  if (!CONFIG.isTeacher()) return;
  if (document.getElementById("slms")) return;

  const css = `
#slms { position: fixed; right: 10px; bottom: 10px; width: min(380px, calc(100vw - 20px)); height: 120px; min-width: 240px; min-height: 90px; max-width: calc(100vw - 20px); max-height: 90vh; display: flex; flex-direction: column; overflow: hidden; resize: both; background: #16352b; color: #eef6f1; border: 1px solid #4c6f61; border-radius: 8px; box-sizing: border-box; z-index: 999999; font-family: system-ui, sans-serif; }
#slms * { box-sizing: border-box; }
#slms-min { width: 52px !important; height: 52px !important; min-width: 0; min-height: 0; border-radius: 50%; resize: none; bottom: 20px !important; right: 20px !important; }
#slms-min .slms-hd { padding: 0; height: 100%; justify-content: center; border-bottom: 0; }
#slms-min .slms-robot { display: block; }
#slms-hd { display: flex; align-items: center; gap: 8px; padding: 8px 10px; cursor: grab; touch-action: none; user-select: none; border-bottom: 1px solid rgba(255,255,255,.1); }
#slms-hd strong { flex: 1; font-size: 14px; }
#slms button { font: inherit; padding: 4px 10px; border-radius: 4px; border: 1px solid rgba(255,255,255,.35); background: transparent; color: inherit; cursor: pointer; }
#slms-body { flex: 1; overflow: auto; padding: 12px; }
#slms-ctl { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; font-size: 12px; margin-bottom: 8px; }
#slms-ctl label { display: flex; align-items: center; gap: 6px; }
#slms-out { white-space: pre-wrap; word-break: break-word; margin: 0; font: inherit; font-size: 14px; }
#slms-st { font-size: 12px; opacity: .85; margin-top: 8px; }
  `;

  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);

  const root = document.createElement("div");
  root.id = "slms";
  root.setAttribute("role", "complementary");
  root.innerHTML = `
    <div class="slms-hd">
      <svg class="slms-robot" viewBox="0 0 32 32" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 3v5"/><circle cx="16" cy="4" r="1.5"/><rect x="6" y="8" width="20" height="17" rx="4"/><circle cx="11" cy="14" r="2"/><circle cx="21" cy="14" r="2"/><path d="M11 19h10"/></svg>
      <strong>${CONFIG.TITLE}</strong>
      <button class="slms-min" type="button" aria-label="Kecilkan jendela">Kecilkan</button>
    </div>
    <div class="slms-body">
      <div class="slms-ctl">
        <label><input type="checkbox" class="slms-auto"> Jawab otomatis</label>
        <label>Transparansi <input type="range" class="slms-op" min="40" max="100" value="100"></label>
        <button class="slms-ask" type="button">Jawab sekarang</button>
        <button class="slms-img" type="button">Tambah gambar</button>
        <input type="file" class="slms-file" accept="image/*" hidden>
      </div>
      <pre class="slms-out"></pre>
      <div class="slms-st" role="status"></div>
    </div>
  `;
  document.body.appendChild(root);

  const minBtn = root.querySelector(".slms-min");
  minBtn.addEventListener("click", () => {
    root.classList.toggle("is-minened");
    if (root.classList.contains("is-minened")) {
      root.id = "slms-min";
      minBtn.textContent = "Buka";
    } else {
      root.id = "slms";
      minBtn.textContent = "Kecilkan";
    }
  });

  const opInput = root.querySelector(".slms-op");
  opInput.addEventListener("input", (e) => {
    root.style.opacity = e.target.value / 100;
  });
})();