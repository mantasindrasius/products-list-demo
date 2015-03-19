package lt.indrasius.products.it

import org.scalatest.{MustMatchers, FlatSpec}
import lt.indrasius.rubies.http.testkit._
import matchers._

/**
 * Created by mantas on 15.3.5.
 */
class ProductsAPISpec extends FlatSpec with MustMatchers {
  val port = EmbeddedEnvironment.SERVER_PORT
  val client = HttpClient(s"http://localhost:$port/api/products/")

  "ProductsAPI" should "store and retrieve product data" in {
    val productId = "some_id"
    val data = """{"name":"Hello","price":"212 EUR"}"""

    client.put(productId, withBody(data)) must beSuccessful
    client.get(productId) must haveBody(data)
  }
}
