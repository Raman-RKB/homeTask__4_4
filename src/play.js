/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
//debugger;
class Game {
    constructor(parent, cardSet) {
        this.parent = parent

        this.cardSet = cardSet

        this.setPairCard = []
        this.setArr = []
        // eslint-disable-next-line no-undef
        this.element = templateEngine(Game.startPlayTemplate())
        parent.appendChild(this.element)

        this.timerMinutes = this.element.querySelector('.timer__minutes')
        this.timerSeconds = this.element.querySelector('.timer__seconds')

        this.onStartTimer()

        this.gameHeaderRestartButton = this.element.querySelector(
            '.game__header_restart-button'
        )

        this.onRenderGameInterface.bind(this)
        this.onRenderGameInterface()

        this.onShowCards = this.onShowCards.bind(this)

        this.onCheckMatch = this.onCheckMatch.bind(this)

        this.gameHeaderRestartButton.addEventListener(
            'click',
            this.onRestartGameClick.bind(this)
        )
    }

    onRenderGameInterface() {
        this.cardSet.forEach((el) => {
            this.cardSetItem = templateEngine(Game.cardSetItemTemplate(el))
            this.element.appendChild(this.cardSetItem)
        })

        if (this.cardSet.length === 6) {
            this.element.classList.add('game-row-adapting-if-6-cards')
            const gameHeader = this.element.querySelector('.game__header')
            gameHeader.classList.add('game__header-span-adapting-if-6-cards')
        }

        if (this.cardSet.length === 12) {
            this.element.childNodes[
                this.element.childNodes.length - 3
            ].classList.add('second-row-centering-if-12-cards')

            const gameHeaderMinPointer = this.element.querySelector(
                '.game__header_min-pointer'
            )
            gameHeaderMinPointer.classList.add(
                'game__header_min-display-adapting-if-12-cards'
            )

            const gameHeaderSinPointer = this.element.querySelector(
                '.game__header_sec-pointer'
            )
            gameHeaderSinPointer.classList.add(
                'game__header_sec-display-adapting-if-12-cards'
            )
        }

        if (this.cardSet.length === 18) {
            const gameHeaderMinPointer = this.element.querySelector(
                '.game__header_min-pointer'
            )
            gameHeaderMinPointer.classList.add(
                'game__header_min-display-adapting-if-12-cards'
            )

            const gameHeaderSinPointer = this.element.querySelector(
                '.game__header_sec-pointer'
            )
            gameHeaderSinPointer.classList.add(
                'game__header_sec-display-adapting-if-12-cards'
            )
        }
        setTimeout(this.onHideCards.bind(this), 5000)
    }

    onRestartGameClick() {
        this.element.remove()
        level = new Level(document.querySelector('.body'))
    }

    onCheckMatch() {
        if (this.setPairCard[0].id !== this.setPairCard[1].id) {
        new Popup(
                this.parent,
                'lose',
                `${this.timerMinutes.textContent}.${this.timerSeconds.textContent}`
            )
            this.onPauseTimer()
        }

        this.setPairCard = []
    }

    onShowCards(event) {
        const target = event.target
        target.style.backgroundImage = null

        if (this.setPairCard.length === 0) {
            this.setArr.push(target)
            this.setPairCard.push(target)
        } else if (
            this.setPairCard.length > 0 &&
            this.setArr.length < this.cardSet.length - 1
        ) {
            this.setArr.push(target)
            this.setPairCard.push(target)
            this.onCheckMatch()
        } else {
            new Popup(
                this.parent,
                'win',
                `${this.timerMinutes.textContent}.${this.timerSeconds.textContent}`
            )
            this.onPauseTimer()
        }
    }

    onHideCards() {
        for (let i = 1; i <= this.cardSet.length; i++) {
            this.element.childNodes[
                this.element.childNodes.length - i
            ].style.backgroundImage = 'url(./src/img/face.jpg)'
            this.element.addEventListener('click', this.onShowCards)
        }
    }

    onStartTimer() {
        this.timerMinutes.setAttribute('data-minutes', '')
        this.timerSeconds.setAttribute('data-seconds', '')

        this.timer = timezz(document.querySelector('.timer'), {
            date: new Date(),
        })

        this.timer.stopOnZero = false
    }

    onPauseTimer() {
        this.timer.pause = true
    }
}

Game.cardSetItemTemplate = (el) => ({
    tag: 'div',
    cls: ['game__container_item', `game__container_item-${el}`],
    attrs: {
        id: `${el}`,
    },
})

Game.startPlayTemplate = () => ({
    tag: 'section',
    cls: 'game',
    content: [
        {
            tag: 'div',
            cls: 'game__header',
            content: [
                {
                    tag: 'div',
                    cls: 'timer',
                    content: [
                        {
                            tag: 'div',
                            cls: 'timer__minutes',
                        },
                        {
                            tag: 'div',
                            //cls: 'timer__minutes',
                            content: '.',
                        },
                        {
                            tag: 'div',
                            cls: 'timer__seconds',
                            //content: '.'
                        },
                    ],
                },
                {
                    tag: 'div',
                    cls: 'game__header_min-pointer',
                    content: 'min',
                },
                {
                    tag: 'div',
                    cls: 'game__header_sec-pointer',
                    content: 'sek',
                },
                {
                    tag: 'button',
                    cls: 'game__header_restart-button',
                    content: 'Начать заново',
                },
            ],
        },
    ],
})
