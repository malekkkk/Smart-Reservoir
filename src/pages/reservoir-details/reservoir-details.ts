import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Reservoir } from '../../models/reservoir';

/**
 * Generated class for the ReservoirDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reservoir-details',
  templateUrl: 'reservoir-details.html',
})
export class ReservoirDetailsPage {
  reservoirs: Reservoir[];
  arrayIndex: number;
  step: number;
  res: Reservoir;
  
  brightness: number = 20;
  contrast: number = 0;
  level: number;
  structure: any = { lower: 33, upper: 60 };
  text: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.reservoirs = JSON.parse(localStorage.getItem("reservoirs"));
    var id = this.navParams.get('id');
    this.arrayIndex = this.reservoirs.findIndex(r => r.Id == id);
    this.initializeItem();
  }
  initializeItem() {
    this.res = this.reservoirs[this.arrayIndex];
    this.step = this.res.Max / 30.0;
    this.level = this.res.Level;
  }
  get color() {
    var x = this.res.Max / 3;
    if (this.res.Level > 2 * x)
      return "green";
    else if (this.res.Level < x)
      return "danger";
    else
      return "yellow";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReservoirDetailsPage');
  }
  back() {
    this.navCtrl.pop();
  }
  changeRange(valor) {
    console.log(valor.value);
    valor.value = this.res.Level;
  }

  changePumpState() {
    this.res.PompeState = !this.res.PompeState;
  }
  next() {
    this.arrayIndex = (this.arrayIndex + 1) % this.reservoirs.length;
    this.initializeItem();
  }
  previous() {
    this.arrayIndex = this.arrayIndex - 1;
    if (this.arrayIndex < 0)
      this.arrayIndex = this.reservoirs.length - 1;
    this.initializeItem();
  }
}
