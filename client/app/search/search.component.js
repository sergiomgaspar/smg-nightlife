'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './search.routes';

export class SearchComponent {
  /*@ngInject*/
  constructor() {
    this.message = 'Hello';
  }
}

export default angular.module('smgNightlifeApp.search', [uiRouter])
  .config(routes)
  .component('search', {
    template: require('./search.html'),
    controller: SearchComponent,
    controllerAs: 'searchCtrl'
  })
  .name;
