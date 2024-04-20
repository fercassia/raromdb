import { METHOD_HTTP } from "./methodshttp";

const endpointPathUsers = "/api/users";

Cypress.Commands.add("createUser", (bodyUser, statusCodeFail = true) => {
  cy.request({
    method: METHOD_HTTP.POST,
    url: endpointPathUsers,
    body: bodyUser,
    failOnStatusCode: statusCodeFail
  }).then((response) => {
    return response;
  });
});

Cypress.Commands.add("inactivateUser", (statusCodeFail = true) => {
  var token = {
    Authorization: `Bearer ${Cypress.env("ACCESS_TOKEN")}`,
  };
  cy.request({
    method: METHOD_HTTP.PATCH,
    url: endpointPathUsers + "/inactivate",
    headers: token,
    failOnStatusCode: statusCodeFail
  });
});

Cypress.Commands.add("deleteUser", (idUser, statusCodeFail = true) => {
  var token = {
    Authorization: `Bearer ${Cypress.env("ACCESS_TOKEN")}`,
  };
  cy.request({
    method: METHOD_HTTP.DELETE,
    url: endpointPathUsers + `/${idUser}`,
    headers: token,
    failOnStatusCode: statusCodeFail
  });
});

Cypress.Commands.add("promoteToAdmin", (statusCodeFail = true) => {
  var token = {
    Authorization: `Bearer ${Cypress.env("ACCESS_TOKEN")}`,
  };
  cy.request({
    method: METHOD_HTTP.PATCH,
    url: endpointPathUsers + "/admin",
    headers: token,
    failOnStatusCode: statusCodeFail
  });
});

Cypress.Commands.add("promoteToCritic", (statusCodeFail = true) => {
  var token = {
    Authorization: `Bearer ${Cypress.env("ACCESS_TOKEN")}`,
  };
  cy.request({
    method: METHOD_HTTP.PATCH,
    url: endpointPathUsers + "/apply",
    headers: token,
    failOnStatusCode: statusCodeFail
  });
});
