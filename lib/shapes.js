class Shape {
    constructor() {
        this.color = "";
    }
    setColor(color) {
        this.color = color;
    }
}

class Circle extends Shape {
    render() {
        return `<circle cx="150" cy="120" r="70" fill="blue"/>`
    }
}

class Square extends Shape {
    render() {
        return `<rect x="70" y="40" width="160" height="160" fill="red"/>`
    }
}

class Triangle extends Shape {
    render() {
        return `<polygon points="150, 18 244, 182 56, 182" fill="orange"/>`
    }
}

module.exports = { Circle, Triangle, Square };