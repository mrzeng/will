#!/bin/bash

set -ex

mvn clean package
mvn dependency:copy-dependencies -DoutputDirectory=target/lib
cd target
java -cp lib/*:./* io.github.yanshuai.will.Application
