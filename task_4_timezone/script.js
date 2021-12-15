const btn = document.querySelector('.body__button'), //кнопка "вывод данных"
      output = document.querySelector('.body__output'); //поле вывода

let latitude, //широта
    longitude, //долгота
    url; //адрес запроса часового пояса

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
    url = `https://api.ipgeolocation.io/timezone?apiKey=32bcd4a6e4b548968e7afcdb682ac679&lat=${latitude}&long=${longitude}`;

    //отправка запроса
    fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        writeToScreen(`Часовой пояс: ${data.timezone}`);
        writeToScreen(`Дата, время: ${data.date_time_txt}`);
    })
    .catch(() => {
        writeToScreen('Ошибка загрузки данных');
    });
}

//нажатие кнопки "Вывод данных"
btn.addEventListener('click', () => {
    //разрешение гео-локации
    if (!navigator.geolocation) {
        writeToScreen('Информация о местоположении недоступна');
    } else {
        navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    };
})