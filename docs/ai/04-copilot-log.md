# Copilot-logg

## Översikt

Den här loggen sammanfattar i grova drag vad som har byggts i frontend-projektet och vilka riktlinjer som tillkommit under arbetet.

## Grova steg som genomförts

1. Läste projektunderlag och förtydliganden i plan- och endpointdokument.
2. Satt upp nytt React + TypeScript + Vite-projekt i befintlig mapp.
3. Installerade och kopplade in huvudbibliotek:
   - TanStack Query för datahämtning.
   - React Hook Form + Zod för formulär och validering.
   - Sonner för toast-notiser.
4. Implementerade API-lager mot backend-endpoints för nouns, verbs och sentence-post.
5. Byggde formulär för meningsbygge med svenska etiketter och val enligt underlaget.
6. Lade till visning av resultat under formuläret på samma sida.
7. Införde felhantering för både listhämtning och submit (inklusive toast vid API-fel).
8. Felsökte och rättade datamappning mellan backend-svar och frontend-fält (camelCase/PascalCase-stöd).
9. Uppdaterade POST-payload med obligatoriska backend-fält som tomma strängar när backend krävde dem.
10. Justerade formulärlayout till två tydliga kolumner enligt önskad placering av fält.
11. Validerade löpande med lint och build efter varje större ändring.

## Nya instruktioner som tillkom under arbetet (svepande)

- All UI-text ska vara på svenska.
- Formuläret ska börja tomt första gången, men behålla val efter skickat resultat så det går snabbt att justera och skicka igen.
- Resultatet ska visas under formuläret på samma sida.
- Felmeddelanden bör visas som toast där det fungerar tekniskt bra.
- Endpoint-anrop ska följa överenskommet mönster (bland annat GET /verb).
- Formuläret skulle få en specifik visuellt styrd kolumnordning för fälten.
- Backendens valideringskrav styr vilka fält som måste skickas, även när de inte används funktionellt i UI.

## Status

Frontend-MVP för meningsbyggaren är implementerad och tekniskt verifierad med build/lint.
