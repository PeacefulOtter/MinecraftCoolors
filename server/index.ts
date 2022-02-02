import express, { Express } from "express";
import { computeCoolors, getRandomTextures } from "./coolors";

const PORT = process.env.PORT || 3001;

const app: Express = express();
let coolors: {[key: string]: object} = null;

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json({
  	type: ['application/json', 'text/plain']
}))


app.post("/textures", async (req: any, res: any, next: any) => {
    const nb = req.body.nb;
    const textures = getRandomTextures(coolors, nb);
    console.log(textures);
    const palettes = textures.map( (tex: string) => coolors[tex] )
    console.log(palettes);
    const result = textures.map((tex, i) => {
        return {texture: tex, palette: palettes[i], locked: false }
    })
    res.json( result )
} )


app.listen(PORT, async () => {
    coolors = await computeCoolors()
  	console.log(`Server listening on ${PORT}`);
});