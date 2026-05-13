/**
 * Retno AI Chatbot - Powered by Google Gemini
 * Answers questions about Retno Pebriana's portfolio
 */

(function () {
  'use strict';

  /* ─────────────────────────────────────────────
     CONFIG
  ───────────────────────────────────────────── */
  const GEMINI_API_KEY = 'AIzaSyAR6DxNQcGmbheO3SK2r_njsic_5-bD8Iw';
  const GEMINI_ENDPOINT =
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

  /* Portfolio knowledge base injected as system context */
  const SYSTEM_PROMPT = `Kamu adalah asisten AI yang ramah dan profesional bernama "Retno AI", 
  yang khusus membantu pengunjung mempelajari portofolio Retno Pebriana.
  
  Berikut adalah informasi lengkap tentang Retno Pebriana yang harus kamu gunakan untuk menjawab:

  ## Profil
  - Nama: Retno Pebriana
  - Profesi: Network Engineer
  - Pengalaman: 5+ tahun di instansi pemerintah
  - Network Uptime yang berhasil dijaga: 99.9%
  - Keahlian utama: merancang, mengimplementasikan, dan mengelola infrastruktur jaringan skala menengah hingga besar.

  ## Keahlian Teknis (Technical Skills)
  ### Routing & Switching
  - Cisco IOS
  - MikroTik RouterOS
  - OSPF / BGP
  - VLAN / STP

  ### Security & Firewall
  - Fortinet FortiGate
  - Palo Alto
  - VPN (IPsec/SSL)
  - IDS/IPS

  ### Server & Infrastructure
  - Linux (Ubuntu/CentOS)
  - Windows Server
  - VMware ESXi
  - Proxmox VE

  ### Monitoring & Tools
  - Zabbix
  - PRTG
  - Wireshark
  - Grafana

  ## Proyek Unggulan (Featured Projects)
  1. **Migrasi Infrastruktur Jaringan Instansi**
     - Memimpin migrasi dari arsitektur jaringan flat ke desain hierarkis yang lebih aman
     - Implementasi VLAN dan inter-VLAN routing
     - Implementasi redundansi link
     - Teknologi: Cisco Catalyst, HSRP, OSPF

  2. **Implementasi Enterprise Firewall & VPN**
     - Deployment Fortinet FortiGate untuk mengamankan perimeter jaringan instansi
     - Konfigurasi IPsec VPN untuk konektivitas aman antar kantor cabang
     - Teknologi: Fortinet, IPsec VPN, Web Filtering

  3. **Network Monitoring System dengan Zabbix**
     - Membangun sistem pemantauan proaktif terpusat menggunakan Zabbix dan Grafana
     - Memantau lebih dari 100+ perangkat jaringan dan server
     - Mengurangi waktu respons insiden
     - Teknologi: Zabbix, SNMP, Linux

  ## Kontak
  - Email: retno.pebrian56@gmail.com
  - LinkedIn: https://www.linkedin.com/in/retno-pebriana-46a46468/
  - GitHub: https://github.com/wudexter

  ## Cara Menjawab nya
  - Selalu ramah, sopan, dan profesional
  - Jawab dalam bahasa yang sama dengan pertanyaan pengunjung (Indonesia atau Inggris)
  - Jika ada pertanyaan di luar topik portofolio, jawab dengan sopan bahwa kamu hanya bisa membantu seputar informasi portofolio Retno Pebriana
  - Gunakan emoji sesekali agar percakapan lebih menyenangkan
  - Jawaban singkat dan jelas, tidak terlalu panjang kecuali diminta detail
  - Jika ditanya siapa kamu, jawab bahwa kamu adalah Retno AI, asisten virtual untuk portofolio Retno Pebriana`;

  /* ─────────────────────────────────────────────
     CONVERSATION HISTORY
  ───────────────────────────────────────────── */
  let conversationHistory = [];

  /* ─────────────────────────────────────────────
     QUICK REPLIES / SUGGESTIONS
  ───────────────────────────────────────────── */
  const QUICK_REPLIES = [
    'Apa saja keahlian Retno?',
    'Ceritakan proyek Retno',
    'Bagaimana cara menghubungi Retno?',
    'Berapa tahun pengalaman Retno?',
  ];

  /* ─────────────────────────────────────────────
     RENDER CHATBOT HTML
  ───────────────────────────────────────────── */
  function renderChatbot() {
    const html = `
      <!-- Chatbot Toggle Button -->
      <button id="chatbot-toggle" class="chatbot-toggle" aria-label="Open AI Chatbot" aria-expanded="false">
        <svg id="chatbot-icon-open" class="chatbot-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
        </svg>
        <svg id="chatbot-icon-close" class="chatbot-icon chatbot-icon--hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
        <span class="chatbot-badge" id="chatbot-badge" aria-live="polite"></span>
      </button>

      <!-- Chatbot Window -->
      <div id="chatbot-window" class="chatbot-window" role="dialog" aria-label="Retno AI Chatbot" aria-hidden="true">
        <!-- Header -->
        <div class="chatbot-header">
          <div class="chatbot-avatar" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1 1 .03 2.703-1.352 2.703a54.54 54.54 0 01-3.65-.222M5 14.5l-1.402 1.402C2.598 16.904 3.568 18.607 4.95 18.607c1.218 0 2.437-.074 3.65-.222m0 0a48.108 48.108 0 013.8 0"/>
            </svg>
          </div>
          <div class="chatbot-header-info">
            <span class="chatbot-name">Retno AI</span>
            <span class="chatbot-status">
              <span class="chatbot-status-dot"></span>
              Online &bull; Powered by Gemini
            </span>
          </div>
          <button class="chatbot-minimize" id="chatbot-minimize" aria-label="Minimize chatbot">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
        </div>

        <!-- Messages -->
        <div class="chatbot-messages" id="chatbot-messages" aria-live="polite" aria-relevant="additions">
          <!-- Welcome message injected by JS -->
        </div>

        <!-- Quick Replies -->
        <div class="chatbot-quick-replies" id="chatbot-quick-replies" aria-label="Quick reply suggestions">
        </div>

        <!-- Input Area -->
        <div class="chatbot-input-area">
          <textarea
            id="chatbot-input"
            class="chatbot-input"
            placeholder="Tanya seputar portofolio Retno..."
            rows="1"
            maxlength="500"
            aria-label="Type your message"
          ></textarea>
          <button id="chatbot-send" class="chatbot-send" aria-label="Send message" disabled>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
            </svg>
          </button>
        </div>
        <p class="chatbot-footer">AI dapat membuat kesalahan. Verifikasi informasi penting.</p>
      </div>
    `;

    const wrapper = document.createElement('div');
    wrapper.className = 'chatbot-wrapper';
    wrapper.innerHTML = html;
    document.body.appendChild(wrapper);
  }

  /* ─────────────────────────────────────────────
     DOM REFERENCES (set after render)
  ───────────────────────────────────────────── */
  let toggleBtn, chatWindow, messagesContainer, inputEl, sendBtn,
    quickRepliesContainer, badge, iconOpen, iconClose;

  function grabRefs() {
    toggleBtn = document.getElementById('chatbot-toggle');
    chatWindow = document.getElementById('chatbot-window');
    messagesContainer = document.getElementById('chatbot-messages');
    inputEl = document.getElementById('chatbot-input');
    sendBtn = document.getElementById('chatbot-send');
    quickRepliesContainer = document.getElementById('chatbot-quick-replies');
    badge = document.getElementById('chatbot-badge');
    iconOpen = document.getElementById('chatbot-icon-open');
    iconClose = document.getElementById('chatbot-icon-close');
  }

  /* ─────────────────────────────────────────────
     OPEN / CLOSE
  ───────────────────────────────────────────── */
  let isOpen = false;

  function openChat() {
    isOpen = true;
    chatWindow.classList.add('chatbot-window--open');
    chatWindow.setAttribute('aria-hidden', 'false');
    toggleBtn.setAttribute('aria-expanded', 'true');
    iconOpen.classList.add('chatbot-icon--hidden');
    iconClose.classList.remove('chatbot-icon--hidden');
    badge.textContent = '';
    badge.classList.remove('chatbot-badge--visible');
    // Focus input
    setTimeout(() => inputEl.focus(), 300);
    scrollToBottom();
  }

  function closeChat() {
    isOpen = false;
    chatWindow.classList.remove('chatbot-window--open');
    chatWindow.setAttribute('aria-hidden', 'true');
    toggleBtn.setAttribute('aria-expanded', 'false');
    iconOpen.classList.remove('chatbot-icon--hidden');
    iconClose.classList.add('chatbot-icon--hidden');
  }

  /* ─────────────────────────────────────────────
     MESSAGES
  ───────────────────────────────────────────── */
  function createMessageEl(role) {
    const wrapper = document.createElement('div');
    wrapper.className = `chatbot-msg chatbot-msg--${role}`;

    if (role === 'bot') {
      const avatar = document.createElement('div');
      avatar.className = 'chatbot-msg-avatar';
      avatar.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1 1 .03 2.703-1.352 2.703a54.54 54.54 0 01-3.65-.222M5 14.5l-1.402 1.402C2.598 16.904 3.568 18.607 4.95 18.607c1.218 0 2.437-.074 3.65-.222m0 0a48.108 48.108 0 013.8 0"/></svg>`;
      wrapper.appendChild(avatar);
    }

    const bubble = document.createElement('div');
    bubble.className = 'chatbot-msg-bubble';
    wrapper.appendChild(bubble);

    return { wrapper, bubble };
  }

  function appendMessage(role, text) {
    const { wrapper, bubble } = createMessageEl(role);
    bubble.innerHTML = formatText(text);
    messagesContainer.appendChild(wrapper);
    scrollToBottom();

    // Pulse badge when closed
    if (!isOpen && role === 'bot') {
      badge.textContent = '1';
      badge.classList.add('chatbot-badge--visible');
    }

    return bubble;
  }

  /* Typing indicator */
  function showTyping() {
    const { wrapper, bubble } = createMessageEl('bot');
    bubble.innerHTML = `<span class="chatbot-typing"><span></span><span></span><span></span></span>`;
    wrapper.id = 'chatbot-typing-indicator';
    messagesContainer.appendChild(wrapper);
    scrollToBottom();
  }

  function hideTyping() {
    const el = document.getElementById('chatbot-typing-indicator');
    if (el) el.remove();
  }

  /* Typewriter effect */
  function typeText(bubble, text, speed = 15) {
    return new Promise((resolve) => {
      const formatted = formatText(text);
      bubble.innerHTML = '';
      // Use innerHTML approach with a temp container
      const temp = document.createElement('div');
      temp.innerHTML = formatted;
      const fullText = temp.textContent;

      let i = 0;
      bubble.innerHTML = formatted; // set final for formatting
      bubble.style.opacity = '0';

      // Simple fade in instead of char-by-char (to preserve HTML formatting)
      requestAnimationFrame(() => {
        bubble.style.transition = 'opacity 0.4s ease';
        bubble.style.opacity = '1';
        scrollToBottom();
        setTimeout(resolve, 400);
      });
    });
  }

  /* Simple markdown-like formatter */
  function formatText(text) {
    return text
      // Bold **text**
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Italic *text*
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Code `code`
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      // Newlines
      .replace(/\n/g, '<br>')
      // Bullet lists starting with -
      .replace(/^- (.+)/gm, '• $1');
  }

  function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  /* ─────────────────────────────────────────────
     QUICK REPLIES
  ───────────────────────────────────────────── */
  function renderQuickReplies(replies) {
    quickRepliesContainer.innerHTML = '';
    replies.forEach((reply) => {
      const btn = document.createElement('button');
      btn.className = 'chatbot-quick-reply-btn';
      btn.textContent = reply;
      btn.addEventListener('click', () => {
        quickRepliesContainer.innerHTML = '';
        handleUserMessage(reply);
      });
      quickRepliesContainer.appendChild(btn);
    });
  }

  /* ─────────────────────────────────────────────
     GEMINI API CALL
  ───────────────────────────────────────────── */
  async function callGemini(userMessage) {
    // Add user message to history
    conversationHistory.push({
      role: 'user',
      parts: [{ text: userMessage }]
    });

    const body = {
      system_instruction: {
        parts: [{ text: SYSTEM_PROMPT }]
      },
      contents: conversationHistory,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 500,
        topK: 40,
        topP: 0.95
      },
      safetySettings: [
        { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
        { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' }
      ]
    };

    const response = await fetch(GEMINI_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData?.error?.message || `HTTP ${response.status}`);
    }

    const data = await response.json();
    const botText = data?.candidates?.[0]?.content?.parts?.[0]?.text
      || 'Maaf, saya tidak dapat merespons saat ini. Silakan coba lagi. 🙏';

    // Add bot response to history
    conversationHistory.push({
      role: 'model',
      parts: [{ text: botText }]
    });

    return botText;
  }

  /* ─────────────────────────────────────────────
     HANDLE USER MESSAGE
  ───────────────────────────────────────────── */
  let isBotTyping = false;

  async function handleUserMessage(text) {
    const trimmed = text.trim();
    if (!trimmed || isBotTyping) return;

    isBotTyping = true;
    sendBtn.disabled = true;
    inputEl.value = '';
    autoResize(inputEl);
    quickRepliesContainer.innerHTML = '';

    // Show user message
    appendMessage('user', trimmed);

    // Show typing indicator
    showTyping();
    scrollToBottom();

    try {
      const botReply = await callGemini(trimmed);
      hideTyping();
      const { wrapper, bubble } = createMessageEl('bot');
      messagesContainer.appendChild(wrapper);
      await typeText(bubble, botReply);
      scrollToBottom();

      // Pulse badge if chat closed
      if (!isOpen) {
        badge.textContent = '1';
        badge.classList.add('chatbot-badge--visible');
      }
    } catch (err) {
      hideTyping();
      console.error('[Retno AI] Gemini error:', err);
      appendMessage('bot', `Maaf, terjadi kesalahan saat menghubungi AI. Silakan coba lagi dalam beberapa saat. 🙏\n\n_(Error: ${err.message})_`);
    } finally {
      isBotTyping = false;
      if (inputEl.value.trim().length > 0) {
        sendBtn.disabled = false;
      }
    }
  }

  /* ─────────────────────────────────────────────
     INPUT HANDLING
  ───────────────────────────────────────────── */
  function autoResize(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
  }

  /* ─────────────────────────────────────────────
     WELCOME MESSAGE
  ───────────────────────────────────────────── */
  function sendWelcomeMessage() {
    const welcomeText = `Halo! 👋 Saya **Retno AI**, asisten virtual portofolio Retno Pebriana.\n\nSaya siap membantu kamu mengenal lebih jauh tentang keahlian, pengalaman, dan proyek-proyek yang telah dikerjakan Retno. Ada yang bisa saya bantu? 😊`;
    appendMessage('bot', welcomeText);
    renderQuickReplies(QUICK_REPLIES);
  }

  /* ─────────────────────────────────────────────
     EVENT LISTENERS
  ───────────────────────────────────────────── */
  function bindEvents() {
    // Toggle open/close
    toggleBtn.addEventListener('click', () => {
      if (isOpen) {
        closeChat();
      } else {
        openChat();
      }
    });

    // Minimize button
    document.getElementById('chatbot-minimize').addEventListener('click', closeChat);

    // Send button
    sendBtn.addEventListener('click', () => {
      handleUserMessage(inputEl.value);
    });

    // Input: enable/disable send, auto-resize, Enter to send
    inputEl.addEventListener('input', () => {
      sendBtn.disabled = inputEl.value.trim().length === 0 || isBotTyping;
      autoResize(inputEl);
    });

    inputEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (!sendBtn.disabled) {
          handleUserMessage(inputEl.value);
        }
      }
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeChat();
        toggleBtn.focus();
      }
    });

    // Click outside to close
    document.addEventListener('click', (e) => {
      if (isOpen && !chatWindow.contains(e.target) && !toggleBtn.contains(e.target)) {
        closeChat();
      }
    });
  }

  /* ─────────────────────────────────────────────
     INIT
  ───────────────────────────────────────────── */
  function init() {
    renderChatbot();
    grabRefs();
    bindEvents();
    sendWelcomeMessage();

    // Show pulse badge after 3 seconds to attract attention
    setTimeout(() => {
      if (!isOpen) {
        badge.textContent = '1';
        badge.classList.add('chatbot-badge--visible');
      }
    }, 3000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
