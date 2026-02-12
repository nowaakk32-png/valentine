const pinInput = document.getElementById('pinInput');
const submitPin = document.getElementById('submitPin');
const pinMessage = document.getElementById('pinMessage');

const secretHeart = document.getElementById('secretHeart');
const arrow = document.getElementById('arrow');
const secretPinModal = document.getElementById('secretPinModal');
const secretPinInput = document.getElementById('secretPinInput');
const submitSecretPin = document.getElementById('submitSecretPin');
const closeSecretPin = document.getElementById('closeSecretPin');
const secretPinMessage = document.getElementById('secretPinMessage');

// Расчет пин-кода: капеееееец (9 букв) + пипеееееееееееец (15 букв) - ваще (5 букв) = 19
const correctPin = '0208';
// Секретный пин-код (дата рождения Дашулечки)
const secretPin = '1204';

// Запускаем анимацию стрелы при загрузке страницы
window.addEventListener('load', () => {
    setTimeout(() => {
        launchArrow();
    }, 1000);
});

// Функция запуска стрелы
function launchArrow() {
    arrow.style.opacity = '1';
    arrow.classList.add('flying');
    
    // Показываем сердечко после прилёта стрелы
    setTimeout(() => {
        secretHeart.classList.add('visible');
    }, 3000);
}

// Обработчик клика на сердечко
secretHeart.addEventListener('click', () => {
    showSecretPinModal();
    
    // Эффект при клике на сердечко
    secretHeart.style.transform = 'scale(1.5)';
    setTimeout(() => {
        secretHeart.style.transform = 'scale(1)';
    }, 200);
});

// Показать секретное модальное окно
function showSecretPinModal() {
    secretPinModal.classList.add('active');
    secretPinInput.focus();
}

// Закрыть секретное модальное окно
closeSecretPin.addEventListener('click', () => {
    secretPinModal.classList.remove('active');
    secretPinInput.value = '';
    secretPinMessage.textContent = '';
    secretPinMessage.className = 'message';
});

// Закрытие модалки при клике вне контента
secretPinModal.addEventListener('click', (e) => {
    if (e.target === secretPinModal) {
        secretPinModal.classList.remove('active');
        secretPinInput.value = '';
        secretPinMessage.textContent = '';
        secretPinMessage.className = 'message';
    }
});

// Обработка основного пин-кода
submitPin.addEventListener('click', checkPin);
pinInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkPin();
});

function checkPin() {
    const enteredPin = String(pinInput.value).trim();
    
    if (enteredPin === correctPin) {
        pinMessage.textContent = 'Правильно! 💕';
        pinMessage.className = 'message correct';
        setTimeout(() => {
            navigateTo('page3.html');
        }, 1000);
    } else {
        pinMessage.textContent = 'Неправильно, попробуй еще раз! 😊';
        pinMessage.className = 'message incorrect';
        pinInput.value = '';
        pinInput.focus();
    }
}

// Обработка секретного пин-кода - ИСПРАВЛЕНО
submitSecretPin.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    console.log('Кнопка "Проверить" нажата!');
    console.log('Значение поля:', secretPinInput.value);
    checkSecretPin();
});

secretPinInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        checkSecretPin();
    }
});

function checkSecretPin() {
    console.log('Функция checkSecretPin вызвана');
    const enteredSecretPin = String(secretPinInput.value).trim();
    
    if (enteredSecretPin === secretPin) {
        secretPinMessage.textContent = 'Вау! Ты настоящая волшебница! ✨💕';
        secretPinMessage.className = 'message correct';
        
        // Закрываем модалку и переходим на следующую страницу
        setTimeout(() => {
            secretPinModal.classList.remove('active');
            setTimeout(() => {
                alert('Ты угадала секретный код! 💘\nЭто твое день рождение!!! Я люблю тебя! \nТебя ждет еще один сюрприз!');
                navigateTo('page4.html');
            }, 500);
        }, 1500);
    } else {
        secretPinMessage.textContent = 'Не-а, попробуй ещё раз! 😉';
        secretPinMessage.className = 'message incorrect';
        secretPinInput.value = '';
        secretPinInput.focus();
        
        // Эффект тряски при неправильном вводе
        secretPinInput.style.animation = 'shake 0.5s';
        setTimeout(() => {
            secretPinInput.style.animation = '';
        }, 500);
    }
}

// Добавляем анимацию тряски в стили через JavaScript
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
`;

document.head.appendChild(style);
