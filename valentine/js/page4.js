const puzzlePiece = document.getElementById('puzzlePiece');
const dropZone = document.getElementById('dropZone');
const completionMessage = document.getElementById('completionMessage');
const finalButton = document.getElementById('finalButton');
const puzzleHeart = document.querySelector('.puzzle-heart');

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
        this.style.opacity = '0.5';
        this.style.transform = 'scale(1.2)';
    }, 0);
}

function dragEnd(e) {
    this.style.opacity = '1';
    this.style.transform = 'scale(1)';
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
        // Убираем деталь пазла
        puzzlePiece.style.display = 'none';
        
        // Заполняем место детали
        dropZone.innerHTML = '<div class="heart-piece piece-9"></div>';
        dropZone.style.background = 'linear-gradient(135deg, #FF69B4, #FF1493)';
        dropZone.style.border = 'none';
        dropZone.style.boxShadow = '0 4px 15px rgba(233, 30, 99, 0.3)';
        
        // Анимация собранного сердечка
        puzzleHeart.classList.add('completed');
        
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
    const colors = ['#FF69B4', '#FF1493', '#FFB6C1', '#FFE4E1', '#FFC0CB'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.animationDelay = `${Math.random() * 2}s`;
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        document.body.appendChild(confetti);
        
        // Удаляем конфетти после анимации
        setTimeout(() => {
            confetti.remove();
        }, 3000);
    }
}

// Обработчик кнопки "Назад на главную"
finalButton.addEventListener('click', () => {
    navigateTo('index.html');
});
