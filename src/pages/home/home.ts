import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Http, RequestOptions, Headers } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Reservoir } from '../../models/reservoir';
import { ImplicitReceiver } from '@angular/compiler';
import { ReservoirDetailsPage } from '../reservoir-details/reservoir-details';
import { AddReservoirPage } from '../add-reservoir/add-reservoir'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  ngOnInit(): void {
    var res: Reservoir[] = [];
      var r = new Reservoir(1, "reservoir_beja", 10.0, 10.0, true);
    res.push(r);
    var r = new Reservoir(2, "reservoir_sfax", 100.0, 10.0, true);
    res.push(r);
    var r = new Reservoir(3, "reservoir_tunis", 100.0, 60.0, true);
    res.push(r);
    var r = new Reservoir(4, "reservoir_salakta", 200.0, 10.0, true);
    res.push(r);
    var r = new Reservoir(5, "reservoir_route_gaves", 100.0, 1.0, true);
    res.push(r);
    var r = new Reservoir(6, "reservoir_jandouba", 150.0, 11.6, true);
    res.push(r);
    var r = new Reservoir(7, "reservoir_sahloul", 155.0, 105.13, true);
    res.push(r);
    var r = new Reservoir(8, "reservoir_malek", 210.0, 150.0, true);
    res.push(r);
    var r = new Reservoir(9, "reservoir_mohamed", 122.0, 10.0, true);
    res.push(r);
    var r = new Reservoir(10, "reservoir_asil", 18.0, 10.0, true);
    res.push(r);
    var r = new Reservoir(11, "reservoir_zan9it_miled", 100.0, 10.0, true);
    res.push(r);
    var r = new Reservoir(12, "reservoir_lou2ay", 105.0, 10.0, true);
    res.push(r);
    localStorage.setItem("reservoirs", JSON.stringify(res));
    for (var i = 0; i < 11000; i++)
      var x =1;
    }

  users;
  private isOn: boolean;
  private reservoirs: Reservoir[] = [];
  loading: Loading;

  constructor(private nav: NavController, private auth: AuthServiceProvider, public http: Http, private loadingCtrl: LoadingController) {
    // this.getUsers();
    this.isOn = false;
    this.initializeItems();
   
  }

  public getUsers() {
    let headers = new Headers(
      {
        'Authorization' : this.auth.getToken()
      });

    let options = new RequestOptions({ headers: headers });
    // Change to this http://ed43bb3b.ngrok.io/api/users
    let url = 'http://ed43bb3b.ngrok.io/api/users';
    this.http.get(url, options).map(res => res.json()).subscribe(
      data => {
        this.users = data.data;
      }
    );
  }

  public logout() {
    this.auth.logout().subscribe(succ => {
      this.nav.setRoot('LoginPage')
    });
  }
  public toggleDetails() {
    this.isOn = !this.isOn;
    this.initializeItems();
  }

  public iconColor(reservoir: Reservoir) {
    var x = reservoir.Max / 3;
    if (reservoir.Level > 2 * x)
      return "green";
    else if (reservoir.Level < x)
      return "danger";
    else
      return "yellow";
  }
  initializeItems() {
    this.reservoirs = JSON.parse(localStorage.getItem("reservoirs"));
  }
  getItems(ev: any) {

    this.initializeItems();
  
    const val = ev.target.value;
   
    if (val && val.trim() != '') {
      this.reservoirs = this.reservoirs.filter((item) => {
        return (item.Name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  reservoirDetails(id: any) {
    this.nav.push(ReservoirDetailsPage, { id: id });
  }
  refresh() {
    this.showLoading();
    for (var i = 0; i < 100000; ++i)
      ++i;
    this.endLoading();
  }
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
  endLoading() {
    this.loading.dismiss();
  }
  add() {
    this.nav.push(AddReservoirPage);
  }
}
