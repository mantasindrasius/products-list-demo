package lt.indrasius.products

import java.io.File
import java.nio.file.{Files, Paths}

import org.http4s.StaticFile

import scala.collection.concurrent.TrieMap
import org.http4s.dsl._
import org.http4s.headers.`Content-Type`
import org.http4s.server._
import org.http4s.server.blaze.BlazeBuilder
import org.http4s.MediaType._
import scalaz.concurrent.Task
/**
 * Created by mantas on 15.3.5.
 */
case class ProductsServer(listenPort: Int, staticsPath: String) {
  val dao = MemoryProductDAO
  val staticsDirFile = new File(staticsPath)

  val service = HttpService {
    case req @ GET -> Root / "index.html" =>
      StaticFile.fromFile(new File(staticsDirFile, "index.html"), Some(req))
        .map(Task.now)
        .getOrElse(NotFound())
    case req @ GET -> Root / "app" / name  =>
      StaticFile.fromFile(new File(staticsDirFile, name), Some(req))
        .map(Task.now)
        .getOrElse(NotFound())
    case GET -> Root / "api" / "products" =>
      val allProducts = dao.listAll map { _.toDTO }

      Ok().withBody(allProducts)
    case GET -> Root / "api" / "products" / sku =>
      dao.get(sku) match {
        case Some(product) =>
          Ok().withBody(product.toDTO)
        case None =>
          NotFound()
      }
    case req @ PUT -> Root / "api" / "products" / sku =>
      val dto = req.as[ProductDTO].run

      dao.store(sku, dto.toEntity(sku))

      NoContent()
  }

  val serviceBuilder = BlazeBuilder.bindHttp(listenPort)
    .mountService(service, "/")

  def start: Unit = serviceBuilder.run
}

case class Product(sku: String, name: String, price: String) {
  def toDTO = ProductDTO(name, price, Some(sku))
}

case class ProductDTO(name: String, price: String, sku: Option[String] = None) {
  def toEntity(sku: String) = Product(sku, name, price)
}

object MemoryProductDAO {
  val products = TrieMap[String, Product]()

  def store(sku: String, product: Product): Unit =
    products += sku -> product

  def get(sku: String): Option[Product] =
    products.get(sku)

  def listAll: Seq[Product] =
    products map { _._2 } toSeq
}

object JSON {
  import org.json4s._
  import org.json4s.native.Serialization
  import org.json4s.native.Serialization.{read, write}

  implicit private val formats = Serialization.formats(NoTypeHints)

  def parse[A](data: String)(implicit manifest: Manifest[A]): A =
    read(data)

  def stringify[A <: AnyRef](obj: A): String =
    write[A](obj)
}

object MainApp extends App {
  ProductsServer(9999, "./client/app").start
}
