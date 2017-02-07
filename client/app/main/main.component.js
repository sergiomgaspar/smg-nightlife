import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';


export class MainController {
  $http;
  searchString = '';
  venues = '';

  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
  }

  newSearch() {
      
    if (this.searchString.length < 1) return;
    console.log("Requesting venues");
    this.$http.get('/api/search/' + this.searchString)
			.then(response => {
                console.log("Recieved venues!!!");
				this.venues = response.data;               
			});
    
  }
}

 
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
    allUsers: [ {userId: 'ID',
                userName: 'Name}, 
                {userId: 'ID2',
                userName: 'Name2}] 
} ]
*/