package lt.indrasius.products.it

import lt.indrasius.products.ProductsServer

/**
 * Created by mantas on 15.3.5.
 */
object EmbeddedEnvironment {
  val SERVER_PORT = 9999
  val files = "./client/app/"

  ProductsServer(SERVER_PORT, files).start
}
