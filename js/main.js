"use strict";

const simulationCanvas = document.getElementById("prismSimulation");
const simulationContext = simulationCanvas.getContext("2d");

const tweenLine = (context, startX, startY, endX, endY, color, time, callback) => {
    context.lineWidth = 2;

    const startTime = performance.now();
    const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / time, 1);

        const currentX = startX + (endX - startX) * progress;
        const currentY = startY + (endY - startY) * progress;

        context.strokeStyle = color;
        context.beginPath();
        context.moveTo(startX, startY);
        context.lineTo(currentX, currentY);
        context.stroke();

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            if (!callback) return;

            callback();
        }
    }
    
    requestAnimationFrame(animate);
};

const main = () => {
    simulationContext.lineWidth = 4;
    simulationContext.strokeStyle = "lightblue";
    simulationContext.beginPath();
    simulationContext.moveTo(200, 100);
    simulationContext.lineTo(250, 200);
    simulationContext.lineTo(150, 200);
    simulationContext.closePath();
    simulationContext.stroke();

    simulationContext.fillStyle = "white";
    simulationContext.fillRect(150, 220, 100, 24);
    
    simulationContext.fillStyle = "black";
    simulationContext.font = "12px sans-serif";
    simulationContext.fillText("Start Simulation", 156, 237, 87);

    const clickListener = (event) =>{
        const x = event.offsetX; const y = event.offsetY;
        if (x < 150 || x > 250 || y < 220 || y > 244) return;

        simulationCanvas.removeEventListener("click", clickListener);

        const colors = [
            "red", "orange", "yellow", "green", "blue", "purple"
        ];

        tweenLine(simulationContext, 400, 150, 200, 150, "white", 1000, () => {
            let newY = 200;
            for (let i = 0; i < colors.length; i++) {
                const color = colors[i];
                tweenLine(simulationContext, 200, 150, 0, newY, color, 1000);

                newY += 10;
            }
        })
    }

    simulationCanvas.addEventListener("click", clickListener);
};

main();
