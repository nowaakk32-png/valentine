const loveVideo = document.getElementById('loveVideo');
const backButton = document.getElementById('backButton');

// Автоматическое воспроизведение при наведении (опционально)
loveVideo.addEventListener('mouseenter', () => {
    console.log('Видео готово к просмотру');
});

// Создание летающих сердечек при загрузке
window.addEventListener('load', () => {
    createFloatingHearts();
    
    // Автоматически прокручиваем к видео через секунду
    setTimeout(() => {
        document.querySelector('.video-container').scrollIntoView({ behavior: 'smooth' });
    }, 1000);
});

// Функция создания летающих сердечек
function createFloatingHearts() {
    const heartEmojis = ['❤️', '💕', '💖', '💘', '💝', '💗', '💓'];
    const container = document.querySelector('.container');
    
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.cssText = `
            position: absolute;
            font-size: ${16 + Math.random() * 16}px;
            color: rgba(255, 105, 180, ${0.3 + Math.random() * 0.7});
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: floatHeart ${3 + Math.random() * 5}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
            z-index: -1;
            pointer-events: none;
        `;
        
        container.appendChild(heart);
    }
}

// Добавляем анимацию для сердечек через CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes floatHeart {
        0%, 100% {
            transform: translateY(0) translateX(0) rotate(0deg);
        }
        25% {
            transform: translateY(-30px) translateX(20px) rotate(10deg);
        }
        50% {
            transform: translateY(-60px) translateX(0) rotate(0deg);
        }
        75% {
            transform: translateY(-30px) translateX(-20px) rotate(-10deg);
        }
    }
`;
document.head.appendChild(style);

// Обработчик кнопки "Вернуться на главную"
backButton.addEventListener('click', () => {
    navigateTo('index.html');
});

// Функция для красивого завершения видео
loveVideo.addEventListener('ended', () => {
    // Создаем эффект после окончания видео
    const videoWrapper = document.querySelector('.video-wrapper');
    videoWrapper.style.boxShadow = '0 0 50px rgba(255, 105, 180, 0.8)';
    
    setTimeout(() => {
        videoWrapper.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    }, 2000);
});
