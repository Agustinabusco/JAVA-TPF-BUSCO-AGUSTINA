(() => {
  const root = document.querySelector('#quizApp');
  if (!root) return;
  const questions = [
    {
      q: '¿Cuál de estas contraseñas es el mejor ejemplo?',
      options: ['12345678', 'Agustina2026', 'Sol-Pixel83!Bosque', 'password'],
      answer: 2,
      exp: 'Una contraseña larga, poco predecible y con variedad de caracteres suele ser más resistente.'
    },
    {
      q: 'Un correo dice que tu cuenta será bloqueada en 10 minutos y te pide iniciar sesión desde un enlace. ¿Qué conviene hacer?',
      options: ['Entrar rápido desde el enlace', 'Responder con la contraseña', 'Ir al sitio oficial por un acceso conocido y verificar', 'Reenviarlo a todos'],
      answer: 2,
      exp: 'Ante mensajes urgentes, verificá por un canal oficial en lugar de usar el enlace del mensaje.'
    },
    {
      q: '¿Qué dato deberías evitar publicar de forma abierta en redes?',
      options: ['Tu color favorito', 'Tu contraseña', 'Una canción que te gusta', 'Una materia preferida'],
      answer: 1,
      exp: 'Las contraseñas son información privada y nunca deberían compartirse.'
    },
    {
      q: '¿Qué significa activar la verificación en dos pasos?',
      options: ['Usar dos navegadores', 'Confirmar el acceso con un segundo factor además de la contraseña', 'Cambiar la contraseña dos veces', 'Cerrar sesión dos veces'],
      answer: 1,
      exp: 'La autenticación en dos pasos agrega una segunda prueba para confirmar que sos vos.'
    },
    {
      q: 'Recibís un archivo .exe inesperado por correo. ¿Cuál es la opción más segura?',
      options: ['Abrirlo para ver qué es', 'No abrirlo y verificar con el remitente por otro medio', 'Cambiarle el nombre', 'Subirlo a redes'],
      answer: 1,
      exp: 'Los archivos ejecutables inesperados pueden ser peligrosos. Primero verificá su legitimidad.'
    },
    {
      q: '¿Qué práctica es recomendable con las contraseñas?',
      options: ['Usar la misma en todo', 'Compartirla con amistades', 'Usar contraseñas diferentes en servicios importantes', 'Escribirla en un comentario público'],
      answer: 2,
      exp: 'No reutilizar la misma contraseña reduce el impacto si una cuenta se ve comprometida.'
    },
    {
      q: 'Una página pide permisos para cámara y micrófono sin necesitarlos. ¿Qué conviene hacer?',
      options: ['Aceptar siempre', 'Revisar y negar permisos innecesarios', 'Reiniciar la computadora', 'Cambiar el idioma'],
      answer: 1,
      exp: 'Los permisos deberían concederse solo cuando son necesarios para la función que querés usar.'
    },
    {
      q: '¿Cuál es la mejor reacción ante un mensaje sospechoso?',
      options: ['Actuar de inmediato', 'Detenerse, revisar remitente y verificar por otra vía', 'Enviar datos para confirmar identidad', 'Hacer clic en todos los enlaces'],
      answer: 1,
      exp: 'La pausa y la verificación son dos hábitos clave frente a engaños digitales.'
    }
  ];

  let index = 0;
  let score = 0;
  let answered = false;

  function render() {
    const q = questions[index];
    root.innerHTML = `
      <div class="scenario-top">
        <span class="pill">Pregunta ${index + 1} de ${questions.length}</span>
        <strong>${score} puntos</strong>
      </div>
      <div class="quiz-progress">${questions.map((_, i) => `<span class="${i <= index ? 'active' : ''}"></span>`).join('')}</div>
      <h2>${q.q}</h2>
      <div class="answer-list">
        ${q.options.map((op, i) => `<button class="answer-btn" data-option="${i}">${String.fromCharCode(65 + i)}) ${op}</button>`).join('')}
      </div>
      <div id="quizFeedback" class="feedback-box"></div>
      <button class="btn btn-primary" id="quizNext" hidden>${index === questions.length - 1 ? 'Ver resultado' : 'Siguiente'}</button>`;

    root.querySelectorAll('[data-option]').forEach(btn => btn.addEventListener('click', () => answer(Number(btn.dataset.option))));
  }

  function answer(choice) {
    if (answered) return;
    answered = true;
    const q = questions[index];
    const correct = choice === q.answer;
    if (correct) score++;
    const buttons = [...root.querySelectorAll('[data-option]')];
    buttons.forEach((b, i) => {
      b.disabled = true;
      if (i === q.answer) b.classList.add('correct');
      if (i === choice && !correct) b.classList.add('wrong');
    });
    const feedback = root.querySelector('#quizFeedback');
    feedback.className = `feedback-box show ${correct ? 'good' : 'bad'}`;
    feedback.innerHTML = `<strong>${correct ? '✅ Correcto.' : '❌ Incorrecto.'}</strong><br>${q.exp}`;
    const next = root.querySelector('#quizNext');
    next.hidden = false;
    next.addEventListener('click', () => {
      if (index < questions.length - 1) {
        index++;
        answered = false;
        render();
      } else finish();
    }, { once: true });
  }

  function finish() {
    const pct = Math.round(score / questions.length * 100);
    const oldBest = Number(localStorage.getItem('navegaQuizBest') || 0);
    if (score > oldBest) localStorage.setItem('navegaQuizBest', String(score));
    const best = Math.max(score, oldBest);
    let title = 'A seguir practicando';
    let badge = '🧩 Explorador digital';
    if (pct >= 88) { title = '¡Excelente trabajo!'; badge = '🛡️ Guardián digital'; }
    else if (pct >= 63) { title = '¡Muy bien!'; badge = '🔐 Navegante responsable'; }
    root.innerHTML = `
      <div class="result-card">
        <span class="eyebrow">Desafío final</span>
        <div class="result-score">${score}/${questions.length}</div>
        <h2>${title}</h2>
        <p><strong>${badge}</strong></p>
        <p class="muted">Tu mejor resultado guardado en este navegador es ${best}/${questions.length}.</p>
        <div class="hero-actions" style="justify-content:center">
          <button class="btn btn-primary" id="restartQuiz">Reintentar</button>
          <a class="btn btn-secondary" href="opinion.html">Dar mi opinión</a>
        </div>
      </div>`;
    root.querySelector('#restartQuiz').addEventListener('click', () => location.reload());
  }

  render();
})();
