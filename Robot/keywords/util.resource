*** Settings ***
Documentation     This resource file includes keywords used for utility actions and tests.
Library           MongoDB   ${MongoURI}   ${DBName}
Library           OperatingSystem
Library           Collections

*** Variables ***
${MongoURI}       %{MONGO_CONNECTION_SRV}
${DBName}         quiz-craft-test

*** Keywords ***
Clear Test Database
  Drop Database

Read JSON File
  [Arguments]   ${file_name}
  ${json}=  Get file  ${file_name}
  ${dict}=  Evaluate  json.loads('''${json}''')   json
  [Return]  ${dict}
