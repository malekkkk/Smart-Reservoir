import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';
import { User } from '../../models/users'

/**
 * Generated class for the AddReservoirPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-reservoir',
  templateUrl: 'add-reservoir.html',
})
export class AddReservoirPage {

  listOfUsers: User[]
  listOfFiltredUsers: User[]
  addCredentials = { name: '', max: '' };
  loading: Loading;


  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
    this.initializeItems();
  }
  initializeItems() {
    this.listOfUsers = JSON.parse(localStorage.getItem("users"));
    this.listOfFiltredUsers = this.listOfUsers;
  }
  ionViewDidLoad() {
    var l: User[] = [];
    var x: User;
    x = new User(1, "malek.jerbi@supcom.tn", false);
    l.push(x);
    x = new User(2, "zied.dammak@supcom.tn", false);
    l.push(x);
    x = new User(3, "oussema.jerbi@supcom.tn", false);
    l.push(x);
    x = new User(4, "foulenBenFoulen@supcom.tn", false);
    l.push(x);
    x = new User(5, "arthur@gmail.com", false);
    l.push(x);
    x = new User(6, "hajer.dammak@gmail.com", false);
    l.push(x);
    x = new User(7, "foulenbenfoulen@supcom.tn", false);
    l.push(x);
    x = new User(8, "fakhri.segni@yahoo.fr", false);
    l.push(x);
    x = new User(9, "malek@yopmail.com", false);
    l.push(x);
    x = new User(10, "adam@supcom.tn", false);
    l.push(x);
    x = new User(11, "malek.jerbi@supcom.tn", false);
    l.push(x);
    localStorage.setItem("users", JSON.stringify(l));
    console.log("hello !!");
  }
  add() {
    if (this.addCredentials.name.length < 6)
      this.showPopup("Error", "Reservoir name should contain at list 6 characters ...")
    else {
    var x: User[] = this.listOfUsers.filter((item) => {
      return (item.IsChecked == true);
    })
    for (var i = 0; i < x.length; ++i)
      console.log(x[i].Mail);
    }
  }
  getItems(ev: any) {

    this.listOfFiltredUsers = this.listOfUsers;

    const val = ev.target.value;

    if (val && val.trim() != '') {
      this.listOfFiltredUsers = this.listOfUsers.filter((item) => {
        return (item.Mail.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
  checkItemState(id) {
    var arrayIndex = this.listOfUsers.findIndex(r => r.Id == id);
    this.listOfUsers[arrayIndex].IsChecked = !this.listOfUsers[arrayIndex].IsChecked;
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
  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: 'OK',
        }
      ]
    });
    alert.present();
  }
  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Confirm purchase',
      message: 'Do you want to buy this book?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Buy',
          handler: () => {
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }
}
