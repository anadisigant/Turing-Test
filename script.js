let respondido = false;

function verificar(elemento, isIA) {
  if (respondido) return;
  respondido = true;

  const respostas = document.querySelectorAll("p");
  respostas.forEach(p => {
    if (p === elemento) {
      p.classList.add(isIA ? "certa" : "errada");
    } else {
      p.classList.add("errada");
    }
  });
}
