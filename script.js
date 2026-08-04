const launcher = document.getElementById('launcher');

// АВТОМАТИЧЕСКИЙ МАСШТАБ ПОД РАЗМЕР ЭКРАНА СМАРТФОНА (ЗАЩИТА ОТ КЛАВИАТУРЫ)
const initialHeight = window.innerHeight; // Запоминаем чистую высоту до вылета клавы
function resizeLauncher() {
  if (!launcher) return;
  // Рассчитываем идеальный коэффициент сжатия под высоту смартфона
  const scale = Math.min(window.innerWidth / 380, initialHeight / 824, 1);
  document.documentElement.style.setProperty('--app-scale', scale);
}
window.addEventListener('resize', () => {
  // Если высота уменьшилась (вылетела клава) — НЕ меняем масштаб лаунчера, спасая от лагов
  if (window.innerHeight >= initialHeight - 100) { resizeLauncher(); }
});
resizeLauncher();

document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById('app-preloader'), bar = preloader.querySelector('.preloader-bar'), txt = preloader.querySelector('.preloader-text');
  let preProgress = 0;
  const preInterval = setInterval(() => {
    preProgress += Math.floor(Math.random() * 4) + 3; if (preProgress > 100) preProgress = 100;
    if (bar) bar.style.width = preProgress + '%';
    if (preProgress < 35 && txt.innerText !== "Загрузка текстур интерфейса...") {
      txt.style.opacity = 0; setTimeout(() => { txt.innerText = "Загрузка текстур интерфейса..."; txt.style.opacity = 1; }, 150);
    } else if (preProgress >= 35 && preProgress < 75 && txt.innerText !== "Подключение к Telegram WebApp...") {
      txt.style.opacity = 0; setTimeout(() => { txt.innerText = "Подключение к Telegram WebApp..."; txt.style.opacity = 1; }, 150);
    } else if (preProgress >= 75 && preProgress < 100 && txt.innerText !== "Синхронизация компонентов лаунчера...") {
      txt.style.opacity = 0; setTimeout(() => { txt.innerText = "Синхронизация компонентов лаунчера..."; txt.style.opacity = 1; }, 150);
    }
    if (preProgress === 100) {
      clearInterval(preInterval); txt.style.opacity = 0;
      setTimeout(() => { txt.style.color = "#4caf50"; txt.innerText = "Загрузка завершена!"; txt.style.opacity = 1; setTimeout(() => { if (preloader) preloader.classList.add('fade-hide'); }, 500); }, 150);
    }
  }, 45);
});

const loginBtn = document.getElementById('btn-login'), tabForum = document.getElementById('btn-tab-forum'), tabNews = document.getElementById('btn-tab-news'), tabSupport = document.getElementById('btn-tab-support');
const nicknameInput = document.getElementById('input-nickname'), passwordInput = document.getElementById('input-password'), pincodeInput = document.getElementById('input-pincode'), checkboxToggle = document.getElementById('checkbox-pincode-toggle');
const customAlert = document.getElementById('custom-alert'), alertText = document.getElementById('alert-text');
const loadingPage = document.getElementById('loading-page'), progressBar = document.getElementById('bar'), loadStatus = document.getElementById('load-status'), loadPercent = document.getElementById('load-percent');

function showGameAlert(text) { alertText.innerText = text; customAlert.classList.add('show'); setTimeout(() => { customAlert.classList.remove('show'); }, 3000); }

function startGameLoading() {
  loadingPage.classList.add('show'); let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 3) + 1; if (progress > 100) progress = 100;
    progressBar.style.width = progress + '%'; loadPercent.innerText = progress + '%';
    if (progress < 25 && loadStatus.innerText !== "Проверка целостности кэша файлов...") {
      loadStatus.style.opacity = 0; setTimeout(() => { loadStatus.innerText = "Проверка целостности кэша файлов..."; loadStatus.style.opacity = 1; }, 150);
    } else if (progress >= 25 && progress < 55 && loadStatus.innerText !== "Загрузка паков интерфейса...") {
      loadStatus.style.opacity = 0; setTimeout(() => { loadStatus.innerText = "Загрузка паков интерфейса..."; loadStatus.style.opacity = 1; }, 150);
    } else if (progress >= 55 && progress < 85 && loadStatus.innerText !== "Установка соединения с сервером...") {
      loadStatus.style.opacity = 0; setTimeout(() => { loadStatus.innerText = "Установка соединения с сервером..."; loadStatus.style.opacity = 1; }, 150);
    } else if (progress >= 85 && progress < 100 && loadStatus.innerText !== "Вход в игровой мир Black Russia...") {
      loadStatus.style.opacity = 0; setTimeout(() => { loadStatus.innerText = "Вход в игровой мир Black Russia..."; loadStatus.style.opacity = 1; }, 150);
    }
    if (progress === 100) {
      clearInterval(interval); loadStatus.style.color = "#4caf50"; loadStatus.innerText = "Добро пожаловать!";
      setTimeout(() => { launcher.classList.add('fade-out'); setTimeout(() => { if (window.Telegram?.WebApp) { window.Telegram.WebApp.close(); } else { alert("Успешный запуск!"); } }, 600); }, 1000);
    }
  }, 70); 
}

document.getElementById('btn-eye-toggle').addEventListener('click', function(e) {
  e.preventDefault(); if (passwordInput.type === 'password') { passwordInput.type = 'text'; this.classList.add('password-visible'); } 
  else { passwordInput.type = 'password'; this.classList.remove('password-visible'); }
});

checkboxToggle.addEventListener('change', function() {
  if (this.checked) { pincodeInput.classList.add('show-input'); pincodeInput.focus(); } 
  else { pincodeInput.classList.remove('show-input'); pincodeInput.value = ""; pincodeInput.classList.remove('field-valid', 'field-invalid'); }
});

function handleInputState(input) { if (input.value.length > 0) { input.classList.add('has-text'); } else { input.classList.remove('has-text'); } }

nicknameInput.addEventListener('input', function() {
  const v = this.value.trim(); if (v.length === 0) { this.classList.remove('field-valid', 'field-invalid', 'has-text'); return; } handleInputState(this);
  if (/^[A-Z][a-z]+_[A-Z][a-z]+$/.test(v)) { this.classList.remove('field-invalid'); this.classList.add('field-valid'); } 
  else { this.classList.remove('field-valid'); if (v.length > 6 || /[а-яА-ЯёЁ]/.test(v)) this.classList.add('field-invalid'); }
});

nicknameInput.addEventListener('blur', function() {
  const v = this.value.trim();
  if (v !== "" && !/^[A-Z][a-z]+_[A-Z][a-z]+$/.test(v)) {
    this.classList.remove('field-valid'); this.classList.add('field-invalid');
    showGameAlert(/[а-яА-ЯёЁ]/.test(v) ? "Запрещено использовать кириллицу!" : "Формат: Имя_Фамилия на английском!");
  }
});

passwordInput.addEventListener('input', function() {
  const v = this.value.trim(); if (v.length === 0) { this.classList.remove('field-valid', 'field-invalid', 'has-text'); return; } handleInputState(this);
  if (v.length >= 6) { this.classList.remove('field-invalid'); this.classList.add('field-valid'); } 
  else { this.classList.remove('field-valid', 'field-invalid'); }
});

passwordInput.addEventListener('blur', function() {
  const v = this.value.trim(); if (v !== "" && v.length < 6) { this.classList.remove('field-valid'); this.classList.add('field-invalid'); showGameAlert("Пароль слишком короткий (от 6 символов)!"); }
});

pincodeInput.addEventListener('input', function() {
  this.value = this.value.replace(/[^0-9]/g, ''); if (this.value.length === 0) { this.classList.remove('field-valid', 'field-invalid'); return; }
  if (this.value.length === 4) { this.classList.remove('field-invalid'); this.classList.add('field-valid'); } 
  else { this.classList.remove('field-valid', 'field-invalid'); }
});

loginBtn.addEventListener('click', function(e) {
  e.preventDefault(); const n = nicknameInput.value, p = passwordInput.value, pin = pincodeInput.value;
  if (n.trim() === "" || !/^[A-Z][a-z]+_[A-Z][a-z]+$/.test(n)) { showGameAlert(/[а-яА-ЯёЁ]/.test(n) ? "Разрешены только английские буквы!" : "Авторизация: Укажите имя вашего персонажа!"); nicknameInput.classList.add('field-invalid', 'has-text'); return; }
  if (p.trim() === "" || p.length < 6) { showGameAlert("Защита аккаунта: Введите действующий Пароль!"); passwordInput.classList.add('field-invalid', 'has-text'); return; }
  if (checkboxToggle.checked && (pin.trim() === "" || pin.length < 4)) { showGameAlert("Защита аккаунта: Введите 4-значный Пин-код!"); pincodeInput.classList.add('field-invalid'); return; }
  startGameLoading();
});

document.addEventListener('touchmove', function(e) { if (!e.target.closest('.news-content-scroll') && !e.target.closest('.support-content')) e.preventDefault(); }, { passive: false });
document.addEventListener('touchstart', function(e) { if (e.touches.length > 1) e.preventDefault(); }, { passive: false });
document.addEventListener('gesturestart', function(e) { e.preventDefault(); });

launcher.addEventListener('click', function(e) { if (e.target === launcher) { nicknameInput.blur(); passwordInput.blur(); pincodeInput.blur(); } });

tabNews.addEventListener('click', function(e) { e.preventDefault(); window.open('https://vk.ru', '_blank'); });
tabForum.addEventListener('click', function(e) { e.preventDefault(); window.open('https://blackrussia.online', '_blank'); });

const supportPage = document.getElementById('support-page'), closeSupportBtn = document.getElementById('btn-close-support');
tabSupport.addEventListener('click', function(e) { e.preventDefault(); supportPage.classList.add('open'); });
closeSupportBtn.addEventListener('click', function(e) { e.preventDefault(); supportPage.classList.remove('open'); });
