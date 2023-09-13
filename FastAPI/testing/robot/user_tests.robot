*** Settings ***
Library           REST   http://localhost:6996/
Resource          keywords.resource
Suite Setup       Clear Test Database
Test Teardown     Clear Test Database

*** Test Cases ***
POST Create new user
    POST        /register        ${CURDIR}/data/user/register.json
    Output

POST Create second user
    POST        /register        ${CURDIR}/data/user/register.json
    Output

POST Create double user
    POST        /register        ${CURDIR}/data/user/register.json
    POST        /register        ${CURDIR}/data/user/register.json
    Output

Valid user
    GET         /user
    Output
