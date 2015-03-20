import com.github.retronym.SbtOneJar._

oneJarSettings

name := "sku-demo"

version := "1.0"

mainClass := Some("lt.indrasius.products.Server")

resolvers += "Scalaz Bintray Repo" at "http://dl.bintray.com/scalaz/releases"

libraryDependencies += "lt.indrasius" %% "embedded-server" % "1.0-SNAPSHOT"

libraryDependencies += "lt.indrasius" %% "http-testkit" % "1.0-SNAPSHOT" % "test"

libraryDependencies += "org.scalatest" %% "scalatest" % "2.2.3" % "test"

libraryDependencies += "org.json4s" %% "json4s-native" % "3.2.11"
