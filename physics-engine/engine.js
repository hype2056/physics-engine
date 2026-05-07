const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

console.log('Canvas ready:', canvas.width, canvas.height);

class Ball {
    constructor(x, y, radius, color) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.vx = 0;
        this.vy = 0;
        this.mass = 1;
        this.restitution = 0.7;
    }

    draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
    }

    update() {
    this.vy += 0.5; // gravity
    this.x += this.vx;
    this.y += this.vy;

    // floor
        if (this.y + this.radius >= canvas.height) {
        this.y = canvas.height - this.radius;
        this.vy *= -this.restitution;
        }

    // ceiling
        if (this.y - this.radius <= 0) {
        this.y = this.radius;
        this.vy *= -this.restitution;
        }

    // right wall
        if (this.x + this.radius >= canvas.width) {
        this.x = canvas.width - this.radius;
        this.vx *= -this.restitution;
        }

    // left wall
        if (this.x - this.radius <= 0) {
        this.x = this.radius;
        this.vx *= -this.restitution;
        }
    }
}

function detectCollision(a, b) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < a.radius + b.radius;
}

function resolveCollision(a, b) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // collision normal
    const nx = dx / distance;
    const ny = dy / distance;

    // relative velocity along the normal
    const dvx = a.vx - b.vx;
    const dvy = a.vy - b.vy;
    const dot = dvx * nx + dvy * ny;

    // don't resolve if balls are moving apart
    if (dot < 0) return;

    // impulse
    const impulse = (2 * dot) / (a.mass + b.mass);
    a.vx -= impulse * b.mass * nx;
    a.vy -= impulse * b.mass * ny;
    b.vx += impulse * a.mass * nx;
    b.vy += impulse * a.mass * ny;

    // separate overlapping balls
    const overlap = a.radius + b.radius - distance;
    a.x -= overlap/2 * nx;
    a.y -= overlap/2 * ny;
    b.x += overlap/2 * nx;
    b.y += overlap/2 * ny;
}

const balls = [];

for (let i = 0; i < 10; i++) {
    const radius = Math.random() * 20 + 10;
    const ball = new Ball(
        Math.random() * (canvas.width - radius * 2) + radius,
        Math.random() * (canvas.height / 2),
        radius,
        `hsl(${Math.random() * 360}, 70%, 60%)`
    );
    ball.vx = (Math.random() - 0.5) * 6;
    balls.push(ball);
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    balls.forEach(ball => {
        ball.update();
        ball.draw(ctx);
    });
    for (let i = 0; i < balls.length; i++) {
        for (let j = i + 1; j < balls.length; j++) {
            if (detectCollision(balls[i], balls[j])) {
            resolveCollision(balls[i], balls[j]);
            }
        }
    }
    requestAnimationFrame(loop);
}

loop();