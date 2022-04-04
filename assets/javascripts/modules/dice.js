export class Dice {
    constructor(id) {
        this.id = id
        this.element = this.createDice();
        this.dragging = false;
        this.cursorPos = {x: null, y: null};

        // Mouse Events
        this.element.addEventListener('mousedown', this.dragStart.bind(this));
        window.addEventListener('mousemove', this.dragMove.bind(this));
        
        // Touch Events
        this.element.addEventListener('touchstart', this.dragStart.bind(this));
        window.addEventListener('touchmove', this.dragMove.bind(this));
    }

    dragStart(e) {
        e = e.touches ? e.touches[0] : e;
        this.cursorPos.x = e.clientX;
        this.cursorPos.y = e.clientY;
        this.dragging = true;
        this.element.classList.add('dice--dragging');
        this.element.style.setProperty('--x', e.clientX + 'px');
        this.element.style.setProperty('--y', e.clientY + 'px');
    }
    
    dragMove(e) {
        e = e.touches ? e.touches[0] : e;
        if (!this.dragging)
            return;
        this.cursorPos.x = e.clientX;
        this.cursorPos.y = e.clientY;
        this.element.style.setProperty('--x', e.clientX + 'px');
        this.element.style.setProperty('--y', e.clientY + 'px');
    }

    createDice() {
        let dice = document.createElement('div');
        dice.classList.add('dice');
        dice.innerHTML = this.id + 1;

        return dice;
    }

    levelUp() {
        this.id++;
        this.element.innerHTML = this.id + 1;
    }

    roll() {
        let number = (Math.floor(Math.random() * 6) + 1) * (this.id + 1);

        this.element.setAttribute('data-rolled', number);
        this.element.classList.add('dice--rolled');
        setTimeout(() => {
            this.element.classList.remove('dice--rolled');
            this.element.removeAttribute('data-rolled');
        }, 300);

        return number;
    }

    getHTML() {
        return this.element.outerHTML;
    }
}