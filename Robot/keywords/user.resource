*** Settings ***
Documentation     This resource file includes keywords used for user actions and tests.
Library           OperatingSystem
Library           Collections


*** Variables ***
${MongoURI}       mongodb://robot:1234@localhost:27017
${DBName}         quiz-craft-test
${DATA_DIR}       ${CURDIR}/../data


*** Keywords ***
Create Test User And Return Auth Header
  ${test_user}=   Read JSON File  ${DATA_DIR}/user/register.json
  ${headers}=   Create User And Return Auth Header  ${test_user}
  [Return]  ${headers}

Create User And Return Auth Header
  [Arguments]   ${user_data}
  Create User   ${user_data}
  ${auth_token}=  Authenticate User   ${user_data}
  ${headers}=   Create Dictionary   Authorization=Bearer ${auth_token}
  [Return]  ${headers}

Create And Authenticate User
  [Arguments]   ${user_data}
  Create User   ${user_data}
  ${auth_token}=  Authenticate User   ${user_data}
  [Return]  ${auth_token}

Create User
  [Arguments]   ${user_data}
  ${user_data}=   Copy Dictionary  ${user_data}  deep_copy=True
  ${response}=  POST On Session  quizcraft  /register  json=${user_data}  expected_status=200
  [Return]  ${response}

Authenticate User
  [Arguments]   ${user_data}
  ${user_data}=   Copy Dictionary  ${user_data}  deep_copy=True
  Set To Dictionary   ${user_data}  grant_type=  scope=   client_id=  client_secret=
  ${response}=  POST On Session  quizcraft  /auth/token  data=${user_data}  expected_status=200
  ${auth_token}=  Get From Dictionary   ${response.json()}  access_token
  [Return]  ${auth_token}
