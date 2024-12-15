// Nyckeln som ger os åtkomst till Hugginface API
const API_KEY = "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";

// Exempeltext som används för att anonymisera namn, stad och tidigare företag
const text =
  "Liban Mohamed developer from Gothenburg och jobbar tidigare för Volvo";

// API-adress till API som utför Named Entity Recognition (NER) för att identifiera entiteter i text.
const api_url =
  "https://api-inference.huggingface.co/models/dbmdz/bert-large-cased-finetuned-conll03-english";

// Funktion för att skicka text till Hugging Face och få NER-resultat
export async function analyze(input) {
  const response = await fetch(api_url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: input }),
  });

  // Vid misstag på inputs/API kan fel meddelande ges
  if (!response.ok) {
    console.error("fel:", response.statusText);
    return null;
  }
  // Texten som matades in blir till ett objekt som sedan anomiseras i nästa metod
  return response.json();
}

// Funktionen som anonymiserar texten baserat på NER-resultatet från översta metod
export function anonymizeText(originalText, nerResults) {
  let anonymizedText = originalText;

  nerResults.forEach((entity) => {
    const entityText = originalText.substring(entity.start, entity.end);
    anonymizedText = anonymizedText.replace(entityText, "[Anonym]");
  });

  return anonymizedText;
}

// Kör analys och anonymisering
async function main() {
  console.log("Analyserar text...");

  const nerResults = await analyze(text);

  if (nerResults) {
    console.log("NER-resultat:", JSON.stringify(nerResults, null, 2));

    const anonymizedText = anonymizeText(text, nerResults);
    console.log("Anonymiserad text:");
    console.log(anonymizedText);
  }
}

// Kör huvudfunktionen
main();
