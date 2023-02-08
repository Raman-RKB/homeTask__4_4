import templateEngine from './lib/template-engine.js'
import Level from './script.js'

export default class Popup {
    constructor(body, result, stopwatch) {
        this.parent = body
        this.result = result
        this.stopwatch = stopwatch

        // eslint-disable-next-line no-undef
        this.popupBackground = templateEngine(Popup.PopupBackgroundTemplate())
        this.parent.appendChild(this.popupBackground)

        this.renderPopup.bind(this)
        this.renderPopup()

        this.popupPlayAgainButton = this.element.querySelector(
            '.popup_play-again-button'
        )
        this.onRestartGameClick.bind(this)
        this.popupPlayAgainButton.addEventListener(
            'click',
            this.onRestartGameClick.bind(this)
        )
    }

    onRestartGameClick() {
        const element = document.querySelector('.body')
        this.parent.replaceChildren()
        // eslint-disable-next-line no-undef
        new Level(element)
    }

    renderPopup() {
        if (this.result === 'lose') {
            this.element = templateEngine(
                Popup.PopupTemplate(
                    this.result,
                    'Вы проиграли!',
                    this.stopwatch
                )
            )
            this.parent.appendChild(this.element)
        } else if (this.result === 'win') {
            this.element = templateEngine(
                Popup.PopupTemplate(this.result, 'Вы выиграли!', this.stopwatch)
            )
            this.parent.appendChild(this.element)
        }
    }
}

Popup.PopupBackgroundTemplate = () => ({
    tag: 'section',
    cls: 'result-background',
})

Popup.PopupTemplate = (resultTag, resultText, passedTime) => ({
    tag: 'div',
    cls: `${resultTag}`,
    content: [
        {
            tag: 'img',
            cls: `${resultTag}__popup_icon`,
            attrs: {
                src: `./src/img/${resultTag}icon.svg`,
            },
        },
        {
            tag: 'div',
            cls: `${resultTag}__popup_title`,
            content: resultText,
        },
        {
            tag: 'div',
            cls: `${resultTag}__popup_stopwath-title`,
            content: 'Затраченное время:',
        },
        {
            tag: 'div',
            cls: `${resultTag}__popup_stopwath-display`,
            content: `${passedTime}`,
        },
        {
            tag: 'button',
            cls: [
                'popup_play-again-button',
                `${resultTag}__popup_play-again-button`,
            ],
            content: 'Играть снова',
        },
    ],
})
