export class Layer {
    id: number;
    name: string;
    location: string;
    elements: Element[];
    size: Size;

    constructor(id: number, name: string, location: string, elements: Element[], size: Size){
        this.id = id;
        this.name = name;
        this.location = location;
        this.elements = elements;
        this.size = size;
    }
};

export class Element {
    id: number;
    name: string;
    fileName: string;
    rarity: string;

    constructor(id: number, name: string, fileName: string, rarity: string){
        this.id = id;
        this.name = name;
        this.fileName = fileName;
        this.rarity = rarity;
    }
};

export class Size {
    width: number;
    height: number;

    constructor(width: number, height: number){
        this.width = width;
        this.height = height;
    }
};