var dtd = angular.module('d2d', ['ngAnimate', 'ui.bootstrap']);

dtd.controller("mainCtrl", ['$scope', '$location', '$http', function($scope, $location, $http){
  $scope.projects = [{
    'amountNeeded': 290,
    'amountSofar': 0,
    'location': 'Ashanti, Ghana',
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
    'value': '40',
    'breakdown_txt': '71%: Essential medical and logistical supplies including e.g. soap, stationery (counseling cards and job aids), a thermometer, respiratory timer, water jugs and a backpack. 29%: Critical medication including medicines to treat diarrhea, malaria, pneumonia, malnutrition and care for pregnant mothers.'
  },{
    'amountNeeded': 425,
    'amountSofar': 313,
    'location': 'Hargeisa, Somaliland ',
    'description': 'My name is Dr. Shukri Mohamed Dahir and sitting next to me is Dr. Naima Ahmed Mohamed. We are both doctors: we went to Medical School together and are now working as a &hellip;',
    'focus': 'Birth Injuries Focus',
    'treatment_description': 'Our focus is on providing safe births and caesarean sections for mothers. In Somaliland most mothers do not receive prenatal care. As a result, they often have unknown problems such as anemia, diabetes or hypertension that go untreated. Sometimes more serious issues develop, such as obstructed labor; in these cases, we do a surgical procedure known as a caesarian section, which involves making an incision through the mother\'s abdomen to deliver the baby.',
    'cashtag': 'fear',
    'type': 'success',
    'value': '50',
    'breakdown_txt':'Operation. 19%: Medication &amp; dressings. 19%: Hospital stay (8 days). 9%: Lab tests, screening, grouping &amp; X-matching. 6%: Anesthesia.',
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

  $scope.updateProgressBar = function() {
    var types = ['danger','warning','info','success'];
    for (project in $scope.projects) {
      project.value = Math.floor(project.amountSofar / project.amountNeeded * 100);
      project.type = types[Math.floor(project.value/25)];
    }
  };
  $scope.updateProgressBar();
}]);
