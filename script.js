// ===========================
// DATA PRODUK
// ===========================
const produkData = [
  {
    nama: "Apel Fuji Premium",
    harga: "Rp 29.900",
    hargaAsli: "Rp 45.000",
    diskon: "34%",
    img: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=400&q=80&auto=format&fit=crop"
  },
  {
    nama: "Susu Full Cream 1L",
    harga: "Rp 18.500",
    hargaAsli: "Rp 24.000",
    diskon: "23%",
    img: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&q=80&auto=format&fit=crop"
  },
  {
    nama: "Daging Ayam Segar 1kg",
    harga: "Rp 35.000",
    hargaAsli: "Rp 42.000",
    diskon: "17%",
    img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80&auto=format&fit=crop"
  },
  {
    nama: "Roti Gandum Utuh",
    harga: "Rp 22.000",
    hargaAsli: "Rp 28.000",
    diskon: "21%",
    img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80&auto=format&fit=crop"
  },
  {
    nama: "Tomat Cherry 500g",
    harga: "Rp 12.000",
    hargaAsli: "Rp 18.000",
    diskon: "33%",
    img: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&q=80&auto=format&fit=crop"
  },
  {
    nama: "Jus Jeruk Segar 1L",
    harga: "Rp 25.000",
    hargaAsli: "Rp 32.000",
    diskon: "22%",
    img: "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=400&q=80&auto=format&fit=crop"
  },
  {
    nama: "Bayam Organik 300g",
    harga: "Rp 8.500",
    hargaAsli: "Rp 13.000",
    diskon: "35%",
    img: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&q=80&auto=format&fit=crop"
  },
  {
    nama: "Keju Cheddar 200g",
    harga: "Rp 32.000",
    hargaAsli: "Rp 40.000",
    diskon: "20%",
    img: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400&q=80&auto=format&fit=crop"
  }
];

// ===========================
// RENDER PRODUK
// ===========================
function renderProduk() {
  const grid = document.getElementById('produkGrid');
  if (!grid) return;

  grid.innerHTML = produkData.map(p => `
    <div class="produk-card">
      <img src="${p.img}" alt="${p.nama}" loading="lazy" />
      <div class="produk-card-body">
        <h4>${p.nama}</h4>
        <div>
          <span class="harga">${p.harga}</span>
          <span class="harga-coret">${p.hargaAsli}</span>
        </div>
        <span class="diskon">Hemat ${p.diskon}</span>
        <button class="btn-add" onclick="addToCart('${p.nama}')">+ Keranjang</button>
      </div>
    </div>
  `).join('');
}

// ===========================
// TOAST NOTIFICATION
// ===========================
function showToast(msg) {
  let toast = document.querySelector('.toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}

// ===========================
// ADD TO CART
// ===========================
function addToCart(nama) {
  showToast(`✅ "${nama}" ditambahkan ke keranjang!`);
}

// ===========================
// NEWSLETTER FORM
// ===========================
document.addEventListener('DOMContentLoaded', () => {
  renderProduk();

  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterForm.querySelector('input').value;
      showToast(`🎉 Berhasil! Diskon 15% dikirim ke ${email}`);
      newsletterForm.reset();
    });
  }

  // ===========================
  // KONTAK FORM
  // ===========================
  const kontakForm = document.getElementById('kontakForm');
  if (kontakForm) {
    kontakForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('📩 Pesan Anda berhasil terkirim! Kami akan membalas segera.');
      kontakForm.reset();
    });
  }

  // ===========================
  // SCROLL TO TOP BUTTON
  // ===========================
  const scrollBtn = document.createElement('button');
  scrollBtn.id = 'scrollTop';
  scrollBtn.innerHTML = '↑';
  scrollBtn.title = 'Kembali ke atas';
  document.body.appendChild(scrollBtn);

  window.addEventListener('scroll', () => {
    scrollBtn.classList.toggle('visible', window.scrollY > 400);
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ===========================
  // HAMBURGER MENU (Mobile)
  // ===========================
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.style.display === 'flex';
      navLinks.style.cssText = isOpen
        ? ''
        : 'display:flex; flex-direction:column; position:absolute; top:70px; left:0; right:0; background:#fff; padding:20px 24px; gap:16px; box-shadow:0 8px 20px rgba(0,0,0,0.1); z-index:999;';
    });

    // Tutup menu saat link diklik
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.style.cssText = '';
      });
    });
  }

  // ===========================
  // NAVBAR ACTIVE LINK
  // ===========================
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
    });
    links.forEach(link => {
      link.style.color = link.getAttribute('href') === `#${current}` ? '#2ecc71' : '';
    });
  });

  // ===========================
  // SCROLL ANIMATION (Fade-in)
  // ===========================
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(
    '.kategori-card, .produk-card, .testi-card, .stat-item'
  ).forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
});

// ===========================
// CHATBOT – LANGFLOW INTEGRATION
// ===========================
(function () {
  // --- Konfigurasi Langflow ---
  const LANGFLOW_URL = 'http://localhost:7860/api/v1/run/ece96624-8b0e-4129-9657-30be9a9651b0';
  const API_KEY      = 'sk-H_XcU8IcX-0iDuvYSXcK5MbJsYKC9eH-4wjEyhKZe7g';

  // Session ID unik per kunjungan halaman
  const SESSION_ID = generateUUID();

  // --- Elemen DOM ---
  const fab         = document.getElementById('chatbot-fab');
  const win         = document.getElementById('chatbot-window');
  const closeBtn    = document.getElementById('chatbot-close');
  const form        = document.getElementById('chatbotForm');
  const input       = document.getElementById('chatbotInput');
  const sendBtn     = document.getElementById('chatbotSend');
  const msgBox      = document.getElementById('chatbotMessages');
  const typingEl    = document.getElementById('chatbotTyping');
  const statusEl    = document.getElementById('chatbotStatus');
  const notifEl     = document.getElementById('chatbotNotif');

  let isOpen   = false;
  let isBusy   = false;

  // --- UUID Generator (browser-safe) ---
  function generateUUID() {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    // Fallback untuk browser lama
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = Math.random() * 16 | 0;
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

  // --- Waktu sekarang ---
  function timeNow() {
    return new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  }

  // --- Toggle buka/tutup ---
  function toggleChat(forceOpen) {
    isOpen = forceOpen !== undefined ? forceOpen : !isOpen;
    if (isOpen) {
      win.classList.remove('chatbot-hidden');
      win.classList.add('chatbot-visible');
      fab.classList.add('open');
      notifEl.classList.add('hidden');
      input.focus();
      scrollToBottom();
    } else {
      win.classList.remove('chatbot-visible');
      win.classList.add('chatbot-hidden');
      fab.classList.remove('open');
    }
  }

  fab.addEventListener('click', () => toggleChat());
  closeBtn.addEventListener('click', () => toggleChat(false));

  // --- Tambah bubble pesan ---
  function addMessage(text, role = 'bot', isError = false) {
    const wrap   = document.createElement('div');
    wrap.className = `chat-msg ${role}`;

    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble' + (isError ? ' error' : '');
    bubble.innerHTML = formatText(text);

    const time   = document.createElement('span');
    time.className = 'chat-time';
    time.textContent = timeNow();

    wrap.appendChild(bubble);
    wrap.appendChild(time);
    msgBox.appendChild(wrap);
    scrollToBottom();
  }

  // --- Format teks (bold, newline) ---
  function formatText(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br/>');
  }

  // --- Scroll ke bawah ---
  function scrollToBottom() {
    setTimeout(() => { msgBox.scrollTop = msgBox.scrollHeight; }, 50);
  }

  // --- Typing indicator ---
  function showTyping(show) {
    typingEl.classList.toggle('active', show);
    if (show) {
      statusEl.textContent = '● Mengetik...';
      statusEl.className = 'chatbot-status typing-status';
      scrollToBottom();
    } else {
      statusEl.textContent = '● Online';
      statusEl.className = 'chatbot-status';
    }
  }

  // --- Set busy state ---
  function setBusy(busy) {
    isBusy      = busy;
    sendBtn.disabled = busy;
    input.disabled   = busy;
  }

  // --- Kirim ke Langflow ---
  async function sendToLangflow(message) {
    const payload = {
      output_type: 'chat',
      input_type:  'chat',
      input_value: message,
      session_id:  SESSION_ID
    };

    const res = await fetch(LANGFLOW_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();

    // Ambil teks balasan dari struktur respons Langflow
    return extractReply(data);
  }

  // --- Ekstrak teks dari respons Langflow ---
  function extractReply(data) {
    try {
      // Struktur: data.outputs[0].outputs[0].results.message.text
      const outputs = data?.outputs?.[0]?.outputs?.[0];
      if (outputs?.results?.message?.text) {
        return outputs.results.message.text;
      }
      // Fallback: artifacts
      if (outputs?.artifacts?.message) {
        return outputs.artifacts.message;
      }
      // Fallback: messages array
      const msgs = outputs?.messages;
      if (Array.isArray(msgs) && msgs.length > 0) {
        return msgs[0]?.message || msgs[0]?.text || JSON.stringify(msgs[0]);
      }
    } catch (_) { /* lanjut ke fallback */ }
    return 'Maaf, saya tidak dapat memproses respons saat ini.';
  }

  // --- Submit handler ---
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text || isBusy) return;

    input.value = '';
    addMessage(text, 'user');
    setBusy(true);
    showTyping(true);

    try {
      const reply = await sendToLangflow(text);
      showTyping(false);
      addMessage(reply, 'bot');
    } catch (err) {
      showTyping(false);
      console.error('[Chatbot Error]', err);

      let errMsg = '⚠️ Gagal terhubung ke asisten.';
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        errMsg = '⚠️ Tidak dapat terhubung ke server. Pastikan Langflow berjalan di localhost:7860.';
      } else if (err.message.includes('401') || err.message.includes('403')) {
        errMsg = '⚠️ API Key tidak valid atau tidak memiliki akses.';
      } else if (err.message.includes('404')) {
        errMsg = '⚠️ Flow tidak ditemukan. Periksa Flow ID Langflow Anda.';
      }
      addMessage(errMsg, 'bot', true);
    } finally {
      setBusy(false);
      input.focus();
    }
  });

  // --- Enter = kirim, Shift+Enter = newline ---
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      form.dispatchEvent(new Event('submit'));
    }
  });

  // --- Tutup dengan klik di luar ---
  document.addEventListener('click', (e) => {
    if (isOpen && !win.contains(e.target) && !fab.contains(e.target)) {
      toggleChat(false);
    }
  });

})();
