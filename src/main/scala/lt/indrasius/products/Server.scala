package lt.indrasius.products

import java.nio.file.{Files, Paths}

import lt.indrasius.rubies.http.server.EmbeddedServer
import spray.http.HttpMethods._
import spray.http.StatusCodes._
import spray.http._

import scala.collection.concurrent.TrieMap

/**
 * Created by mantas on 15.3.5.
 */
case class ProductsServer(listenPort: Int, staticsPath: String) extends EmbeddedServer(listenPort) {
  val dao = MemoryProductDAO

  override def receive: RequestHandler = {
    case HttpRequest(GET, Uri(_, _, Uri.Path("/index.html"), _, _), _, _, _) =>
      respondWithFile("index.html")
    case HttpRequest(GET, Uri(_, _, path, _, _), _, _, _) if path.startsWith(Uri.Path("/app")) =>
      respondWithFile(path.tail.tail.toString())
    case HttpRequest(PUT, uri, _, entity, _) if uri.path.startsWith(Uri.Path("/api/products/")) =>
      dao.store(getId(uri), JSON.parse[Product](entity.asString))

      HttpResponse(NoContent)
    case HttpRequest(GET, uri, _, _, _) if uri.path.startsWith(Uri.Path("/api/products/")) =>
      dao.get(getId(uri)) match {
        case Some(product) =>
          HttpResponse(OK, HttpEntity(ContentTypes.`application/json`,
            JSON.stringify(product)))
        case None =>
          HttpResponse(NotFound)
      }
    case req =>
      println(req)

      HttpResponse(NotFound)
  }

  def getId(uri: Uri): String =
    uri.path.reverse.head.toString

  def respondWithFile(path: String) = {
    val filepath = Paths.get(staticsPath, path.stripPrefix("/"))
    val extension = path.split('.').last

    if (Files.exists(filepath)) {
      val mediaType = MediaTypes.forExtension(extension).getOrElse(MediaTypes.`text/plain`)

      HttpResponse(OK, HttpEntity(ContentType(mediaType), Files.readAllBytes(filepath)))
    } else
      HttpResponse(NotFound)
  }
}

case class Product(name: String, price: String)

object MemoryProductDAO {
  val products = TrieMap[String, Product]()

  def store(sku: String, product: Product): Unit =
    products += sku -> product

  def get(sku: String): Option[Product] =
    products.get(sku)
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
