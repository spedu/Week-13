# Week 13: Node and Express and Angular's $resource
*because, just because*

## A Simple Server
*the most basic express application*

1. Install express on the server's package.json
  * `npm install express`
2. Require express
  * `var express = require('express');`
3. Create an express "app"
  * `var app = express();`
4. Use the app to create a route to the root ('/')

```
app.get('/', function(req, res) {
  res.send('okay, yeah');
});
```

Note: `res.send(something)` is just an express wrapper for `res.end(something)`, so it's doing a `write(something)` followed by an `end()`. It also does some encoding and status code checks.

## Send as json
*together*

1. Take the array from the `ListController` in the angular app
  * `var people = [ ... ];`
2. Send the json
  * `app.send(people);`
  * `app.send(JSON.stringify(people));``
2. Use `app.json()` to "send" the array
  * `app.json(people);`
  * browsers are probably all smart enough to detect when you're sending json, but it's nice to be explicit
3. Check it in a browser

## Logging Middleware
*together*

1. Use an anonymous function before any routes
  * `app.use(function(req, res){ ... })`
  * this is a pipeline for the request and response streams
  * the function will require a `next();` function if you want anything to happen after it
  * if you place it after any routes, it will never run
2. Console log the `date`, the `method` and the `url`
  * `console.log((new Date()).toString() + " " + req.method + " " + req.url)`

Note: This is not a great logging solution, it's not handling errors or status codes. For that you'll want a real express middleware logging solution. It's just logging is such a nice and easy thing to show you some easy middleware.

## Routing
*together*

1. Create a route for a listing
  * `app.get('/people', function(req, res){ ... });`
  * the root route is fine for us right now, but it's not RESTful
  * RESTful does have a few rules, like
2. Send the data
  * `res.send(JSON.stringify(people));`
3. That will work, but there's a convenience method in express for this
  * `res.json(people);`

## An Angular app for this!
*together*

1. Look at the angular app
2. Run the angular app
  * `npm install`
  * `gulp`

## `$resource` service
*together*

1. Add ng-resource to the project
  * `bower install angular-resource`
2. Include it as a dependency on the app (in app.js)
  * `angular.module('resthitter', ['ui.bootstrap', 'ngRoute', 'ngResource']).config({ ... });`
3. Create a `People` service
  * create a new file under the services directory, `People.js`
  * these are normally created as factories
  * `angular.module('resthitter').factory('People', ['$resource', function($resource){ ... }]);`
4. Add the `$resource` dependency
  * `$resource` is a wrapper for `$http`
    * it is meant to allow you to easily set up hitting restful APIs
    * it has 4 main functions: `query()`, `get()`, `save()`, and `delete()` (and `remove()`)
    * these map to the primary RESTful methods you'll be using (`GET` all, `GET` a single, `POST` a new entry or change, and `DELETE` a single
    * [$resource docs](https://docs.angularjs.org/api/ngResource/service/$resource)
5. Return a `$resource` object
  * `return $resource('http://localhost:7000/people/:id');`
  * Note: the full url that can be parsed internally by `$resource` to give it the right urls for each RESTful action
  * Also note: `$resource` is as simple as it can be out of the box, but you can extend it to whatever you need, (for example, [if you need it to make a `PUT` request against an API](https://docs.angularjs.org/api/ngResource/service/$resource#creating-a-custom-put-request))

## Use that service in the `ListController`
*together*

1. Inject `People` into `ListController`
2. Use `People.query();`
  * `var people = People.query();`
3. Check your network activity in the browser and you will see it made a request
4. Make the edits to have that data display in the template's `ng-repeat`

## Add CORS to your API with middleware
*together*

1. Create a new middleware option
  * `app.use(function(req, res){ ... });`
2. Add the following two headers:
  * `res.header("Access-Control-Allow-Origin", "*");`
  * `res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");`
3. Call `next();` to pass it through to the next middleware
  * `next();`

Note: [Cross Origin Resource Sharing](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) is the most accepted way to subvert the [Single Origin Policy](https://en.wikipedia.org/wiki/Same-origin_policy), which is a security policy to prevent malicious actions. It's up to the server, and it's generally accepted that you're not going to be allowing * unless you're a truly public API -- usually a read-only API will do that. Usually people will at least limit the sharing to *.domain.com.

## Fill out the Detail page
*together*

1. Get the value of the current page's id from the `$routeParams`
  * inject `$routeParams`
  * current `id` is `$routeParams.id`
    * it's getting this from the `$routeProvider` config in app.js
2. Set the value of the person variable to the `$resource.get()` for the current id
  * `var person = People.get({id: $routeParams.id})`
  * that object parameter is the parameter set in the $resource definition in the service
  * so it's equivalent to sending a `GET` request to: `http://localhost:7000/people/1`
3. Make sure the appropriate value gets displayed on the template

## Save an edit
*together*

1. Since we're using [xeditable](http://vitalets.github.io/angular-xeditable/) we have some directives available to us
  * add the attribute `editable-text` to the name and email texts
  * use them the same way you would use `ng-model`
  * `<h1 editable-text="dc.person.name">{{ dc.person.name }}</h1>`
  * Hint: wrap the editable field in a `<span>` to avoid the line across the page
2. Create a save button
  * use `ng-click` to have that button call a save function in your controller
3. You can call a save directly from the existing `$resource` you got from the `.get()` in that controller
  * `dc.person.$save();`
  * Note: this returns a promise, so we can chain it with a `.then(success, failure);`
  * use this `success` function to console log something to let us know if we're succeeding!
```
dc.person.$save().then(function(){
 console.log("success!");
});
```

Note: this can also be done with a call to the `$resource` factory
  * `Name.save({}, dc.person, function(){ console.log("success!"); });`
  * where the first param is `$resource` params
  * the second param is the `POST` body
    * in this case, we're posting the json for the `person`
  * the third param is a success callback

## Set up the post on the server
*together*

1. Set up an `app.post` for the `/people` route
  * `app.post('/people', function(req, res){ ... });`
2. Install `body-parser`
  * `npm install body-parser`
  * this is express middleware
  * we need this to get the `POST` data
3. Require the body-parser
  * `var bodyParser = require('body-parser');`
4. Use the body-parser to parse for json
  * `app.use(bodyParser.json());`
  * now in our routes, `req.body` has been populated with parsed json, assuming that's what was posted
5. Get the `person` object from `req.body`
  * var person = req.body;

## Find and update the `person` in the `people` array
*on your own*

1. Loop through the array in some way (`for()` or `.forEach()` or whatever)
2. Find the match on `id`
3. Set that index to the post data we just got
4. Don't forget to end the response!
  * `res.end();`

## Redirect to the List
*together*

1. Inject the `$location` service to `DetailController`
  * `.controller('DetailController', ['People', '$location', function(People, $location){ ... }]);`
  * `$location` is an angular wrapper for `window.location`
2. Use the `.then()` promise chained success function to change the location
  * `$location.path('/');`

## Download Postman
*together*

1. Google postman while in chrome
  * Postman is a chrome app/extension
2. Use it to ping the server we have now
