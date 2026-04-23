// ── MENU HAMBURGUER ──────────────────────────────────────────
const hamburger = document.getElementById("hamburger")
const mobileMenu = document.getElementById("mobile-menu")
const mobileLinks = document.querySelectorAll(".mobile-link")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open")
  mobileMenu.classList.toggle("open")
})

mobileLinks.forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open")
    mobileMenu.classList.remove("open")
  })
})

// ── LINK ATIVO NO MENU (scroll) ──────────────────────────────
// CORREÇÃO: função agora é registrada no evento de scroll
const sectionshambu = document.querySelectorAll("section[id]")
const allNavLinks = document.querySelectorAll(".nav-link, .mobile-link")

function updateActiveLink() {
  let current = ""
  const scrollY = window.scrollY + 120

  sectionshambu.forEach(section => {
    if (scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight) {
      current = section.id
    }
  })

  if (window.scrollY < 80) current = "hero"

  allNavLinks.forEach(link => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
}

// CORREÇÃO: listener de scroll adicionado + chamada inicial
window.addEventListener("scroll", updateActiveLink)
updateActiveLink()


// ── ANIMAÇÕES DE ENTRADA (IntersectionObserver unificado) ─────
// CORREÇÃO: substituiu dois sistemas separados por um único observer
const animatedEls = document.querySelectorAll(".fade-in-section, .reveal, .reveal-section")

const appearObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
      // só adiciona 'active' se NÃO for elemento de tab do Bootstrap
      if (!entry.target.closest('#galeriaTabContent') && !entry.target.matches('[role="tabpanel"]')) {
        entry.target.classList.add("active")
      }
    }
  })
}, { threshold: 0.15 })

animatedEls.forEach(el => appearObserver.observe(el))


// ── MODAL DE VÍDEO ────────────────────────
const videoItems = document.querySelectorAll(".video-item")
const modal_julho = document.getElementById("videoModal")
const player = document.getElementById("videoPlayer")
const closeVideoBtn = document.querySelector(".close-video")

if (modal_julho && player && closeVideoBtn) {
  videoItems.forEach(item => {
    item.addEventListener("click", () => {
      const videoSrc = item.getAttribute("data-video")
      player.src = videoSrc
      modal_julho.style.display = "flex"
    })
  })

  closeVideoBtn.addEventListener("click", () => {
    modal_julho.style.display = "none"
    player.pause()
  })

  modal_julho.addEventListener("click", (e) => {
    if (e.target !== player) {
      modal_julho.style.display = "none"
      player.pause()
    }
  })
}

// filtros options
const select = document.getElementById("galeriaSelect")

if (select) {

  function ativarTab(value) {
    // remove active de todas
    document.querySelectorAll(".tab-pane").forEach(tab => {
      tab.classList.remove("show", "active")
    })

    // ativa a correta
    const target = document.getElementById(value)
    if (target) {
      target.classList.add("show", "active")

      // 🔥 reinicia animação do carrossel (UX premium)
      const track = target.querySelector(".carousel-track")
      if (track) {
        track.style.animation = "none"
        track.offsetHeight
        track.style.animation = null
      }
    }
  }

  // ao trocar select
  select.addEventListener("change", function () {
    ativarTab(this.value)
  })

  // 🔥 ativa automaticamente ao carregar
  ativarTab(select.value)
}


// ── ENVIO DE E-MAIL ───────────────────────────────────────────
;(function () {
  emailjs.init("OWAV8An8xJOTrV5pt")
})()

const form = document.getElementById("contact-form")
const modal = document.getElementById("success-modal")

if (form && modal) {
  form.addEventListener("submit", function (e) {
    e.preventDefault()

    const btn = form.querySelector(".btn-submit")
    btn.innerText = "Enviando..."
    btn.disabled = true

    const params = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
      time: new Date().toLocaleString(),
    }

    emailjs
      .send("service_989692", "template_989692", params)
      .then(() => {
        modal.classList.add("active")
        form.reset()
        btn.innerText = "Enviar Mensagem"
        btn.disabled = false
      })
      .catch((error) => {
        alert("Erro ao enviar. Tente novamente.")
        console.error(error)
        btn.innerText = "Enviar Mensagem"
        btn.disabled = false
      })
  })

  const closeModalBtn = document.getElementById("close-modal")
  const confirmModalBtn = document.getElementById("modal-confirm-btn")

  if (closeModalBtn) closeModalBtn.onclick = () => modal.classList.remove("active")
  if (confirmModalBtn) confirmModalBtn.onclick = () => modal.classList.remove("active")
}


// ── LIGHTBOX DE FOTOGRAFIAS ───────────────────────────────────
// CORREÇÃO: seletores corrigidos (.close-lightbox, .nav-btn.next, .nav-btn.prev)
// CORREÇÃO: imagens filtradas pelo tab ativo para índice correto

const lightbox = document.querySelector(".lightbox")
const lightboxImg = document.querySelector(".lightbox-img")
const closeLightboxBtn = document.querySelector(".close-lightbox")
const nextBtn = document.querySelector(".nav-btn.next")
const prevBtn = document.querySelector(".nav-btn.prev")

let currentIndex = 0
let activeImages = []

function openLightbox(imgs, index) {
  activeImages = imgs
  currentIndex = index
  lightboxImg.src = activeImages[currentIndex].src
  lightbox.classList.add("active")
}

// Delega o clique para capturar imagens do tab ativo no momento do clique
document.addEventListener("click", (e) => {
  const carouselImg = e.target.closest(".carousel-img, .logo-img, .logofolio-img")
  if (carouselImg) {
  const tabPane = carouselImg.closest(".tab-pane")
  const imgs = tabPane
    ? Array.from(tabPane.querySelectorAll(".carousel-img, .logo-img, .logofolio-img"))
    : Array.from(document.querySelectorAll(".carousel-img, .logo-img, .logofolio-img"))
  const index = imgs.indexOf(carouselImg)
  if (index !== -1) openLightbox(imgs, index)
  return
  }

  // cards do portfólio
  const cardImg = e.target.closest(".card-img")
  if (cardImg) {
    const img = cardImg.querySelector(".card-lightbox-img")
    if (!img) return
    const allCards = Array.from(document.querySelectorAll(".card-img .card-lightbox-img"))
    const index = allCards.indexOf(img)
    if (index !== -1) openLightbox(allCards, index)
    return
  }
  
})

if (closeLightboxBtn) {
  closeLightboxBtn.onclick = () => lightbox.classList.remove("active")
}

if (nextBtn) {
  nextBtn.onclick = () => {
    currentIndex = (currentIndex + 1) % activeImages.length
    lightboxImg.src = activeImages[currentIndex].src
  }
}

if (prevBtn) {
  prevBtn.onclick = () => {
    currentIndex = (currentIndex - 1 + activeImages.length) % activeImages.length
    lightboxImg.src = activeImages[currentIndex].src
  }
}

if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) lightbox.classList.remove("active")
  })
}
