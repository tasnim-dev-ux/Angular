import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Suggestion } from '../../../models/suggestion';

@Component({
  selector: 'app-suggestion-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './suggestion-form.component.html',
  styleUrl: './suggestion-form.component.css'
})
export class SuggestionFormComponent implements OnInit {
  suggestionForm!: FormGroup;

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

  constructor(private fb: FormBuilder, private router: Router) {}

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
  }

  onSubmit() {
    if (this.suggestionForm.valid) {
      const newSuggestion: Suggestion = {
        id: Date.now(),
        ...this.suggestionForm.getRawValue(),
        nbLikes: 0
      };

      console.log(newSuggestion);

      // Stocker dans localStorage pour partager entre composants
      const existingSuggestions = JSON.parse(localStorage.getItem('suggestions') || '[]');
      existingSuggestions.push(newSuggestion);
      localStorage.setItem('suggestions', JSON.stringify(existingSuggestions));

      this.router.navigate(['/suggestions']);
    }
  }
}
