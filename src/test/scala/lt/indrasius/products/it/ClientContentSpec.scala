package lt.indrasius.products.it

import org.scalatest.{MustMatchers, FlatSpec}
import lt.indrasius.rubies.http.testkit.HttpClient
import matchers._

/**
 * Created by mantas on 15.3.5.
 */
class ClientContentSpec extends FlatSpec with MustMatchers {
  val port = EmbeddedEnvironment.SERVER_PORT
  val client = HttpClient(s"http://localhost:$port/")

  "ClientContent" should "serve index file" in {
    client.get("index.html") must {
      beSuccessful and
      haveContentType("text/html") and
      haveBody(include("<body>"))
    }
  }

  it should "serve file from the app directory" in {
    client.get("app/sku-page.js") must {
      beSuccessful and
      haveContentType("application/javascript")
    }
  }

  it should "serve bower component" in {
    client.get("app/bower_components/dustjs-linkedin/dist/dust-full.js") must {
      beSuccessful and
      haveContentType("application/javascript")
    }
  }
}
