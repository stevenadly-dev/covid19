import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  @Input() totalConfirmed: number;
  @Input() totalDeathes: number;
  @Input() totalRecovered: number;
  @Input() totalActive: number;

  constructor() {
    this.totalConfirmed = 0;
    this.totalDeathes = 0;
    this.totalRecovered = 0;
    this.totalActive = 0;
  }

  ngOnInit(): void {}
}
