import { dataWithDate } from "./../models";
import { dataModel } from "./../models/data.model";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class DataServicesService {
  serverUrl: string;
  dateWithDataUrl: string;
  Yesterday: Date;
  YesterdayString = "";
  constructor(private http: HttpClient) {
    this.Yesterday = new Date();
    var dd = this.Yesterday.getDate() - 1;
    var mm = this.Yesterday.getMonth() + 1;
    var yyyy = this.Yesterday.getFullYear();

    this.YesterdayString = `${mm}-${dd}-${yyyy}`;
    console.log("yesterday", this.YesterdayString);

    this.serverUrl = `https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/${this.checkMMDD(
      mm
    )}-${this.checkMMDD(dd)}-${yyyy}.csv`;

    this.dateWithDataUrl =
      "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv";
  }

  checkMMDD(mmOrDD: number) {
    if (mmOrDD < 10) {
      return "0" + mmOrDD;
    } else {
      return mmOrDD;
    }
  }

  getData() {
    return this.http.get(this.serverUrl, { responseType: "text" }).pipe(
      map((res) => {
        let data: dataModel[] = [];
        let newDataRow = {};

        let rows = res.split("\n");
        rows.splice(0, 1);
        rows.splice(0, -1);
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
          we want to get by return====>> newDataRow
          [
           Albania: {Country_Region: "Albania", Confirmed: 7260, Deaths: 225, Recovered: 3746, Active: 3289},
           Brunei: {Country_Region: "Brunei", Confirmed: 142, Deaths: 3, Recovered: 138, Active: 1}
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

  getCountryDataWithDate() {
    return this.http.get(this.dateWithDataUrl, { responseType: "text" }).pipe(
      map((res) => {
        let rows = res.split("\n");
        let mainDataArr = {};
        let header = rows[0];
        let dates = header.split(/,(?=\S)/g);
        dates.splice(0, 4);
        rows.splice(0, 1);

        rows.forEach((row) => {
          let columns = row.split(/,(?=\S)/g);
          let countryName = columns[1];
          // console.log(countryName, columns);
          mainDataArr[countryName] = [];
          columns.splice(0, 4);
          // console.log("columns", columns);
          columns.forEach((value, index) => {
            let dateWithData: dataWithDate = {
              cases: Math.floor(+value),
              country: countryName,
              date: new Date(Date.parse(dates[index])),
            };
            mainDataArr[countryName].push(dateWithData);
          });

          // return mainData;
        });

        // console.log("============================", mainDataArr);
        return mainDataArr;
      })
    );
  }
}
