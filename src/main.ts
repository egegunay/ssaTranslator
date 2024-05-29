import { Translator, apiKey, fileLocation, language, TargetLanguageCode } from "../deps.ts";

const translator = new Translator(apiKey);
const file = await Deno.readTextFile(fileLocation);

const events = file.split('[Events]');
const ignoredFormatAmount = events[1].split('Text')[0].match(/,/g)?.length || 0;

function splitAmount(separator: string, str: string, amount: number): string {
    const split = str.split(separator);
    const sliced = split.slice(amount);
    const joined = sliced.join(separator);
    return joined;
}

function addNewline(text: string, maxLength: number): string {
    const result = [];
    let start = 0;

    while (start < text.length) {
        const limit = start + maxLength;
        if (limit >= text.length) {
            result.push(text.slice(start).trim());
            break;
        }

        let lastSpaceIndex = text.lastIndexOf(' ', limit);
        if (lastSpaceIndex === -1 || lastSpaceIndex < start) { // Go beyond limit if no space
            lastSpaceIndex = text.indexOf(' ', limit) !== -1 ? text.indexOf(' ', limit) : text.length;
        }

        if (text.length - lastSpaceIndex < 15) { // Don't want last bit of text to be super short. 15 can be changed.
            result.push(text.slice(start).trim());
            break;
        }

        result.push(text.slice(start, lastSpaceIndex).trim());
        start = lastSpaceIndex + 1;
    }

    return result.join(String.raw`\N`);
}

const translatedLines: string[] = [];
const translation = events[1].split('\n').slice(2).map(async newline => {
    const stylizedResult = splitAmount(',', newline, ignoredFormatAmount);
    const style = newline.substring(0, newline.length - stylizedResult.length); // could just replace but yeah
    const standardisedResult = stylizedResult.split(/\{[^}]*\}/g).filter((text) => text.length > 0).join("; ");
    const cleanedResult = standardisedResult.split('\\N').join(' ');

    const translatedResult = await translator.translateText(cleanedResult, null, language as TargetLanguageCode);
    const newlinedResult = addNewline(translatedResult.text, 40);

    translatedLines.push(style + newlinedResult);
})

await Promise.all(translation);
const toWrite = '\n' + translatedLines.join('\n'); // TODO: Sigh.

await Deno.truncate(fileLocation, events[0].length + 8 + events[1].split('Text')[0].length + 4); // Scary.
await Deno.writeTextFile(fileLocation, toWrite, {append: true});
