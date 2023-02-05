/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
/*!***********************!*\
  !*** ./src/script.ts ***!
  \***********************/

/* eslint-disable prettier/prettier */
var Level = /** @class */ (function () {
    function Level(parent) {
        this.parent = parent;
        // eslint-disable-next-line no-undef
        this.element = templateEngine(Level.complexityTemplate());
        parent.appendChild(this.element);
        this.level = [0];
        this.startButton = this.element.querySelector('.complexity__start-button');
        this.complexityСontainer = this.element.querySelector('.complexity__container');
        this.onGenerateCardSet.bind(this);
        this.onStartPlay.bind(this);
        this.startButton.addEventListener('click', this.onStartPlay.bind(this));
        this.complexityСontainer.addEventListener('click', this.onComplexityClick.bind(this));
    }
    Level.complexityTemplate = function () {
        throw new Error("Method not implemented.");
    };
    Level.prototype.onComplexityClick = function (event) {
        var target = event.target;
        if (target.classList.contains('level-1') ||
            target.classList.contains('level-2') ||
            target.classList.contains('level-3')) {
            target.classList.add('complexity__container_item-hover');
        }
        if (target.classList.contains('level-1')) {
            target.parentElement.nextSibling.firstChild.classList.remove('complexity__container_item-hover');
            this.complexityСontainer.lastChild.classList.remove('complexity__container_item-hover');
            this.level.splice(0, 1, 3);
        }
        else if (target.classList.contains('level-2')) {
            target.parentElement.previousSibling.firstChild.classList.remove('complexity__container_item-hover');
            target.parentElement.nextSibling.firstChild.classList.remove('complexity__container_item-hover');
            this.level.splice(0, 1, 6);
        }
        else if (target.classList.contains('level-3')) {
            target.parentElement.previousSibling.firstChild.classList.remove('complexity__container_item-hover');
            this.complexityСontainer.firstChild.classList.remove('complexity__container_item-hover');
            this.level.splice(0, 1, 9);
        }
    };
    Level.prototype.onStartPlay = function () {
        if (this.level[0] === 0) {
            return;
        }
        this.element.remove();
        this.onGenerateCardSet(this.level[0]);
    };
    Level.prototype.onGenerateCardSet = function (lvl) {
        var cardSet = [];
        var _loop_1 = function (i) {
            var cardId = Math.floor(Math.random() * (37 - 1)) + 1;
            if (cardSet.length > 0) {
                var callback = function (generatedNumber) {
                    return generatedNumber === cardId;
                };
                if (cardSet.find(callback) === undefined) {
                    cardSet.push(cardId, cardId);
                }
            }
            else {
                cardSet.push(cardId, cardId);
            }
        };
        for (var i = 0; lvl * 2 > cardSet.length; i++) {
            _loop_1(i);
        }
        // eslint-disable-next-line no-undef
        new Game(this.parent, cardSet.sort(function () { return 0.5 - Math.random(); }));
    };
    return Level;
}());
Level.complexityTemplate = function () { return ({
    tag: 'section',
    cls: 'complexity',
    content: [
        {
            tag: 'div',
            cls: 'complexity__title',
            content: 'Выбери сложность',
        },
        {
            tag: 'div',
            cls: 'complexity__container',
            content: [
                {
                    tag: 'div',
                    cls: ['complexity__container_item-shell', 'level-1'],
                    content: {
                        tag: 'div',
                        cls: ['complexity__container_item', 'level-1'],
                        content: '1',
                    },
                },
                {
                    tag: 'div',
                    cls: ['complexity__container_item-shell', 'level-2'],
                    content: {
                        tag: 'div',
                        cls: ['complexity__container_item', 'level-2'],
                        content: '2',
                    },
                },
                {
                    tag: 'div',
                    cls: ['complexity__container_item-shell', 'level-3'],
                    content: {
                        tag: 'div',
                        cls: ['complexity__container_item', 'level-3'],
                        content: '3',
                    },
                },
            ],
        },
        {
            tag: 'button',
            cls: 'complexity__start-button',
            content: 'Старт',
        },
    ],
}); };

/******/ })()
;
//# sourceMappingURL=bundle.js.map