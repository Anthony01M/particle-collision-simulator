const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const numParticles = 100;

class Particle {
    constructor(x, y, radius, dx, dy) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.dx = dx;
        this.dy = dy;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = 'rgba(0, 255, 255, 0.7)';
        ctx.fill();
        ctx.closePath();
    }

    update() {
        if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        for (let i = 0; i < particles.length; i++) {
            if (this === particles[i]) continue;
            const dist = Math.hypot(this.x - particles[i].x, this.y - particles[i].y);
            if (dist - this.radius - particles[i].radius < 0) {
                this.dx = -this.dx;
                this.dy = -this.dy;
                particles[i].dx = -particles[i].dx;
                particles[i].dy = -particles[i].dy;
            }
        }

        this.draw();
    }
}

function init() {
    for (let i = 0; i < numParticles; i++) {
        const radius = 10;
        let x = Math.random() * (canvas.width - radius * 2) + radius;
        let y = Math.random() * (canvas.height - radius * 2) + radius;
        const dx = (Math.random() - 0.5) * 2;
        const dy = (Math.random() - 0.5) * 2;

        if (i !== 0) {
            for (let j = 0; j < particles.length; j++) {
                const dist = Math.hypot(x - particles[j].x, y - particles[j].y);
                if (dist - radius * 2 < 0) {
                    x = Math.random() * (canvas.width - radius * 2) + radius;
                    y = Math.random() * (canvas.height - radius * 2) + radius;
                    j = -1;
                }
            }
        }

        particles.push(new Particle(x, y, radius, dx, dy));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => particle.update());
}

init();
animate();