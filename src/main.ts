import { Translator, apiKey, fileLocation, language, TargetLanguageCode } from "../deps.ts";

const translator = new Translator(apiKey);
const file = await Deno.readTextFile(fileLocation);

const events = file.split('[Events]')[1];
const ignoredFormatAmount = events.split('Text')[0].match(/,/g)?.length || 0;

function splitAmount(seperator: string, str: string, amount: number) { // no regex for you
    const split = str.split(seperator);
    const sliced = split.slice(amount); // ignoredFormatAmount
    const joined = sliced.join(seperator);

    return joined;
}

events.split('\n').slice(2).forEach(async newline => {
    const stylizedResult = splitAmount(',', newline, ignoredFormatAmount); // This will be used if I want to write some logic for the stylization.
    const standardisedResult = stylizedResult.split(/\{[^}]*\}/g).filter((text) => text.length > 0).join("; ");
    const cleanedResult = standardisedResult.split('\\N').join(' ');

    const translatedLine = await translator.translateText(cleanedResult, null, language as TargetLanguageCode);
    // normally you'd add these lines and translate together for added context
    // however im unsure

    console.log(translatedLine.text);
})
