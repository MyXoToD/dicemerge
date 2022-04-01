export class Screen {
    constructor() {
        this.current = 'merge';
        this.buttons = document.querySelectorAll('[data-goto-screen]');
        this.screens = document.querySelectorAll('.screen');
        this.switchScreen(this.current);

        this.buttons.forEach(button => {
            button.addEventListener('click', e => {
                let screenId = e.target.getAttribute('data-goto-screen');
                this.switchScreen(screenId);
            });
        });
    }

    switchScreen(id) {
        this.screens.forEach(screen => {
            screen.classList.remove('screen--active');
            if (screen.getAttribute('data-screen') == id)
               screen.classList.add('screen--active');
        })

        this.current = id;
    }
}