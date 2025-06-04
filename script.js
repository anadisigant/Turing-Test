let respondido = false;
let acertos = parseInt(localStorage.getItem('acertos')) || 0;
const totalPerguntas = 8;

if (!localStorage.getItem('perguntasAcertadas') || 
    !Array.isArray(JSON.parse(localStorage.getItem('perguntasAcertadas')))) {
  localStorage.setItem('perguntasAcertadas', JSON.stringify([]));
}

function verificar(elemento, isIA) {
  if (respondido) return;
  respondido = true;

  const respostas = document.querySelectorAll(".question-container p");
  const botao = document.getElementById("botaoAcao");
  const progresso = document.getElementById("progresso");
  const currentPage = parseInt(window.location.href.match(/question(\d+)/)?.[1]) || 0;

  respostas.forEach(p => {
    if (p === elemento) {
      p.classList.add(isIA ? "certa" : "errada");
      if (isIA) {
        const perguntasAcertadas = JSON.parse(localStorage.getItem('perguntasAcertadas'));
        if (!perguntasAcertadas.includes(currentPage)) {
          acertos++;
          perguntasAcertadas.push(currentPage);
          localStorage.setItem('acertos', acertos);
          localStorage.setItem('perguntasAcertadas', JSON.stringify(perguntasAcertadas));
        }
      }
    } else {
      p.classList.add("errada");
    }
  });

  botao.disabled = false;
  botao.classList.add("ativado");

  if (progresso) {
    progresso.style.width = `${(currentPage / totalPerguntas) * 100}%`;
  }

  if (isIA) {
    botao.textContent = "Próxima";
  } else {
    botao.textContent = "Tentar novamente";
    botao.onclick = () => window.location.reload();
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const currentPage = parseInt(window.location.href.match(/question(\d+)/)?.[1]) || 0;
  if (currentPage > 0) {
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.innerHTML = `
      <div class="progress" id="progresso" style="width: ${(currentPage / totalPerguntas) * 100}%"></div>
    `;
    document.querySelector('.container').prepend(progressBar);
  }
  
  if (window.location.href.includes('fim.html')) {
    const resultado = document.createElement('div');
    resultado.id = 'resultado';
    const acertosPrimeira = JSON.parse(localStorage.getItem('perguntasAcertadas')).length;
    resultado.textContent = `Você acertou ${acertosPrimeira} de ${totalPerguntas} respostas na primeira tentativa!`;
    document.querySelector('.container').appendChild(resultado);
  }
});