import "./style.css";
import { randomIntFromRange } from "./utils";
import { checkBoxCollision } from "./utils/collision";

const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const ctx = canvas?.getContext("2d") as CanvasRenderingContext2D;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

class Player {
  static Gravity = 0.05;

  constructor(
    public x = 200,
    public y = 200,
    public dy = 0,
    public width = 60,
    public height = 60
  ) {}

  draw() {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    this.draw();
    this.y += this.dy;

    if (this.y + this.height + this.dy < canvas.height) {
      this.dy += Player.Gravity;
    } else {
      this.dy = 0;
    }
  }
}

class Platform {
  constructor(
    public height: number,
    public y: number,
    public width = 60,
    public x = canvas.width
  ) {}

  draw() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);

    this.x += -2;
  }
}

const player = new Player();
const platforms = new Set<Platform>();

function createPlatforms() {
  const topHeight = randomIntFromRange(
    canvas.height / 3,
    canvas.height - canvas.height / 3
  );

  const topPlatform = new Platform(topHeight, 0);
  const bottomPlatform = new Platform(
    canvas.height - topHeight,
    topHeight + 200
  );

  platforms.add(topPlatform);
  platforms.add(bottomPlatform);
}

setInterval(() => createPlatforms(), 1500);

window.addEventListener("keypress", (e) => {
  if (e.code === "Space") {
    if (player.dy >= -1 && player.y + player.height > 0) {
      player.dy = -2;
    }
  }
});

let animationId: number;
function animate() {
  animationId = requestAnimationFrame(animate);

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.update();

  for (const platform of platforms) {
    if (platform.x + platform.width < 0) {
      platforms.delete(platform);
    } else {
      platform.draw();
    }

    if (checkBoxCollision(player, platform)) {
      cancelAnimationFrame(animationId);
    }
  }
}

animate();
