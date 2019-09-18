import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ThemePickerComponent } from './theme-picker/theme-picker.component';

@NgModule({
  declarations: [ThemePickerComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [ThemePickerComponent]
})
export class CoreModule { }
