// Importera huvudfunktionen från huvudfilen
import { analyze, anonymizeText } from "./main.js";

// Test fallen
const testCases = [
  "Liban Mohamed developer from Gothenburg och jobbar tidigare för Volvo",
  "Anna Eriksson är en lärare från Malmö.",
  "Johan Smith works at Google in California.",
];

// Kör testfallen
async function tests() {
  for (const text of testCases) {
    console.log(`Testar texten: "${text}"`);
    const results = await analyze(text);

    if (results) {
      const anonymizedText = anonymizeText(text, results);
      console.log("Anonymiserad text:", anonymizedText);
    } else {
      console.log("fel för text:", text);
    }

    console.log("-----------------------------------");
  }
}

tests();
