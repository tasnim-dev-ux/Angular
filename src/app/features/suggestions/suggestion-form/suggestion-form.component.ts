import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';
import { SuggestionService } from '../../../core/services/suggestion.service';

@Component({
  selector: 'app-suggestion-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './suggestion-form.component.html',
  styleUrl: './suggestion-form.component.css'
})
export class SuggestionFormComponent implements OnInit {
  suggestionForm!: FormGroup;
  isEditMode: boolean = false;
  suggestionId: number | null = null;
  suggestion: Suggestion | null = null;

  categories: string[] = [
    'Infrastructure et bâtiments',
    'Technologie et services numériques',
    'Restauration et cafétéria',
    'Hygiène et environnement',
    'Transport et mobilité',
    'Activités et événements',
    'Sécurité',
    'Communication interne',
    'Accessibilité',
    'Autre'
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private suggestionService: SuggestionService
  ) {}

  ngOnInit(): void {
    this.suggestionForm = this.fb.group({
      title: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.pattern('^[A-Z][a-zA-Z]*$')
      ]],
      description: ['', [
        Validators.required,
        Validators.minLength(30)
      ]],
      category: ['', Validators.required],
      date: [{ value: new Date(), disabled: true }],
      status: [{ value: 'en attente', disabled: true }]
    });

    // Vérifier si on est en mode modification (id présent dans l'URL)
    this.suggestionId = +this.route.snapshot.paramMap.get('id')!;
    if (this.suggestionId) {
      this.isEditMode = true;
      // Charger les données de la suggestion
      this.suggestionService.getSuggestionById(this.suggestionId).subscribe((data) => {
        this.suggestion = data;
        this.suggestionForm.patchValue({
          title: data.title,
          description: data.description,
          category: data.category,
          date: data.date,
          status: data.status
        });
      });
    }
  }

  onSubmit() {
    if (this.suggestionForm.valid) {
      const suggestionData: Suggestion = {
        id: this.suggestionId ? this.suggestionId : Date.now(),
        title: this.suggestionForm.get('title')?.value,
        description: this.suggestionForm.get('description')?.value,
        category: this.suggestionForm.get('category')?.value,
        date: new Date(),
        status: 'en_attente',
        nbLikes: this.suggestion?.nbLikes || 0
      };

      if (this.isEditMode && this.suggestionId) {
        // Mode modification - appeler updateSuggestion
        this.suggestionService.updateSuggestion(this.suggestionId, suggestionData).subscribe(() => {
          this.router.navigate(['/suggestions']);
        });
      } else {
        // Mode ajout - appeler addSuggestion
        this.suggestionService.addSuggestion(suggestionData).subscribe(() => {
          this.router.navigate(['/suggestions']);
        });
      }
    }
  }
}
