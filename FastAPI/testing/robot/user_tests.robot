*** Settings ***
Library           RequestsLibrary
Library           Collections
Library           String

Resource          keywords.resource

Suite Setup   Run Keywords  Clear Test Database
...           AND           Create Session  quizcraft   http://localhost:6996
Test Teardown     Clear Test Database

*** Test Cases ***
Creating new user with correct data should succeed
    ${test_user}=  Read JSON File  ${CURDIR}/data/user/register.json
    ${response}=  POST On Session  quizcraft  /register  json=${test_user}  expected_status=200
    Should Be Equal As Strings    ${response.json()}[username]  ${test_user}[username]

Creating new user without password should not succeed
    ${default_user}=  Read JSON File  ${CURDIR}/data/user/register.json
    Remove From Dictionary  ${default_user}  password
    ${response}=  POST On Session  quizcraft  /register  json=${default_user}  expected_status=422

Creating new user without username should not succeed
    ${default_user}=  Read JSON File  ${CURDIR}/data/user/register.json
    Remove From Dictionary  ${default_user}  username
    ${response}=  POST On Session  quizcraft  /register  json=${default_user}  expected_status=422

Creating new user without valid email should not succeed
    ${default_user}=  Read JSON File  ${CURDIR}/data/user/register.json
    Set To Dictionary  ${default_user}  email=test
    ${response}=  POST On Session  quizcraft  /register  json=${default_user}  expected_status=422

Creating new user with duplicate username should not succeed
    ${default_user}=  Read JSON File  ${CURDIR}/data/user/register.json
    POST On Session  quizcraft  /register  json=${default_user}  expected_status=200
    ${duplicate_user}=  Copy Dictionary  ${default_user}  deepcopy=True
    Set To Dictionary  ${duplicate_user}  email=newEmail@test.com
    ${response}=  POST On Session  quizcraft  /register  json=${duplicate_user}  expected_status=409

Creating new user with duplicate email should not succeed
    ${default_user}=  Read JSON File  ${CURDIR}/data/user/register.json
    POST On Session  quizcraft  /register  json=${default_user}  expected_status=200
    ${duplicate_user}=  Copy Dictionary  ${default_user}  deepcopy=True
    Set To Dictionary  ${duplicate_user}  username=newUsername
    ${response}=  POST On Session  quizcraft  /register  json=${duplicate_user}  expected_status=409

User should login with correct username and password
    ${test_user}=  Read JSON File  ${CURDIR}/data/user/register.json
    POST On Session  quizcraft  /register  json=${test_user}  expected_status=200
    Remove From Dictionary  ${test_user}  email
    Set To Dictionary   ${test_user}  grant_type=  scope=   client_id=  client_secret=
    ${response}=  POST On Session  quizcraft  /auth/token  data=${test_user}  expected_status=200
    Dictionary Should Contain Key    ${response.json()}  access_token

User should login with correct email and password
    ${test_user}=  Read JSON File  ${CURDIR}/data/user/register.json
    POST On Session  quizcraft  /register  json=${test_user}  expected_status=200
    Set To Dictionary  ${test_user}  username   ${test_user}[email]
    Remove From Dictionary  ${test_user}  email
    Set To Dictionary   ${test_user}  grant_type=  scope=   client_id=  client_secret=
    ${response}=  POST On Session  quizcraft  /auth/token  data=${test_user}  expected_status=200
    Dictionary Should Contain Key    ${response.json()}  access_token

User should not login with incorrect credentials
    ${test_user}=  Read JSON File  ${CURDIR}/data/user/register.json
    POST On Session  quizcraft  /register  json=${test_user}  expected_status=200
    Set To Dictionary   ${test_user}  password="incorrectPwd"   grant_type=  scope=   client_id=  client_secret=
    ${response}=  POST On Session  quizcraft  /auth/token  data=${test_user}  expected_status=401
    Dictionary Should Not Contain Key    ${response.json()}  access_token

User can get their own data after logging in
    ${test_user}=   Read JSON File  ${CURDIR}/data/user/register.json
    ${jwt_token}=   Create And Authenticate User  ${test_user}
    ${headers}=   Create Dictionary   Authorization=Bearer ${jwt_token}
    ${response}=    GET On Session  quizcraft  /user  headers=${headers}  expected_status=200
    Should Be Equal As Strings    ${response.json()}[username]  ${test_user}[username]


User should not get data without logging in
    ${jwt_token}=   Generate Random String  64
    ${headers}=   Create Dictionary   Authorization=Bearer ${jwt_token}
    ${response}=    GET On Session  quizcraft  /user  headers=${headers}  expected_status=401
    Dictionary Should Not Contain Key    ${response.json()}  username


*** Keywords ***
Create And Authenticate User
  [Arguments]   ${user_data}
  ${user_data}=   Copy Dictionary  ${user_data}  deep_copy=True
  POST On Session  quizcraft  /register  json=${user_data}  expected_status=200
  Set To Dictionary   ${user_data}  grant_type=  scope=   client_id=  client_secret=
  ${response}=  POST On Session  quizcraft  /auth/token  data=${user_data}  expected_status=200
  ${auth_token}=  Get From Dictionary   ${response.json()}  access_token
  [Return]  ${auth_token}
