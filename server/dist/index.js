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
const express_1 = __importDefault(require("express"));
const coolors_1 = require("./coolors");
const PORT = process.env.PORT || 3001;
const app = (0, express_1.default)();
let coolors = null;
app.use(express_1.default.urlencoded({
    extended: true
}));
app.use(express_1.default.json({
    type: ['application/json', 'text/plain']
}));
app.get('/texture', (req, res, next) => {
    const texture = (0, coolors_1.getRandomTextures)(coolors, 1)[0];
    const palette = coolors[texture];
    const result = { texture, palette, locked: false };
    res.json(result);
});
app.post("/textures", (req, res, next) => {
    const nb = req.body.nb;
    const textures = (0, coolors_1.getRandomTextures)(coolors, nb);
    console.log(textures);
    const palettes = textures.map((tex) => coolors[tex]);
    console.log(palettes);
    const result = textures.map((tex, i) => {
        return { texture: tex, palette: palettes[i], locked: false };
    });
    res.json(result);
});
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    coolors = yield (0, coolors_1.computeCoolors)();
    console.log(`Server listening on ${PORT}`);
}));
//# sourceMappingURL=index.js.map