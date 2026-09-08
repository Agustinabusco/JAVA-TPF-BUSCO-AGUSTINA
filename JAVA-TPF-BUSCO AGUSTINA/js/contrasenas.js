(() => {
  const input = document.querySelector('#passwordDemo');
  if (!input) return;
  const bar = document.querySelector('#strengthBar');
  const label = document.querySelector('#strengthLabel');
  const tips = document.querySelector('#strengthTip');
  const toggle = document.querySelector('#togglePassword');
  const generate = document.querySelector('#generatePassword');
  const clear = document.querySelector('#clearPassword');

  const checks = {
    long: document.querySelector('[data-check="long"]'),
    upper: document.querySelector('[data-check="upper"]'),
    lower: document.querySelector('[data-check="lower"]'),
    number: document.querySelector('[data-check="number"]'),
    symbol: document.querySelector('[data-check="symbol"]'),
    personal: document.querySelector('[data-check="personal"]')
  };

  const common = /(1234|password|contrase|qwerty|admin|agustina|uruguay|2026)/i;

  function analyze(value) {
    const rules = {
      long: value.length >= 12,
      upper: /[A-ZÁÉÍÓÚÜÑ]/.test(value),
      lower: /[a-záéíóúüñ]/.test(value),
      number: /\d/.test(value),
      symbol: /[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ0-9\s]/.test(value),
      personal: value.length > 0 && !common.test(value)
    };
    Object.entries(rules).forEach(([key, met]) => checks[key]?.classList.toggle('met', met));
    const score = Object.values(rules).filter(Boolean).length;

    let level = 0, text = 'Sin analizar', width = 0, color = 'var(--danger)', tip = 'Escribí una contraseña de ejemplo para analizarla.';
    if (value.length) {
      if (score <= 2) { level = 1; text = 'Muy débil'; width = 24; color = 'var(--danger)'; tip = 'Sumá longitud y combiná distintos tipos de caracteres.'; }
      else if (score <= 4) { level = 2; text = 'Mejorable'; width = 52; color = 'var(--warning)'; tip = 'Está mejor, pero todavía podés hacerla más larga y menos predecible.'; }
      else if (score === 5) { level = 3; text = 'Buena'; width = 78; color = 'var(--primary)'; tip = 'Buena combinación. Revisá que no reutilices esta contraseña en otros sitios.'; }
      else { level = 4; text = 'Fuerte'; width = 100; color = 'var(--success)'; tip = 'Buen ejemplo: larga, variada y sin patrones obvios.'; }
    }
    bar.style.width = `${width}%`;
    bar.style.background = color;
    label.textContent = text;
    label.dataset.level = String(level);
    tips.textContent = tip;
  }

  input.addEventListener('input', () => analyze(input.value));
  toggle.addEventListener('click', () => {
    input.type = input.type === 'password' ? 'text' : 'password';
    toggle.textContent = input.type === 'password' ? 'Mostrar' : 'Ocultar';
  });
  clear.addEventListener('click', () => { input.value = ''; analyze(''); input.focus(); });
  generate.addEventListener('click', () => {
    const words = ['Nube', 'Pixel', 'Bosque', 'Mate', 'Codigo', 'Rayo'];
    const symbols = ['!', '#', '%', '&', '@'];
    const pick = arr => arr[Math.floor(Math.random() * arr.length)];
    input.value = `${pick(words)}-${pick(words)}${Math.floor(10 + Math.random() * 89)}${pick(symbols)}`;
    analyze(input.value);
  });
  analyze('');
})();
