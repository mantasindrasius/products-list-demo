import com.github.retronym.SbtOneJar._

oneJarSettings

name := "sku-demo"

organization := "lt.indrasius"

version := "1.0-SNAPSHOT"

scalaVersion := "2.11.5"

mainClass := Some("lt.indrasius.products.MainApp")

testFrameworks += TestFramework("lt.indrasius.e2e.js.sbt.Framework")

resolvers += "Scalaz Bintray Repo" at "http://dl.bintray.com/scalaz/releases"

libraryDependencies += "lt.indrasius" %% "js-e2e-testkit" % "1.0-SNAPSHOT" % "test"

libraryDependencies += "org.scalatest" %% "scalatest" % "2.2.3" % "test"

libraryDependencies += "org.json4s" %% "json4s-native" % "3.2.11"

libraryDependencies ++= Seq(
  "org.http4s" %% "http4s-core" % "0.6.5",
  "org.http4s" %% "http4s-server" % "0.6.5",
  "org.http4s" %% "http4s-blazeserver" % "0.6.5",
  "org.http4s" %% "http4s-dsl" % "0.6.5",
  "org.http4s" %% "http4s-json4s" % "0.6.5",
  "org.http4s" %% "http4s-json4s-native" % "0.6.5"
)
