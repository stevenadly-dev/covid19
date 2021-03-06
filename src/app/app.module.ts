import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./shared/components/header/header.component";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { HomeComponent } from "./home/home.component";
import { CountriesComponent } from "./countries/countries.component";

import { HttpClientModule } from "@angular/common/http";
import { DashboardComponent } from "./shared/components/dashboard/dashboard.component";
import { GoogleChartsModule } from "angular-google-charts";
import { FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CollapseModule } from "ngx-bootstrap/collapse";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CountriesComponent,
    DashboardComponent,
  ],
  imports: [
    CollapseModule.forRoot(),
    BrowserAnimationsModule,
    GoogleChartsModule,

    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
