const fs = require("fs");

const width = 300;
const height = 300;
const dir = "C:\\Workspace\\auto-art-files\\input";//__dirname;

const rarity = [
    { key: "", val: "original" },
    { key: "_r", val: "rare" },
    { key: "_sr", val: "super rare" },
];

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

const getElements = path => {
    return fs
      .readdirSync(path)
      .filter((item) => !/(^|\/)\.[^\/\.]/g.test(item))
      .map((i, index) => {
        return {
          id: index + 1,
          name: cleanName(i),
          fileName: i,
          rarity: addRarity(i),
        };
      });
  };

const layers = [
    {
        id: 1,
        name: "background",
        location: `${dir}/background/`,
        elements: getElements(`${dir}/background/`),
        position: { x: 0, y: 0},
        size: { width, height },
    },
    {
        id: 2,
        name: "eyes",
        location: `${dir}/eyes/`,
        elements: getElements(`${dir}/eyes/`),
        position: { x: 0, y: 0},
        size: { width, height },
    },
    {
        id: 3,
        name: "mouth",
        location: `${dir}/mouth/`,
        elements: getElements(`${dir}/mouth/`),
        position: { x: 0, y: 0},
        size: { width, height },
    },
    {
        id: 4,
        name: "beard",
        location: `${dir}/beard/`,
        elements: getElements(`${dir}/beard/`),
        position: { x: 0, y: 0},
        size: { width, height },
    }    
];

console.log(layers);

module.exports = {layers, width, height};