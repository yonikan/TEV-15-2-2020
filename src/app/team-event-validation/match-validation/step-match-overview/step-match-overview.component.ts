import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { TeamEventValidationService } from '../../team-event-validation.service';

@Component({
  selector: 'app-step-match-overview',
  templateUrl: './step-match-overview.component.html',
  styleUrls: ['./step-match-overview.component.scss']
})
export class StepMatchOverviewComponent implements OnInit {
  @Input() stepMatchOverviewData: any;
  @Output() stepSelectionEmitter = new EventEmitter<number>();

  constructor(private teamEventValidationService: TeamEventValidationService) { }

  ngOnInit() {
  }

  nextStep() {
    this.teamEventValidationService.matchDataOutput.step1OverviewData = this.stepMatchOverviewData;
    this.stepSelectionEmitter.emit(1);
    console.log(this.stepMatchOverviewData);
  }

  onTagsEmitter(tags) {
		let trimmedTags = [];
		tags.forEach(tag => {
			trimmedTags.push(tag.name);
		});
		let matchData = this.teamEventValidationService.getMatchValidationData();
		matchData.metadata.tags = trimmedTags;
		this.teamEventValidationService.setMatchValidationData(matchData);
  }
}
