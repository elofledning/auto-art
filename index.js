const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");
const canvas = createCanvas(1000, 1000);
const ctx = canvas.getContext("2d");

const saveLayer = (_canvas) => {
    fs.writeFileSync("./newImage.png", _canvas.toBuffer("image/png"));
    console.log("Image created");
};

const drawLayer = async () => {
    const image = await loadImage("./ball.png");
    ctx.drawImage(image, 0, 0, 1000, 1000);
    saveLayer(canvas);
};
drawLayer();