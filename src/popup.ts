/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
class Popup {
    static PopupTemplate: (resultTag: any, resultText: any, passedTime: any) => { tag: string; cls: string; content: ({ tag: string; cls: string; attrs: { src: string }; content?: undefined } | { tag: string; cls: string; content: any; attrs?: undefined } | { tag: string; cls: string[]; content: string; attrs?: undefined })[] }
    static PopupBackgroundTemplate: () => { tag: string; cls: string; };
    [x: string]: any
    constructor(body: { appendChild: (arg0: any) => void }, result: string, stopwatch: string) {
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
        const element:any = document.querySelector('.body')
        this.parent.replaceChildren()
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

Popup.PopupTemplate = (resultTag: any, resultText: any, passedTime: any) => ({
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
