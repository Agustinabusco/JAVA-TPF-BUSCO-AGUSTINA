(() => {
  const root = document.querySelector('#phishingGame');
  if (!root) return;
  const scenarios = [
    {
      sender: 'Soporte Cuenta <seguridad@cuenta-verifica.example>',
      subject: 'URGENTE: tu cuenta será bloqueada en 30 minutos',
      body: 'Detectamos actividad inusual. Para evitar la suspensión, confirmá tu contraseña desde el siguiente enlace.',
      link: 'https://verifica-cuenta.example/iniciar',
      phishing: true,
      reason: 'Usa urgencia, amenaza con bloquear la cuenta y pide ingresar credenciales mediante un enlace externo.'
    },
    {
      sender: 'Biblioteca del centro <biblioteca@centro.edu.uy>',
      subject: 'Recordatorio: devolución del libro',
      body: 'Hola. Te recordamos que el préstamo vence el viernes. Si necesitás renovarlo, podés acercarte al mostrador o responder este correo.',
      link: '',
      phishing: false,
      reason: 'No solicita datos sensibles, no incluye amenazas ni enlaces sospechosos y propone canales habituales de contacto.'
    },
    {
      sender: 'Premios Online <ganaste@regalo-inmediato.example>',
      subject: '¡Ganaste un celular! Confirmá ahora',
      body: 'Fuiste seleccionado entre miles de usuarios. Para recibir el premio necesitamos tu documento, tarjeta y dirección.',
      link: 'https://premio-inmediato.example/formulario',
      phishing: true,
      reason: 'Promete un premio inesperado y solicita varios datos personales y financieros.'
    },
    {
      sender: 'Plataforma Educativa <avisos@aula.edu.uy>',
      subject: 'Nueva actividad disponible',
      body: 'Se publicó una nueva actividad en tu curso. Ingresá a la plataforma desde el marcador que utilizás habitualmente o desde la página institucional.',
      link: '',
      phishing: false,
      reason: 'El mensaje informa sin pedir credenciales ni dirigir a un enlace acortado o extraño.'
    },
    {
      sender: 'Facturación <pagos@servicio-cliente.example>',
      subject: 'Factura vencida - último aviso',
      body: 'Tu servicio será cancelado hoy. Descargá el archivo adjunto “Factura_URGENTE.exe” para revisar el monto.',
      link: 'Adjunto: Factura_URGENTE.exe',
      phishing: true,
      reason: 'Un archivo ejecutable inesperado y el tono de amenaza son señales de alto riesgo.'
    },
    {
      sender: 'Docente <docente@liceo.edu.uy>',
      subject: 'Cambio de salón para mañana',
      body: 'La clase de mañana será en el laboratorio 2. No hace falta responder. Nos vemos a la hora habitual.',
      link: '',
      phishing: false,
      reason: 'Es un aviso simple, sin solicitud de información, archivos o enlaces que intenten llevarte a otra página.'
    }
  ];

  let index = 0;
  let score = 0;
  let locked = false;
  const sender = document.querySelector('#scenarioSender');
  const subject = document.querySelector('#scenarioSubject');
  const body = document.querySelector('#scenarioBody');
  const link = document.querySelector('#scenarioLink');
  const counter = document.querySelector('#scenarioCounter');
  const scoreEl = document.querySelector('#phishingScore');
  const feedback = document.querySelector('#phishingFeedback');
  const next = document.querySelector('#nextScenario');
  const safeBtn = document.querySelector('[data-answer="safe"]');
  const phishBtn = document.querySelector('[data-answer="phishing"]');

  function render() {
    const s = scenarios[index];
    sender.textContent = s.sender;
    subject.textContent = s.subject;
    body.textContent = s.body;
    link.textContent = s.link;
    link.closest('.link-row').hidden = !s.link;
    counter.textContent = `Situación ${index + 1} de ${scenarios.length}`;
    scoreEl.textContent = `${score} aciertos`;
    feedback.className = 'feedback-box';
    feedback.innerHTML = '';
    next.hidden = true;
    safeBtn.disabled = false;
    phishBtn.disabled = false;
    locked = false;
  }

  function answer(isPhishing) {
    if (locked) return;
    locked = true;
    const s = scenarios[index];
    const correct = s.phishing === isPhishing;
    if (correct) score++;
    feedback.className = `feedback-box show ${correct ? 'good' : 'bad'}`;
    feedback.innerHTML = `<strong>${correct ? '✅ ¡Correcto!' : '❌ No era esa opción.'}</strong><br>${s.reason}`;
    safeBtn.disabled = true;
    phishBtn.disabled = true;
    scoreEl.textContent = `${score} aciertos`;
    next.hidden = false;
    next.textContent = index === scenarios.length - 1 ? 'Ver resultado' : 'Siguiente situación';
  }

  safeBtn.addEventListener('click', () => answer(false));
  phishBtn.addEventListener('click', () => answer(true));
  next.addEventListener('click', () => {
    if (index < scenarios.length - 1) {
      index++;
      render();
    } else {
      const pct = Math.round(score / scenarios.length * 100);
      root.innerHTML = `
        <div class="result-card">
          <span class="eyebrow">Actividad completada</span>
          <div class="result-score">${score}/${scenarios.length}</div>
          <h2>${pct >= 80 ? '¡Muy buen ojo digital!' : pct >= 60 ? 'Vas por buen camino' : 'Conviene repasar las señales'}</h2>
          <p class="muted">Recordá: la urgencia, los pedidos de datos, los adjuntos inesperados y los dominios extraños son señales para detenerse y verificar.</p>
          <button class="btn btn-primary" id="restartPhishing">Volver a jugar</button>
        </div>`;
      document.querySelector('#restartPhishing').addEventListener('click', () => location.reload());
    }
  });

  render();
})();
