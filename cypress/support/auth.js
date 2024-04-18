import { METHOD_HTTP } from "./methodshttp"

Cypress.Commands.add('authUser', (email, password) => {

  const user = {
    email,
    password
  }

  cy.request({method: METHOD_HTTP.POST, url: 'api/auth/login', body: user}).then(response =>{
    Cypress.env('ACCESS_TOKEN', response.body.accessToken);
  })
})