package lt.indrasius.products.it

import lt.indrasius.embedded.karma.{KarmaRunner, MochaSpec}

/**
 * Created by mantas on 15.3.23.
 */
class ProductAPIJSSpec extends MochaSpec("e2e/product-api-spec.js") with KarmaRunner {
  config("baseUrl" -> s"http://localhost:${EmbeddedEnvironment.SERVER_PORT}/api/products/")

  bowerInclude("promise-js", "underscore")
  classPathInclude("e2e/http-client.js")
}
