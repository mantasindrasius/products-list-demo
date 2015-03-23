package lt.indrasius.products.it

import lt.indrasius.products.it.matchers._
import lt.indrasius.products.{ProductDTO, JSON, Product}
import lt.indrasius.rubies.http.testkit._
import org.scalatest.matchers.Matcher
import org.scalatest.{FlatSpec, MustMatchers}
import spray.http.HttpEntity

import scala.compat.Platform
import scala.util.Random

/**
 * Created by mantas on 15.3.5.
 */
class ProductsAPISpec extends FlatSpec with MustMatchers {
  val port = EmbeddedEnvironment.SERVER_PORT
  val client = HttpClient(s"http://localhost:$port/api/products/")

  val random = new Random(Platform.currentTime)

  def randomString(n: Int): String = random.alphanumeric.take(n).mkString

  def givenProductExists(sku: String, withName: String, withPrice: String) =
    client.put(sku, withBody( s"""{"name":"$withName","price":"$withPrice"}"""))

  def givenSomeProductExists(numOfProducts: Int)(whenCreated: Seq[ProductDTO] => Unit): Seq[ProductDTO] = {
    val products = Range(0, numOfProducts - 1) map { _ => ProductDTO(randomString(10), randomString(11), Some(randomString(12)))} toSeq

    products foreach { p => givenProductExists(p.sku.get, p.name, p.price) }

    whenCreated(products)

    products
  }

  def withProductProperties(ofName: String, ofPrice: String): Matcher[HttpEntity] =
    be (Product("", ofName, ofPrice)) compose { entity: HttpEntity => JSON.parse[Product](entity.asString).copy(sku = "") }

  def thatContainsProducts(expectedProducts: Seq[ProductDTO]): Matcher[HttpEntity] =
    containTheSameProductsAs(expectedProducts) compose { entity: HttpEntity => JSON.parse[Seq[ProductDTO]](entity.asString) }

  def containTheSameProductsAs(expectedOnes: Seq[ProductDTO]): Matcher[Seq[ProductDTO]] =
    be (expectedOnes) compose { given: Seq[ProductDTO] => expectedOnes.intersect(given) }

  "ProductsAPI" should "store and retrieve product data" in {
    val givenProductId = "some_id"

    givenProductExists(givenProductId, withName = "Hello", withPrice = "212 EUR")

    client.get(givenProductId) must haveBody(
      withProductProperties(
        ofName = "Hello",
        ofPrice = "212 EUR"))
  }

  it should "get all the products" in {
    givenSomeProductExists(3) { inStock =>
      client.get("") must haveBody(
        thatContainsProducts(inStock)
      )
    }
  }
}
