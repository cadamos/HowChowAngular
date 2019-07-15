import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-field-error-alert',
  templateUrl: './field-error-alert.component.html',
  styleUrls: ['./field-error-alert.component.css']
})
export class FieldErrorAlertComponent implements OnInit {

  @Input() errorMsg: string;
  @Input() displayError: boolean;

  constructor() { }

  ngOnInit() {
  }

}
