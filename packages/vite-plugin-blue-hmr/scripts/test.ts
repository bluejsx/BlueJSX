import { transform } from '../src/index.ts'

Deno.chdir('./io-test')
for (const dirEntry of Deno.readDirSync('./')) {
    if (dirEntry.isDirectory) {
        const input = Deno.readTextFileSync(dirEntry.name+'/input.js')
        const expected = Deno.readTextFileSync(dirEntry.name+'/expect')
        const actual = transform(input)
        if(actual.replace(/\s/g, '') === expected.replace(/\s/g, '')) {
            console.log(`result: ${dirEntry.name} passed`)
        }else {
            throw new Error(`${dirEntry.name} failed`)
        }
        
    }
}