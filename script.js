let respondido = false;

function verificar(elemento, isIA) {
  if (respondido) return;
  respondido = true;

  const respostas = document.querySelectorAll("p");
  const botao = document.getElementById("botaoAcao");

  respostas.forEach(p => {
    if (p === elemento) {
      p.classList.add(isIA ? "certa" : "errada");
    } else {
      p.classList.add("errada");
    }
  });

  botao.disabled = false;
  botao.classList.add("ativado");

  if (isIA) {
    botao.textContent = "Próxima";
    botao.onclick = () => window.location.href = 'question7.html';
  } else {
    botao.textContent = "Refazer";
    botao.onclick = () => {
      respostas.forEach(p => {
        p.classList.remove("certa", "errada");
        p.style.pointerEvents = "auto";
      });

      respondido = false;
      botao.disabled = true;
      botao.textContent = "Próxima";
      botao.classList.remove("ativado");
      botao.onclick = () => {}; 
    };
  }
}
