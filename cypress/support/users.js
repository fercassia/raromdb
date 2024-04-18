import { METHOD_HTTP } from "./methodshttp"

const endpointPathUsers = '/api/users'

Cypress.Commands.add('createUser', (bodyUser) => {
  cy.request({method: METHOD_HTTP.POST, url: endpointPathUsers, body: bodyUser}).then(response =>{
    return response;
  })
})

Cypress.Commands.add('inactivateUser', () => {
  var token = {
    Authorization: `Bearer ${Cypress.env('ACCESS_TOKEN')}`
  }
  cy.request({method: METHOD_HTTP.PATCH, url: endpointPathUsers+'/inactivate', headers: token})
})

Cypress.Commands.add('deleteUser', (idUser) => {
  var token = {
    Authorization: `Bearer ${Cypress.env('ACCESS_TOKEN')}`
  }
  cy.request({method: METHOD_HTTP.DELETE, url: endpointPathUsers+`/${idUser}`, headers: token})
})

Cypress.Commands.add('promoteToAdmin', () => {
  var token = {
    Authorization: `Bearer ${Cypress.env('ACCESS_TOKEN')}`
  }
  cy.request({method: METHOD_HTTP.PATCH, url: endpointPathUsers+'/admin', headers: token})
})

Cypress.Commands.add('promoteToCritic', () => {
  var token = {
    Authorization: `Bearer ${Cypress.env('ACCESS_TOKEN')}`
  }
  cy.request({method: METHOD_HTTP.PATCH, url: endpointPathUsers+'/apply', headers: token})
})


