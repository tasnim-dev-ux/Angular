import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../core/services/suggestion.service';

@Component({
  selector: 'app-suggestion-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './suggestion-list.component.html',
  styleUrl: './suggestion-list.component.css'
})
export class SuggestionListComponent implements OnInit {
  searchText: string = '';
  favorites: Suggestion[] = [];
  suggestions: Suggestion[] = [];

  constructor(
    private router: Router,
    private suggestionService: SuggestionService
  ) {}

  ngOnInit(): void {
    // Appel du service pour récupérer la liste des suggestions
    this.suggestions = this.suggestionService.getSuggestionsList();
  }

  // Méthode pour incrémenter les likes
  incrementLikes(suggestion: Suggestion): void {
    suggestion.nbLikes++;
    // Appel du service pour mettre à jour les likes via HTTP
    this.suggestionService.updateLikes(suggestion.id, suggestion.nbLikes).subscribe();
  }

  // Méthode pour supprimer une suggestion
  deleteSuggestion(suggestion: Suggestion): void {
    if (confirm(`Êtes-vous sûr de vouloir supprimer la suggestion "${suggestion.title}" ?`)) {
      this.suggestionService.deleteSuggestion(suggestion.id).subscribe(() => {
        // Mettre à jour la liste locale après suppression
        this.suggestions = this.suggestions.filter(s => s.id !== suggestion.id);
        // Rediriger vers la liste
        this.router.navigate(['/suggestions']);
      });
    }
  }

  // Méthode pour ajouter aux favoris
  addToFavorites(suggestion: Suggestion): void {
    if (!this.favorites.find(fav => fav.id === suggestion.id)) {
      this.favorites.push(suggestion);
      alert(`"${suggestion.title}" a été ajouté aux favoris !`);
    } else {
      alert('Cette suggestion est déjà dans vos favoris !');
    }
  }

  // Méthode pour vérifier si une suggestion est dans les favoris
  isFavorite(suggestion: Suggestion): boolean {
    return this.favorites.some(fav => fav.id === suggestion.id);
  }

  // Méthode pour filtrer les suggestions
  get filteredSuggestions(): Suggestion[] {
    if (!this.searchText) {
      return this.suggestions;
    }

    const searchLower = this.searchText.toLowerCase();
    return this.suggestions.filter(suggestion =>
      suggestion.title.toLowerCase().includes(searchLower) ||
      suggestion.category.toLowerCase().includes(searchLower)
    );
  }

  // Méthode pour obtenir la classe CSS selon le statut
  getStatusClass(status: string): string {
    switch(status) {
      case 'acceptee': return 'status-accepted';
      case 'refusee': return 'status-refused';
      case 'en_attente': return 'status-pending';
      default: return '';
    }
  }

  // Méthode pour obtenir le texte du statut
  getStatusText(status: string): string {
    switch(status) {
      case 'acceptee': return 'Acceptée';
      case 'refusee': return 'Refusée';
      case 'en_attente': return 'En attente';
      default: return status;
    }
  }

  // Méthode pour naviguer vers les détails
  viewDetails(suggestion: Suggestion): void {
    this.router.navigate(['/listSuggestion', suggestion.id]);
  }
}
