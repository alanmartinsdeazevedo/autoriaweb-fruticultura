document.addEventListener('DOMContentLoaded', function () {
  const projects = getProjectsFromLocalStorage();

  listarProjetos(projects);

  // Atualiza quando pesquisar
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    const filteredProjects = projects.filter(projeto => projeto.name.toLowerCase().includes(searchTerm));
    listarProjetos(filteredProjects);
  });

});

function voltarHome(){
  window.location.href = "projetos.html";
}

function getProjectsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("projects")) || [];
}

function listarProjetos(projects) {
  const projectListElement = document.getElementById('Lista');
  if (projectListElement) {
    projectListElement.innerHTML = '';

    projects.forEach(projeto => {
      const projectCard = document.createElement('div');
      projectCard.className = 'col-md-4';

      projectCard.innerHTML = `
        <div class="card project-card">
          <img src="/assets/img/Acerola.jpg" class="card-img-top" alt="Imagem do Projeto">
          <div class="card-body">
            <h5 class="card-title">${projeto.name}</h5>
            <p class="card-text">ID: ${projeto.id}</p>
            <p class="card-text">Data Final: ${projeto.endDate}</p>
            <button type="button" class="btn btn-primary" onclick="visualizar('${projeto.id}')">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar-check" viewBox="0 0 16 16">
                <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z"/>
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
              </svg>
              Visualizar
            </button>
          </div>
        </div>
      `;

      projectListElement.appendChild(projectCard);
    });
  }
}

function visualizar(projectId) {
  // Encontra o projeto pelo ID
  const projects = getProjectsFromLocalStorage();
  const project = projects.find(projeto => projeto.id === projectId);

  if (project) {
    window.location.href = `visualizar.html?id=${encodeURIComponent(projectId)}`;
  } else {
    console.error("Projeto não encontrado.");
  }
}

function login() {
  const username = document.getElementById("user").value;
  const password = document.getElementById("pass").value;

  if (username === "usuario" && password === "senha") {
    // Salva no localStorage credenciais de acesso
    localStorage.setItem("username", username);
    window.location.href = "projetos.html";
  } else {
    alert("Usuário e senha inválidos.");
  }
}

function logout() {
  localStorage.removeItem("username");
  window.location.replace("index.html");
}

function resetpass() {
  alert("Usuário: usuario\nSenha: senha");
}

function criarProjeto() {
  window.location.href = "cadastrar-projeto.html";
}

function salvarProjeto() {
  const projeto = {
    id: gerarIdUnico(),
    name: document.getElementById("projectName").value,
    startDate: document.getElementById("startDate").value,
    endDate: document.getElementById("endDate").value,
    responsible: document.getElementById("responsible").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    observations: document.getElementById("observations").value,
    sector: document.getElementById("sector").value,
    location: document.getElementById("location").value
  };

  const projects = getProjectsFromLocalStorage();

  // Adiciona novo projeto
  projects.push(projeto);

  // Salva projeto no localStorage
  localStorage.setItem("projects", JSON.stringify(projects));
  window.location.href = "projetos.html";
}

function gerarIdUnico() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}