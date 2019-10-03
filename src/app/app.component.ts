import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { ThemePickerService } from './core/services/theme-picker.service';
// import { TranslateService } from '@ngx-translate/core';
import { TranslationPickerService } from './core/services/translation-picker.service';
import { LocalStorageService } from './core/services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private authStatusSub: Subscription;

  constructor( 
    public authService: AuthService, 
    private localStorageService: LocalStorageService,
    private translationPickerService: TranslationPickerService,
    private themePickerService: ThemePickerService) {
  }

  ngOnInit() {
    // this.themePickerService.setDefaultTheme();
    if (this.localStorageService.getOnLocalStorage('selected_theme')) {
      this.themePickerService.setDefaultTheme(this.localStorageService.getOnLocalStorage('selected_theme'));
    } else {
      this.themePickerService.setDefaultTheme('light');
    }

    if (this.localStorageService.getOnLocalStorage('selected_language')) {
      this.translationPickerService.setDefaultLang(this.localStorageService.getOnLocalStorage('selected_language'));
    } else {
      this.translationPickerService.setDefaultLang('en');
    }

    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isAuthenticated = authStatus;
      });
  }

  ngOnDestroy(){
    this.authStatusSub.unsubscribe();
  }
}
