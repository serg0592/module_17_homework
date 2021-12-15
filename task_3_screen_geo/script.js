const btn = document.querySelector('.body__button'),
      output = document.querySelector('.body__output');

//вывод сообщений в поле вывода
function writeToScreen (text) {
    //формирование текста сообщения
    const pre = document.createElement("p");
    pre.className = 'output-msg';
    pre.style.fontSize = '16px';
    pre.innerHTML = text;
    //добавить тест сообщения внутрь оболочки
    output.appendChild(pre);
}

//ошибка гео-локации
function geoError() {
    writeToScreen('Информация о местоположении недоступна');
}

//успешная гео-локация
function geoSuccess(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    writeToScreen(`Широта: ${latitude}; долгота: ${longitude}`);
}

//размер экрана
function screenSize() {
    let width = screen.width,
        height = screen.height;

    writeToScreen(`Размер экрана: ${width} X ${height} px`);
}

//нажатие кнопки "Вывод данных"
btn.addEventListener('click', () => {
    if (!navigator.geolocation) {
        writeToScreen('Информация о местоположении недоступна');
    } else {
        navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    };
    
    screenSize();
})