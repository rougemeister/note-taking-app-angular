import { Component, inject, OnInit, Pipe } from '@angular/core';
import { Nav } from "../../shared/nav/nav";
import { Store } from '@ngrx/store';
import { loadTheme, setTheme } from 'src/app/store/actions/theme.actions';
import { selectCurrentTheme } from 'src/app/store/selectors/theme.selectors';
import { AppState } from 'src/app/store/state/app.state';
import { ThemeMode } from 'src/app/core/models/model';
import { FormsModule } from '@angular/forms';
import {  AsyncPipe, CommonModule} from '@angular/common';
import { HeaderComponent } from "../../shared/header/header.component";
import { Router } from '@angular/router';



@Component({
  selector: 'app-color-theme',
  standalone: true,
  imports: [Nav, FormsModule, CommonModule, HeaderComponent],
  templateUrl: './color-theme.component.html',
  styleUrl: './color-theme.component.scss'
})
export class ColorThemeComponent implements OnInit {
  private store = inject(Store<AppState>);
  themes: ThemeMode[] = ['light', 'dark', 'system'];
  selectedTheme: ThemeMode = 'system';
  private router = inject(Router)

  ngOnInit(): void {
    this.store.dispatch(loadTheme());
    this.store.select(selectCurrentTheme).subscribe(theme => {
      if (theme) this.selectedTheme = theme;
    });
  }

  updateTheme(): void {
    this.store.dispatch(setTheme({ theme: this.selectedTheme }));
  }

  goToSettings():void {
    this.router.navigate(['settings'])
  }
}
