*** Settings ***
Documentation     This resource file includes keywords used for utility actions and tests.
Library           MongoDB   ${MongoURI}   ${DBName}
Library           OperatingSystem
Library           Collections

*** Variables ***
${MongoURI}       mongodb://robot:1234@localhost:27017
${DBName}         quiz-craft-test

*** Keywords ***
Clear Test Database
  Drop Database

Read JSON File
  [Arguments]   ${file_name}
  ${json}=  Get file  ${file_name}
  ${dict}=  Evaluate  json.loads('''${json}''')   json
  [Return]  ${dict}
