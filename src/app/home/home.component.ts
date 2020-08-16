import { DataServicesService } from "./../shared/services/data-services.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  constructor(private dataServices: DataServicesService) {
    this.dataServices.getData().subscribe(
      (res) => {
        console.log("res", res);
      },
      (err) => {
        console.log("err", err);
      }
    );
  }

  ngOnInit(): void {}
}
