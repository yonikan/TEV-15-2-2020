import { Component, OnInit, Input } from '@angular/core';
import { TranslationPickerService } from 'src/app/core/services/translation-picker.service';
import { TeamPickerService } from 'src/app/core/services/team-picker.service';

@Component({
  selector: 'app-team-picker-dropdown',
  templateUrl: './team-picker-dropdown.component.html',
  styleUrls: ['./team-picker-dropdown.component.scss']
})
export class TeamPickerDropdownComponent implements OnInit {
  @Input() appearance: string;
  @Input() items: any[];
  @Input() dropdownWidth: string;
  selectedItemImgPath: string;
  defaultItem: number;

  constructor(public teamPickerService: TeamPickerService) { }

  ngOnInit() {
    this.selectedItemImgPath = this.items[0].teamPicture;
    this.defaultItem = this.items[0].id;
  }

  useCurrentSelection(itemId: number) {
    // const useDefaultItem = this.items.find(item => item.value === itemValue);
    // this.selectedItemImgPath = this.selectedItemImgPath;
    // const selectedTeam = this.items.find(team => team.value === itemValue);
  }
}