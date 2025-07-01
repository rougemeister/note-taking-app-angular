import { Component } from '@angular/core';
import { Nav } from "../../shared/nav/nav";
import { HeaderComponent } from "../../shared/header/header.component";

@Component({
  selector: 'app-create-note',
  standalone:true,
  imports: [Nav, HeaderComponent],
  templateUrl: './create-note.html',
  styleUrl: './create-note.scss'
})
export class CreateNote {
showDatePicker() {
throw new Error('Method not implemented.');
}
goBack() {
throw new Error('Method not implemented.');
}

}
