# Plan

## Purpose

Create a frontend that will serve the use cases and endpoints. The aim is to provide user with a chance to select words that exist in the database already and provide grammatical options to choose that will provide instructions for the backend to construct a sentence that will be returned to the frontend to display. By changing the grammatical options or words and sending the query again the sentence will be toggled.

## Technical tools

Make me a suggestion. This is a hobby project that I want to show in a portfolio, until I build a better version from scratch. Prioritize easy to get up and going. It is not expected to scale or grow into anaything else than stated in the files here.

## Use cases

### Get Nouns

There should be a function that the frontend can call the backend and receive a list of all available nouns. This will include their ids and singular form.

### Get Verbs

There should be a function that the frontend can call the backend and receive a list of all available verbs. This will include their ids and present tense form.

### Query the backend to build a sentence and send the result

This is the main thing. There should be a page where there are different selectboxes where the user can select words and grammatical options to build a DisplayBasicSentenceQuery.

The user should see these selectboxes: Subjekt, numerus för subjekt, bestämdhet för subjekt, predikat, tempus, påstående eller fråga.
Subjekt should show the singularform of available nouns. It should use the noun id as value to set SubjectId in the DisplayBasicSentenceQuery.
Numerus för subjekt, should show singular and plural. Singular should generate the string singular for SubjectGrammaticalNumber and plural should generate plural.
Bestämdhet för subjekt, should show bestämd and obestämd form. Bestämd should generate the string definite for SubjectDefiniteness and obestämd should generate indefinite.
Predikat should show the present tense form of the available verbs. It should set the verb id as PredicateId.
Tempus should show presens, futurum, perfekt och imperfekt. It should set the value to present, future, perfect or past for Tense.
Påstående eller fråga should show the choices påstående and fråga. It should set the value to statement or question, for StatementOrQuestion.

When all of these have selected values it should be possible to submit. That query will return DisplayBasicSentenceDto. That dto have a prop called display sentence. That string should be displayed as result to the user. The other values are to be stored behind the scenes, if they are needed to display which are the current selected options or the like.
