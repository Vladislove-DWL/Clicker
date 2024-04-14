let clicks = 0;

const TIMEOUT = 5000;

const display = document.querySelector('#display');
const button = document.querySelector('#button');
const counter = document.querySelector('#counter');
const result = document.querySelector('#result');
const reset = document.querySelector('#reset');
button.onclick = start; //вешаем обработчик не с помощью addEventListener, а с помощью свойства

function start() {

    //теперь (уже 3 шагом) добавим на страницу оставшееся время игры
    const startTime = Date.now();

    display.textContent = formateTime(TIMEOUT);

    //в этой функции нам необходимо перезаписать значение свойства onclick у кнопки,
    //и в качестве значения мы укажем другую функцию, которая будет увеличивать значение счетчика и показывать его на экране
    button.onclick = () => {
        counter.textContent = clicks++; // если оператор ++ ставится справа, то сначала произойдет увеличение значения, а потом возврат этого значения

            const element = document.createElement("div"); // Создаем новый элемент
            element.classList.add("random-element");
            element.textContent = '+1';
            
            // Устанавливаем случайные координаты для нового элемента
            const maxX = window.innerWidth - 50; // Максимальная координата по оси X
            const maxY = window.innerHeight - 50; // Максимальная координата по оси Y
            const randomX = Math.random() * maxX; // Случайная координата X
            const randomY = Math.random() * maxY; // Случайная координата Y
            element.style.left = randomX + "px";
            element.style.top = randomY + "px";
            
            // Добавляем элемент в документ
            document.body.appendChild(element);

            setTimeout(function() {
                element.remove();
            }, 1000)

    }
    //перейдем к высчитаванию оставшихся милисекунд
    const interval = setInterval(() => {
        const delta = Date.now() - startTime; //текущее количество милисекунд минус начало игры, то есть 5000 милисекунд
        display.textContent = formateTime(TIMEOUT - delta); //общее количество милисекунд минус дельта
    }, 100); //эта фукнция будет выполнять каждый 100 милисекунд, чтобы видеть милисекунды на экране

    const timeout = setTimeout(() => {
        //внутри функции нам необходимо остановить нажатие на кнопку
        button.onclick = null; //убираем обработчик
        display.textContent = 'Game Over';

        //далее необходимо очистить TIMEOUT, то есть остановить его
        //для этого предварительно нам необходимо сохранить его в константу, которая называется timeout

        //то значение, которое мы получим от функции setTimeout - обратно мы получим id
        //то есть в константе timeout будет храниться id этого timeout

        //в функцию setTimeout, когда мы завершаем игру, нам также необходимо очистить интервал
        clearInterval(interval)

        //мы можем остановить timeout с помощью метода
        clearTimeout(timeout);

        if (clicks <= 10) {
            result.textContent = 'Неплохо'
        } else if (clicks > 10 && clicks <= 20) {
            result.textContent = 'Можешь лучше'
        } else if (clicks > 20 && clicks <= 30) {
            result.textContent = 'Средне'
        } else if (clicks > 30 && clicks <= 40) {
            result.textContent = 'Вау, уже много'
        } else if (clicks > 40 && clicks <= 50) {
            result.textContent = 'Чемпион!'
        } else if (clicks > 50 && clicks <= 60) {
            result.textContent = 'Легеда!'
        } else if (clicks > 60) {
            result.textContent = 'Как...?'
        } 
    }, TIMEOUT);
}

function formateTime(ms) {
    return Number.parseFloat(ms / 1000).toFixed(2); //то есть мы получаем общее количество секунд, а метод toFixed сколько знаком после запятой мы хотим сохранить
}

reset.addEventListener('click', () => {
    counter.textContent = null;
    result.textContent = null;
    display.textContent = null;
    clicks = 0;
    setTimeout(function() {
        start();
      }, 600);
})



//добавляем звук
button.addEventListener('click', () => {
    const clickSound = document.querySelector('#clickSound');
    clickSound.play();
})