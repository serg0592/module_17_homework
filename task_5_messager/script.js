const wsURL = 'wss://ws.ifelse.io'; //адрес эхо-сервера

const input = document.querySelector('.input'), //поле ввода
      btnSend = document.querySelector('.btn-send'), //кнопка "отправить"
      btnGeo = document.querySelector('.btn-geo'), //кнопка "гео-локация"
      output = document.querySelector('.output-text'); //поле вывода

let websocket, //переменная для вебсокета
    msgCloud; //оболочка для текста

//вывод сообщений в поле вывода
function writeToScreen (text, side, color) {
    divCreate(side); 

    //формирование текста сообщения
    const pre = document.createElement("p");
    pre.className = 'server-msg';
    pre.style.textAlign = `${side}`;
    pre.style.fontSize = '16px';
    pre.style.color = color;
    pre.innerHTML = text;
    //добавить тест сообщения внутрь оболочки
    msgCloud.appendChild(pre);
}

//вывод сообщения со ссылкой в поле вывода
function writeToScreenLink (text) {
    divCreate('right');

    //формирование текста сообщения
    let adr = document.createElement('a');
    adr.className = 'server-msg-link';
    adr.href = text;
    adr.textContent = 'Гео-локация';
    //добавить тест сообщения внутрь оболочки
    msgCloud.appendChild(adr);
}

//создать оболочку для текста
function divCreate(side) {
    msgCloud = document.createElement('div');
    msgCloud.className = 'message-cloud';
    msgCloud.style.display = 'flex';
    //вывод сообщения справа или слева в поле вывода
    if (side === 'left') {
        msgCloud.style.justifyContent = 'flex-start';
    } else {
        msgCloud.style.justifyContent = 'flex-end';
    };
    //добавить оболочку в поле вывода
    output.appendChild(msgCloud);
}

//ошибка гео-локации
function geoError() {
    writeToScreen('Невозможно получить геопозицию', 'left');
}

//успешная гео-локация
function geoSuccess(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;

    writeToScreenLink(`https://www.openstreetmap.org/#map=15/${latitude}/${longitude}`);
}

//нажатие кнопки "отправить"
btnSend.addEventListener('click', () => {
    let text = input.value;
    writeToScreen(text, 'right');
    websocket.send(text);
    input.value = '';
})

//нажатие кнопки "гео-локация"
btnGeo.addEventListener('click', () => {
    if (!navigator.geolocation) {
        writeToScreen('Геолокация не поддерживается вашим браузером', 'left');
    } else {
        navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    };
})

//создать вебсокет-соединение
websocket = new WebSocket(wsURL);
websocket.onopen = function (evt) {
    writeToScreen('Connected', 'left', 'blue');
}

//вывод сообщения об ошибке ws-соединения
websocket.onerror = function (evt) {
    writeToScreen('Error: ' + evt.data, 'left', 'red');
}

//вывод сообщения от сервера
websocket.onmessage = function(evt) {
    writeToScreen('Response: ' + evt.data, 'left', 'green');
}