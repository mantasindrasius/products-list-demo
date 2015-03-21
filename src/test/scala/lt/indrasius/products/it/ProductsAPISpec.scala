package lt.indrasius.products.it

import lt.indrasius.products.it.matchers._
import lt.indrasius.products.{JSON, Product}
import lt.indrasius.rubies.http.testkit._
import org.scalatest.matchers.Matcher
import org.scalatest.{FlatSpec, MustMatchers}
import spray.http.HttpEntity

/**
 * Created by mantas on 15.3.5.
 */
class ProductsAPISpec extends FlatSpec with MustMatchers {
  val port = EmbeddedEnvironment.SERVER_PORT
  val client = HttpClient(s"http://localhost:$port/api/products/")

  def givenProductExists(sku: String, withName: String, withPrice: String) =
    client.put(sku, withBody(s"""{"name":"$withName","price":"$withPrice"}"""))

  def withProductProperties(ofName: String, ofPrice: String): Matcher[HttpEntity] =
    be (Product(ofName, ofPrice)) compose { entity: HttpEntity => JSON.parse[Product](entity.asString) }

  "ProductsAPI" should "store and retrieve product data" in {
    val givenProductId = "some_id"

    givenProductExists(givenProductId, withName = "Hello", withPrice = "212 EUR")

    client.get(givenProductId) must haveBody(
      withProductProperties(
        ofName = "Hello",
        ofPrice = "212 EUR"))
  }
}
