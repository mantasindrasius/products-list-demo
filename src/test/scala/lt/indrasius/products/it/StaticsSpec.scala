package lt.indrasius.products.it

import lt.indrasius.e2e.js.{KarmaRunner, MochaSpec}

/**
 * Created by mantas on 15.3.23.
 */
class StaticsSpec extends MochaSpec("e2e/statics-spec.js") with KarmaRunner {
  config("baseUrl" -> s"http://localhost:${EmbeddedEnvironment.SERVER_PORT}/")

  bowerInclude("promise-js", "jquery")
  classPathInclude("e2e/http-client.js")
}
