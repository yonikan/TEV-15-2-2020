import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchValidationComponent } from './match-validation/match-validation.component';
import { TrainingValidationComponent } from './training-validation/training-validation.component';
import { RouterModule } from '@angular/router';
import { routes } from './team-event-validation.routes';
import { StepTrainingGeneralComponent } from './training-validation/step-training-general/step-training-general.component';
import { StepTrainingPlayersComponent } from './training-validation/step-training-players/step-training-players.component';
import { StepTrainingPhasesComponent } from './training-validation/step-training-phases/step-training-phases.component';
import { StepMatchOverviewComponent } from './match-validation/step-match-overview/step-match-overview.component';
import { StepMatchPlayersComponent } from './match-validation/step-match-players/step-match-players.component';
import { StepMatchFormationsComponent } from './match-validation/step-match-formations/step-match-formations.component';
import { StepMatchPhasesComponent } from './match-validation/step-match-phases/step-match-phases.component';
import { StepMatchSubsComponent } from './match-validation/step-match-subs/step-match-subs.component';
import { FormationFieldComponent } from './match-validation/step-match-formations/formation-field/formation-field.component';
import { FormationSelectionComponent } from './match-validation/step-match-formations/formation-selection/formation-selection.component';
import { SharedModule } from '../shared/shared.module';
import { FieldPlayerComponent } from './match-validation/step-match-formations/field-player/field-player.component';

@NgModule({
  declarations: [
    MatchValidationComponent,
    TrainingValidationComponent,
    StepTrainingGeneralComponent,
    StepTrainingPlayersComponent,
    StepTrainingPhasesComponent,
    StepMatchOverviewComponent,
    StepMatchPlayersComponent,
    StepMatchFormationsComponent,
    StepMatchPhasesComponent,
    StepMatchSubsComponent,
    FormationFieldComponent,
    FormationSelectionComponent,
    FieldPlayerComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class TeamEventValidationModule { }
