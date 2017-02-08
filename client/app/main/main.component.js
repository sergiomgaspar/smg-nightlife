import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

/* ****************************************************************** */
/* mainComponent                                                      */
/* Component to handle the visualization venues and goers			        */
/*                                                                    */
/* date: 08/02/2017                                                   */
/* author: sergiomgaspar.dev@gmail.com                                */
/* version: 1.0                                                       */
/* ****************************************************************** */

export class MainController {
  
  $http;
  searchString = '';
  venues = '';
  Auth;
  userID = '';

  /*@ngInject*/
  constructor($http, Auth) {
    this.$http = $http;
    this.Auth = Auth;
  }

  /* Main search - button clicked*/
  newSearch() {
    if (this.searchString.length < 1) return;
    
    console.log("Requesting venues");
    this.$http.get('/api/search/' + this.searchString)
			.then(response => {
            console.log("Recieved venues!!!");
				    this.venues = response.data;
            this.checkUserVenues();               
			});
      this.userID = this.Auth.getCurrentUserSync()._id;
  }

  /* Procedure used to identify if current user is going for each venue returned */
  checkUserVenues() {
    for (var i= 0; i < this.venues.length; i++){
      this.venues[i].userGoing = 'NO';
      for (var j=0; j < this.venues[i].countUsers; j++){
        if (this.venues[i].allUsers[j].userId === this.Auth.getCurrentUserSync()._id) 
          this.venues[i].userGoing = 'YES';
      }
    }
  }

  /* POST indicating current user is going to selected venue */
  goVenue(index){
    if (this.venues[index].userGoing === 'YES') return;
    
    this.venues[index].userGoing = 'YES';
    this.venues[index].countUsers++;
    
    var venueGoer = {
      yelpId: this.venues[index].yelpId, 
      userId: this.Auth.getCurrentUserSync()._id,
      userName: "N/A"
    };

    this.$http.post('/api/search/' , venueGoer)
			.then(function(response) {
					console.log("User going to venue.");
				},
				function(response) { // optional
					console.log("Error while posting event.");
				});
  }

  /* User cancelled previously commited going to venue */
  cancelVenue(index){
    console.log("CANCEL VENUE: "+index);
    if (this.venues[index].userGoing === 'NO') return;
    
    // Decision: dont wait for the callback to change the GUI (assume all goes well)
    var delGoerId = this.getGoedrId(index);
    this.venues[index].userGoing = 'NO';
    this.venues[index].countUsers--;

    this.$http.delete('/api/search/'+delGoerId)
			.then(function(response) {
					console.log("User not going to venue anymore.");
				},
				function(response) { // optional
					console.log("Error while removing event.");
				});
  }

  /* Procedure to get the "going ID" to identify the goer/venue and remove from DB */
  getGoedrId(index) {
    for (var i = 0; i < this.venues[index].countUsers; i++){
      if (this.venues[index].allUsers[i].userId === this.userID)
        return this.venues[index].allUsers[i]._id;
    }
  }
}

/* IMPORTANT: must inject objects below to use http and authentication methods */
MainController.$inject = ['$http', 'Auth'];

export default angular.module('smgNightlifeApp.main', [uiRouter])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController,
		controllerAs: 'mainCtrl'
  })
  .name;

/*
SAMPLE API RESPONSE:
[  { yelpId: 'woof-x-lisboa',
    name: 'Woof X',
    rating: 4,
    url: 'https://www.yelp.com/biz/woof-x-lisboa?adjust_creative=ipsYxhg4ZVjVnpN41rgahw&utm_campaign=yelp_api&utm_medium=api_v2_search&utm_source=ipsYxhg4ZVjVnpN41rgahw',
    imageUrl: 'https://s3-media2.fl.yelpcdn.com/bphoto/ncDpV3H-dbBeHxfqwWdGVw/ms.jpg',
    location: 'Lisboa',
    description: 'Description of venue',
    countUsers: 2,
    allUsers: [ {_id: '123456',
                userId: 'ID',
                userName: 'Name}, 
                {_id: '789012',
                userId: 'ID2',
                userName: 'Name2}] 
} ]
*/