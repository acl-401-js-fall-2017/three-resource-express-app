Three Express Single Resources
===

## Description

This assignment has you practice creating full CRUD for a resource using ExpressJS and Mongoose.

Pick three (independent for now) resources, for example `movies`, `actors`, and `studios`.

Create a single overall express app that uses a `lib` folder with a `models` and `routes` folder.

### Middleware

Add the following middleware to your app (use Google and docs if you forget how to use):
* `body-parser` for parsing json body
* `morgan` for logging request
* custom `error-handler` that we wrote in class

### Routes

For _each_ of the three resources (meaning three routes):

* Create a model: 
    * Pick at least one validation that the model will have. 
    * (The model can be simple)
    * Unit test the model showing the model failing validation and test a successful model.
    * Implement the validation
    * For one of your models:
        * Include a complex object property (a property that has subfields, like an address with city, state, zip)
    * For one of your models:
        * Include an array property (a property that holds zero or more of some values)
* Create HTTP REST routes:
    * Write E2E API tests for all of the exposed routes
    * Create a `Router` for the resource that exposes the following routes for the resource:
        * `GET /resources` list ([]) of all the resources
        * `GET /resources/:id` return single resource object with that id (or 404 if doesn't exist)
        * `POST /resources` add a new resource and return new entity from db with _id
        * `DELETE /resource/:id` Delete the resource with that id. Return `{ removed: <result> }` where `<result>`
        is `true` if it was deleted, otherwise `false`.
        * `PUT /resource/:id` The resources is updated, for now we can use the following mongoose approach:
        ```js
        Resource.findByIdAndUpdate(id, req.body, { 'new': true, runValidators: true })
            .then(updated => res.json(updated))
            .catch(next);
        ```

## Bonus

Create static html/css/js files that allow you to exercise some of your API (start with `/GET`)

#### Rubric:

* Three resource *9pts* 
    * Model and Unit Test *1pt* each
    * Route and E2E Test *2pts* each
* Express App: *1pt*
