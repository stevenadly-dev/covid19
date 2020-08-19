import { dataWithDate } from "./../shared/models/dataWithDate.model";
import { DataServicesService } from "./../shared/services/data-services.service";
import { Component, OnInit } from "@angular/core";
import { dataModel } from "../shared/models";
import { Subscription } from "rxjs";

@Component({
  selector: "app-countries",
  templateUrl: "./countries.component.html",
  styleUrls: ["./countries.component.scss"],
})
export class CountriesComponent implements OnInit {
  conuntries: string[] = [];
  data: dataModel[] = [];
  mySelect: string;
  totalConfirmed: number;
  totalDeathes: number;
  totalRecovered: number;
  totalActive: number;
  DataTableNew = [];

  selectedCountryDate: dataWithDate[] = [];
  counteryDataWithDate;
  chart = {
    LineChart: "LineChart",
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
  subscriptions: Subscription[] = [];
  getAllDatasubscription: Subscription;
  getCountriesSubscription: Subscription;
  getCountrySubscription: Subscription;

  constructor(private dataService: DataServicesService) {
    this.totalConfirmed = 0;
    this.totalDeathes = 0;
    this.totalRecovered = 0;
    this.totalActive = 0;

    this.isLoading = true;

    // console.log("countryOptSelect", this.mySelect);
  }

  // to change data table
  initChart(country: string = "US") {
    this.DataTableNew = [];
    // this.DataTableNew.push(["cases", "date"]);
    // debugger;

    this.selectedCountryDate.forEach((el) => {
      if (el.country == country) {
        this.DataTableNew.push([el.date, el.cases]);
      }
    });
  }

  // get gell data
  getAllData() {
    this.getAllDatasubscription = this.dataService.getData().subscribe(
      (res: any) => {
        res.forEach((elRes) => {
          this.data.push(elRes);
        });
      },
      (err) => {},
      () => {
        // debugger;
        this.log(this.conuntries[0]);
        this.isLoading = false;
      }
    );

    this.subscriptions.push(this.getAllDatasubscription);
  }

  // get all countries names for select option
  getCountries() {
    this.getCountriesSubscription = this.dataService.getData().subscribe({
      next: (res: any) => {
        res.forEach((resElement: dataModel) => {
          this.conuntries.push(resElement.Country_Region);
        });
        // debugger;

        this.log(this.conuntries[0]);
        this.isLoading = false;
        // console.log("======", this.conuntries);
      },
    });

    this.subscriptions.push(this.getCountriesSubscription);
  }

  // get country name and cases each day by date
  getCountryData() {
    this.getCountrySubscription = this.dataService
      .getCountryDataWithDate()
      .subscribe(
        (res: any) => {
          this.counteryDataWithDate = res;
        },
        (err) => {},
        () => {}
      );

    this.subscriptions.push(this.getCountrySubscription);
  }

  // on change country seleect
  log(country: string) {
    // calculate confirmed , deathes , recovered ,active
    this.data.forEach((singleData) => {
      // lw l bld l fe l row hyya hyya l bld l m5trha
      if (singleData.Country_Region == country) {
        this.totalConfirmed = singleData.Confirmed;
        this.totalActive = singleData.Active;
        this.totalDeathes = singleData.Deaths;
        this.totalRecovered = singleData.Recovered;
      }
    });

    if (this.counteryDataWithDate) {
      this.selectedCountryDate = this.counteryDataWithDate[country];
    }

    // debugger;

    // to change data table
    this.initChart(country);

    // console.log(this.selectedCountryDate);
  }

  ngOnInit(): void {
    this.getCountries();
    this.getAllData();
    this.getCountryData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      // debugger;
      subscription.unsubscribe();
    });
  }
}
