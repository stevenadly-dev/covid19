import { dataModel } from "./../models/data.model";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class DataServicesService {
  serverUrl: string;
  constructor(private http: HttpClient) {
    this.serverUrl =
      "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/08-14-2020.csv";
  }
  getData() {
    return this.http.get(this.serverUrl, { responseType: "text" }).pipe(
      map((res) => {
        let data: dataModel[] = [];
        let newDataRow = {};

        let rows = res.split("\n");
        rows.splice(0, 1);
        rows.forEach((row) => {
          let cols = row.split(/,(?=\S)/g);
          let currentItem: dataModel;
          currentItem = {
            Country_Region: cols[3],
            Confirmed: +cols[7],
            Deaths: +cols[8],
            Recovered: +cols[9],
            Active: +cols[10],
          };

          // like us , brazil...
          /*
          we want to get
          [
            {'brazil',{}},
            {'us',{}},
            {'egypt',{}},

          ]
          */

          let temp: dataModel = newDataRow[currentItem.Country_Region];
          if (temp) {
            temp.Country_Region = currentItem.Country_Region;
            temp.Confirmed += currentItem.Confirmed;
            temp.Deaths += currentItem.Deaths;
            temp.Recovered += currentItem.Recovered;
            temp.Active += currentItem.Active;
          } else {
            newDataRow[currentItem.Country_Region] = currentItem;
          }

          // data.push(currentItem);
        });

        // console.log("data=============", newDataRow);
        return Object.values(newDataRow);
      })
    );
  }
}
