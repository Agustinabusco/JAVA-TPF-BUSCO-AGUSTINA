(() => {
  const form = document.querySelector('#feedbackForm');
  if (!form) return;
  const message = document.querySelector('#formMessage');
  const chars = document.querySelector('#charCount');
  const comment = document.querySelector('#comentario');

  comment.addEventListener('input', () => chars.textContent = `${comment.value.length}/240`);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const alias = document.querySelector('#alias').value.trim();
    const module = document.querySelector('#modulo').value;
    const rating = form.querySelector('input[name="valoracion"]:checked');
    const text = comment.value.trim();
    const consent = document.querySelector('#consent').checked;

    const errors = [];
    if (alias.length < 2) errors.push('Escribí un nombre o alias de al menos 2 caracteres.');
    if (!module) errors.push('Elegí el módulo que te resultó más útil.');
    if (!rating) errors.push('Seleccioná una valoración del 1 al 5.');
    if (text.length < 10) errors.push('El comentario debe tener al menos 10 caracteres.');
    if (!consent) errors.push('Confirmá que entendés que el formulario es solo demostrativo.');

    if (errors.length) {
      message.className = 'form-message show error';
      message.innerHTML = `<strong>Revisá estos datos:</strong><ul>${errors.map(e => `<li>${e}</li>`).join('')}</ul>`;
      return;
    }

    localStorage.setItem('navegaLastRating', rating.value);
    message.className = 'form-message show success';
    message.innerHTML = `<strong>✅ ¡Gracias, ${escapeHtml(alias)}!</strong><br>Valoraste el sitio con ${rating.value}/5 y elegiste <em>${escapeHtml(module)}</em> como el módulo más útil. Esta demostración no envía tus datos a ningún servidor.`;
    form.reset();
    chars.textContent = '0/240';
  });

  document.querySelector('#clearForm').addEventListener('click', () => {
    form.reset();
    chars.textContent = '0/240';
    message.className = 'form-message';
    message.textContent = '';
  });

  function escapeHtml(str) {
    return str.replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
  }
})();
