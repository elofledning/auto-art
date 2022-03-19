var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
var fs = require("fs");
var myArgs = process.argv.slice(2);
var _a = require("canvas"), createCanvas = _a.createCanvas, loadImage = _a.loadImage;
var _b = require("./src/config.js"), layers = _b.layers, width = _b.width, height = _b.height;
var canvas = createCanvas(width * 3, height * 3);
var ctx = canvas.getContext("2d");
var edition = myArgs.length > 0 ? Number(myArgs[0]) : 1;
var artInEdition = 9;
var outputDir = "C:\\Workspace\\auto-art-files\\output\\";
var metadata = [];
var attributes = [];
var hash = [];
var decodedHash = [];
var saveLayer = function (_canvas, _edition) {
    fs.writeFileSync("".concat(outputDir).concat(_edition, ".png"), _canvas.toBuffer("image/png"));
};
var addMetadata = function (_edition) {
    var dateTime = Date.now();
    var tempMetadata = {
        hash: hash.join(""),
        decodedHash: [],
        edition: _edition,
        date: dateTime,
        attributes: attributes
    };
    metadata.push(tempMetadata);
    attributes = [];
    hash = [];
    decodedHash = [];
};
var drawLayer = function (_layer, _edition, _offsetX, _offsetY) { return __awaiter(_this, void 0, void 0, function () {
    var element, image;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                element = _layer.elements[Math.floor(Math.random() * _layer.elements.length)];
                addAttributes(element, _layer);
                return [4 /*yield*/, loadImage("".concat(_layer.location).concat(element.fileName))];
            case 1:
                image = _a.sent();
                ctx.drawImage(image, _offsetX, _offsetY, _layer.size.width, _layer.size.height);
                saveLayer(canvas, _edition);
                return [2 /*return*/];
        }
    });
}); };
var addAttributes = function (_element, _layer) {
    var _a;
    var tempAttributes = {
        id: _element.id,
        layer: _layer.name,
        name: _element.name,
        rarity: _element.rarity
    };
    attributes.push(tempAttributes);
    hash.push(_layer.id);
    hash.push(_element.id);
    decodedHash.push((_a = {}, _a[_layer.id] = _element.id, _a));
};
var _loop_1 = function (i) {
    var _loop_2 = function (j) {
        layers.forEach(function (layer) {
            var x = j % 3 * 30;
            var y = 0;
            if (j > 2 && j < 6) {
                y = 30;
            }
            else if (j > 5) {
                y = 60;
            }
            drawLayer(layer, i, x, y);
        });
    };
    for (var j = 0; j <= artInEdition; j++) {
        _loop_2(j);
    }
    addMetadata(i);
    console.log("creating edition " + i);
};
for (var i = 1; i <= edition; i++) {
    _loop_1(i);
}
fs.readFile("".concat(outputDir, "_metadata.json"), function (err, data) {
    if (err)
        throw err;
    fs.writeFileSync("".concat(outputDir, "_metadata.json"), JSON.stringify(metadata));
});
