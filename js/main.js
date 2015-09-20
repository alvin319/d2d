var dtd = angular.module('d2d', ['ngAnimate', 'ui.bootstrap', 'angularParse', 'ngRoute']);
Parse.initialize("wUqVebZ3FMEK8HkKFNK2fhkN3FCRv8nn5ppC2JmC", "n73GPslnRXa9oQ7tNPvEYQ4WKtWkFA6lFXMyNuNg");

dtd.controller("mainCtrl", ['$scope', '$location', '$http', '$modal', '$timeout', '$route', '$routeParams', 'parsePersistence', 'parseQuery', function($scope, $location, $http, $modal, $timeout, $route, $routeParams, parsePersistence, parseQuery){
  // $scope.id = $routeParams.id;
  // console.log($scope.id);
  $scope.projects = [{
    'donationId': 1,
    'amountNeeded': 150,
    'amountSofar': 100,
    'doctorName': 'Padina Apam',
    'location': 'Ashanti, Ghana',
    'imgLocation': 'img/padina-screen.jpg',
    'money_description':'$280 to equip 1 Community Health Worker with essential medication and supplies. ',
    'treatment_description': 'Community Health Workers will be equipped with essential medication and supplies enabling them to treat women and children with critical illnesses including malaria, diarrhea, malnutrition, and pneumonia. These items make the difference between leading a productive life or being held back with increasingly serious medical conditions.',
    'focus': 'Health Kits Focus',
    'breakdown': [
      {'value': 71,
      'type': 'danger',
      'description': 'Essential medical and logistical supplies including e.g. soap, stationery (counseling cards and job aids), a thermometer, respiratory timer, water jugs and a backpack.'
    },{
        'value': 29,
        'type': 'success',
        'description':'Critical medication including medicines to treat diarrhea, malaria, pneumonia, malnutrition and care for pregnant mothers.'
      }
    ],
    'cashtag': 'fear',
    'type': 'success',
    'value': 40,
    'breakdown_txt': '71%: Essential medical and logistical supplies including e.g. soap, stationery (counseling cards and job aids), a thermometer, respiratory timer, water jugs and a backpack. 29%: Critical medication including medicines to treat diarrhea, malaria, pneumonia, malnutrition and care for pregnant mothers.'
  },{
    'donationId': 2,
    'amountNeeded': 1,
    'amountSofar': 1,
    'doctorName': 'Dr. Shukri and Dr. Naima',
    'location': 'Hargeisa, Somaliland ',
    'imgLocation': 'img/doctor-shukri.png',
    'description': 'My name is Dr. Shukri Mohamed Dahir and sitting next to me is Dr. Naima Ahmed Mohamed. We are both doctors: we went to Medical School together and are now working as a &hellip;',
    'focus': 'Birth Injuries Focus',
    'treatment_description': 'Our focus is on providing safe births and caesarean sections for mothers. In Somaliland most mothers do not receive prenatal care. As a result, they often have unknown problems such as anemia, diabetes or hypertension that go untreated. Sometimes more serious issues develop, such as obstructed labor; in these cases, we do a surgical procedure known as a caesarian section, which involves making an incision through the mother\'s abdomen to deliver the baby.',
    'cashtag': 'fear',
    'type': 'success',
    'value': 50,
    'breakdown_txt':'Operation - 19%, Medication,dressings - 19%, Hospital stay (8 days) - 9%, Lab tests, screening, grouping - 6%',
    'breakdown': [{
        'value': 47,
        'type': 'info'
      }, {
        'value': 19,
        'type': 'danger'
      }, {
        'value': 19,
        'type': 'warning'
      }, {
        'value': 9,
        'type': 'success'
      }, {
        'value': 6,
        'type': 'info'
      }
    ]
  }
  ];

    function makePieChart (project) {
        var breakdown = project.breakdown;
        var data = [];
        breakdown.forEach(function(element, index, array) {
            data.push({'label': element.type, 'value': element.value});
        });

        var width = 400, height = 400, r = height / 2;
        var color = d3.scale.category20c();

        var vis = d3.select('#pie_chart')
                    .append('svg:svg')
                    .data([data])
                        .attr('width', width)
                        .attr('height', height)
                    .append('svg:g')
                        .attr('transform', 'translate(' + 200 + ',' + 200 +')');

        var arc = d3.svg.arc().outerRadius(r);
        var pie = d3.layout.pie().value(function(d) {
            return d.value;
        });

        var arcs = vis.selectAll('g.slice')
                        .data(pie)
                        .enter()
                            .append('svg:g')
                                .attr('class', 'slice');

        arcs.append('svg:path')
            .attr('fill', function(d, i) {
                return color(i);
            })
            .attr('d', arc);

        arcs.append('svg:text')
            .attr('transform', function(d) {
                d.innerRadius = 0;
                d.outerRadius = d;
                return "translate(" + arc.centroid(d) + ")";
            })
            .attr('text-anchor', 'middle')
            .text(function(d, i) {
                return data[i].label;
            });
    }
    makePieChart($scope.projects[0]);

  $scope.updateProgressBar = function() {
    var types = ['danger','warning','info','success'];
    for (project in $scope.projects) {
      project.value = Math.floor(project.amountSofar / project.amountNeeded * 100);
      project.type = types[Math.floor(project.value/25)];
    }
  };
  $scope.updateProgressBar();

  $scope.getCurrentAmount = function() {
    var query = parseQuery.new('Donation');
    parseQuery.find(query)
    .then(function(results) {
      for(var i = 0; i < results.length; i++) {
        for(project in $scope.projects) {
          if(project == (results[i].attributes.donationId - 1)) {
            $scope.projects[project].amountSofar = results[i].attributes.currentAmount;
            $scope.projects[project].amountNeeded = results[i].attributes.expectedAmount;
          }
        }
      }
    });
  };
  $scope.getCurrentAmount();

  $scope.openDonate = function (dId) {
      console.log(dId);
      $location.url('/donations/'+ dId);
      // $modal.open({
      //     templateUrl: 'donate_template.html',
      //     backdrop: true,
      //     windowClass: 'modal',
      //     controller: function ($scope, $modalInstance, $log, $http) {
      //        $scope.cvc = '';
      //        $scope.cardNumber = '';
      //        $scope.Expiry = '';
      //        $scope.submit = function () {
      //           $http.post({
      //             'cvc':'asdf'
      //           })
      //           $modalInstance.dismiss('cancel');
      //        }
      //        $scope.cancel = function () {
      //           $modalInstance.dismiss('cancel');
      //        };
      //     }
      // });
  };
  $scope.open = function () {
    console.log("work");
  var modalInstance = $modal.open({
    animation: $scope.animationsEnabled,
    templateUrl: 'registration.html',
    resolve: {
      items: function () {
        return $scope.items;
      }
    }
  })};
  $scope.updateProgressBar = function() {
    var types = ['danger','warning','info','success'];
    for (project in $scope.projects) {
      $scope.projects[project].value = Math.floor($scope.projects[project].amountSofar / $scope.projects[project].amountNeeded * 100);
      $scope.projects[project].type = types[Math.floor($scope.projects[project].value/25)];
    }
  };
  $timeout($scope.updateProgressBar, 300);
}]);

// .config(function($routeProvider) {
//   'use strict';
//   $routeProvider
//     .when('/donations/:id', {
//       templateUrl: 'submitDonations.html',
//       controller: 'mainCtrl'
//     })
//     .otherwise({
//       redirectTo: '/'
//     });
// });
