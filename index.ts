const myArgs = process.argv.slice(2);

import * as fs from "fs";
import {Canvas, createCanvas, loadImage} from "canvas";
import {layers, width, height} from "./src/layer-config";
import * as metadata from "./src/metadata";
import {Layer, Element, Size} from "./src/types";


const canvas = createCanvas(width*3, height*3);
const ctx = canvas.getContext("2d");
const edition = myArgs.length > 0 ? Number(myArgs[0]) : 1;
const artInEdition = 9; //Andy Warhol style
const outputDir = "C:\\Workspace\\auto-art-files\\output\\";

const drawLayer = async (_layer:Layer, _edition:number, _offsetX:number, _offsetY:number) => {
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

const saveLayer = (_canvas:Canvas, _edition:number) => {
    fs.writeFileSync(`${outputDir}${_edition}.png`, _canvas.toBuffer("image/png"));
};

const addAttributes = (_element:Element, _layer:Layer) => {
    let tempAttributes = {
        id: _element.id,
        layer: _layer.name,
        name: _element.name,
        rarity: _element.rarity
    }
    metadata.addAttributes(tempAttributes, _layer.id, _element.id);
};

for(let i=1; i <= edition; i++){
    for(let j=0; j <= artInEdition-1; j++){
        let _layers = layers();
        for(let l=0; l<_layers.length; l++){
            let layer = _layers[l];
            let x = j%3*layer.size.width;
            let y = 0;

            if(j>2 && j<6){
                y = layer.size.width;
            }else if(j>5){
                y = 2*layer.size.width;
            }
            drawLayer(layer, i, x, y);       
        }
    }
    metadata.addMetadata(i);
    console.log("creating edition "+i);
}

fs.readFile(`${outputDir}_metadata.json`, (err, data) => {
    if(err) throw err;
    fs.writeFileSync(`${outputDir}_metadata.json`, JSON.stringify(metadata));
})