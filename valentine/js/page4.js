const puzzlePiece = document.getElementById('puzzlePiece');
const dropZone = document.getElementById('dropZone');
const completionMessage = document.getElementById('completionMessage');
const finalButton = document.getElementById('finalButton');
const puzzleBoard = document.querySelector('.puzzle-board');

let draggedPiece = null;

// Обработчики событий drag-and-drop
puzzlePiece.addEventListener('dragstart', dragStart);
puzzlePiece.addEventListener('dragend', dragEnd);

dropZone.addEventListener('dragover', dragOver);
dropZone.addEventListener('dragenter', dragEnter);
dropZone.addEventListener('dragleave', dragLeave);
dropZone.addEventListener('drop', drop);

// Функции drag-and-drop
function dragStart(e) {
    draggedPiece = this;
    e.dataTransfer.setData('text/plain', this.id);
    
    // Визуальный эффект при начале перетаскивания
    setTimeout(() => {
        this.style.opacity = '0.8';
        this.style.transform = 'scale(1.2) translateY(-5px)';
    }, 0);
}

function dragEnd(e) {
    this.style.opacity = '1';
    this.style.transform = 'scale(1) translateY(0)';
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    dropZone.classList.add('hover');
}

function dragLeave(e) {
    dropZone.classList.remove('hover');
}

function drop(e) {
    e.preventDefault();
    dropZone.classList.remove('hover');
    
    const id = e.dataTransfer.getData('text/plain');
    const draggableElement = document.getElementById(id);
    
    // Проверяем, что перетащили правильную деталь
    if (draggableElement === puzzlePiece) {
        // Создаём новую деталь на месте пустого слота
        const newPiece = document.createElement('div');
        newPiece.className = 'puzzle-piece piece-7 assembled';
        newPiece.style.top = '113px';
        newPiece.style.left = '211px';
        newPiece.style.backgroundPosition = '-201px -103px';
        newPiece.style.position = 'absolute';
        newPiece.style.zIndex = '6';
        newPiece.style.boxShadow = '4px 4px 12px rgba(0,0,0,0.2)';
        newPiece.style.transform = 'translate(2px, 2px)';
        
        puzzleBoard.appendChild(newPiece);
        
        // Убираем свободную деталь
        puzzlePiece.style.display = 'none';
        dropZone.style.display = 'none';
        
        // Анимация собранного пазла
        puzzleBoard.classList.add('completed');
        
        // Создаем конфетти
        createConfetti();
        
        // Показываем сообщение через секунду
        setTimeout(() => {
            completionMessage.style.display = 'block';
            completionMessage.scrollIntoView({ behavior: 'smooth' });
        }, 1000);
    }
}

// Функция создания конфетти
function createConfetti() {
    const colors = ['#FF69B4', '#FF1493', '#FFB6C1', '#FFE4E1', '#FFC0CB', '#E91E63'];
    
    for (let i = 0; i < 80; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.top = '-20px';
        confetti.style.animationDelay = `${Math.random() * 2}s`;
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.width = `${8 + Math.random() * 8}px`;
        confetti.style.height = confetti.style.width;
        
        document.body.appendChild(confetti);
        
        // Удаляем конфетти после анимации
        setTimeout(() => {
            confetti.remove();
        }, 3200);
    }
}

// Обработчик кнопки "Назад на главную"
finalButton.addEventListener('click', () => {
    navigateTo('index.html');
});

// Добавляем фоновое сердечко через SVG если браузер не поддерживает clip-path с path()
window.addEventListener('load', () => {
    // Проверяем поддержку
    if (!CSS.supports('clip-path', 'path("M10 10 L90 90")')) {
        document.querySelector('.heart-background').style.backgroundImage = 'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><path d="M100 30 C130 30, 160 60, 160 100 C160 140, 130 170, 100 200 C70 170, 40 140, 40 100 C40 60, 70 30, 100 30 Z" fill="%23FF69B4" opacity="0.8"/></svg>\')';
        document.querySelector('.heart-background').style.backgroundSize = 'contain';
        document.querySelector('.heart-background').style.backgroundRepeat = 'no-repeat';
        document.querySelector('.heart-background').style.clipPath = 'none';
    }
});
