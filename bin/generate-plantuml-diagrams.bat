@echo off
echo Generating SVGs for PlantUML Diagrams

set "sourceDirectory=docs"
set "outputDirectory=../svg"

for /R "%sourceDirectory%" %%F in (*.puml) do (
  if not exist "%outputDirectory%" mkdir "%outputDirectory%"
  echo Processing file: %%F
  java -jar libs\plantuml-1.2023.1.jar "-SdefaultFontSize=20" -tsvg  "%%F"  -o "%outputDirectory%"
)

echo SVG generation complete.