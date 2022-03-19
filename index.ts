const fs = require("fs");
const myArgs = process.argv.slice(2);
const { createCanvas, loadImage } = require("canvas");
const {layers, width, height} = require("./src/config.js");
const canvas = createCanvas(width*3, height*3);
const ctx = canvas.getContext("2d");
const edition = myArgs.length > 0 ? Number(myArgs[0]) : 1;
const artInEdition = 9;
const outputDir = "C:\\Workspace\\auto-art-files\\output\\";
var metadata = [];
var attributes = [];
var hash = [];
var decodedHash = [];

const saveLayer = (_canvas, _edition) => {
    fs.writeFileSync(`${outputDir}${_edition}.png`, _canvas.toBuffer("image/png"));
};

const addMetadata = (_edition) => {
    let dateTime = Date.now();
    let tempMetadata = {
        hash: hash.join(""),
        decodedHash: [],
        edition: _edition,
        date: dateTime,
        attributes: attributes,
    }
    metadata.push(tempMetadata);
    attributes = [];
    hash = [];
    decodedHash = [];
};

const drawLayer = async (_layer, _edition, _offsetX, _offsetY) => {
    let element = _layer.elements[Math.floor(Math.random() * _layer.elements.length)];
    addAttributes(element, _layer);
    const image = await loadImage(`${_layer.location}${element.fileName}`);
    ctx.drawImage(
        image, 
        _offsetX, 
        _offsetY, 
        _layer.size.width, 
        _layer.size.height
        );
    saveLayer(canvas, _edition);
};

const addAttributes = (_element, _layer) => {
    let tempAttributes = {
        id: _element.id,
        layer: _layer.name,
        name: _element.name,
        rarity: _element.rarity
    }
    attributes.push(tempAttributes);
    hash.push(_layer.id);
    hash.push(_element.id);
    decodedHash.push({[_layer.id]: _element.id});
};

for(let i=1; i <= edition; i++){
    for(let j=0; j <= artInEdition;j++){
        layers.forEach(layer => {
            let x = j%3*30;
            
            let y = 0;

            if(j>2 && j<6){
                y = 30;
            }else if(j>5){
                y = 60;
            }
            drawLayer(layer, i, x, y);          
        });
    }
    addMetadata(i);
    console.log("creating edition "+i);
}

fs.readFile(`${outputDir}_metadata.json`, (err, data) => {
    if(err) throw err;
    fs.writeFileSync(`${outputDir}_metadata.json`, JSON.stringify(metadata));
})