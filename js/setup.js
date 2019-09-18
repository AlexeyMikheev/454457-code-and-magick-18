'use strict';


var NAMES = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
];

var SURNAMES = [
    'да Марья',
    'Верон',
    'Мирабелла',
    'Вальц',
    'Онопко',
    'Топольницкая',
    'Нионго',
    'Ирвинг'
];

var COATCOLORS = [
    'rgb (101, 137, 164)',
    'rgb (241, 43, 107)',
    'rgb (146, 100, 161)',
    'rgb (56, 159, 117)',
    'rgb (215, 210, 55)',
    'rgb (0, 0, 0)'
]

var EYESCOLORS = [
    'black',
    'red',
    'blue',
    'yellow',
    'green'
]

function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

var getRandomString = function (strings) {
    var randomIndex = randomInteger(0, strings.length);
    return strings[randomIndex];
}

var getRandomItem = function (strings) {
    var item = {};

    item.name = `${getRandomString(NAMES)} ${getRandomString(SURNAMES)}`;

    item.coatColor = getRandomString(COATCOLORS);
    item.eyesColor = getRandomString(EYESCOLORS);

    return item;
}

var getRandomItems = function (count) {
    var items = [];
    for (var i = 0; i < count; i++) {
        var item = getRandomItem();
        items.push(item);
    }
    return items;
}

var items = getRandomItems(4);

console.log(items)


var setup = document.querySelector('.setup');

if (setup != null) {
    setup.classList.remove('hidden');
}