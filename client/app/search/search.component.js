'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './search.routes';

export class SearchComponent {
	// Instances of global objects
	$http;

	/*@ngInject*/
	constructor($http) {
		this.$http = $http;
	}
  
  $onInit() {
    console.log("AA: "+this.$http);
/*		this.$http.get('/api/polls')
			.then(response => {
				this.polls = response.data;
			});*/
	}

}

SearchComponent.$inject = ['$http'];

export default angular.module('smgNightlifeApp.search', [uiRouter])
  .config(routes)
  .component('search', {
    template: require('./search.html'),
    controller: SearchComponent,
    controllerAs: 'searchCtrl'
  })
  .name;
