import { Component, Inject, OnInit, QueryList, ViewChild, ViewChildren, } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
var $: (arg0: string) => { (): any; new(): any; carousel: { (arg0: { interval: number; pause: string; }): void; new(): any; }; };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
})

export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private spinner: NgxSpinnerService,

  ) {}

  ngOnInit() {

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);
    $('.carousel').carousel({
      interval: 6000,
      pause: "false"
    });
  }

}



