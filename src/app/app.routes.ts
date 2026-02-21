import { Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { NotfoundComponent } from './core/notfound/notfound.component';
import { ListSuggestionComponent } from './core/list-suggestion/list-suggestion.component';
import { SuggestionListComponent } from './features/suggestions/suggestion-list/suggestion-list.component';
import { SuggestionFormComponent } from './features/suggestions/suggestion-form/suggestion-form.component';
import { SuggestionDetailsComponent } from './features/suggestions/suggestion-details/suggestion-details.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'listSuggestion', component: ListSuggestionComponent },
  { path: 'suggestions', component: SuggestionListComponent },
  { path: 'add-suggestion', component: SuggestionFormComponent },
  { path: 'add-suggestion/:id', component: SuggestionFormComponent },
  { path: 'listSuggestion/:id', component: SuggestionDetailsComponent },
  { path: '**', component: NotfoundComponent }
];
