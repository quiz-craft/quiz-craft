*** Settings ***
Library           RequestsLibrary
Library           Collections
Library           String

Resource          ../keywords/user.resource
Resource          ../keywords/util.resource

Suite Setup   Run Keywords  Clear Test Database
...           AND           Create Session  quizcraft  %{API_ROOT_PATH}
Test Teardown     Clear Test Database

*** Variables ***
${DATA_DIR}       ${CURDIR}/../data

*** Test Cases ***
Creating new user with correct data should succeed
    ${test_user}=   Read JSON File  ${DATA_DIR}/user/register.json
    ${response}=    Create User   ${test_user}
    Should Be Equal As Strings    ${response.json()}[username]  ${test_user}[username]

Creating new user without password should not succeed
    ${default_user}=  Read JSON File  ${DATA_DIR}/user/register.json
    Remove From Dictionary  ${default_user}  password
    ${response}=  POST On Session  quizcraft  /register  json=${default_user}  expected_status=422

Creating new user without username should not succeed
    ${default_user}=  Read JSON File  ${DATA_DIR}/user/register.json
    Remove From Dictionary  ${default_user}  username
    ${response}=  POST On Session  quizcraft  /register  json=${default_user}  expected_status=422

Creating new user without valid email should not succeed
    ${default_user}=  Read JSON File  ${DATA_DIR}/user/register.json
    Set To Dictionary  ${default_user}  email=test
    ${response}=  POST On Session  quizcraft  /register  json=${default_user}  expected_status=422

Creating new user with duplicate username should not succeed
    ${default_user}=  Read JSON File  ${DATA_DIR}/user/register.json
    POST On Session  quizcraft  /register  json=${default_user}  expected_status=200
    ${duplicate_user}=  Copy Dictionary  ${default_user}  deepcopy=True
    Set To Dictionary  ${duplicate_user}  email=newEmail@test.com
    ${response}=  POST On Session  quizcraft  /register  json=${duplicate_user}  expected_status=409

Creating new user with duplicate email should not succeed
    ${default_user}=  Read JSON File  ${DATA_DIR}/user/register.json
    POST On Session  quizcraft  /register  json=${default_user}  expected_status=200
    ${duplicate_user}=  Copy Dictionary  ${default_user}  deepcopy=True
    Set To Dictionary  ${duplicate_user}  username=newUsername
    ${response}=  POST On Session  quizcraft  /register  json=${duplicate_user}  expected_status=409

User should login with correct username and password
    ${test_user}=  Read JSON File  ${DATA_DIR}/user/register.json
    POST On Session  quizcraft  /register  json=${test_user}  expected_status=200
    Remove From Dictionary  ${test_user}  email
    Set To Dictionary   ${test_user}  grant_type=  scope=   client_id=  client_secret=
    ${response}=  POST On Session  quizcraft  /auth/token  data=${test_user}  expected_status=200
    Dictionary Should Contain Key    ${response.json()}  access_token

User should login with correct email and password
    ${test_user}=  Read JSON File  ${DATA_DIR}/user/register.json
    POST On Session  quizcraft  /register  json=${test_user}  expected_status=200
    Set To Dictionary  ${test_user}  username   ${test_user}[email]
    Remove From Dictionary  ${test_user}  email
    Set To Dictionary   ${test_user}  grant_type=  scope=   client_id=  client_secret=
    ${response}=  POST On Session  quizcraft  /auth/token  data=${test_user}  expected_status=200
    Dictionary Should Contain Key    ${response.json()}  access_token

User should not login with incorrect credentials
    ${test_user}=  Read JSON File  ${DATA_DIR}/user/register.json
    POST On Session  quizcraft  /register  json=${test_user}  expected_status=200
    Set To Dictionary   ${test_user}  password="incorrectPwd"   grant_type=  scope=   client_id=  client_secret=
    ${response}=  POST On Session  quizcraft  /auth/token  data=${test_user}  expected_status=401
    Dictionary Should Not Contain Key    ${response.json()}  access_token

User can get their own data after logging in
    ${headers}=   Create Test User And Return Auth Header
    ${response}=    GET On Session  quizcraft  /user  headers=${headers}  expected_status=200
    ${expected_user}=  Read JSON File   ${DATA_DIR}/user/registered.json
    Dictionaries Should Be Equal    ${response.json()}  ${expected_user}


User should not get data without a valid JWT
    ${jwt_token}=   Generate Random String  64
    ${headers}=   Create Dictionary   Authorization=Bearer ${jwt_token}
    ${response}=    GET On Session  quizcraft  /user  headers=${headers}  expected_status=401
    Dictionary Should Not Contain Key    ${response.json()}  username

User should update their own data after logging in
    ${headers}=   Create Test User And Return Auth Header
    ${update_user}=  Read JSON File   ${DATA_DIR}/user/to_update.json
    ${expected_user}=  Read JSON File   ${DATA_DIR}/user/updated.json
    ${response}=    PATCH On Session  quizcraft  /user  json=${update_user}  headers=${headers}  expected_status=200
    Dictionaries Should Be Equal    ${response.json()}  ${expected_user}

User should not update their data without a valid JWT
    ${jwt_token}=   Generate Random String  64
    ${headers}=   Create Dictionary   Authorization=Bearer ${jwt_token}
    ${update_user}=  Read JSON File   ${DATA_DIR}/user/to_update.json
    ${response}=    PATCH On Session  quizcraft  /user  json=${update_user} headers=${headers}  expected_status=401
    Dictionary Should Not Contain Key    ${response.json()}  username

User should delete their own data after logging in
    ${headers}=   Create Test User And Return Auth Header
    ${response}=    Delete On Session  quizcraft  /user  headers=${headers}  expected_status=204

User should not delete their own data without valid JWT
    ${jwt_token}=   Generate Random String  64
    ${headers}=   Create Dictionary   Authorization=Bearer ${jwt_token}
    ${response}=    Delete On Session  quizcraft  /user  headers=${headers}  expected_status=401

User should request email verification after logging in
    ${headers}=   Create Test User And Return Auth Header
    ${response}=  POST On Session  quizcraft  /mail/verify  headers=${headers}  expected_status=200
    Dictionary Should Contain Key  ${response.json()}  url  token

User should not request email verification without JWT
    ${jwt_token}=   Generate Random String  64
    ${headers}=   Create Dictionary   Authorization=Bearer ${jwt_token}
    ${response}=  POST On Session  quizcraft  /mail/verify  headers=${headers}  expected_status=401
    Dictionary Should Not Contain Key  ${response.json()}  url  token

User should verify their email after logging in
    ${headers}=   Create Test User And Return Auth Header
    ${response}=  POST On Session  quizcraft  /mail/verify  headers=${headers}  expected_status=200
    ${url}=  Get From Dictionary  ${response.json()}  url
    ${response}=  POST On Session  quizcraft  ${url}  headers=${headers}  expected_status=200
    Should Not Be Empty   ${response.json()}[email_confirmed_at]

User should not verify their email without valid token
    ${headers}=   Create Test User And Return Auth Header
    ${token}=   Generate Random String  64
    ${response}=  POST On Session  quizcraft  /mail/verify/${token}  headers=${headers}  expected_status=401

User should reset their password and login with new password
    ${test_user}=   Read JSON File  ${DATA_DIR}/user/register.json
    Create User  ${test_user}
    ${response}=  POST On Session  quizcraft  /auth/forgot-password  json=email@test.com  expected_status=200
    ${url}=  Get From Dictionary  ${response.json()}  url
    POST On Session  quizcraft  ${url}  json=new_password  expected_status=200
    Set To Dictionary   ${test_user}  password  new_password
    ${auth_token}=  Authenticate User   ${test_user}
    Should Not Be Empty    ${auth_token}

User should reset their password but not login with old password
    ${test_user}=   Read JSON File  ${DATA_DIR}/user/register.json
    Create User  ${test_user}
    ${response}=  POST On Session  quizcraft  /auth/forgot-password  json=email@test.com  expected_status=200
    ${url}=  Get From Dictionary  ${response.json()}  url
    POST On Session  quizcraft  ${url}  json=new_password  expected_status=200
    Set To Dictionary   ${test_user}  grant_type=  scope=   client_id=  client_secret=
    ${response}=  POST On Session  quizcraft  /auth/token  data=${test_user}  expected_status=401
    Dictionary Should Not Contain Key    ${response.json()}   access_token

User should not reset their password without valid token
    ${test_user}=   Read JSON File  ${DATA_DIR}/user/register.json
    Create User  ${test_user}
    ${token}=   Generate Random String  64
    POST On Session  quizcraft  /auth/reset-password/${token}  json=new_password  expected_status=401
