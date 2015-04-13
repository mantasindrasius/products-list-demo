package lt.indrasius

import org.json4s._
import org.http4s.json4s.native.{jsonOf, jsonEncoderOf}
import org.json4s.{Writer, JValue, Reader}

/**
 * Created by mantas on 15.4.13.
 */
package object products {
  implicit val productReader = new Reader[ProductDTO] {
    import org.json4s._

    def read(value: JValue) = {
      val JString(name) = value \ "name"
      val JString(price) = value \ "price"

      ProductDTO(name, price)
    }
  }

  implicit val productWriter = new Writer[ProductDTO] {
    import org.json4s.JsonDSL._

    def write(obj: ProductDTO): JValue =
      ("name" -> obj.name) ~ ("price" -> obj.price)
  }

  implicit val productsWriter = new Writer[Seq[ProductDTO]] {
    import org.json4s.JsonDSL._

    def write(obj: Seq[ProductDTO]): JValue =
      obj map {
        productWriter.write(_)
      }
  }

  implicit val decoder = jsonOf[ProductDTO]
  implicit val encoder = jsonEncoderOf[ProductDTO]
  implicit val productsEncoder = jsonEncoderOf[Seq[ProductDTO]]
}
