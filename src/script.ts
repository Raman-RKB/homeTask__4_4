import templateEngine from './lib/template-engine.js'
import Game from './play.js'

import './style.css'

export default class Level {
    parent: Element
    element: Element
    level: number[]
    startButton: Element
    complexityСontainer: Element

    constructor(parent: Element | null) {
        if (parent === null) {
            throw new Error('The parent element is null.')
        }
        this.parent = parent

        // eslint-disable-next-line no-undef
        this.element = templateEngine(Level.complexityTemplate())
        parent.appendChild(this.element)
        this.level = [0]

        const startButton = this.element.querySelector(
            '.complexity__start-button'
        )
        if (startButton === null) {
            throw new Error('The start button is null.')
        }
        this.startButton = startButton

        const complexityСontainer = this.element.querySelector(
            '.complexity__container'
        )

        if (complexityСontainer === null) {
            throw new Error('The complexity container is null.')
        }

        this.complexityСontainer = complexityСontainer

        this.onGenerateCardSet.bind(this)
        this.onStartPlay.bind(this)
        this.startButton.addEventListener('click', this.onStartPlay.bind(this))

        this.complexityСontainer.addEventListener(
            'click',
            this.onComplexityClick.bind(this)
        )
    }
    static complexityTemplate() {
        throw new Error('Method not implemented.')
    }

    onComplexityClick(event: Event) {
        const target = event.target as Element
        if (
            target.classList.contains('level-1') ||
            target.classList.contains('level-2') ||
            target.classList.contains('level-3')
        ) {
            target.classList.add('complexity__container_item-hover')
        }
        if (
            target !== null &&
            target.parentElement !== null &&
            target.parentElement.nextSibling !== null
        ) {
            const firstChild = target.parentElement.nextSibling
                .firstChild as Element
            if (target.classList.contains('level-1')) {
                firstChild.classList.remove('complexity__container_item-hover')
            }

            const lastChild = this.complexityСontainer.lastChild
            if (
                this.complexityСontainer.lastChild &&
                lastChild instanceof Element
            ) {
                lastChild.classList.remove('complexity__container_item-hover')
            }

            this.level.splice(0, 1, 3)
        } else if (target.classList.contains('level-2')) {
            if (
                target !== null &&
                target.parentElement !== null &&
                target.parentElement.nextSibling !== null
            ) {
                const firstChild = target.parentElement.nextSibling
                    .firstChild as Element
                firstChild.classList.remove('complexity__container_item-hover')
            }
            this.level.splice(0, 1, 6)
        } else if (target.classList.contains('level-3')) {
            if (
                target !== null &&
                target.parentElement !== null &&
                target.parentElement.previousSibling !== null
            ) {
                const firstChild = target.parentElement.previousSibling
                    .firstChild as Element
                firstChild.classList.remove('complexity__container_item-hover')
            }
            const lastChild = this.complexityСontainer.lastChild
            if (
                this.complexityСontainer.lastChild &&
                lastChild instanceof Element
            ) {
                lastChild.classList.remove('complexity__container_item-hover')
            }
            this.level.splice(0, 1, 9)
        }
    }

    onStartPlay() {
        if (this.level[0] === 0) {
            return
        }
        this.element.remove()
        this.onGenerateCardSet(this.level[0])
    }

    onGenerateCardSet(lvl: number) {
        const cardSet = []

        for (let i = 0; lvl * 2 > cardSet.length; i++) {
            const cardId = Math.floor(Math.random() * (37 - 1)) + 1

            if (cardSet.length > 0) {
                const callback = (generatedNumber: number) => {
                    return generatedNumber === cardId
                }
                if (cardSet.find(callback) === undefined) {
                    cardSet.push(cardId, cardId)
                }
            } else {
                cardSet.push(cardId, cardId)
            }
        }
        // eslint-disable-next-line no-undef
        new Game(
            this.parent,
            cardSet.sort(() => 0.5 - Math.random())
        )
    }
}

Level.complexityTemplate = () => ({
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
})

document.addEventListener('DOMContentLoaded', () => {
    new Level(document.querySelector('.body'))
})
