'use strict';
var app = angular.module('angularApp');

app.controller('clientCtrl', function(clientService, $scope, $state) {
    $scope.editing = false;
    $scope.order = "name";
    $scope.newOrder = function(param) {
        $scope.order = param;
    };
    clientService.getAll()
        .then(stuff => {
        //    console.log(stuff);
            $scope.apiData = stuff;
        });
    $scope.editItem = function(item, itemData) {
        $scope.editing = true;
        $scope.newItem= item.thing;
        $scope.editId = item.id;
        var id =item.id;
    };
   
    $scope.postEdit = function() {

        clientService.editById($scope.editId,$scope.newItem)
            .then($scope.editing = false)
            .then(clientService.getAll()
                .then(stuff => {
                    $scope.apiData = stuff;
                })
        )
    };
   

});

app.controller('propertyCtrl', function(propertyService, $scope, $state) {
    $scope.editing = false;
    $scope.order = "name";
    $scope.currentProperty = '';
    $scope.managed = false;
    $scope.newOrder = function(param) {
        $scope.order = param;
    };
    propertyService.getAll()
        .then(stuff => {
       //    console.log(stuff);
            $scope.apiData = stuff;

        });

    propertyService.getFree()
        .then(tenants=> {
            //  console.log(stuff);
            $scope.freeTenants = tenants.data;
       //     console.log(tenants)

        });

    $scope.getTenants = function(tenants) {
        $scope.managed='true';
        $scope.current = tenants;
        $scope.currentProperty = tenants._id;
        console.log('prop: ', $scope.currentProperty);
        console.log(tenants)

    };
    $scope.moveInTenant = function(client) {
        if ($scope.current.occupants.length < $scope.current.bedrooms) {
            propertyService.moveIn(client._id, $scope.currentProperty);
            $scope.current.occupants.push(client);
            var occ = $scope.freeTenants;
            var ind = occ.indexOf(client);
            occ.splice(ind, 1);
        } else {
            swal({   title: "Too many Tenants!",   text: "Cannot have more tenants than bedrooms! Please move another tenant out first.",   type: "error",   confirmButtonText: "Cool" });
        }
    };
    $scope.moveOutTenant = function(client) {

        propertyService.moveOut(client._id,$scope.currentProperty);
        var occ = $scope.current.occupants;
        var ind = occ.indexOf(client);
        occ.splice(ind, 1);
        $scope.freeTenants.push(client);
    };
    $scope.doneManaging = function() {
        $scope.managed=false;
    }

});
app.controller('editPropertyCtrl', function(propertyService, $scope, $state) {


    propertyService.getById($state.params.id)
        .then(stuff => {
            console.log(stuff);
            $scope.property = stuff.data;
            $scope.newType = stuff.data.type;
            $scope.newLocation = stuff.data.location;
            $scope.newPrice = stuff.data.price;
            $scope.newBedroom = stuff.data.bedrooms;
            $scope.newBathroom = stuff.data.bathrooms;
            $scope.newFeatures = stuff.data.features;
        });



    $scope.postEdit = function() {
       var newProperty = {
            type : $scope.newType,
            price : $scope.newPrice,
            location : $scope.newLocation,
            bedroom : $scope.newBedroom,
            bathroom : $scope.newBathroom,
            features : $scope.newFeatures
        };
        propertyService.editById($scope.property._id,newProperty)
            .then(propertyService.getAll()
                .then(stuff => {
                    $scope.apiData = stuff;
                })
            )
    }


});

app.controller('editClientCtrl', function(clientService, $scope, $state) {


    clientService.getById($state.params.id)
        .then(stuff => {
        //    console.log(stuff);
            $scope.client = stuff.data;
            $scope.newName = stuff.data.name;
            $scope.newLocation = stuff.data.location;
            $scope.newPrice = stuff.data.pricerange;
            $scope.newPhone = stuff.data.phone;
            $scope.newEmail = stuff.data.email;
            $scope.newFeatures = stuff.data.features;
        });



    $scope.postEdit = function() {
        var newProperty = {
            name : $scope.newName,
            price : $scope.newPrice,
            location : $scope.newLocation,
            phone : $scope.newPhone,
            email : $scope.newEmail,
            features : $scope.newFeatures
        };
        clientService.editById($scope.client._id,newProperty)
                .then(stuff => {
                    $scope.apiData = stuff;
                })

    }


});

app.controller('clientDelete', function(clientService, $scope, $state) {
    clientService.deleteById($state.params.id)
        .then($state.go('home'));

});
app.controller('propertyDelete', function(propertyService, $scope, $state) {
    propertyService.deleteById($state.params.id)
        .then($state.go('home'));

});
app.controller('state1Ctrl', function(clientService, $scope, $state) {
  
    $scope.newClient = function(){
        var newData = {
            name: $scope.newName,
            phone: $scope.newPhone,
            location: $scope.newLocation,
            email: $scope.newEmail,
            pricerange: $scope.newPrice,
            features: $scope.newFeatures
        };
        clientService.create(newData)
            .then($state.go('state4'));

    }
    
});

app.controller('state2Ctrl', function(myService, $scope) {
   // console.log('state2Ctrl');
    
});

app.controller('homeCtrl', function($scope) {
  //  console.log('state3Ctrl');
});

app.controller('state4Ctrl', function(myService, $scope) {
   // console.log('state4Ctrl');
});

app.controller('state5Ctrl', function(propertyService, $scope, $state) {
    console.log('state5Ctrl');
    $scope.newProperty = function(){
        var newData = {
            type: $scope.newType,
            bedroom: $scope.newBedroom,
            location: $scope.newLocation,
            bathroom: $scope.newBathroom,
            price: $scope.newPrice,
            features: $scope.newFeatures
        }
        propertyService.create(newData)
            .then($state.go('state5'));

    }
});
app.controller('propStatsCtrl', function(propertyService, clientService, $scope, $state) {

    clientService.getAll()
        .then(clients => {
          //  console.log("clients: ", clients);
            $scope.clientTotals = clients;
            var totprice = 0;
            for (var a=0; a< clients.data.length; a++){
                if (clients.data[a].location != undefined) {
                    totprice = totprice + clients.data[a].location.price
                }
            }
           $scope.totalIncome = totprice;
        });

    propertyService.getAll()
        .then(props => {
          //  console.log("props: ", props);
            $scope.propsTotals = props;
            propertyService.getRentals()
                .then(props => {
               //     console.log("prop rentals: ", props);
                    $scope.propRentals = props;
                    $scope.rented = $scope.propsTotals.data.length - $scope.propRentals.data.length;
                });
        });
   
    
});