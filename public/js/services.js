'use strict';

var app = angular.module('angularApp');

app.service('clientService',function($http) {
    this.getAll = () => {
        return $http.get('./api/clients');
    };
    this.create = newPost => {
       // console.log(newPost)
        return $http.post('./api/clients', {name: newPost.name,
        phone: newPost.phone, email: newPost.email, location: newPost.location,
        pricerange: newPost.pricerange, features: newPost.features});
    };
    this.deleteById = id => {
        return $http.delete(`./api/clients/${id}`);
    };
    this.getById = id => {
        return $http.get(`./api/clients/${id}`);
    };
    this.editById = (id, newPost) => {
        return $http.put(`./api/clients/${id}`, {name: newPost.name,
            phone: newPost.phone, email: newPost.email, location: newPost.location,
            pricerange: newPost.pricerange, features: newPost.features});
    }


});

app.service('propertyService',function($http) {
    this.getAll = () => {
        return $http.get('./api/properties');
    };
    this.getFree = () => {
        return $http.get('./api/clients/nohome/client');
    };
    this.moveIn = (clientId,propertyId) => {
        return $http.put(`./api/clients/${clientId}/moveIn/${propertyId}`);
    };
    this.moveOut = (clientId,propertyId) => {
        return $http.put(`./api/clients/${clientId}/moveOut/${propertyId}`);
    };
    this.create = newPost => {
         console.log(newPost)
        return $http.post('./api/properties', {type: newPost.type,
            location: newPost.location, bedrooms: newPost.bedroom, bathrooms: newPost.bathroom,
            price: newPost.price, features: newPost.features});
    };
    this.deleteById = id => {
        return $http.delete(`./api/properties/${id}`);
    };
    this.getById = id => {
       // console.log(id);
        return $http.get(`./api/properties/${id}`);
    };
    this.editById = (id, newPost) => {
        console.log(id);
        return $http.put(`./api/properties/${id}`, {type: newPost.type,
            location: newPost.location, bedrooms: newPost.bedroom, bathrooms: newPost.bathroom,
            price: newPost.price, features: newPost.features});
    }


});