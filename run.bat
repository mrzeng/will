@echo off

cmd /c mvn clean package
cmd /c mvn dependency:copy-dependencies -DoutputDirectory=target/lib
cd target
java -cp lib\*:.\* io.github.yanshuai.will.Application
