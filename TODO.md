# Plan d'implémentation - Workshop Services Angular

## Partie 1: Manipulation des services

- [x] 1. Créer le service SuggestionService (ng g s Core/Services/Suggestion –skip-tests)
- [x] 2. Déplacer la liste des suggestions dans SuggestionService avec getSuggestionsList()
- [x] 3. Modifier SuggestionListComponent pour utiliser le service
- [x] 4. Modifier SuggestionDetailsComponent pour utiliser le service avec filtrage par id

## Partie 2: Manipulation du service HTTPClient

- [x] 1. Ajouter provideHttpClient() dans les providers de AppModule
- [x] 2. Injecter HttpClient dans SuggestionService
- [x] 3. Ajouter la propriété suggestionUrl
- [x] 4. Créer la méthode getSuggestions() avec HTTP
- [x] 5. Créer la méthode getSuggestionById() avec HTTP
- [x] 6. Créer la méthode deleteSuggestion() avec HTTP
- [x] 7. Ajouter le bouton supprimer dans SuggestionListComponent
- [x] 8. Créer la méthode addSuggestion() avec HTTP
- [x] 9. Mettre à jour SuggestionFormComponent pour utiliser le service
- [x] 10. Créer la méthode updateSuggestion() avec HTTP
- [x] 11. Ajouter le bouton Update dans SuggestionDetailsComponent
- [x] 12. Créer la méthode updateLikes() avec HTTP
- [x] 13. Mettre à jour le bouton like dans SuggestionListComponent
