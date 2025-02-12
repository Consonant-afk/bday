function checkAnswer() {
    let answer = document.getElementById("answer").value.trim().toLowerCase();
    if (answer === "birthday") {
        window.location.href = "gift.html"; // Change to your next page
    } else {
        document.getElementById("errorMessage").textContent = "Clue, it's your... what? Birth_ _ _";
    }
}

let highestZ = 1;

class Paper {
  holdingPaper = false;
  mouseTouchX = 0;
  mouseTouchY = 0;
  mouseX = 0;
  mouseY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    // Prevent images from being dragged separately
    paper.querySelectorAll("img").forEach(img => {
      img.draggable = false;
    });

    // Mouse & Touch Move Event
    document.addEventListener('mousemove', (e) => this.handleMove(e, paper));
    document.addEventListener('touchmove', (e) => this.handleMove(e, paper), { passive: false });

    // Mouse Down & Touch Start
    paper.addEventListener('mousedown', (e) => this.handleStart(e, paper));
    paper.addEventListener('touchstart', (e) => this.handleStart(e, paper), { passive: false });

    // Mouse & Touch End
    window.addEventListener('mouseup', () => this.handleEnd());
    window.addEventListener('touchend', () => this.handleEnd());
  }

  handleMove(e, paper) {
    if (!this.holdingPaper) return;
    e.preventDefault(); // Prevent scrolling on mobile while dragging

    let clientX, clientY;
    if (e.type === 'mousemove') {
      clientX = e.clientX;
      clientY = e.clientY;
    } else if (e.type === 'touchmove') {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }

    if (!this.rotating) {
      this.mouseX = clientX;
      this.mouseY = clientY;
      this.velX = this.mouseX - this.prevMouseX;
      this.velY = this.mouseY - this.prevMouseY;
    }

    if (this.holdingPaper) {
      if (!this.rotating) {
        this.currentPaperX += this.velX;
        this.currentPaperY += this.velY;
      }
      this.prevMouseX = this.mouseX;
      this.prevMouseY = this.mouseY;

      paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotate(${this.rotation}deg)`;
    }
  }

  handleStart(e, paper) {
    if (this.holdingPaper) return;
    e.preventDefault();

    let clientX, clientY;
    if (e.type === 'mousedown') {
      clientX = e.clientX;
      clientY = e.clientY;
    } else if (e.type === 'touchstart') {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }

    // Ensure only the .paper moves, not elements inside it
    const targetPaper = e.target.closest('.paper');
    if (!targetPaper) return;

    this.holdingPaper = true;
    paper.style.zIndex = highestZ;
    highestZ += 1;

    this.mouseTouchX = clientX;
    this.mouseTouchY = clientY;
    this.prevMouseX = clientX;
    this.prevMouseY = clientY;
  }

  handleEnd() {
    this.holdingPaper = false;
    this.rotating = false;
  }
}

// Initialize Papers
document.addEventListener("DOMContentLoaded", () => {
  const papers = document.querySelectorAll('.paper');
  papers.forEach(paper => {
    const p = new Paper();
    p.init(paper);
  });
});
