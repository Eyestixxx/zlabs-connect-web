'use strict';

const createClient = (...args) => {
  if (window.supabase && typeof window.supabase.createClient === 'function') {
    return window.supabase.createClient(...args);
  }
  const offline = () => ({ data: null, error: new Error('Не удалось загрузить библиотеку Supabase. Проверьте подключение к интернету.') });
  return {
    auth: {
      getSession: async () => ({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe() {} } } }),
      signInWithPassword: async () => offline(),
      signUp: async () => offline(),
      resetPasswordForEmail: async () => offline(),
      updateUser: async () => offline(),
      signOut: async () => offline()
    }
  };
};

const SUPABASE_URL = 'https://pqcwowblbbfntsbzrupz.supabase.co';
const SUPABASE_KEY = 'sb_publishable_Sq6tuZPValzeHd4_nMJmcw_6PPvX6D7';

const SERVICES = {
  landing: 'Лендинг',
  corporate: 'Корпоративный сайт',
  shop: 'Интернет-магазин',
  redesign: 'Редизайн сайта',
  other: 'Другая услуга'
};

const ORDER_STATUS = {
  new: 'Новая',
  reviewing: 'На рассмотрении',
  accepted: 'Принята',
  rejected: 'Отклонена'
};

const PROJECT_STATUS = {
  planning: 'Планирование',
  design: 'Дизайн',
  development: 'В разработке',
  testing: 'Тестирование',
  completed: 'Завершён',
  paused: 'Приостановлен'
};

const TASK_STATUS = {
  todo: 'К выполнению',
  doing: 'В работе',
  review: 'На проверке',
  done: 'Готово'
};

const TICKET_STATUS = {
  open: 'Открыто',
  in_progress: 'В работе',
  closed: 'Закрыто'
};

const PRIORITY = {
  low: 'Низкий',
  normal: 'Обычный',
  high: 'Высокий'
};


const paths = {
  home: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>',
  folder: '<path d="M3 7V5a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  headset: '<path d="M3 14v-3a9 9 0 0 1 18 0v3M3 14h4v6H5a2 2 0 0 1-2-2zM21 14h-4v6h2a2 2 0 0 0 2-2zM17 20a4 4 0 0 1-4 2h-3"/>',
  chart: '<path d="M4 20V10M10 20V4M16 20v-8M22 20V7"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
  back: '<path d="M19 12H5m6 6-6-6 6-6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  alert: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4m0 4h.01"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  send: '<path d="m22 2-7 20-4-9-9-4zM22 2 11 13"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
  'eye-off': '<path d="M3 3 21 21M10.6 5.1A11 11 0 0 1 12 5c6.5 0 10 7 10 7a14.7 14.7 0 0 1-3 3.7M6.5 6.4C3.5 8.1 2 12 2 12s3.5 7 10 7a10.5 10.5 0 0 0 4.4-.9M10 10a3 3 0 0 0 4 4"/>',
  shield: '<path d="m12 22 8-4V6l-8-4-8 4v12z"/><path d="m9 12 2 2 4-4"/>',
  logout: '<path d="M10 17l5-5-5-5M15 12H3M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7"/>',
  refresh: '<path d="M20 7v5h-5M4 17v-5h5"/><path d="M5.5 9a7 7 0 0 1 12-3L20 12M4 12l2.5 6a7 7 0 0 0 12-3"/>',
  menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
  layers: '<path d="m12 2 9 5-9 5-9-5zM3 12l9 5 9-5M3 17l9 5 9-5"/>',
  link: '<path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-2 2M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l2-2"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 6 10 8 10-8"/>',
  lock: '<rect x="4" y="11" width="16" height="11" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  laptop: '<rect x="4" y="3" width="16" height="14" rx="2"/><path d="m2 21 2-4h16l2 4z"/>',
  cart: '<path d="M2 3h2l3 13h11l3-9H5M9 21h.01M18 21h.01"/>',
  pencil: '<path d="m4 16-1 5 5-1L20 8a3 3 0 0 0-4-4zM14 6l4 4"/>',
  sparkle: '<path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z"/>',
  upload: '<path d="M12 17V3m-5 5 5-5 5 5M4 17v3h16v-3"/>',
  external: '<path d="M14 3h7v7M10 14 21 3M20 13v7H4V4h7"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 11v6m0-10h.01"/>',
  filter: '<path d="M3 5h18l-7 8v6l-4 2v-8z"/>',
  message: '<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/>',
  trash: '<path d="M3 6h18M8 6V4h8v2M6 6l1 15h10l1-15M10 10v7M14 10v7"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a16 16 0 0 1 0 20M12 2a16 16 0 0 0 0 20"/>'
};

function icon(name, size = 20) {
  return `<svg class="icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.sparkle}</svg>`;
}




const db = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
});

function check(result) {
  if (result.error) throw result.error;
  return result.data;
}

function safe(value) {
  return String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
}

function prettyDate(value, time = false) {
  if (!value) return 'Не указан';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric', ...(time ? { hour: '2-digit', minute: '2-digit' } : {}) });
}

function money(value) {
  return value == null || value === '' ? 'Не указан' : Number(value).toLocaleString('ru-RU') + ' ₽';
}

function errorMessage(error) {
  const msg = String(error?.message || error || 'Неизвестная ошибка');
  if (/invalid login credentials/i.test(msg)) return 'Неверная почта или пароль.';
  if (/email not confirmed/i.test(msg)) return 'Подтвердите почту по ссылке из письма.';
  if (/failed to fetch|network|timeout|fetch failed/i.test(msg)) return 'Нет связи с Supabase. Проверьте интернет и повторите попытку.';
  if (/row-level security|permission denied|42501/i.test(msg)) return 'Недостаточно прав для этого действия. Проверьте доступ в Supabase.';
  if (/duplicate key|23505/i.test(msg)) return 'Такая запись уже существует.';
  if (/rate limit|too many requests|429/i.test(msg)) return 'Слишком много запросов. Попробуйте позже.';
  return msg;
}

function isUrl(value) {
  if (!value) return true;
  try { return ['http:', 'https:'].includes(new URL(value).protocol); } catch { return false; }
}

function el(selector, root = document) { return root.querySelector(selector); }

function byId(id) { return document.getElementById(id); }






const app = byId('app');
const state = { session: null, profile: null, unread: 0, rows: [], search: '', status: '', routes: 0, channel: null, timer: null, navOpen: false };
const names = new Map();
let toastTimeout;

const label = (dict, code) => dict[code] || code || 'Не указан';
const employee = () => state.profile?.role === 'employee';
const viewerId = () => state.session?.user?.id;
const firstName = () => state.profile?.full_name?.trim().split(/\s+/)[0] || 'друг';
const initials = () => (state.profile?.full_name || state.session?.user?.email || 'Z').trim().split(/[\s@]+/).slice(0, 2).map(part => part[0]?.toUpperCase() || '').join('');
const logo = small => `<a class="logo ${small ? 'logo--small' : ''}" href="#/" aria-label="Z-Labs Connect"><span><span class="logo__accent">Z</span>-LABS</span><span class="logo__caption">CONNECT</span></a>`;
const route = () => decodeURI(location.hash.slice(1).split('?')[0] || '/');
const currentParams = () => new URLSearchParams(location.hash.split('?')[1] || '');
const to = path => { location.hash = path; if (route() === path) render(); };
const busyMarkup = () => `<div class="loading"><div><div class="loading__spinner"></div>Загружаем данные...</div></div>`;
const errorMarkup = err => `<div class="error-panel">${icon('alert')} ${safe(errorMessage(err))}<div style="margin-top:12px"><button class="button button--ghost button--tiny" data-action="retry">Попробовать снова</button></div></div>`;
const emptyMarkup = (name, text) => `<div class="empty">${icon(name, 34)}<div>${safe(text)}</div></div>`;
const statusBadge = (code, dict) => `<span class="pill ${['completed', 'done', 'accepted', 'approved', 'closed'].includes(code) ? 'pill--success' : ['rejected', 'changes_requested'].includes(code) ? 'pill--danger' : ['reviewing', 'in_progress', 'testing'].includes(code) ? 'pill--warn' : ''}">${safe(label(dict, code))}</span>`;
const formatBudget = row => row.budget_min == null && row.budget_max == null ? 'Не указан' : `${money(row.budget_min)} - ${money(row.budget_max)}`;
const progress = value => `<div class="progress"><div class="progress__bar" style="width:${Math.min(100, Math.max(0, Number(value) || 0))}%"></div></div>`;
const value = (key, fallback = '') => safe(state.profile?.[key] ?? fallback);
const params = form => Object.fromEntries(new FormData(form).entries());
const line = (name, val, large = false) => `<div class="info-row"><div class="info-row__label">${safe(name)}</div><div class="info-row__value ${large ? 'info-row__value--large' : ''}">${safe(val ?? 'Не указано')}</div></div>`;
const opt = (dict, val = '') => Object.entries(dict).map(([code, text]) => `<option value="${safe(code)}" ${val === code ? 'selected' : ''}>${safe(text)}</option>`).join('');

function toast(message, isError = false) {
  const node = byId('toast');
  if (!node) return;
  clearTimeout(toastTimeout);
  node.textContent = message;
  node.className = `toast toast--visible ${isError ? 'toast--error' : ''}`;
  toastTimeout = setTimeout(() => node.className = 'toast', 4200);
}

async function execute(operation, success) {
  try {
    await operation();
    if (success) toast(success);
  } catch (error) {
    toast(errorMessage(error), true);
    throw error;
  }
}

function openDialog(title, content, actions = '', wide = false) {
  closeDialog();
  const modal = document.createElement('div');
  modal.id = 'dialog-root';
  modal.className = 'dialog';
  modal.innerHTML = `<div class="dialog__box" role="dialog" aria-modal="true" aria-label="${safe(title)}" style="${wide ? 'max-width:800px' : ''}"><div class="dialog__head"><h2 class="dialog__title">${safe(title)}</h2><button class="dialog__close" data-action="close-dialog" aria-label="Закрыть">${icon('x')}</button></div>${content}${actions}</div>`;
  document.body.appendChild(modal);
  modal.addEventListener('click', event => { if (event.target === modal) closeDialog(); });
  modal.querySelector('input,textarea,select,button')?.focus();
}

function closeDialog() { byId('dialog-root')?.remove(); }

function field(name, title, type = 'text', placeholder = '', value = '', attrs = '') {
  const control = type === 'textarea'
    ? `<textarea class="field__control field__control--area" name="${name}" id="${name}" placeholder="${safe(placeholder)}" ${attrs}>${safe(value)}</textarea>`
    : `<input class="field__control" name="${name}" id="${name}" type="${type}" placeholder="${safe(placeholder)}" value="${safe(value)}" ${attrs}>`;
  return `<label class="field" for="${name}"><span class="field__label">${title}</span>${control}</label>`;
}

function selectField(name, title, choices, selected = '') {
  return `<label class="field"><span class="field__label">${title}</span><select class="field__control" name="${name}" id="${name}">${opt(choices, selected)}</select></label>`;
}

function passwordField(name, text, placeholder, required = true) {
  return `<label class="field"><span class="field__label">${text}</span><span class="field__password"><input class="field__control" type="password" id="${name}" name="${name}" placeholder="${placeholder}" ${required ? 'required' : ''} minlength="8"><button class="field__eye" type="button" data-action="toggle-password" data-target="${name}" aria-label="Показать пароль">${icon('eye')}</button></span></label>`;
}

function dialogButtons(formId, buttonText = 'Сохранить') {
  return `<div class="form-actions"><button class="button button--ghost" type="button" data-action="close-dialog">Отмена</button><button class="button button--primary" type="submit" form="${formId}">${safe(buttonText)} ${icon('arrow', 16)}</button></div>`;
}

function publicFooter() {
  return `<footer class="site-footer"><div class="site-footer__main"><div class="site-footer__brand">${logo(true)}<p>Разработка сайтов, цифровые сервисы и автоматизация бизнеса. Z-Labs Connect - учебный интерфейс взаимодействия с клиентами и командой.</p><a class="site-footer__external" href="https://z-labs.ru/" target="_blank" rel="noopener noreferrer">Официальный сайт z-labs.ru ${icon('external', 15)}</a></div><nav class="site-footer__column" aria-label="Разделы сайта"><h3>Навигация</h3><a href="index.html#/">Главная</a><a href="index.html#/?section=services">Услуги</a><a href="index.html#/?section=portfolio">Концепты</a><a href="index.html#/?section=about">О компании</a><a href="index.html#/login">Личный кабинет</a></nav><div class="site-footer__column"><h3>О компании</h3><a href="https://z-labs.ru/services/" target="_blank" rel="noopener noreferrer">Все услуги Z-Labs</a><a href="https://z-labs.ru/projects/" target="_blank" rel="noopener noreferrer">Реальные проекты</a><a href="https://z-labs.ru/company/" target="_blank" rel="noopener noreferrer">История компании</a><a href="#/privacy">О данных и cookies</a></div><div class="site-footer__column site-footer__contacts"><h3>Контакты Z-Labs</h3><a href="tel:+74162559065">+7 (4162) 55-90-65</a><a href="mailto:info@z-labs.ru">info@z-labs.ru</a><p>Благовещенск, ул. Горького, 235/2, офис 210</p><p>Пн - Пт, 09:00 - 18:00</p></div></div><div class="site-footer__bottom"><span>© 2026 Z-Labs Connect · Учебный проект, не официальный сайт компании</span><div><a href="#/privacy">Информация о данных</a><a href="https://z-labs.ru/include/licenses_detail.php" target="_blank" rel="noopener noreferrer">Политика Z-Labs (официальная)</a><button type="button" data-action="cookie-open">Настройки cookies</button></div></div></footer>`;
}

function publicHeader() {
  return `<header class="landing__header landing__header--solid">${logo()}<nav class="landing__nav" aria-label="Главное меню"><a href="index.html#/">Главная</a><a href="index.html#/?section=services">Услуги</a><a href="index.html#/?section=portfolio">Концепты</a><a href="index.html#/?section=about">О компании</a><a href="index.html#/?section=contacts">Контакты</a></nav><div class="landing__auth"><a class="button button--outline button--tiny" href="index.html#/login">Войти</a><a class="button button--primary button--tiny" href="index.html#/register">Регистрация</a></div><button class="landing__menu" data-action="mobile-public-menu" aria-label="Открыть меню">${icon('menu')}</button></header>`;
}


function privacyPage() {
  return `<div class="landing landing--subpage">${publicHeader()}<main class="privacy-page"><div class="kicker kicker--dark">Z-Labs Connect Web</div><h1>О данных и cookies</h1><p>Это учебная веб-версия Z-Labs Connect, а не официальный сайт Z-Labs. Ниже объясняется, какие данные использует именно этот проект.</p><h2>Необходимые данные</h2><p>Для входа приложение обращается к Supabase и может сохранять сессию в хранилище браузера. Сохранение выбора в баннере cookies позволяет не показывать уведомление при каждом переходе.</p><h2>Необязательные cookies</h2><p>В этой версии не подключены рекламные или аналитические счётчики. Выбор «Принять» или «Только необходимые» сохраняется локально, но не включает стороннюю аналитику.</p><h2>Внешние сервисы</h2><p>Для входа используется Supabase; шрифт загружается из Google Fonts, библиотека Supabase - из CDN. При их загрузке браузер обращается к соответствующим серверам.</p><h2>Контакты и официальные документы</h2><p>Сведения о компании взяты с <a href="https://z-labs.ru/" target="_blank" rel="noopener noreferrer">z-labs.ru</a>. <a href="https://z-labs.ru/include/licenses_detail.php" target="_blank" rel="noopener noreferrer">Официальная политика Z-Labs</a> относится к сайту компании и не заменяет юридические документы этого учебного проекта.</p><button class="button button--primary" type="button" data-action="cookie-open">Изменить выбор cookies</button></main>${publicFooter()}</div>`;
}

const COOKIE_CHOICE_KEY = 'zlabs_connect_cookie_choice_v1';

function readCookieChoice() {
  try { return localStorage.getItem(COOKIE_CHOICE_KEY); } catch { return null; }
}

function saveCookieChoice(choice) {
  try { localStorage.setItem(COOKIE_CHOICE_KEY, choice); } catch { }
  byId('cookie-banner')?.remove();
}

function showCookieBanner() {
  byId('cookie-banner')?.remove();
  const banner = document.createElement('aside');
  banner.id = 'cookie-banner';
  banner.className = 'cookie-banner';
  banner.setAttribute('aria-label', 'Настройки cookies');
  banner.innerHTML = `<div class="cookie-banner__icon">${icon('shield', 24)}</div><div class="cookie-banner__content"><strong>Настройки cookies</strong><p>Мы сохраняем необходимые данные для входа и работы кабинета, а также ваш выбор на этом устройстве. Рекламных и аналитических cookies здесь нет. <a href="#/privacy">Подробнее о данных</a></p></div><div class="cookie-banner__actions"><button class="button button--outline" type="button" data-action="cookie-essential">Только необходимые</button><button class="button button--primary" type="button" data-action="cookie-accept">Принять</button></div>`;
  document.body.appendChild(banner);
}

function initCookies() {
  if (!readCookieChoice()) showCookieBanner();
}

function landing() {
  const services = [
    ['laptop', 'Разработка сайтов', 'Лендинги, корпоративные сайты и адаптивная вёрстка.'],
    ['cart', 'Интернет-магазины', 'Каталоги, корзины, фильтры и оформление заказов.'],
    ['layers', 'Веб-сервисы', 'Интерфейсы, личные кабинеты и автоматизация.'],
    ['pencil', 'Редизайн', 'Обновление интерфейсов и улучшение удобства.'],
    ['headset', 'Поддержка', 'Сопровождение, развитие и помощь после запуска.']
  ];
  const cases = [
    ['nordic-home', 'Скандинавский дом', 'Интернет-магазин товаров для дома'],
    ['artline', 'АртЛиния', 'Сайт дизайнерской студии'],
    ['fitzone', 'ФитЗона', 'Веб-сервис для фитнес-клуба']
  ];
  return `<div class="landing">
    <header class="landing__header">${logo()}<nav class="landing__nav" aria-label="Главное меню"><a href="#/">Главная</a><a href="#/" data-scroll="services">Услуги</a><a href="#/" data-scroll="portfolio">Портфолио</a><a href="#/" data-scroll="about">О компании</a><a href="#/" data-scroll="contacts">Контакты</a></nav><div class="landing__auth"><a class="button button--outline button--tiny" href="#/login">Войти</a><a class="button button--primary button--tiny" href="#/register">Регистрация</a></div><button class="landing__menu" data-action="mobile-public-menu" aria-label="Меню">${icon('menu')}</button></header>
    <section class="landing__hero"><div class="landing__hero-content"><div class="kicker">Веб-разработка · Дизайн · Поддержка</div><h1 class="landing__title">Цифровые решения<br>для <span>вашего бизнеса</span></h1><p class="landing__intro">Разрабатываем сайты, веб-сервисы и цифровые продукты под задачи вашего бизнеса. От идеи до запуска и сопровождения.</p><div class="landing__hero-actions"><a class="button button--primary" href="#/login?next=orders">Оставить заявку ${icon('arrow', 18)}</a><a class="button button--outline" href="#/" data-scroll="services">Наши услуги</a></div></div><a href="#/" class="landing__hero-scroll" data-scroll="services" aria-label="К услугам">${icon('arrow', 22)}</a></section>
    <section class="landing__advantages"><div><div class="advantage__icon">${icon('sparkle', 28)}</div><div class="advantage__title">Комплексный подход</div><div class="advantage__text">От идеи и проектирования до запуска и поддержки.</div></div><div><div class="advantage__icon">${icon('users', 28)}</div><div class="advantage__title">Команда специалистов</div><div class="advantage__text">Дизайнеры и разработчики работают над задачами вместе.</div></div><div><div class="advantage__icon">${icon('chart', 28)}</div><div class="advantage__title">Понятный процесс</div><div class="advantage__text">Заявки, этапы, задачи и обсуждения в одной системе.</div></div><div><div class="advantage__icon">${icon('shield', 28)}</div><div class="advantage__title">Поддержка и развитие</div><div class="advantage__text">Общение с командой и сопровождение проектов.</div></div></section>
    <main class="landing__body"><section class="landing__section" id="services"><div class="section__head"><div><h2 class="section__title">Наши услуги</h2><p class="section__description">От простых посадочных страниц до сложных цифровых продуктов.</p></div><a class="section__link" href="#/login?next=orders">Оставить заявку ${icon('arrow', 16)}</a></div><div class="service-list">${services.map(([name, title, text]) => `<article class="service-card"><div class="service-card__icon">${icon(name, 33)}</div><div class="service-card__title">${title}</div><div class="service-card__text">${text}</div></article>`).join('')}</div></section>
    <section class="landing__section" id="portfolio"><div class="section__head"><div><h2 class="section__title">Наши концепты</h2><p class="section__description">Иллюстративные примеры направлений разработки. Не являются подтверждёнными коммерческими кейсами Z-Labs.</p></div><a class="section__link" href="#/login?next=orders">Обсудить свой проект ${icon('arrow', 16)}</a></div><div class="portfolio">${cases.map(([file, title, subtitle]) => `<div class="portfolio__card"><img class="portfolio__image" src="assets/images/${file}.webp" alt="Концепт ${title}" loading="lazy"><span class="portfolio__label">Демо-концепт</span><div class="portfolio__info"><div><div class="portfolio__name">${title}</div><div class="portfolio__caption">${subtitle}</div></div>${icon('external', 20)}</div></div>`).join('')}</div></section>
    <section class="company-story" id="about" aria-labelledby="company-heading">
      <div class="company-story__hero">
        <div class="company-story__body">
          <div class="company-story__eyebrow"><span class="company-story__line"></span> ЗНАКОМЬТЕСЬ, Z-LABS</div>
          <h2 class="company-story__heading" id="company-heading">КТО <span>МЫ</span><span class="company-story__period">.</span></h2>
          <h3 class="company-story__statement">Команда, которая берётся за сложные задачи</h3>
          <p>Мы создаём сайты и цифровые сервисы, помогаем бизнесу развивать существующие продукты и выстраивать рабочие процессы. За каждым проектом стоят люди, которые умеют превращать сложные задачи в понятные решения.</p>
          <div class="company-story__tags"><span>${icon('users', 16)} Работаем вместе</span><span>${icon('layers', 16)} Продумываем детали</span><span>${icon('shield', 16)} Поддерживаем после запуска</span></div>
        </div>
        <div class="company-story__visual"><img src="assets/images/studio.webp" alt="Иллюстрация современной веб-студии" loading="lazy"><span class="company-story__image-caption">Иллюстрация рабочего пространства</span></div>
        <span class="company-story__index" aria-hidden="true">01 / Z-LABS</span>
      </div>
      <div class="company-story__facts" aria-label="Z-Labs в цифрах">
        <div><strong>2014</strong><span>год начала работы</span></div>
        <div><strong>200+</strong><span>запущенных проектов</span></div>
        <div><strong>12 лет</strong><span>опыта работы</span></div>
        <div><strong>1С-Битрикс</strong><span>золотой партнёр</span></div>
      </div>
      <div class="company-story__section company-story__section--expertise">
        <div class="company-story__section-top"><div><div class="company-story__kicker">КОМПЕТЕНЦИИ</div><h3>Что делает Z-Labs</h3></div><p>От первых идей до поддержки готового продукта. Не только разработка сайта, но и его дальнейшая жизнь.</p></div>
        <div class="company-story__expertise">
          <article><span class="company-story__expertise-icon">${icon('laptop', 25)}</span><span class="company-story__expertise-num">01</span><h4>Сайты и веб-сервисы</h4><p>Корпоративные сайты, интернет-магазины и сложные веб-продукты под задачи бизнеса.</p></article>
          <article><span class="company-story__expertise-icon">${icon('layers', 25)}</span><span class="company-story__expertise-num">02</span><h4>CRM и интеграции</h4><p>Битрикс24, автоматизация процессов, связь с 1С и внешними системами.</p></article>
          <article><span class="company-story__expertise-icon">${icon('chart', 25)}</span><span class="company-story__expertise-num">03</span><h4>Продвижение</h4><p>Поисковое продвижение и инструменты для привлечения новой аудитории.</p></article>
          <article><span class="company-story__expertise-icon">${icon('headset', 25)}</span><span class="company-story__expertise-num">04</span><h4>Поддержка и развитие</h4><p>Обновления, исправление ошибок, техническая помощь и новые возможности продукта.</p></article>
        </div>
      </div>
      <div class="company-story__values"><div class="company-story__values-intro"><div class="company-story__kicker">НАШ ПОДХОД</div><h3>Ценные принципы работы</h3><p>Хороший результат начинается с понимания задачи и продолжается после запуска.</p></div><div class="company-story__values-grid"><div><span>${icon('message', 22)}</span><strong>На связи</strong><p>Обсуждаем решения, вопросы и изменения в ходе работы.</p></div><div><span>${icon('check', 22)}</span><strong>По делу</strong><p>Делаем понятный продукт под конкретные цели бизнеса.</p></div><div><span>${icon('refresh', 22)}</span><strong>В развитии</strong><p>Поддерживаем и улучшаем продукт после запуска.</p></div></div></div>
      <div class="company-story__section company-story__section--process"><div class="company-story__section-top"><div><div class="company-story__kicker">ЭТАПЫ СОТРУДНИЧЕСТВА</div><h3>Как строится работа</h3></div><p>У каждого этапа своя задача, а у клиента - понятная картина происходящего.</p></div><div class="company-story__steps"><div><span>01</span><h4>Знакомство</h4><p>Обсуждаем идею, задачи и ожидаемый результат.</p></div><div><span>02</span><h4>Проектирование</h4><p>Продумываем структуру, сценарии и внешний вид.</p></div><div><span>03</span><h4>Разработка</h4><p>Реализуем, проверяем и готовим продукт к запуску.</p></div><div><span>04</span><h4>Сопровождение</h4><p>Помогаем поддерживать и развивать решение.</p></div></div></div>
      <div class="company-story__closing"><div><strong>Z-Labs <span>Connect</span></strong><p>Веб-кабинет для заявок, проектов и общения с командой - часть нашего учебного проекта.</p></div><a class="company-story__closing-link" href="https://z-labs.ru/company/" target="_blank" rel="noopener noreferrer">Узнать больше о настоящей Z-Labs ${icon('external', 16)}</a></div>
    </section>
    <section class="landing__cta" id="contacts"><div><h2>Готовы начать проект?</h2><p>Расскажите о своей идее - мы поможем оформить заявку и будем вести проект в едином личном кабинете Z-Labs Connect.</p></div><a href="#/login?next=orders" class="button button--primary">Оставить заявку ${icon('arrow')}</a></section></main>
    ${publicFooter()}
  </div>`;
}

function authPage(kind) {
  const isRegister = kind === 'register';
  const isReset = kind === 'forgot';
  const title = isReset ? 'Восстановление пароля' : isRegister ? 'Создайте аккаунт' : 'Вход в Z-Labs Connect';
  return `<div class="auth"><div class="auth__visual">${logo()}<div><h2>Ваши идеи.<br>Наши решения.</h2><p>Управляйте заявками и проектами, общайтесь с командой и следите за результатом.</p></div><span class="kicker">Z-Labs Connect · Web</span></div><div class="auth__content"><a href="#/" class="auth__back">${icon('back', 15)} На главную</a><div class="auth__panel"><h1 class="auth__title">${title}</h1><p class="auth__subtitle">${isReset ? 'Укажи почту - мы отправим ссылку для восстановления доступа.' : isRegister ? 'Зарегистрируйся, чтобы создавать заявки и следить за проектами.' : 'Управляй проектами, заявками и общайся с командой в единой системе.'}</p>${isReset ? '' : `<div class="auth__tabs"><a href="#/login" class="auth__tab ${!isRegister ? 'auth__tab--active' : ''}">Вход</a><a href="#/register" class="auth__tab ${isRegister ? 'auth__tab--active' : ''}">Регистрация</a></div>`}
    <form id="auth-form" data-form="${isReset ? 'forgot' : isRegister ? 'register' : 'login'}">
    ${isRegister ? field('fullName', 'Имя и фамилия', 'text', 'Как к вам обращаться', '', 'required minlength="2" maxlength="60" autocomplete="name"') : ''}
    ${field('email', 'Электронная почта', 'email', 'name@example.com', '', 'required autocomplete="email"')}
    ${isReset ? '' : passwordField('password', 'Пароль', 'Не менее 8 символов, A-Z и a-z')}
    ${isRegister ? `${passwordField('passwordRepeat', 'Повторите пароль', 'Введите пароль ещё раз')}<div class="auth__strength" id="password-feedback">Минимум 8 символов, заглавная и строчная буквы.</div>` : ''}
    ${!isRegister && !isReset ? `<a href="#/forgot" class="auth__forgot">Забыли пароль?</a>` : ''}
    ${isRegister ? '<p class="field__hint">Новый аккаунт создаётся с ролью клиента. Роль сотрудника назначается отдельно компанией.</p>' : ''}
    <button class="button button--primary button--block" type="submit" style="margin-top:18px">${isReset ? 'Отправить письмо' : isRegister ? 'Зарегистрироваться' : 'Войти'} ${icon('arrow', 16)}</button></form><p class="auth__foot">${isReset ? 'Вспомнили пароль? <a href="#/login">Вернуться ко входу</a>' : isRegister ? 'Уже есть аккаунт? <a href="#/login">Войти</a>' : 'Нет аккаунта? <a href="#/register">Зарегистрироваться</a>'}</p></div></div></div>`;
}

function sidebar() {
  const items = [
    ['dashboard', 'Главная', 'home'], ['notifications', 'Уведомления', 'bell'], ['orders', 'Заявки', 'file'], ['projects', 'Проекты', 'folder'],
    ['support', 'Поддержка', 'headset'], ['profile', 'Профиль', 'user']
  ];
  const active = route().split('/')[2] || 'dashboard';
  const activePage = active === 'project' ? 'projects' : active === 'ticket' ? 'support' : active;
  return `<aside class="workspace__sidebar"><div class="workspace__brand">${logo(true)}</div><nav class="workspace__nav">${items.map(([path, text, name]) => `<a class="workspace__nav-link ${activePage === path ? 'workspace__nav-link--active' : ''}" href="#/app/${path}">${icon(name, 19)}<span>${text}</span>${path === 'notifications' && state.unread ? `<span class="workspace__nav-count">${state.unread}</span>` : ''}</a>`).join('')}</nav><div class="workspace__sidebar-bottom"><div class="workspace__sidebar-role">${employee() ? 'Режим сотрудника' : 'Кабинет клиента'}</div><button class="workspace__nav-link" data-action="logout">${icon('logout', 18)} Выйти из аккаунта</button><a class="workspace__nav-link" href="#/">${icon('globe', 18)} Сайт компании</a></div></aside>`;
}

function shell() {
  return `<div class="workspace ${state.navOpen ? 'workspace--nav-open' : ''}">${sidebar()}<div class="workspace__overlay" data-action="close-menu"></div><div class="workspace__main"><header class="workspace__topbar"><button class="workspace__mobile-button" aria-label="Открыть меню" data-action="toggle-menu">${icon('menu', 24)}</button><div class="workspace__search">${icon('search', 16)}<input aria-label="Быстрый поиск" id="global-search" placeholder="Поиск по заявкам и проектам..."></div><div class="workspace__user"><a class="workspace__bell" href="#/app/notifications" aria-label="Уведомления">${icon('bell', 21)}${state.unread ? '<span class="workspace__bell-dot"></span>' : ''}</a><a href="#/app/profile" class="workspace__user" aria-label="Профиль"><span class="workspace__avatar">${safe(initials())}</span><span><span class="workspace__user-name">${safe(state.profile?.full_name || state.session?.user?.email || '')}</span><span class="workspace__user-role" style="display:block">${employee() ? 'Сотрудник' : 'Клиент'}</span></span></a></div></header><main class="workspace__content" id="workspace-content">${busyMarkup()}</main><footer class="workspace__footer">Z-Labs Connect Web · © 2026</footer></div></div>`;
}

async function loadProfile() {
  if (!viewerId()) { state.profile = null; return; }
  const { data, error } = await db.from('profiles').select('id,full_name,role,created_at').eq('id', viewerId()).single();
  if (error) throw error;
  if (!['client', 'employee'].includes(data.role)) throw new Error('Неизвестная роль пользователя.');
  state.profile = data;
}

async function loadUnread() {
  if (!viewerId()) return;
  const result = await db.from('notifications').select('id', { count: 'exact', head: true }).eq('user_id', viewerId()).is('read_at', null);
  if (!result.error) state.unread = result.count || 0;
}

function setContent(markup) {
  const content = byId('workspace-content');
  if (content) content.innerHTML = markup;
}

function header(title, subtitle, actions = '') {
  return `<div class="page-head"><div><h1 class="page-head__title">${safe(title)}</h1><p class="page-head__subtitle">${safe(subtitle)}</p></div><div class="page-head__actions">${actions}</div></div>`;
}

async function getList(table, filters = {}, limit = 200) {
  let request = db.from(table).select('*').order('created_at', { ascending: false }).limit(limit);
  for (const [key, val] of Object.entries(filters)) request = request.eq(key, val);
  return check(await request);
}

function boundFilter(table) {
  return employee() ? {} : { client_id: viewerId() };
}

async function fetchNames(ids) {
  const missing = [...new Set(ids.filter(Boolean))].filter(id => !names.has(id));
  if (!missing.length) return;
  const { data, error } = await db.from('profiles').select('id,full_name').in('id', missing);
  if (!error) (data || []).forEach(item => names.set(item.id, item.full_name || 'Участник'));
  missing.forEach(id => { if (!names.has(id)) names.set(id, 'Участник'); });
}

async function render() {
  const locationNow = route();
  const seq = ++state.routes;
  stopListeners();
  state.navOpen = false;
  window.scrollTo({ top: 0, behavior: 'instant' });
  if (locationNow === '/') { app.innerHTML = landing(); const section = currentParams().get('section'); if (['services', 'portfolio', 'about', 'contacts'].includes(section)) requestAnimationFrame(() => byId(section)?.scrollIntoView({ block: 'start' })); return; }
  if (locationNow === '/about') { to('/?section=about'); return; }
  if (locationNow === '/privacy') { app.innerHTML = privacyPage(); return; }
  if (['/login', '/register', '/forgot'].includes(locationNow)) {
    if (state.session && state.profile && locationNow !== '/forgot') { to('/app/dashboard'); return; }
    app.innerHTML = authPage(locationNow.slice(1));
    return;
  }
  if (!locationNow.startsWith('/app')) { to('/'); return; }
  if (!state.session) { to('/login'); return; }
  if (!state.profile) {
    app.innerHTML = busyMarkup();
    try { await loadProfile(); } catch (error) { app.innerHTML = `<div class="auth__content">${errorMarkup(error)}<button class="button button--outline" data-action="logout">Выйти</button></div>`; return; }
  }
  try { await loadUnread(); } catch { }
  if (seq !== state.routes) return;
  app.innerHTML = shell();
  const paths = locationNow.split('/').filter(Boolean);
  try {
    if (paths[1] === 'dashboard') await dashboard();
    else if (paths[1] === 'orders') await orders();
    else if (paths[1] === 'projects') await projects();
    else if (paths[1] === 'project' && paths[2]) await project(paths[2]);
    else if (paths[1] === 'support') await support();
    else if (paths[1] === 'ticket' && paths[2]) await ticket(paths[2]);
    else if (paths[1] === 'notifications') await notifications();
    else if (paths[1] === 'profile') await profile();
    else to('/app/dashboard');
  } catch (error) { if (seq === state.routes) setContent(errorMarkup(error)); }
}

function stopListeners() {
  if (state.channel) db.removeChannel(state.channel);
  if (state.timer) clearInterval(state.timer);
  state.channel = null;
  state.timer = null;
  state.chat = null;
}

async function dashboard() {
  const [ordersData, projectData, ticketData] = await Promise.all([
    getList('orders', boundFilter(), 250),
    getList('projects', boundFilter(), 250),
    getList('tickets', boundFilter(), 250)
  ]);
  const active = projectData.filter(item => item.status !== 'completed');
  const closed = projectData.filter(item => item.status === 'completed').length;
  const cards = [
    ['file', employee() ? 'Всего заявок' : 'Мои заявки', ordersData.length, ''],
    ['layers', 'Активные проекты', active.length, ''],
    ['message', 'Запросы в поддержку', ticketData.length, ''],
    ['bell', 'Уведомления', state.unread, 'Непрочитанные события']
  ];
  const activity = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - 6 + i);
    return ordersData.filter(row => row.created_at?.slice(0, 10) === d.toISOString().slice(0, 10)).length;
  });
  const max = Math.max(1, ...activity);
  setContent(`${header(employee() ? `Рабочая панель` : `Добро пожаловать, ${firstName()}!`, employee() ? 'Обзор заявок, задач и проектов команды.' : 'Ваши проекты и заявки в одном месте.')}
  <div class="stat-grid">${cards.map(([ico, text, count, hint]) => `<div class="stat"><div class="stat__icon">${icon(ico, 22)}</div><div class="stat__value">${count}</div><div class="stat__label">${text}</div>${hint ? `<div class="stat__hint">${hint}</div>` : ''}</div>`).join('')}</div>
  <div class="page-grid"><section class="panel"><div class="panel__header"><div><div class="panel__title">Активные проекты</div><div class="panel__subtitle">${closed ? `${closed} завершено` : 'Стадии и текущий прогресс'}</div></div><a href="#/app/projects" class="section__link">Смотреть все ${icon('arrow', 16)}</a></div>${active.length ? active.slice(0, 6).map(row => `<a class="project-mini" href="#/app/project/${safe(row.id)}"><span class="project-mini__icon">${icon('laptop', 21)}</span><span class="project-mini__body"><span class="project-mini__name" style="display:block">${safe(row.title)}</span><span class="project-mini__detail" style="display:block">${safe(label(PROJECT_STATUS, row.status))}</span></span><span class="project-mini__end">${progress(row.progress)}<span class="project-mini__percent">${Number(row.progress) || 0}%</span></span></a>`).join('') : emptyMarkup('folder', 'Активных проектов пока нет.')}</section>
  <section class="panel"><div class="panel__header"><div class="panel__title">Быстрые действия</div></div><div class="actions">${employee() ? `<a class="button button--primary" href="#/app/orders">${icon('file')} Рассмотреть заявки ${icon('arrow', 16)}</a><a class="button button--light" href="#/app/projects">${icon('folder')} Открыть проекты</a>` : `<button class="button button--primary" data-action="new-order">${icon('plus')} Создать заявку</button><a class="button button--light" href="#/app/projects">${icon('folder')} Мои проекты</a>`}${employee() ? `<a class="button button--light" href="#/app/support">${icon('headset')} Ответить на запросы</a>` : `<a class="button button--light" href="#/app/support">${icon('headset')} Написать в поддержку</a>`}</div><hr class="divider"><div class="panel__title">Новые заявки за неделю</div><div class="kpi-bar">${activity.map(n => `<div class="kpi-bar__column" title="${n} заявок" style="height:${Math.max(7, Math.round(n / max * 100))}%"></div>`).join('')}</div></section></div>`);
}

function filteredRows() {
  const needle = state.search.toLocaleLowerCase('ru-RU').trim();
  return state.rows.filter(row => {
    if (state.status && row.status !== state.status) return false;
    return !needle || [row.title, row.description, row.service_type, row.desired_features, row.name].some(v => String(v || '').toLocaleLowerCase('ru-RU').includes(needle));
  });
}

function toolbar(data) {
  const { title, status, search, button, action, actionIcon } = data;
  return `<div class="toolbar"><div class="toolbar__group"><label class="toolbar__search">${icon('search', 17)}<input data-filter="search" type="search" placeholder="${safe(search)}" value="${safe(state.search)}"></label><select class="toolbar__select" data-filter="status" aria-label="Статус"><option value="">Все статусы</option>${Object.entries(status).map(([code, name]) => `<option value="${code}" ${state.status === code ? 'selected' : ''}>${name}</option>`).join('')}</select></div><div class="toolbar__group">${button ? `<button class="button button--primary button--tiny" data-action="${action}">${icon(actionIcon || 'plus', 16)} ${button}</button>` : ''}<button class="button button--ghost button--tiny" data-action="retry" aria-label="Обновить список">${icon('refresh', 16)} Обновить</button></div></div>`;
}

function renderOrdersTable() {
  const rows = filteredRows();
  const box = byId('data-table');
  if (!box) return;
  box.innerHTML = rows.length ? `<div class="table-frame" style="max-height:66vh"><table class="table"><thead><tr><th>№</th><th>Название</th><th>Тип услуги</th><th>Статус</th><th>Бюджет</th><th>Создана</th><th></th></tr></thead><tbody>${rows.map((row, i) => `<tr data-action="view-order" data-id="${safe(row.id)}" tabindex="0"><td>${i + 1}</td><td><div class="table__title">${safe(row.title)}</div><div class="table__subtitle">${safe(row.description || '').slice(0, 68)}</div></td><td>${safe(label(SERVICES, row.service_type))}</td><td>${statusBadge(row.status, ORDER_STATUS)}</td><td>${safe(formatBudget(row))}</td><td>${prettyDate(row.created_at)}</td><td>${icon('arrow', 17)}</td></tr>`).join('')}</tbody></table></div>` : emptyMarkup('file', 'Заявки по этому фильтру не найдены.');
}

async function orders() {
  state.rows = await getList('orders', boundFilter(), 300);
  state.search = '';
  state.status = '';
  setContent(`${header('Заявки', employee() ? 'Работа с запросами клиентов и принятие новых заказов.' : 'Отправляйте заявки и отслеживайте их статусы.')}${toolbar({ status: ORDER_STATUS, search: 'Поиск по заявкам...', button: employee() ? '' : 'Новая заявка', action: 'new-order' })}<div id="data-table"></div><p class="section-note section-note--light">Нажмите на строку, чтобы открыть полную информацию. Таблицу можно прокручивать в обе стороны.</p>`);
  renderOrdersTable();
}

function orderDialog() {
  const inner = `<form id="create-order" data-form="create-order"><div class="form-grid"><div class="form-grid__full">${selectField('service_type', 'Тип услуги', SERVICES, 'landing')}</div><div class="form-grid__full">${field('title', 'Название проекта', 'text', 'Например, сайт для кофейни', '', 'required minlength="5" maxlength="150"')}</div><div class="form-grid__full">${field('description', 'Описание', 'textarea', 'Расскажите о целях проекта и пожеланиях', '', 'required minlength="10" maxlength="4000"')}</div><div class="form-grid__full">${field('desired_features', 'Желаемый функционал', 'textarea', 'Какие возможности нужны на сайте?')}</div>${field('budget_min', 'Бюджет от, ₽', 'text', '50 000', '', 'inputmode="numeric" data-money maxlength="15"')}${field('budget_max', 'Бюджет до, ₽', 'text', '120 000', '', 'inputmode="numeric" data-money maxlength="15"')}${field('desired_deadline', 'Желаемый срок', 'date', '', '', '')}${field('example_links', 'Ссылки на примеры', 'url', 'https://example.com')}
  </div>${dialogButtons('create-order', 'Отправить заявку')}</form><p class="section-note section-note--light">Дата выбирается через календарь. Бюджет можно не указывать.</p>`;
  openDialog('Новая заявка', inner, '', true);
}

async function viewOrder(id) {
  const row = state.rows.find(item => item.id === id) || check(await db.from('orders').select('*').eq('id', id).single());
  const parts = `${line('Статус', label(ORDER_STATUS, row.status))}${line('Тип услуги', label(SERVICES, row.service_type))}${line('Описание', row.description, true)}${line('Желаемые функции', row.desired_features)}${line('Бюджет', formatBudget(row))}${line('Желаемый срок', prettyDate(row.desired_deadline))}${line('Ссылки на примеры', row.example_links)}${line('Дата создания', prettyDate(row.created_at, true))}`;
  const actions = employee() ? `<div class="form-actions"><button class="button button--ghost" data-action="review-order" data-id="${safe(id)}">На рассмотрение</button><button class="button button--danger" data-action="reject-order" data-id="${safe(id)}">Отклонить</button><button class="button button--primary" data-action="accept-order" data-id="${safe(id)}" ${row.status === 'accepted' ? 'disabled' : ''}>Принять и создать проект</button></div>` : '';
  openDialog(row.title, `<div class="order-detail">${parts}</div>${actions}`, '', true);
}

function renderProjectsTable() {
  const rows = filteredRows();
  const box = byId('data-table');
  if (!box) return;
  box.innerHTML = rows.length ? `<div class="table-frame" style="max-height:66vh"><table class="table"><thead><tr><th>Название</th><th>Стадия</th><th>Создан</th><th>Готовность</th><th></th></tr></thead><tbody>${rows.map(row => `<tr data-action="go-project" data-id="${safe(row.id)}" tabindex="0"><td><div class="table__title">${safe(row.title)}</div><div class="table__subtitle">${safe(row.description || '').slice(0, 80)}</div></td><td>${statusBadge(row.status, PROJECT_STATUS)}</td><td>${prettyDate(row.created_at)}</td><td><div class="table__progress">${progress(row.progress)}<b>${Number(row.progress) || 0}%</b></div></td><td>${icon('arrow', 18)}</td></tr>`).join('')}</tbody></table></div>` : emptyMarkup('folder', 'Проектов с такими параметрами нет.');
}

async function projects() {
  state.rows = await getList('projects', boundFilter(), 300);
  state.search = currentParams().get('q') || '';
  state.status = '';
  setContent(`${header('Проекты', 'Откройте проект, чтобы перейти к обсуждению, задачам и согласованиям.')}${toolbar({ status: PROJECT_STATUS, search: 'Поиск по проектам...' })}<div id="data-table"></div><p class="section-note section-note--light">Нажмите на проект, чтобы открыть чат и рабочую область.</p>`);
  renderProjectsTable();
}

function renderSupportTable() {
  const rows = filteredRows();
  const box = byId('data-table');
  if (!box) return;
  box.innerHTML = rows.length ? `<div class="table-frame" style="max-height:66vh"><table class="table"><thead><tr><th>Тема обращения</th><th>Статус</th><th>Приоритет</th><th>Создано</th><th></th></tr></thead><tbody>${rows.map(row => `<tr data-action="go-ticket" data-id="${safe(row.id)}" tabindex="0"><td><div class="table__title">${safe(row.title)}</div><div class="table__subtitle">${safe(row.description || '').slice(0, 80)}</div></td><td>${statusBadge(row.status, TICKET_STATUS)}</td><td>${safe(label(PRIORITY, row.priority))}</td><td>${prettyDate(row.created_at)}</td><td>${icon('arrow', 18)}</td></tr>`).join('')}</tbody></table></div>` : emptyMarkup('headset', 'Обращений не найдено.');
}

async function support() {
  state.rows = await getList('tickets', boundFilter(), 300);
  state.search = '';
  state.status = '';
  setContent(`${header('Запросы в поддержку', employee() ? 'Запросы клиентов и помощь по проектам.' : 'Свяжитесь с командой или просмотрите историю запросов.')}${toolbar({ status: TICKET_STATUS, search: 'Поиск по обращениям...', button: employee() ? '' : 'Новое обращение', action: 'new-ticket' })}<div id="data-table"></div><p class="section-note section-note--light">Нажмите на обращение, чтобы открыть переписку.</p>`);
  renderSupportTable();
}

function ticketDialog() {
  openDialog('Новое обращение', `<form id="create-ticket" data-form="create-ticket">${field('title', 'Тема обращения', 'text', 'Например, вопрос по срокам проекта', '', 'required minlength="5" maxlength="160"')}${field('description', 'Опишите ситуацию', 'textarea', 'Расскажите, с чем нужна помощь', '', 'required minlength="10"')}${selectField('priority', 'Приоритет', PRIORITY, 'normal')}${dialogButtons('create-ticket', 'Отправить обращение')}</form>`);
}

async function project(id) {
  const record = check(await db.from('projects').select('*').eq('id', id).single());
  state.activeProject = record;
  const tab = currentParams().get('tab') || 'chat';
  const tabs = [ ['chat', 'Обсуждение', 'message'], ['tasks', 'Задачи', 'file'], ['info', 'Информация', 'info'], ['team', 'Команда', 'users'], ['approvals', 'Согласования', 'shield'] ];
  const headerControls = `${employee() ? `<button data-action="edit-project" class="button button--ghost button--tiny">${icon('pencil', 15)} Изменить этап</button>` : ''}<a href="#/app/projects" class="button button--ghost button--tiny">${icon('back', 16)} К проектам</a>`;
  setContent(`${header(record.title, `Проекты / ${label(PROJECT_STATUS, record.status)} · ${Number(record.progress) || 0}% готовности`, headerControls)}<div class="tabbar" role="tablist">${tabs.map(([key, text, ico]) => `<a class="tabbar__item ${tab === key ? 'tabbar__item--active' : ''}" href="#/app/project/${safe(id)}?tab=${key}" role="tab" aria-selected="${tab === key}">${icon(ico, 16)} ${text}</a>`).join('')}</div><div id="project-tab">${busyMarkup()}</div>`);
  if (tab === 'chat') {
    byId('project-tab').innerHTML = `<div class="detail-grid"><div id="chat-area"></div><aside class="panel panel--tight"><div class="panel__title" style="margin-bottom:18px">Детали проекта</div>${line('Стадия', label(PROJECT_STATUS, record.status))}${line('Готовность', `${record.progress || 0}%`)}${progress(record.progress)}<div style="height:18px"></div>${line('Дата создания', prettyDate(record.created_at))}<div class="details-description" style="font-size:11px;margin-top:15px">${safe(record.description || '')}</div></aside></div>`;
    await chat('project_messages', 'project_id', id, 'chat-area');
    db.rpc('mark_context_read', { p_context: 'project_chat', p_context_id: id }).then(() => {}).catch(() => {});
  } else if (tab === 'tasks') await projectTasks(id);
  else if (tab === 'info') projectInfo(record);
  else if (tab === 'team') await projectTeam(id);
  else if (tab === 'approvals') await projectApprovals(id);
}

function projectInfo(record) {
  const url = isUrl(record.website_url) ? record.website_url : '';
  byId('project-tab').innerHTML = `<div class="page-grid"><section class="panel"><div class="panel__title" style="margin-bottom:18px">О проекте</div><div class="details-description">${safe(record.description || 'Описание пока не добавлено.')}</div></section><aside class="panel"><div class="panel__title" style="margin-bottom:18px">Ход разработки</div>${line('Название', record.title)}${line('Стадия', label(PROJECT_STATUS, record.status))}${line('Готовность', `${record.progress || 0}%`)}${progress(record.progress)}<div style="height:20px"></div>${line('Создан', prettyDate(record.created_at))}${url ? `<div class="info-row"><div class="info-row__label">Адрес сайта</div><a class="link" href="${safe(url)}" target="_blank" rel="noopener noreferrer">Открыть сайт ${icon('external', 14)}</a></div>` : ''}</aside></div>`;
}

async function projectTasks(id) {
  let request = db.from('project_tasks').select('*').eq('project_id', id).order('created_at', { ascending: false }).limit(300);
  if (!employee()) request = request.eq('visibility', 'client');
  const tasks = check(await request);
  state.tasks = tasks;
  byId('project-tab').innerHTML = `<div class="toolbar"><div class="toolbar__group"><span class="muted">Всего задач: ${tasks.length}</span></div>${employee() ? `<button class="button button--primary button--tiny" data-action="new-task">${icon('plus', 17)} Новая задача</button>` : ''}</div><div class="task-list">${tasks.length ? tasks.map(row => `<article class="task"><div><div class="task__title">${safe(row.title)}</div><p class="task__description">${safe(row.description || '')}</p><div class="task__meta"><span>${icon('calendar', 13)} ${prettyDate(row.due_date)}</span><span>Приоритет: ${safe(label(PRIORITY, row.priority))}</span><span>${row.visibility === 'internal' ? 'Команде' : 'Клиенту'}</span></div></div><div class="task__actions">${employee() ? `<select class="task__select" data-action="task-status" data-id="${safe(row.id)}">${opt(TASK_STATUS, row.status)}</select><button class="button button--light button--tiny" data-action="edit-task" data-id="${safe(row.id)}">${icon('pencil', 15)}</button><button class="button button--danger button--tiny" data-action="delete-task" data-id="${safe(row.id)}">${icon('trash', 15)}</button>` : statusBadge(row.status, TASK_STATUS)}</div></article>`).join('') : emptyMarkup('file', 'Задач пока нет.')}</div>`;
}

async function projectTeam(id) {
  const rows = check(await db.from('project_members').select('project_id,employee_id,member_role,specialty').eq('project_id', id));
  await fetchNames(rows.map(row => row.employee_id));
  byId('project-tab').innerHTML = `<div class="toolbar"><span class="muted">Участники проекта: ${rows.length}</span>${employee() ? `<button class="button button--primary button--tiny" data-action="new-member">${icon('plus', 16)} Добавить сотрудника</button>` : ''}</div><div class="team">${rows.length ? rows.map(row => `<div class="team__member"><div class="workspace__avatar">${safe((names.get(row.employee_id) || 'С')[0])}</div><div style="flex:1;min-width:0"><div class="team__name">${safe(names.get(row.employee_id) || 'Сотрудник')}</div><div class="team__role">${safe(row.specialty || row.member_role || 'Участник')}</div></div>${employee() ? `<button class="button button--danger button--tiny" data-action="remove-member" data-id="${safe(row.employee_id)}" aria-label="Удалить">${icon('x', 15)}</button>` : ''}</div>`).join('') : emptyMarkup('users', 'Состав команды пока не указан.')}</div>`;
}

async function projectApprovals(id) {
  const rows = check(await db.from('project_approvals').select('*').eq('project_id', id).order('created_at', { ascending: false }).limit(100));
  const states = { pending: 'Ожидает решения', approved: 'Согласовано', changes_requested: 'Нужны изменения' };
  byId('project-tab').innerHTML = `<div class="toolbar"><span class="muted">Запросы согласования: ${rows.length}</span>${employee() ? `<button class="button button--primary button--tiny" data-action="new-approval">${icon('plus', 16)} Отправить на согласование</button>` : ''}</div>${rows.length ? rows.map(row => `<article class="agreement"><div class="agreement__title">${safe(row.title)}</div><div class="agreement__description">${safe(row.description)}</div><div class="agreement__footer"><div>${statusBadge(row.status, states)} <span style="font-size:10px;color:#729097;margin-left:10px">Версия ${Number(row.revision) || 1} · ${prettyDate(row.updated_at)}</span></div><div class="agreement__actions">${!employee() && row.status === 'pending' ? `<button class="button button--primary button--tiny" data-action="decide-approval" data-id="${safe(row.id)}" data-decision="approved">Согласовать</button><button class="button button--ghost button--tiny" data-action="decide-approval" data-id="${safe(row.id)}" data-decision="changes_requested">Запросить изменения</button>` : ''}<button class="button button--light button--tiny" data-action="approval-history" data-id="${safe(row.id)}">История</button></div></div></article>`).join('') : emptyMarkup('shield', 'Согласований пока нет.')}`;
}

async function approvalHistory(id) {
  const rows = check(await db.from('project_approval_events').select('*').eq('approval_id', id).order('created_at', { ascending: true }).limit(100));
  openDialog('История согласования', rows.length ? rows.map(row => `<div class="info-row">${line('Действие', row.action)}${line('Комментарий', row.comment)}${line('Когда', prettyDate(row.created_at, true))}</div>`).join('') : '<p class="muted">История пуста.</p>');
}

async function ticket(id) {
  const row = check(await db.from('tickets').select('*').eq('id', id).single());
  state.activeTicket = row;
  const action = employee() ? `<select class="toolbar__select" data-action="ticket-status" aria-label="Статус обращения">${opt(TICKET_STATUS, row.status)}</select>` : '';
  setContent(`${header(row.title, 'Поддержка / Переписка по обращению', `<a href="#/app/support" class="button button--ghost button--tiny">${icon('back', 16)} К обращениям</a>`)}<div class="toolbar"><div class="toolbar__group">${statusBadge(row.status, TICKET_STATUS)}<span class="muted">Приоритет: ${safe(label(PRIORITY, row.priority))}</span></div>${action}</div><div class="detail-grid"><div id="chat-area"></div><aside class="panel panel--tight"><div class="panel__title" style="margin-bottom:18px">Описание обращения</div><div class="details-description">${safe(row.description)}</div><hr class="divider">${line('Создано', prettyDate(row.created_at, true))}</aside></div>`);
  await chat('ticket_messages', 'ticket_id', id, 'chat-area');
  db.rpc('mark_context_read', { p_context: 'ticket_details', p_context_id: id }).then(() => {}).catch(() => {});
}

async function chat(table, foreign, id, nodeId) {
  const node = byId(nodeId);
  if (!node) return;
  node.innerHTML = `<div class="chat"><div class="chat__header"><span>${icon('message', 17)} Обсуждение</span><button class="button button--ghost button--tiny" data-action="refresh-chat" aria-label="Обновить чат">${icon('refresh', 15)}</button></div><div id="chat-messages" class="chat__messages"><div class="chat__loading">Загружаем сообщения...</div></div><form class="chat__composer" data-form="send-message"><textarea name="body" placeholder="Написать сообщение..." maxlength="${table === 'project_messages' ? 4000 : 2000}" required aria-label="Сообщение"></textarea><button class="chat__send" type="submit" aria-label="Отправить сообщение">${icon('send', 21)}</button></form><div class="chat__status" id="chat-status">Сообщения обновляются автоматически</div></div>`;
  state.chat = { table, foreign, id, container: nodeId, busy: false, fingerprint: '' };
  await refreshChat(true);
  state.channel = db.channel(`zlabs_${table}_${id}_${Date.now()}`).on('postgres_changes', { event: '*', schema: 'public', table, filter: `${foreign}=eq.${id}` }, () => refreshChat(false)).subscribe();
  state.timer = setInterval(() => refreshChat(false), 9000);
}

async function refreshChat(force) {
  const context = state.chat;
  if (!context || context.busy || !byId('chat-messages')) return;
  context.busy = true;
  try {
    const data = check(await db.from(context.table).select('id,author_id,body,created_at').eq(context.foreign, context.id).order('created_at', { ascending: false }).limit(200));
    data.reverse();
    const fingerprint = `${data.length}:${data.at(-1)?.id}:${data.at(-1)?.body}`;
    if (context !== state.chat || (!force && fingerprint === context.fingerprint)) return;
    context.fingerprint = fingerprint;
    await fetchNames(data.map(row => row.author_id).filter(uid => uid !== viewerId()));
    const body = byId('chat-messages');
    if (!body) return;
    const nearBottom = body.scrollHeight - body.scrollTop - body.clientHeight < 150;
    body.innerHTML = data.length ? data.map(message => {
      const mine = message.author_id === viewerId();
      const name = mine ? 'Вы' : (names.get(message.author_id) || 'Участник');
      return `<div class="chat__line ${mine ? 'chat__line--mine' : ''}"><div class="chat__bubble"><div class="chat__author">${safe(name)}</div><div class="chat__body">${safe(message.body)}</div><div class="chat__time">${prettyDate(message.created_at, true)}</div></div></div>`;
    }).join('') : `<div class="chat__loading">Сообщений пока нет. Начните обсуждение.</div>`;
    if (nearBottom || force) body.scrollTop = body.scrollHeight;
    const text = byId('chat-status');
    if (text) text.textContent = 'Чат обновляется автоматически';
  } catch (error) {
    const text = byId('chat-status');
    if (text) text.textContent = `Ошибка обновления: ${errorMessage(error)}`;
  } finally { context.busy = false; }
}

async function notifications() {
  const rows = check(await db.from('notifications').select('*').eq('user_id', viewerId()).order('created_at', { ascending: false }).limit(120));
  setContent(`${header('Уведомления', 'События по вашим заявкам, проектам и обращениям.', `<button class="button button--ghost button--tiny" data-action="read-all">${icon('check', 16)} Прочитать всё</button>`)}${rows.length ? rows.map(row => `<article class="notification ${!row.read_at ? 'notification--unread' : ''}" data-action="open-notification" data-id="${safe(row.id)}" data-project="${safe(row.project_id || '')}" data-ticket="${safe(row.ticket_id || '')}" data-order="${safe(row.order_id || '')}" tabindex="0"><div class="notification__icon">${icon('bell', 21)}</div><div class="notification__body"><div class="notification__title">${safe(row.title || 'Уведомление')}</div><div class="notification__text">${safe(row.body || '')}</div></div><div class="notification__date">${prettyDate(row.created_at, true)}</div></article>`).join('') : emptyMarkup('bell', 'Пока нет уведомлений.')}`);
}

async function profile() {
  const data = check(await db.from('profiles').select('id,full_name,role,created_at').eq('id', viewerId()).single());
  state.profile = data;
  setContent(`${header('Профиль', 'Управление личными данными и безопасностью аккаунта.')}<div class="profile"><aside class="panel profile__card"><div class="profile__avatar">${safe(initials())}</div><div class="profile__name">${safe(data.full_name || 'Пользователь')}</div><div class="profile__role">${employee() ? 'Сотрудник' : 'Клиент'}</div><hr class="divider">${line('Электронная почта', state.session?.user?.email)}${line('Дата регистрации', prettyDate(data.created_at))}</aside><section class="panel"><div class="panel__title" style="margin-bottom:22px">Личные данные</div><form id="profile-form" class="profile__form" data-form="profile">${field('full_name', 'Имя и фамилия', 'text', 'Имя и фамилия', data.full_name, 'required minlength="2" maxlength="60"')}<button class="button button--primary" type="submit">${icon('check', 16)} Сохранить изменения</button></form><hr class="divider"><div class="panel__title" style="margin-bottom:22px">Безопасность аккаунта</div><form id="password-change" class="profile__form" data-form="change-password">${passwordField('new_password', 'Новый пароль', 'Не менее 8 символов, A-Z и a-z')}${passwordField('repeat_password', 'Подтверждение пароля', 'Повторите новый пароль')}<button class="button button--light" type="submit">${icon('lock', 16)} Сменить пароль</button></form></section></div>`);
}

function taskDialog(item = {}) {
  const title = item.id ? 'Редактировать задачу' : 'Новая задача';
  const html = `<form id="task-form" data-form="save-task" data-id="${safe(item.id || '')}">${field('title', 'Название', 'text', 'Что нужно сделать', item.title || '', 'required minlength="2" maxlength="150"')}${field('description', 'Описание', 'textarea', 'Подробности задачи', item.description || '')}<div class="form-grid">${selectField('priority', 'Приоритет', PRIORITY, item.priority || 'normal')}${selectField('visibility', 'Видимость', { client: 'Клиенту', internal: 'Только команде' }, item.visibility || 'client')}${field('due_date', 'Срок выполнения', 'date', '', item.due_date || '')}${item.id ? selectField('status', 'Статус', TASK_STATUS, item.status || 'todo') : ''}</div>${dialogButtons('task-form', 'Сохранить задачу')}</form>`;
  openDialog(title, html);
}

function projectDialog(row) {
  const html = `<form id="project-form" data-form="update-project"><div class="form-grid">${selectField('status', 'Стадия разработки', PROJECT_STATUS, row.status)}${field('progress', 'Готовность, %', 'number', '0-100', row.progress || 0, 'min="0" max="100" required')}
  <div class="form-grid__full">${field('website_url', 'Ссылка на готовый сайт', 'url', 'https://example.com', row.website_url || '')}</div></div>${dialogButtons('project-form', 'Сохранить изменения')}</form>`;
  openDialog('Редактирование проекта', html);
}

function approvalDialog() {
  openDialog('Отправить на согласование', `<form id="approval-form" data-form="approval">${field('title', 'Название', 'text', 'Что согласуем', '', 'required minlength="3"')}${field('description', 'Описание изменений', 'textarea', 'Что подготовлено и что нужно проверить', '', 'required minlength="10"')}${dialogButtons('approval-form', 'Отправить')}</form>`);
}

async function memberDialog() {
  const employees = check(await db.from('profiles').select('id,full_name').eq('role', 'employee').order('full_name', { ascending: true }));
  if (!employees.length) { toast('Нет сотрудников, которых можно назначить.', true); return; }
  const choices = Object.fromEntries(employees.map(row => [row.id, row.full_name || 'Сотрудник']));
  openDialog('Добавить участника', `<form id="member-form" data-form="add-member">${selectField('employee_id', 'Сотрудник', choices)}${field('specialty', 'Специализация', 'text', 'Например, дизайнер или разработчик')}${dialogButtons('member-form', 'Добавить')}</form>`);
}

async function loginSubmit(form) {
  const values = params(form);
  const result = await db.auth.signInWithPassword({ email: values.email.trim(), password: values.password });
  check(result);
  state.session = result.data.session;
  state.profile = null;
  await loadProfile();
  const destination = currentParams().get('next');
  to(destination === 'orders' ? '/app/orders' : '/app/dashboard');
}

async function registerSubmit(form) {
  const values = params(form);
  if (values.fullName.trim().length < 2) throw new Error('Введите имя длиной от 2 символов.');
  if (values.password.length < 8 || !/[A-ZА-ЯЁ]/.test(values.password) || !/[a-zа-яё]/.test(values.password)) throw new Error('Пароль должен содержать 8 символов, заглавную и строчную буквы.');
  if (values.password !== values.passwordRepeat) throw new Error('Пароли не совпадают.');
  const result = await db.auth.signUp({ email: values.email.trim(), password: values.password, options: { data: { full_name: values.fullName.trim() } } });
  check(result);
  if (!result.data.session) {
    toast('Проверьте почту и подтвердите регистрацию по ссылке.');
    to('/login');
  } else {
    state.session = result.data.session;
    state.profile = null;
    await loadProfile();
    to('/app/dashboard');
  }
}

async function forgotSubmit(form) {
  const values = params(form);
  check(await db.auth.resetPasswordForEmail(values.email.trim(), { redirectTo: `${location.origin}/` }));
  toast('Если адрес зарегистрирован, письмо для восстановления придёт на почту.');
  to('/login');
}

function readBudget(raw) {
  const only = String(raw || '').replace(/[^\d]/g, '');
  if (!only) return null;
  const n = Number(only);
  if (!Number.isSafeInteger(n) || n < 0) throw new Error('Некорректный бюджет.');
  return n;
}

async function createOrderSubmit(form) {
  const v = params(form);
  const minimum = readBudget(v.budget_min);
  const maximum = readBudget(v.budget_max);
  if (minimum != null && maximum != null && minimum > maximum) throw new Error('Минимальный бюджет больше максимального.');
  if (!isUrl(v.example_links.trim())) throw new Error('Ссылка на пример должна начинаться с https://.');
  const payload = {
    client_id: viewerId(), service_type: v.service_type, title: v.title.trim(), description: v.description.trim(),
    desired_features: v.desired_features.trim() || null, budget_min: minimum, budget_max: maximum,
    desired_deadline: v.desired_deadline || null, example_links: v.example_links.trim() || null
  };
  check(await db.from('orders').insert(payload));
  closeDialog();
  toast('Заявка создана.');
  await orders();
}

async function changeOrder(id, mode) {
  if (!employee()) throw new Error('Действие доступно только сотрудникам.');
  if (mode === 'accepted') {
    if (!confirm('Принять заявку и создать проект?')) return;
    check(await db.rpc('accept_order_and_create_project', { p_order_id: id }));
    closeDialog();
    toast('Заявка принята, проект создан.');
    to('/app/projects');
    return;
  }
  if (mode === 'rejected' && !confirm('Отклонить эту заявку?')) return;
  check(await db.from('orders').update({ status: mode }).eq('id', id));
  closeDialog();
  toast('Статус заявки обновлён.');
  await orders();
}

async function createTicketSubmit(form) {
  const v = params(form);
  check(await db.from('tickets').insert({ client_id: viewerId(), project_id: null, title: v.title.trim(), description: v.description.trim(), priority: v.priority }));
  closeDialog();
  toast('Обращение отправлено.');
  await support();
}

async function sendMessageSubmit(form) {
  if (!state.chat) return;
  const v = params(form);
  const text = v.body.trim();
  if (!text) return;
  const context = state.chat;
  const submit = form.querySelector('[type="submit"]');
  if (submit) submit.disabled = true;
  try {
    check(await db.from(context.table).insert({ [context.foreign]: context.id, author_id: viewerId(), body: text }));
    form.reset();
    await refreshChat(true);
  } finally { if (submit) submit.disabled = false; }
}

async function saveTaskSubmit(form) {
  if (!employee()) throw new Error('Недостаточно прав.');
  const v = params(form);
  const payload = {
    title: v.title.trim(), description: v.description.trim() || null, priority: v.priority,
    visibility: v.visibility, due_date: v.due_date || null
  };
  if (form.dataset.id) {
    check(await db.from('project_tasks').update({ ...payload, status: v.status }).eq('id', form.dataset.id).eq('project_id', state.activeProject.id));
  } else {
    check(await db.from('project_tasks').insert({ ...payload, project_id: state.activeProject.id }));
  }
  closeDialog();
  toast('Задача сохранена.');
  await projectTasks(state.activeProject.id);
}

async function updateProjectSubmit(form) {
  if (!employee()) throw new Error('Недостаточно прав.');
  const v = params(form);
  const pct = Number(v.progress);
  if (!Number.isInteger(pct) || pct < 0 || pct > 100) throw new Error('Готовность должна быть от 0 до 100%.');
  if ((v.status === 'completed') !== (pct === 100)) throw new Error('У завершённого проекта готовность должна составлять 100%.');
  if (!isUrl(v.website_url.trim())) throw new Error('Укажите правильную ссылку на сайт.');
  check(await db.from('projects').update({ status: v.status, progress: pct, website_url: v.website_url.trim() || null }).eq('id', state.activeProject.id));
  closeDialog();
  toast('Проект обновлён.');
  await project(state.activeProject.id);
}

async function submitApproval(form) {
  if (!employee()) throw new Error('Недостаточно прав.');
  const v = params(form);
  check(await db.rpc('submit_project_approval', { p_project_id: state.activeProject.id, p_title: v.title.trim(), p_description: v.description.trim(), p_approval_id: null }));
  closeDialog();
  toast('Отправлено на согласование.');
  await projectApprovals(state.activeProject.id);
}

async function memberSubmit(form) {
  if (!employee()) throw new Error('Недостаточно прав.');
  const v = params(form);
  check(await db.from('project_members').insert({ project_id: state.activeProject.id, employee_id: v.employee_id, member_role: 'contributor', specialty: v.specialty.trim() || null }));
  closeDialog();
  toast('Сотрудник добавлен.');
  await projectTeam(state.activeProject.id);
}

async function updateProfile(form) {
  const v = params(form);
  const name = v.full_name.trim();
  if (name.length < 2 || name.length > 60) throw new Error('Имя должно содержать от 2 до 60 символов.');
  check(await db.from('profiles').update({ full_name: name }).eq('id', viewerId()));
  state.profile.full_name = name;
  toast('Имя сохранено.');
  await profile();
}

async function changePassword(form) {
  const v = params(form);
  if (v.new_password.length < 8 || !/[A-ZА-ЯЁ]/.test(v.new_password) || !/[a-zа-яё]/.test(v.new_password)) throw new Error('Нужны 8 символов, заглавная и строчная буквы.');
  if (v.new_password !== v.repeat_password) throw new Error('Пароли не совпадают.');
  check(await db.auth.updateUser({ password: v.new_password }));
  form.reset();
  toast('Пароль успешно обновлён.');
}

async function formHandler(form) {
  const handler = form.dataset.form;
  if (handler === 'login') await loginSubmit(form);
  else if (handler === 'register') await registerSubmit(form);
  else if (handler === 'forgot') await forgotSubmit(form);
  else if (handler === 'create-order') await createOrderSubmit(form);
  else if (handler === 'create-ticket') await createTicketSubmit(form);
  else if (handler === 'send-message') await sendMessageSubmit(form);
  else if (handler === 'save-task') await saveTaskSubmit(form);
  else if (handler === 'update-project') await updateProjectSubmit(form);
  else if (handler === 'approval') await submitApproval(form);
  else if (handler === 'add-member') await memberSubmit(form);
  else if (handler === 'profile') await updateProfile(form);
  else if (handler === 'change-password') await changePassword(form);
}

async function actionHandler(node) {
  const action = node.dataset.action;
  const id = node.dataset.id;
  if (action === 'cookie-accept') saveCookieChoice('accepted');
  else if (action === 'cookie-essential') saveCookieChoice('necessary');
  else if (action === 'cookie-open') showCookieBanner();
  else if (action === 'close-dialog') closeDialog();
  else if (action === 'retry') await render();
  else if (action === 'toggle-password') {
    const input = byId(node.dataset.target);
    if (!input) return;
    input.type = input.type === 'password' ? 'text' : 'password';
    node.innerHTML = icon(input.type === 'password' ? 'eye' : 'eye-off');
    node.setAttribute('aria-label', input.type === 'password' ? 'Показать пароль' : 'Скрыть пароль');
  }
  else if (action === 'toggle-menu') app.querySelector('.workspace')?.classList.toggle('workspace--nav-open');
  else if (action === 'close-menu') app.querySelector('.workspace')?.classList.remove('workspace--nav-open');
  else if (action === 'mobile-public-menu') app.querySelector('.landing__nav')?.classList.toggle('landing__nav--open');
  else if (action === 'logout') {
    check(await db.auth.signOut());
    state.session = null; state.profile = null; state.unread = 0;
    to('/');
  }
  else if (action === 'new-order') orderDialog();
  else if (action === 'view-order') await viewOrder(id);
  else if (action === 'review-order') await changeOrder(id, 'reviewing');
  else if (action === 'reject-order') await changeOrder(id, 'rejected');
  else if (action === 'accept-order') await changeOrder(id, 'accepted');
  else if (action === 'go-project') to(`/app/project/${id}`);
  else if (action === 'new-ticket') ticketDialog();
  else if (action === 'go-ticket') to(`/app/ticket/${id}`);
  else if (action === 'refresh-chat') await refreshChat(true);
  else if (action === 'edit-project') projectDialog(state.activeProject);
  else if (action === 'new-task') taskDialog();
  else if (action === 'edit-task') taskDialog(state.tasks?.find(row => row.id === id) || {});
  else if (action === 'delete-task') {
    if (!employee() || !confirm('Удалить выбранную задачу?')) return;
    check(await db.from('project_tasks').delete().eq('id', id).eq('project_id', state.activeProject.id));
    toast('Задача удалена.');
    await projectTasks(state.activeProject.id);
  }
  else if (action === 'new-member') await memberDialog();
  else if (action === 'remove-member') {
    if (!employee() || !confirm('Удалить сотрудника из проекта?')) return;
    check(await db.from('project_members').delete().eq('project_id', state.activeProject.id).eq('employee_id', id));
    toast('Участник удалён.');
    await projectTeam(state.activeProject.id);
  }
  else if (action === 'new-approval') approvalDialog();
  else if (action === 'approval-history') await approvalHistory(id);
  else if (action === 'decide-approval') {
    if (employee()) return;
    const decision = node.dataset.decision;
    const comment = decision === 'changes_requested' ? prompt('Какие изменения нужны?') : prompt('Комментарий к согласованию (необязательно):', '');
    if (comment === null) return;
    if (decision === 'changes_requested' && comment.trim().length < 3) throw new Error('Укажите, какие изменения нужны.');
    check(await db.rpc('decide_project_approval', { p_approval_id: id, p_decision: decision, p_comment: comment.trim() }));
    toast('Решение сохранено.');
    await projectApprovals(state.activeProject.id);
  }
  else if (action === 'read-all') {
    check(await db.rpc('mark_all_notifications_read', {}));
    state.unread = 0;
    await render();
  }
  else if (action === 'open-notification') {
    check(await db.rpc('mark_notification_read', { p_notification_id: id }));
    if (node.dataset.project) to(`/app/project/${node.dataset.project}`);
    else if (node.dataset.ticket) to(`/app/ticket/${node.dataset.ticket}`);
    else if (node.dataset.order) to('/app/orders');
    else await render();
  }
}

function attachEvents() {
  document.addEventListener('click', async event => {
    const anchor = event.target.closest('[data-scroll]');
    if (anchor) {
      event.preventDefault();
      byId(anchor.dataset.scroll)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    const node = event.target.closest('[data-action]');
    if (!node || node.tagName === 'SELECT') return;
    if (node.tagName === 'BUTTON') event.preventDefault();
    try { await actionHandler(node); } catch (error) { toast(errorMessage(error), true); }
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeDialog();
    if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('tr[data-action], article.notification[data-action]')) {
      event.preventDefault();
      event.target.click();
    }
    if (event.key === 'Enter' && event.target.matches('.chat__composer textarea') && !event.shiftKey) {
      event.preventDefault();
      event.target.closest('form')?.requestSubmit();
    }
    if (event.key === 'Enter' && event.target.id === 'global-search') {
      to(`/app/projects?q=${encodeURIComponent(event.target.value)}`);
    }
  });
  document.addEventListener('submit', async event => {
    const form = event.target.closest('form[data-form]');
    if (!form) return;
    event.preventDefault();
    const button = form.querySelector('[type="submit"]');
    if (button) button.disabled = true;
    try { await formHandler(form); } catch (error) { toast(errorMessage(error), true); }
    finally { if (button?.isConnected) button.disabled = false; }
  });
  document.addEventListener('input', event => {
    const target = event.target;
    if (target.matches('[data-money]')) {
      const digits = target.value.replace(/\D/g, '').slice(0, 12);
      target.value = digits ? Number(digits).toLocaleString('ru-RU') : '';
    }
    if (target.id === 'password' || target.id === 'passwordRepeat') {
      const password = byId('password');
      const repeat = byId('passwordRepeat');
      const feedback = byId('password-feedback');
      if (!password || !repeat || !feedback) return;
      const strong = password.value.length >= 8 && /[A-ZА-ЯЁ]/.test(password.value) && /[a-zа-яё]/.test(password.value);
      const match = password.value === repeat.value;
      feedback.textContent = !strong ? 'Минимум 8 символов, заглавная и строчная буквы.' : !match && repeat.value ? 'Пароли не совпадают.' : strong && match && repeat.value ? 'Пароль подходит, оба поля совпадают.' : 'Пароль подходит. Повторите его ниже.';
      feedback.className = `auth__strength ${strong && match && repeat.value ? 'auth__strength--ok' : ''}`;
      repeat.setCustomValidity(repeat.value && !match ? 'Пароли не совпадают' : '');
    }
    if (target.matches('[data-filter="search"]')) {
      state.search = target.value;
      if (route() === '/app/orders') renderOrdersTable();
      else if (route() === '/app/projects') renderProjectsTable();
      else if (route() === '/app/support') renderSupportTable();
    }
  });
  document.addEventListener('change', async event => {
    const target = event.target;
    try {
      if (target.matches('[data-filter="status"]')) {
        state.status = target.value;
        if (route() === '/app/orders') renderOrdersTable();
        else if (route() === '/app/projects') renderProjectsTable();
        else if (route() === '/app/support') renderSupportTable();
      }
      if (target.dataset.action === 'task-status') {
        if (!employee()) return;
        check(await db.from('project_tasks').update({ status: target.value }).eq('id', target.dataset.id).eq('project_id', state.activeProject.id));
        toast('Статус задачи изменён.');
        await projectTasks(state.activeProject.id);
      }
      if (target.dataset.action === 'ticket-status') {
        if (!employee()) return;
        check(await db.from('tickets').update({ status: target.value }).eq('id', state.activeTicket.id));
        toast('Статус обращения изменён.');
        await ticket(state.activeTicket.id);
      }
    } catch (error) { toast(errorMessage(error), true); }
  });
}

async function init() {
  attachEvents();
  initCookies();
  app.innerHTML = busyMarkup();
  const response = await db.auth.getSession();
  if (response.error) toast(errorMessage(response.error), true);
  state.session = response.data.session;
  db.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_OUT') {
      state.session = null;
      state.profile = null;
      stopListeners();
      if (route().startsWith('/app')) to('/login');
    } else if (event === 'TOKEN_REFRESHED') state.session = session;
    else if (event === 'PASSWORD_RECOVERY') {
      state.session = session;
      toast('Ссылка подтверждена. Откройте профиль и смените пароль.');
    }
  });
  window.addEventListener('hashchange', render);
  await render();
}

init().catch(error => {
  app.innerHTML = errorMarkup(error);
});
