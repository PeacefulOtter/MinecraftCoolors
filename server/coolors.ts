
import { promises as fs } from 'fs'
import Vibrant from 'node-vibrant'

const minecraftPath = '../app/public//minecraft/'


const getPalette = async (f: string) => {
    const texture = await fs.readFile(minecraftPath + f)
    const palette = await Vibrant.from(texture).getPalette()

    const banned = [
        'DarkMuted', 'LightMuted'
    ]

    const rgbPalette: {[key: string]: any} = {}
    Object.keys(palette)
        .filter( k => palette[k] !== null && !banned.includes(k) )
        .map( k => rgbPalette[k] = palette[k].rgb )
    return rgbPalette;
}

export const computeCoolors = async () => {
    const files = await fs.readdir(minecraftPath)

    const palettes: {[key: string]: object} = {}
    for ( const f of files )
        palettes[f] = await getPalette(f)

    console.log(palettes);
    return palettes;
}

export const getRandomTextures = (colors: any, n: number) => {
    const shuffled = Object.keys(colors).sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
}
