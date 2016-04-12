angular.module('myApp.services',[])

.factory('encodeURIService', function() {

  return{
    encode: function(string) {
      console.log(string);
      return encodeURIComponent(string).replace(/\ /g, "%20").replace(/\ /g, "%22").replace(/[! ' ()]/g, escape);
    }
  };
})

.factory('stockDataServices', function($q, $http, encodeURIService) {

  var getDetailData = function(ticker) {

    var deferred = $q.defer(),
    query = 'select * from yahoo.finance.quotes where symbol IN ("' + ticker + '")',
    url = 'http://query.yahooapis.com/v1/public/yql?q=' + encodeURIService.encode(query) + '&format=json&env=http://datatables.org/alltables.env';

    console.log(url);

    $http.get(url)
      .success(function(json) {
        var jsonData = json.query.results.quote;
        deferred.resolve(jsonData);
      })

      .error(function(error){
        console.log("Details data error:" + error);
        defered.reject();

      });
      return deferred.promise;

  };


  var getPriceData = function(ticker) {

      var deferred = $q.defer(),
      url = "http://finance.yahoo.com/webservice/v1/symbols/" + ticker + "/quote?format=json&view=detail";

    $http.get(url)
      .success(function(json) {
        var jsonData = json.list.resources[0].resource.fields;
        deferred.resolve(jsonData);
      })
      .error(function(error){
        console.log("pricedata error:" + error);
        defered.reject();

      });
      return deferred.promise;
  };

  return {
  getPriceData: getPriceData,
  getDetailData: getDetailData
};

})

;
