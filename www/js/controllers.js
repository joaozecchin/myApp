angular.module('myApp.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('myStocksCtrl', ['$scope',
  function($scope) {

  $scope.myStocksArray = [
    {ticker:"TSLA"},
    {ticker:"GOOG"},
    {ticker:"FB"},
    {ticker:"MSFT"},
    {ticker:"AAPL"},
    {ticker:"PBR"},
    {ticker:"PETR4.SA"},
    {ticker:"VALE5.SA"}

  ];
}])

.controller('stockCtrl', ['$scope', '$stateParams', 'stockDataServices',
function($scope, $stateParams, stockDataServices) {

  // // http://finance.yahoo.com/webservice/v1/symbols/GOOG/quote?format=json&view=detail
  //
  // $http.get("http://finance.yahoo.com/webservice/v1/symbols/GOOG/quote?format=json&view=detail")
  //   .then(function(jsonData) {
  //     console.log(jsonData.data.list.resources[0].resource.fields);
  //   });

  $scope.ticker = $stateParams.stockTicker;
  $scope.chartView = 1;

  $scope.$on("$ionicView.afterEnter", function(){
    getPriceData();
    getDetailData();
  });

  $scope.chartViewFunc = function(n) {
    $scope.chartView = n;
  };

  function getPriceData(){

    var promise = stockDataServices.getPriceData($scope.ticker);

    promise.then(function(data){
      console.log(data);
      $scope.stockPriceData = data;
    });
  }

  function getDetailData(){

    var promise = stockDataServices.getDetailData($scope.ticker);

    promise.then(function(data){
      console.log(data);
      $scope.stockDetailsData = data;
    });
  }

}]);
