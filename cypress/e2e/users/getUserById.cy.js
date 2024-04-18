/// <reference types="Cypress" />

const dataUser = require ('../../fixtures/user.json')

describe('Testes relacionados a criação de usuários', () => {

  afterEach(() =>{
    cy.authUser(dataUser.createUser.email, dataUser.createUser.password);
    cy.inactivateUser();
  })

  it('POST criando usuário com sucesso', () => {
    cy.createUser(dataUser.createUser).then(response => {

      const bodyToReceive = {
        id: response.body.id,
        name: dataUser.createUser.name,
        email: dataUser.createUser.email,
        type: 0,
        active: true
      }

      expect(response.status).to.eq(201)
      expect(response.body.id).to.be.a('number')
      expect(response.body).to.deep.eq(bodyToReceive)
    })
  })
})