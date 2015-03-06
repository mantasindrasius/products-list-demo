package lt.indrasius.products.it

import org.scalatest.Matchers._
import org.scalatest.matchers.Matcher
import spray.http.HttpEntity.NonEmpty
import spray.http.{HttpResponse, StatusCode, StatusCodes}
import StatusCodes.{Success => SuccessStatus}

import scala.util.Success

/**
 * Created by mantas on 15.3.5.
 */
package object matchers extends MatchersCommons {
  def bePrinted: Matcher[HttpResponse] =
    be ('success) compose { resp: HttpResponse =>
      Success(println(resp)) }

  def haveStatus(status: StatusCode): Matcher[HttpResponse] =
    be (status) compose { resp: HttpResponse => resp.status } aka(s"Page does not have status $status", s"Page has status $status")

  def beSuccessful =
    be(a [SuccessStatus]) compose { resp: HttpResponse => resp.status } aka(s"Page does not have success status",
      s"Page has success status")

  def haveBody(matcher: Matcher[String]): Matcher[HttpResponse] =
    matcher compose { (resp: HttpResponse) => resp.entity.asString }

  def haveBody(content: String): Matcher[HttpResponse] =
    include (content) compose { (resp: HttpResponse) => resp.entity.asString }

  def haveContentType(contentType: String): Matcher[HttpResponse] =
    be (contentType) compose { (resp: HttpResponse) => resp.entity.asInstanceOf[NonEmpty].contentType.mediaType.value }
}
