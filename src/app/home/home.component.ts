import { dataModel } from "./../shared/models/data.model";
import { DataServicesService } from "./../shared/services/data-services.service";
import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  totalConfirmed: number;
  totalDeathes: number;
  totalRecovered: number;
  totalActive: number;
  allData: dataModel[];
  CasesTitle: string;
  DataTableNew = [];

  chart = {
    PieChart: "PieChart",
    ColumnChart: "ColumnChart",
    options: {
      // height: 500,
      animation: {
        duration: 2000,
        easing: "inAndOut",
      },
    },
  };

  isLoading: boolean;
  getAllDataSubscription: Subscription;
  constructor(private dataServices: DataServicesService) {
    this.totalConfirmed = 0;
    this.totalDeathes = 0;
    this.totalRecovered = 0;
    this.totalActive = 0;
    this.allData = [];
    this.isLoading = true;
    this.CasesTitle = "cases";
  }

  getAllData() {
    this.getAllDataSubscription = this.dataServices.getData().subscribe({
      next: (res: any) => {
        this.allData = res;
        // ========================= totalConfirmed
        // this.totalConfirmed = res.reduce(
        //   (total: number = null, singleRes: any) => {
        //     return total + (singleRes.Confirmed || 0);
        //   },
        //   0
        // );

        res.forEach((el: dataModel) => {
          (this.totalConfirmed += el.Confirmed || 0),
            (this.totalDeathes += el.Deaths || 0),
            (this.totalRecovered += el.Recovered || 0),
            (this.totalActive += el.Active || 0);
        });

        this.initChart();
      },
      complete: () => {
        this.isLoading = false;
        // debugger;
      },
    });
  }

  initChart(type: string = "confirmed") {
    this.DataTableNew = [];
    // this.DataTableNew.push(["country", "cases"]);

    this.allData.forEach((el) => {
      let value: number;

      if (type == "confirmed") {
        if (el.Confirmed > 50000) {
          value = el.Confirmed;
          this.DataTableNew.push([el.Country_Region, value]);
        }
      } else if (type == "active") {
        if (el.Active > 50000) {
          value = el.Active;
          this.DataTableNew.push([el.Country_Region, value]);
        }
      } else if (type == "deathes") {
        if (el.Deaths > 20000) {
          value = el.Deaths;
          this.DataTableNew.push([el.Country_Region, value]);
        }
      } else if (type == "recovered") {
        if (el.Recovered > 50000) {
          value = el.Recovered;
          this.DataTableNew.push([el.Country_Region, value]);
        }
      }
    });

    // console.log(
    //   "DataTableNew--------------",
    //   "type============",
    //   type,
    //   "DataTableNew========",
    //   this.DataTableNew
    // );
  }

  checkFilter(el: HTMLInputElement) {
    // console.log(el.value);
    this.initChart(el.value);
  }
  ngOnInit(): void {
    this.getAllData();
  }
  ngOnDestroy(): void {
    this.getAllDataSubscription.unsubscribe();
  }
}
