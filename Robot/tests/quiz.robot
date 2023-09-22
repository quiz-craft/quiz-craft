*** Settings ***
Library           RequestsLibrary
Library           Collections
Library           String

Resource          ../keywords/user.resource
Resource          ../keywords/util.resource

Suite Setup   Run Keywords  Clear Test Database
...           AND           Create Session  quizcraft   http://localhost:3000
Test Teardown     Clear Test Database

*** Variables ***
${DATA_DIR}       ${CURDIR}/../data

*** Test Cases ***
User should create a quiz with valid data when logged
    ${test_quiz}=  Read JSON File  ${DATA_DIR}/quiz/to_create.json
    ${headers}=   Create Test User And Return Auth Header
    ${response}=    POST On Session  quizcraft  /quiz  json=${test_quiz}  headers=${headers}  expected_status=200
    ${created_quiz}=  Copy Dictionary  ${response.json()}
    Remove From Dictionary  ${created_quiz}  _id  owner_id  revision_id
    Should Be Equal As Strings    ${created_quiz}  ${test_quiz}

User should not create a quiz with invalid data when logged in
    ${test_quiz}=  Read JSON File  ${DATA_DIR}/quiz/to_create.json
    Remove From Dictionary  ${test_quiz}  topic
    ${headers}=   Create Test User And Return Auth Header
    ${response}=    POST On Session  quizcraft  /quiz  json=${test_quiz}  headers=${headers}  expected_status=422

User should not create a quiz when not logged in
    ${jwt_token}=   Generate Random String  64
    ${headers}=   Create Dictionary   Authorization=Bearer ${jwt_token}
    ${test_quiz}=  Read JSON File  ${DATA_DIR}/quiz/to_create.json
    ${response}=    POST On Session  quizcraft  /quiz  json=${test_quiz}  headers=${headers}  expected_status=401

Anyone should get a quiz
    ${test_quiz}=  Read JSON File  ${DATA_DIR}/quiz/to_create.json
    ${headers}=   Create Test User And Return Auth Header
    ${response}=  POST On Session  quizcraft  /quiz  json=${test_quiz}  headers=${headers}  expected_status=200
    ${response}=  GET On Session  quizcraft  /quiz/${response.json()}[_id]  expected_status=200
    ${created_quiz}=  Copy Dictionary  ${response.json()}
    Remove From Dictionary  ${created_quiz}  _id  owner_id
    Should Be Equal As Strings    ${created_quiz}  ${test_quiz}

User should update its own quiz when logged in
    ${test_quiz}=  Read JSON File  ${DATA_DIR}/quiz/to_create.json
    ${headers}=   Create Test User And Return Auth Header
    ${response}=    POST On Session  quizcraft  /quiz  json=${test_quiz}  headers=${headers}  expected_status=200
    ${update}=  Read JSON File  ${DATA_DIR}/quiz/to_update.json
    ${response}=    PATCH On Session  quizcraft  /quiz/${response.json()}[_id]  json=${update}  headers=${headers}  expected_status=200
    ${updated_quiz}=  Copy Dictionary  ${response.json()}
    Remove From Dictionary  ${updated_quiz}  _id  owner_id
    Should Be Equal As Strings    ${updated_quiz}  ${update}

User should not update someone else quiz even when logged in
    ${test_quiz}=  Read JSON File  ${DATA_DIR}/quiz/to_create.json
    ${headers}=   Create Test User And Return Auth Header
    ${response}=    POST On Session  quizcraft  /quiz  json=${test_quiz}  headers=${headers}  expected_status=200
    ${quiz_id}=  Set Variable  ${response.json()}[_id]
    ${second_user}=   Read JSON File  ${DATA_DIR}/user/register2.json
    ${headers}=   Create User And Return Auth Header  ${second_user}
    ${update}=  Read JSON File  ${DATA_DIR}/quiz/to_update.json
    ${response}=    PATCH On Session  quizcraft  /quiz/${quiz_id}  json=${update}  headers=${headers}  expected_status=403

User should delete its own quiz when logged in
    ${test_quiz}=  Read JSON File  ${DATA_DIR}/quiz/to_create.json
    ${headers}=   Create Test User And Return Auth Header
    ${response}=    POST On Session  quizcraft  /quiz  json=${test_quiz}  headers=${headers}  expected_status=200
    DELETE On Session  quizcraft  /quiz/${response.json()}[_id]  headers=${headers}  expected_status=204

User should not delete someone else quiz even when logged in
    ${test_quiz}=  Read JSON File  ${DATA_DIR}/quiz/to_create.json
    ${headers}=   Create Test User And Return Auth Header
    ${response}=    POST On Session  quizcraft  /quiz  json=${test_quiz}  headers=${headers}  expected_status=200
    ${quiz_id}=  Set Variable  ${response.json()}[_id]
    ${second_user}=   Read JSON File  ${DATA_DIR}/user/register2.json
    ${headers}=   Create User And Return Auth Header  ${second_user}
    DELETE On Session  quizcraft  /quiz/${response.json()}[_id]  headers=${headers}  expected_status=403
