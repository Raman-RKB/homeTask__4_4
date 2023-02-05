/* eslint-disable prettier/prettier */
class Level {
    parent: { appendChild: (arg0: any) => void }
    element: any
    level: number[]
    startButton: any
    complexityСontainer: any
    constructor(parent: { appendChild: (arg0: any) => void }) {
        this.parent = parent

        // eslint-disable-next-line no-undef
        this.element = templateEngine(Level.complexityTemplate())
        parent.appendChild(this.element)
        this.level = [0]

        this.startButton = this.element.querySelector(
            '.complexity__start-button'
        )

        this.complexityСontainer = this.element.querySelector(
            '.complexity__container'
        )

        this.onGenerateCardSet.bind(this)
        this.onStartPlay.bind(this)
        this.startButton.addEventListener('click', this.onStartPlay.bind(this))
        this.complexityСontainer.addEventListener(
            'click',
            this.onComplexityClick.bind(this)
        )
    }
    static complexityTemplate(): any {
        throw new Error("Method not implemented.")
    }

    onComplexityClick(event: { target: any }) {
        const target = event.target
        if (
            target.classList.contains('level-1') ||
            target.classList.contains('level-2') ||
            target.classList.contains('level-3')
        ) {
            target.classList.add('complexity__container_item-hover')
        }

        if (target.classList.contains('level-1')) {
            target.parentElement.nextSibling.firstChild.classList.remove(
                'complexity__container_item-hover'
            )
            this.complexityСontainer.lastChild.classList.remove(
                'complexity__container_item-hover'
            )
            this.level.splice(0, 1, 3)
        } else if (target.classList.contains('level-2')) {
            target.parentElement.previousSibling.firstChild.classList.remove(
                'complexity__container_item-hover'
            )
            target.parentElement.nextSibling.firstChild.classList.remove(
                'complexity__container_item-hover'
            )
            this.level.splice(0, 1, 6)
        } else if (target.classList.contains('level-3')) {
            target.parentElement.previousSibling.firstChild.classList.remove(
                'complexity__container_item-hover'
            )
            this.complexityСontainer.firstChild.classList.remove(
                'complexity__container_item-hover'
            )
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
