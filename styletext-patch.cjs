// Rustine de compatibilité : Node < 20.16 accepte seulement une chaîne comme
// premier argument de util.styleText, alors que rolldown 1.x l'appelle avec un
// tableau (ex. ["underline","gray"]) dès l'évaluation de son schéma → crash au
// chargement de la config Astro. On enveloppe styleText pour appliquer chaque
// format d'un tableau successivement (et ignorer proprement l'échec éventuel).
const util = require('node:util');
const orig = util.styleText;
if (typeof orig === 'function') {
  const apply = (format, text, rest) => {
    try {
      return orig(format, text, ...rest);
    } catch {
      return text;
    }
  };
  util.styleText = function styleText(format, text, ...rest) {
    if (Array.isArray(format)) {
      return format.reduce((acc, f) => apply(f, acc, rest), text);
    }
    return apply(format, text, rest);
  };
}
