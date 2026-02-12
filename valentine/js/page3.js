
const star = document.getElementById('star');
const clickCounter = document.getElementById('clickCounter');
const letter = document.getElementById('letter');
const letterText = document.getElementById('letterText');

let clickCount = 0;
let currentStage = 1; // 1 = первые 3 клика, 2 = пасхалка 14 кликов
let maxClicks = 3; // Начальное максимальное количество кликов

// Текст письма (персонализированный для Дашулечки)
const loveLetter = `
Моя дорогая Дашулечка!🌹

Сегодня 14 февраля, и я хочу сказать тебе самые важные слова...

Ты мое солнышко, моя принцессочка, мой котенок, мой ангелочек и моя самая любимая девочка! 💖
Каждый день с тобой наполнен любовью, счастьем и радостью.

Я восхищаюсь твоей улыбкой, твоим голосом, твоей красотой и милостью.
Ты делаешь меня самым счастливым просто своим существованием.

Помнишь, как мы познакомились, мы не знали друг друга совсем! 
И сейчас я не представляю свою жизнь без тебя, без моей любимой Дашулечки.

Я доверяю тебе свою жизнь и жизнь своих близких. Ты - самое ценное, что у меня есть.

Спасибо, что ты есть у меня. Я люблю тебя больше всего на свете! 💕

С любовью, твой Илюша 💕
`;


// Элементы для пасхалки
const easterEggContainer = document.createElement('div');
easterEggContainer.id = 'easterEgg';
easterEggContainer.className = 'easter-egg';
easterEggContainer.innerHTML = `
    <div class="easter-egg-content">
        <img src="images/gif-cat.gif" alt="Милый котик" class="cat-gif">
        <h2 class="easter-egg-text">Ты ж моя умничкааааа! 💖</h2>
        <p class="easter-egg-subtext">Знала, что нужно кликнуть 14 раз? Ты самая умная! 😘</p>
        <button id="closeEasterEgg" class="btn btn-close">Закрыть и продолжить 💕</button>
    </div>
`;
document.body.appendChild(easterEggContainer);

star.addEventListener('click', () => {
    clickCount++;
    
    // Обновляем счётчик в зависимости от этапа
    if (currentStage === 1) {
        clickCounter.textContent = `Кликов: ${clickCount}/${maxClicks}`;
        clickCounter.style.color = '#E91E63';
    } else if (currentStage === 2) {
        clickCounter.textContent = `Секретных кликов: ${clickCount}/14 💫`;
        clickCounter.style.color = '#FF69B4';
        clickCounter.style.fontSize = '20px';
        clickCounter.style.fontWeight = 'bold';
    }
    
    // Создаем эффект звездочек при клике
    createStarEffect();
    
    // Первый этап: 3 клика
    if (currentStage === 1 && clickCount >= maxClicks) {
        setTimeout(() => {
            activateEasterEggMode();
        }, 500);
    }
    
    // Второй этап: пасхалка на 14 кликов
    if (currentStage === 2 && clickCount >= 14) {
        setTimeout(() => {
            triggerEasterEgg();
        }, 300);
    }
});

function createStarEffect() {
    const effect = document.createElement('div');
    effect.className = 'star-effect';
    effect.style.position = 'absolute';
    effect.style.left = `${Math.random() * 100}%`;
    effect.style.top = `${Math.random() * 100}%`;
    effect.style.color = '#FF69B4';
    effect.style.fontSize = '24px';
    effect.style.pointerEvents = 'none';
    effect.textContent = '✨';
    
    document.body.appendChild(effect);
    
    setTimeout(() => {
        effect.remove();
    }, 1000);
}

function activateEasterEggMode() {
    // Показываем письмо
    letterText.textContent = loveLetter;
    letter.style.display = 'block';
    letter.style.animation = 'fadeIn 1s ease';
    
    // Ждём немного, затем активируем режим пасхалки
    setTimeout(() => {
        // Скрываем письмо для интриги
        letter.style.opacity = '0.3';
        
        // Меняем текст и анимируем звёздочку
        clickCounter.textContent = '...';
        clickCounter.style.color = '#FF1493';
        
        setTimeout(() => {
            // Активируем второй этап
            currentStage = 2;
            maxClicks = 14;
            clickCount = 0;
            
            // Меняем текст счётчика
            clickCounter.textContent = 'Секретных кликов: 0/14 💫';
            clickCounter.style.color = '#FF69B4';
            clickCounter.style.fontSize = '20px';
            clickCounter.style.fontWeight = 'bold';
            
            // Меняем анимацию звёздочки
            star.style.animation = 'rainbowPulse 2s infinite';
            
            // Показываем подсказку
            showHint('Пссс... кликни на звёздочку ещё 14 раз! 🌟');
            
            // Возвращаем письмо
            letter.style.opacity = '1';
        }, 1000);
    }, 2000);
}

function showHint(message) {
    const hint = document.createElement('div');
    hint.className = 'hint-bubble';
    hint.textContent = message;
    hint.style.cssText = `
        position: absolute;
        background: rgba(255, 105, 180, 0.9);
        color: white;
        padding: 10px 20px;
        border-radius: 25px;
        font-size: 16px;
        bottom: 120px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 100;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        animation: hintFloat 3s ease-in-out forwards;
    `;
    
    document.querySelector('.container').appendChild(hint);
    
    setTimeout(() => {
        hint.remove();
    }, 3000);
}

function triggerEasterEgg() {
    // Показываем пасхалку
    easterEggContainer.style.display = 'flex';
    
    // Добавляем затемнение фона
    document.body.style.overflow = 'hidden';
    
    // Добавляем анимацию появления
    setTimeout(() => {
        easterEggContainer.style.opacity = '1';
        easterEggContainer.style.transform = 'scale(1)';
    }, 10);
    
    // Обработчик закрытия
    document.getElementById('closeEasterEgg').addEventListener('click', () => {
        easterEggContainer.style.opacity = '0';
        easterEggContainer.style.transform = 'scale(0.9)';
        
        setTimeout(() => {
            easterEggContainer.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    });
}