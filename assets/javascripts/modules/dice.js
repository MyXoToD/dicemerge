export class Dice {
    constructor(id) {
        this.id = id
        this.element = this.createDice();
        this.dragging = false;

        // Mouse Events
        this.element.addEventListener('mousedown', this.dragStart.bind(this));
        window.addEventListener('mousemove', this.dragMove.bind(this));
        window.addEventListener('mouseup', this.dragEnd.bind(this));

        // Touch Events
        this.element.addEventListener('touchstart', this.dragStart.bind(this));
        window.addEventListener('touchmove', this.dragMove.bind(this));
        window.addEventListener('touchend', this.dragEnd.bind(this));
    }

    dragStart(e) {
        console.log(e);
        e = e.touches ? e.touches[0] : e;
        this.dragging = true;
        this.element.classList.add('dice--dragging');
        this.element.style.setProperty('--x', e.clientX + 'px');
        this.element.style.setProperty('--y', e.clientY + 'px');
    }
    
    dragEnd() {
        this.dragging = false;
        this.element.classList.remove('dice--dragging');
    }
    
    dragMove(e) {
        e = e.touches ? e.touches[0] : e;
        if (!this.dragging)
            return;
        this.element.style.setProperty('--x', e.clientX + 'px');
        this.element.style.setProperty('--y', e.clientY + 'px');
    }

    createDice() {
        let dice = document.createElement('div');
        dice.classList.add('dice');
        dice.innerHTML = this.id + 1;

        return dice;
    }

    getHTML() {
        return this.element.outerHTML;
    }
}