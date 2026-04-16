//hamburguer
const hamburger = document.getElementById("hamburger")
const mobileMenu = document.getElementById("mobile-menu")
const mobileLinks = document.querySelectorAll(".mobile-link")

// Toggle open/close
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("open")
  mobileMenu.classList.toggle("open")
})

// Close menu when a link is clicked
mobileLinks.forEach(link => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("open")
    mobileMenu.classList.remove("open")
  })
})

// Active section tracking — works for both desktop and mobile links
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

  window.addEventListener('scroll', updateActiveLink)
  updateActiveLink()
}
// rolagem suave das logos dos clientes
const sections = document.querySelectorAll('.fade-in-section');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
        });
    }, {
        threshold: 0.2
    });

    sections.forEach(section => {
        observer.observe(section);
    });

// rolagem suave dos projetos
document.addEventListener("DOMContentLoaded", function () {

  const reveals = document.querySelectorAll('.reveal');

  function revealOnScroll() {
    const windowHeight = window.innerHeight;

    reveals.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;

      if (elementTop < windowHeight - 100) {
        el.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // já ativa ao carregar

});

//filtro - julho das pretas
const items = document.querySelectorAll('.video-item');
const modal_julho = document.getElementById('videoModal');
const player = document.getElementById('videoPlayer');
const closeBtn = document.querySelector('.close-video');

// abrir vídeo
items.forEach(item => {
  item.addEventListener('click', () => {
    const videoSrc = item.getAttribute('data-video');
    player.src = videoSrc;
    modal_julho.style.display = 'flex';
  });
});

// fechar
closeBtn.addEventListener('click', () => {
  modal_julho.style.display = 'none';
  player.pause();
});

// fechar clicando fora
modal_julho.addEventListener('click', (e) => {
  if (e.target !== player) {
    modal_julho.style.display = 'none';
    player.pause();
  }
});

//envio de e-mail em contato
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


//fotografias
const images = document.querySelectorAll(".carousel-img");
const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox-img");

let currentIndex = 0;

// abrir
images.forEach((img, index) => {
  img.addEventListener("click", () => {
    lightbox.classList.add("active");
    lightboxImg.src = img.src;
    currentIndex = index;
  });
});

// fechar
document.querySelector(".close-lightbox").onclick = () => { //alterado de .close para .close-lightbox
  lightbox.classList.remove("active");
};

// próxima
document.querySelector(".nav-btn.next").onclick = () => { //adicionado .nav-btn. O que era .next mudou para .nav-btn.next
  currentIndex = (currentIndex + 1) % images.length;
  lightboxImg.src = images[currentIndex].src;
};

// anterior
document.querySelector(".nav-btn.prev").onclick = () => { //adicionado .nav-btn. O que era .next mudou para .nav-btn.prev
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  lightboxImg.src = images[currentIndex].src;
};
