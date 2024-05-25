import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";
export { Translator } from "https://esm.sh/deepl-node@1.13.0";
export type { TargetLanguageCode } from "https://esm.sh/deepl-node@1.13.0";

const env = await load();
const fileLocation = await env['SSA_DIRECTORY'];
if (!fileLocation) throw new Error("No directory specified");
const apiKey = await env['API_KEY'];
if (!apiKey) throw new Error("No api key specified");
const language = await env['LANGUAGE'];
if (!language) throw new Error("No language specified");

export {fileLocation, apiKey, language}