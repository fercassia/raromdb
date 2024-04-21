import { METHOD_HTTP } from "./methodshttp";

const endpointPathAuthUser = "api/auth/login"

Cypress.Commands.add("authUser", (email, password, statusCodeFail = true) => {
  const user = {
    email,
    password,
  };

  cy.request({
    method: METHOD_HTTP.POST,
    url: endpointPathAuthUser,
    body: user,
    failOnStatusCode: statusCodeFail,
  }).then((response) => {
    Cypress.env("ACCESS_TOKEN", response.body.accessToken);
    
    return response;
  });
});
