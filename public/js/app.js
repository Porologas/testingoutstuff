App = Ember.Application.create({


  // // When everything is loaded.
  // ready: function() {

  //   // Start polling Twitter
  //   setInterval(function() {
  //     App.EmpController.refresh();
  //   }, 2000);

  //   // The default search is empty, let's find some cats.
  //   App.EmpController.set("query", "Aa");


  //}
});

App.Store = DS.Store.extend({
  revision: 12,
  // adapter: DS.FixtureAdapter.create()
  adapter: DS.RESTAdapter
  //.extend({ url: 'http://localhost:3000'})
});

// App.EmployeesListController = Ember.Controller.extend();
// App.EmployeesListView = Ember.View.extend({ templateName: 'employees' });

// App.Employee = Ember.Object.extend();
// App.Employee.reopenClass({
//   find: function(){
//      //not implemented yet 
//   },
//   findAll: function(){
//       var content = [];
//       $.ajax({
//       url: 'http://dev.secureservices.neudesic.com/Beta/AuthWindows/Test/api/employees',
//       dataType: 'jsonp',
//       success: function(response){
//         response.data.forEach(function(employee){
//           content.addObject(App.Employee.create(employee))
//         }, this)
//       }
//     });
//     return content;
//   }
// });

App.Router.map(function() {
  this.resource('employees');
  this.resource('assets', function(){
    this.resource('asset', { path: ':assets_id' })
  });
});

// App.SearchController = Ember.ArrayController.create();



// App.SearchController = Ember.ArrayController.extend({
//   searchText: null,

//   searchResults: function(){
//     var searchText = this.get('searchText');
//     if(!searchText){return;}

//         $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
//         options.xhrFields = {
//             withCredentials: true // required for NTLM authentication to work.
//         };
//     });

//    return  $.get("http://dev.secureservices.neudesic.com/REST/api/assetemployees?callback=?", function(response) {
      

//    });

//   }.property('searchText')
// });





//App.EmployeesListController = Ember.Controller.extend();
//App.EmployeesListView = Ember.View.extend({ templateName: 'employees' });

App.Emp = Ember.Object.extend();

App.EmpController = Ember.ArrayController.create({
  content:[],
  query: null,
  _idCache: {},
  addEmp: function(emp){
      var id = emp.get("EmployeeID");

      if (typeof this._idCache[id] === "undefined"){
        this.pushObject(emp);
        this._idCache = emp.EmployeeID;
      }
  },
  refresh: function(){
    var query = this.get("query");

    if(Ember.isEmpty(query)){
      this.set("content",[]);
      return;
    }

    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        options.xhrFields = {
            withCredentials: true // required for NTLM authentication to work.
        };
    });

    var self = this;
    var url = "http://dev.secureservices.neudesic.com/REST/api/assetemployees?name=" + query + "&callback=?";
    $.get(url,function(response){
        var x = response;
        for(var i = 0; i < response.length; i++){
           self.addEmp(App.Emp.create(response[i]));
        }
    });

  }.observes("query")
});



App.TestController = Ember.Controller.extend({
  query: null,
  searchResults1: function(){
    return ["one", "two", "three"].filter(function(value) {
      return value.match("tw");
    });
  }.property("query1")
});

App.AutocompleteController = Ember.Controller.extend({
  searchResults: function() {
    var searchText = this.get("searchText");
    if(!searchText) return;

    //App.EmpController.set("query", searchText);
    //App.EmpController.refresh();
 
    var regex = new RegExp(searchText, "i");
     return ["one", "two", "three"].filter(function(value) {
       return value.match(regex);
     });

  }.property("searchText")
});



App.Employee = Ember.Object.extend();

App.Employee.reopenClass({
  findAll: function(searchString) {

    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        options.xhrFields = {
            withCredentials: true // required for NTLM authentication to work.
        };
    });

    var result = Ember.ArrayProxy.create({
      content: [],
      isLoaded: false
    });

    return $.get("http://dev.secureservices.neudesic.com/REST/api/assetemployees?name=" + searchString, function(response) {

      result.setProperties(response);
      result.set('isLoaded', true);
      //employee.set('data', response);
      return result;
    });
  }
});




// App.IndexRoute = Ember.Route.extend({
//   model: function() {
//     return ['red', 'yellow', 'blue'];
//   }
// });

// App.AssetsRoute = Ember.Route.extend({
//    model: function(){
//     return App.Asset.find();
//    }
//  });


App.EmployeesRoute = Ember.Route.extend({
  model: function(){
    return App.Employee.findAll();
  },
  setupController: function (controller, model){
    controller.set('content', model);
  }
});




// App.Employee = DS.Model.extend({
//   EmployeeID: DS.attr('number'),
//   FullName: DS.attr('string'),
//   FirstName: DS.attr('string'),
//   LastName: DS.attr('string'),
//   Login: DS.attr('string'),
//   PracticeID: DS.attr('number'),
//   PracticeName: DS.attr('string'),
//   RegionID: DS.attr('number'),
//   RegionName: DS.attr('string'),
//   FullNameWithRegion: DS.attr('string'),
//   FullNameWithRegionAndPractice: DS.attr('string')
// });

//Required
App.Asset = DS.Model.extend({
      assetnumber : DS.attr('number'),  
      equipmentid : DS.attr('number'),
      manufacturerid : DS.attr('number'), 
      modeltype : DS.attr('string'),   
      serialnumber : DS.attr('string'), 
      servicetag : DS.attr('string'),
      servicecode : DS.attr('string'),
      locationid : DS.attr('number'), 
      description : DS.attr('string'),
      purchasedate : DS.attr('date'),
      statusid : DS.attr('number'), 
      warrantystartdate : DS.attr('date'),
      warrantyenddate : DS.attr('date'),
      leasestartdate : DS.attr('date'),
      leaseenddate : DS.attr('date'),
      leasecontractnumber : DS.attr('string'),  
      needsretrieval : DS.attr('boolean'),
      leaseid : DS.attr('number'),  
      retrievaldate : DS.attr('date'),
      ponumber : DS.attr('string'), 
      isleased : DS.attr('boolean')
});

// App.Asset.FIXTURES = [{
//   id: 1,
//   assetnumber: 4555555555,
//   equipmentid: 5,
// },
// {
//   id: 2,
//   assetnumber: 4555555555,
//   equipmentid: 5,
// }
// ]

Ember.Handlebars.registerBoundHelper('dateUnixConvert', function(unixDate) {
  return moment.unix(unixDate).fromNow();
});

// App.User.FIXTURES = [{
// 	id:1,
// 	fullname: "Hello World",
// 	userdesignation: "blah",
// 	phone: "some numbers"
// }, {
// 	id:2,
// 	fullname: "22222Hello World",
// 	userdesignation: "2222blah",
// 	phone: "22222 some numbers"
// }];