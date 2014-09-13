#!/bin/bash

set -ex

mvn clean package
java -cp target/lib/*:target/* io.github.yanshuai.will.Application
