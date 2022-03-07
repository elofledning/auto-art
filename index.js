const fs = require("fs");
const { createCanvas, loadImage } = require("canvas");
const canvas = createCanvas(90, 90);
const ctx = canvas.getContext("2d");
const {layers, width, height} = require("./src/config.js");
const edition = 10;
const artInEdition = 9;
const outputDir = "C:\\Workspace\\auto-art-files\\output\\";

const saveLayer = (_canvas, _edition) => {
    fs.writeFileSync(`${outputDir}${_edition}.png`, _canvas.toBuffer("image/png"));
    console.log("Image created");
};

const drawLayer = async (_layer, _edition, _offsetX, _offsetY) => {
    let element = _layer.elements[Math.floor(Math.random() * _layer.elements.length)];
    console.log(element);
    const image = await loadImage(`${_layer.location}${element.fileName}`);
    ctx.drawImage(
        image, 
        _offsetX, 
        _offsetY, 
        _layer.size.width, 
        _layer.size.height
        );
    console.log(`Layer created ${_layer.name} layer, and choose element ${element.name}`);
    saveLayer(canvas, _edition);
};

for(let i=1; i <= edition; i++){
    for(j=0; j <= artInEdition;j++){
        layers.forEach(layer => {
            let x = j%3*30;
            let y = 0;

            if(j>2 && j<6){
                y = 30;
            }else if(j>5){
                y = 60;
            }
            drawLayer(layer, i, x, y);          
            console.log(`x:${x} y:${y}`);  
        })
    }
    console.log("creating edition "+i);
}

