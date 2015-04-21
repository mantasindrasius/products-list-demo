## Product list demo

Simple walking skeleton app to show the test infrastructure for a client project.

### Build it

 - Install `sbt`, `node`, `npm`
 - Checkout `git@github.com:mantasindrasius/scala-e2e-js-testkit.git`
 - Run `sbt test package publish-local`
 - Checkout this project: `git@github.com:mantasindrasius/products-list-demo.git`
 - Run `sbt test one-jar`
 - Run `npm install`
 - Run `gulp` to pass the tests
 - Run `gulp ready-server` and open the app in the browser http://localhost:9999/index.html
 - In another tab run `gulp run-contract` to fill some data in.
