import * as _fs from "fs";
import {Layer, Element, Size} from "./types";

export const width = 30;
export const height = 30;
export const dir = "C:\\Workspace\\auto-art-files\\input";

const rarity = [
  { key: "", val: "original" },
  { key: "_r", val: "rare" },
  { key: "_sr", val: "super rare" },
];

export const layers = () => {
  let id = 1;
  let result = [];
  const files = _fs.readdirSync(dir);

  files.forEach(file => {
    const location = `${dir}\\${file}\\`;
    if(_fs.lstatSync(location).isDirectory() ){
      result.push(new Layer(id, file, location, getElements(location), new Size(width, height))); 
      id++;     
    }   
  });

  return result;
};

const getElements = path => {
  return _fs
    .readdirSync(path)
    .filter((item) => !/(^|\/)\.[^\/\.]/g.test(item))
    .map((i, index) => {
      return new Element(index + 1,cleanName(i), i, addRarity(i));
    });
};

const addRarity = _str => {
    let itemRarity;
  
    rarity.forEach((r) => {
      if (_str.includes(r.key)) {
        itemRarity = r.val;
      }
    });
  
    return itemRarity;
  };
  
const cleanName = _str => {
  let name = _str.slice(0, -4);
  rarity.forEach((r) => {
    name = name.replace(r.key, "");
  });
  return name;
};