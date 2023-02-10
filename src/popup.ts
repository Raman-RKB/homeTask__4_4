import templateEngine from './lib/template-engine.js'
import Level from './script.js'
import WinIcon from './img/winicon.svg'
import LoseIcon from './img/loseicon.svg'

export default class Popup {
    parent: Element
    result: string
    stopwatch: string
    popupBackground: Element
    popupPlayAgainButton: Element
    element: Element
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
    static PopupBackgroundTemplate(): any {
        throw new Error('Method not implemented.')
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
                Popup.PopupLoseTemplate(
                    this.result,
                    'Вы проиграли!',
                    this.stopwatch
                )
            )
            this.parent.appendChild(this.element)
        } else if (this.result === 'win') {
            this.element = templateEngine(
                Popup.PopupWinTemplate(
                    this.result,
                    'Вы выиграли!',
                    this.stopwatch
                )
            )
            this.parent.appendChild(this.element)
        }
    }
    static PopupLoseTemplate(result: any, arg1: string, stopwatch: any): any {
        throw new Error('Method not implemented.')
    }
    static PopupWinTemplate(result: any, arg1: string, stopwatch: any): any {
        throw new Error('Method not implemented.')
    }
}

Popup.PopupBackgroundTemplate = () => ({
    tag: 'section',
    cls: 'result-background',
})

Popup.PopupWinTemplate = (resultTag, resultText, passedTime) => ({
    tag: 'div',
    cls: `${resultTag}`,
    content: [
        {
            tag: 'img',
            cls: `${resultTag}__popup_icon`,
            attrs: {
                src: `/bf0684fdd7c8b9634d54.svg`,
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

Popup.PopupLoseTemplate = (resultTag, resultText, passedTime) => ({
    tag: 'div',
    cls: `${resultTag}`,
    content: [
        {
            tag: 'img',
            cls: `${resultTag}__popup_icon`,
            attrs: {
                src: `/14d22a39e441c520d9e1.svg`,
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
