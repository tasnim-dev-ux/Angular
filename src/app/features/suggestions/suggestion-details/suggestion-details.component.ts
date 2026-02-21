import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../core/services/suggestion.service';

@Component({
  selector: 'app-suggestion-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './suggestion-details.component.html',
  styleUrl: './suggestion-details.component.css'
})
export class SuggestionDetailsComponent implements OnInit {
  suggestion: Suggestion | undefined;
  suggestions: Suggestion[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private suggestionService: SuggestionService
  ) {}

  ngOnInit(): void {
    // Appel du service pour récupérer la liste des suggestions
    this.suggestions = this.suggestionService.getSuggestionsList();
    
    // Filtrage par id
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.suggestion = this.suggestions.find(s => s.id === id);
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

  // Méthode pour retourner à la liste
  backToList(): void {
    this.router.navigate(['/suggestions']);
  }

  // Méthode pour naviguer vers le formulaire de modification
  updateSuggestion(): void {
    if (this.suggestion) {
      this.router.navigate(['/add-suggestion', this.suggestion.id]);
    }
  }
}
