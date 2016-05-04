'use strict';

var app = angular.module('angularApp', ['ui.router']);
app.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        
        .state('addProperty', {
            url: '/addproperty/',
            templateUrl: '/html/state5.html',
            controller: 'state5Ctrl'
        })

        .state('clientDelete', {
            url: '/delete/:id',
            templateUrl: '/html/home.html',
            controller: 'clientDelete'
        })
        .state('propertyDelete', {
            url: '/delete/:id',
            templateUrl: '/html/home.html',
            controller: 'propertyDelete'
        })
        .state('state1', {
            url: '/state1/',
            templateUrl: '/html/state1.html',
            controller: 'state1Ctrl'
        })
        .state('state2', {
            url: '/state2/',
            templateUrl: '/html/state2.html',
            controller: 'state2Ctrl'
        })
        .state('home', {
            url: '/',
            templateUrl: '/html/home.html',
            controller: 'homeCtrl'
        })
        .state('state4', {
            url: '/state4/',
            templateUrl: '/html/clients.html',
            controller: 'clientCtrl'
        })
        .state('state5', {
            url: '/state5/',
            templateUrl: '/html/properties.html',
            controller: 'propertyCtrl'
        })
        .state('editProperty', {
            url: '/property/edit/:id',
            templateUrl: '/html/editProperty.html',
            controller: 'editPropertyCtrl'
        })
        .state('editClient', {
            url: '/client/edit/:id',
            templateUrl: '/html/editClient.html',
            controller: 'editClientCtrl'
        })



    $urlRouterProvider.otherwise('/');

})
