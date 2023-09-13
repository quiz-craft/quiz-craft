*** Settings ***
Documentation     This resource file includes keywords used by other test suites.
Library           MongoDB   ${MongoURI}   ${DBName}

*** Variables ***
${MongoURI}       mongodb://robot:1234@localhost:27017
${DBName}         quiz-craft-test

*** Keywords ***
Clear Test Database
  Drop Database
