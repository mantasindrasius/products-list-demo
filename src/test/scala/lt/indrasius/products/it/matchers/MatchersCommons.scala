package lt.indrasius.products.it.matchers

import org.scalatest.matchers.Matcher

/**
 * Created by mantas on 15.3.5.
 */
trait MatchersCommons {
  implicit class RichMatcher[A](matcher: Matcher[A]) {
    def aka(failMessage: String, negateMessage: String) = matcher mapResult { r =>
      r.copy(
        rawFailureMessage = failMessage,
        rawNegatedFailureMessage = negateMessage,
        rawMidSentenceFailureMessage = failMessage,
        rawMidSentenceNegatedFailureMessage = negateMessage
      )
    }
  }
}
