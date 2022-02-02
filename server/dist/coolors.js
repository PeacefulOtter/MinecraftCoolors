"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomTextures = exports.computeCoolors = void 0;
const fs_1 = require("fs");
const node_vibrant_1 = __importDefault(require("node-vibrant"));
const minecraftPath = '../app/public//minecraft/';
const getPalette = (f) => __awaiter(void 0, void 0, void 0, function* () {
    const texture = yield fs_1.promises.readFile(minecraftPath + f);
    const palette = yield node_vibrant_1.default.from(texture).getPalette();
    const banned = [
        'DarkMuted', 'LightMuted'
    ];
    const rgbPalette = {};
    Object.keys(palette)
        .filter(k => palette[k] !== null && !banned.includes(k))
        .map(k => rgbPalette[k] = palette[k].rgb);
    return rgbPalette;
});
const computeCoolors = () => __awaiter(void 0, void 0, void 0, function* () {
    const files = yield fs_1.promises.readdir(minecraftPath);
    const palettes = {};
    for (const f of files)
        palettes[f] = yield getPalette(f);
    console.log(palettes);
    return palettes;
});
exports.computeCoolors = computeCoolors;
const getRandomTextures = (colors, n) => {
    const shuffled = Object.keys(colors).sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
};
exports.getRandomTextures = getRandomTextures;
//# sourceMappingURL=coolors.js.map