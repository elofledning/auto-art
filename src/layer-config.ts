import * as _fs from "fs";
import {Layer, Element, Size} from "./types";

export const width = 900;
export const height = 900;
export const baseInputDir = "C:\\Workspace\\auto-art-files\\input";

export const layers = () => {
  let id = 1;
  const result:Array<Layer> = [];
  const files = _fs.readdirSync(baseInputDir);

  files.forEach(layerFolder => {
    const path:_fs.PathLike = `${baseInputDir}\\${layerFolder}\\`;
    if(_fs.lstatSync(path).isDirectory() ){
      result.push(new Layer(id, layerFolder, path, getElements(path), new Size(width, height))); 
      id++;     
    }   
  });

  return result;
};

const getElements = (path:string) => {
  const result: Array<Element> = [];
  
  _fs
  .readdirSync(path)
  .forEach((value, index) => {
    const name = cleanName(value);
    const itemRarity:number = addRarity(value);
    
    //add as many elements as the rarity number in filename weight indicates
    for(let i=0; i<itemRarity; i++){
      result.push(new Element(index + 1, name, value, itemRarity));
    }
  }) 

  return result;

};

const addRarity = (_str:string) => {
  try{
    const _strArray: Array<string> = _str.split(/[#.]+/);
    return Number(_strArray[1]);
  
  }catch(error){
    console.error(`Failed parsing: ${_str}, returning default value of 1 rarity`);
    return 1;
  }
  return 1;
  
  };
  
const cleanName = (_str:string) => {
  return _str.split('#')[0];
};