// Reemplaza este número por tu número de WhatsApp real (con código de país, ej: 57 para Colombia)
const WHATSAPP_NUMBER = "573178384796"; 

const PROYECTOS = [
  {
    id: 1,
    titulo: "Cocina Integral Isla Roble Nevado",
    categoria: "cocinas",
    categoriaLabel: "Cocinas Integrales",
    ciudad: "cali",
    ciudadLabel: "Cali • Ciudad Jardín",
    imagen: "imagenes/6.jpeg",
    descripcion: "Fabricación milimétrica en tablero hidrófugo RH acabado roble natural, herrajes Blum de cierre lento."
  },
  {
    id: 2,
    titulo: "Cocina integral Gris & Blanco Nevado",
    categoria: "Cocinas",
    categoriaLabel: "Cocinas integrales",
    ciudad: "pereira",
    ciudadLabel: "Pereira • Cerritos",
    imagen: "imagenes/5.jpeg",
    descripcion: "Fabricación milimétrica en tablero hidrófugo RH acabado Gris y blanco Nevado."
  },
  {
    id: 3,
    titulo: "Cocina Contemporánea Minimalista",
    categoria: "cocinas",
    categoriaLabel: "Cocinas Integrales",
    ciudad: "pereira",
    ciudadLabel: "Pereira • Álamos",
    imagen: "imagenes/2.jpeg",
    descripcion: "Diseño sencillo y funcional en material Hidrofugo RH acabado en Wengue."
  },
  {
    id: 4,
    titulo: "Cocina Integral barra y leds",
    categoria: "mobiliario",
    categoriaLabel: "Mobiliario & Vestiers",
    ciudad: "cali",
    ciudadLabel: "Cali • Oeste",
    imagen: "imagenes/1.jpeg",
    descripcion: "Listonado en madera natural con gestión oculta de cableado y consola suspendida a medida."
  },
  {
    id: 5,
    titulo: "Centro de TV Listonado en madera natural",
    categoria: "mobiliario",
    categoriaLabel: "Mobiliario & Vestiers",
    ciudad: "cali",
    ciudadLabel: "Cali • Oeste",
    imagen: "imagenes/baneer1.jpeg",
    descripcion: "Listonado en madera natural con gestión oculta de cableado y consola suspendida a medida."
}];

const projectsGrid = document.getElementById("projectsGrid");
const filterBtns = document.querySelectorAll(".filter-btn");

function renderProyectos(filtro = "todos") {
  projectsGrid.innerHTML = "";

  const filtrados = PROYECTOS.filter(p => {
    if (filtro === "todos") return true;
    return p.categoria === filtro || p.ciudad === filtro;
  });

  filtrados.forEach(proyecto => {
    const card = document.createElement("article");
    card.className = "project-card";
    card.innerHTML = `
      <div class="project-img-wrap">
        <img src="${proyecto.imagen}" alt="${proyecto.titulo} - Art by Wood ${proyecto.ciudadLabel}" loading="lazy">
        <span class="project-city">${proyecto.ciudadLabel}</span>
      </div>
      <div class="project-info">
        <span class="project-cat">${proyecto.categoriaLabel}</span>
        <h3>${proyecto.titulo}</h3>
        <p>${proyecto.descripcion}</p>
      </div>
    `;
    card.addEventListener("click", () => abrirModal(proyecto));
    projectsGrid.appendChild(card);
  });
}

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderProyectos(btn.dataset.filter);
  });
});

const modal = document.getElementById("projectModal");
const modalClose = document.getElementById("modalClose");

function abrirModal(proyecto) {
  document.getElementById("modalImg").src = proyecto.imagen;
  document.getElementById("modalMeta").textContent = `${proyecto.categoriaLabel} • ${proyecto.ciudadLabel}`;
  document.getElementById("modalTitle").textContent = proyecto.titulo;
  document.getElementById("modalDesc").textContent = proyecto.descripcion;

  const textoWs = encodeURIComponent(`Hola Art by Wood, me interesa cotizar un proyecto similar a "${proyecto.titulo}" (${proyecto.ciudadLabel}).`);
  document.getElementById("modalWhatsapp").href = `https://wa.me/${WHATSAPP_NUMBER}?text=${textoWs}`;

  modal.classList.add("open");
}

modalClose.addEventListener("click", () => modal.classList.remove("open"));
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.remove("open");
});

document.getElementById("quoteForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value.trim();
  const ciudad = document.getElementById("ciudad").value;
  const tipo = document.getElementById("tipo").value;
  const detalles = document.getElementById("detalles").value.trim();

  const mensaje = `Hola *Art by Wood*, deseo solicitar una cotización:\n\n` +
                  `• *Nombre:* ${nombre}\n` +
                  `• *Ciudad:* ${ciudad}\n` +
                  `• *Proyecto:* ${tipo}\n` +
                  `• *Detalles:* ${detalles || "Solicito asesoría y visita técnica"}`;

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(mensaje)}`, "_blank");
});

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => navLinks.classList.remove("active"));
});

renderProyectos();