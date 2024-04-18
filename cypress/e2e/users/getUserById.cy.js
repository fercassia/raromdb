/// <reference types="Cypress" />

const dataUser = require("../../fixtures/user.json");
const { METHOD_HTTP } = require("../../support/methodshttp");

describe("Testes relacionados consulta de usuário", () => {
  let idUser;
  let active;

  let endpointToGetAUser = '/api/users/';

  beforeEach(() => {
    cy.createUser(dataUser.createUserToBeAdmin).then((response) => {
      expect(response.body.id);
      expect(response.body.type);
      expect(response.body.active)
      idUser = response.body.id;
      active = response.body.active;
    });
    cy.authUser(dataUser.createUserToBeAdmin.email, dataUser.createUserToBeAdmin.password);
    cy.promoteToAdmin();
  });

  afterEach(() => {
    cy.deleteUser(idUser);
  });

  it("GET listando usuário pelo id com sucesso", () => {
    var token = {
      Authorization: `Bearer ${Cypress.env("ACCESS_TOKEN")}`,
    };

    const usuario = {
      id: idUser,
      name: dataUser.createUserToBeAdmin.name,
      email: dataUser.createUserToBeAdmin.email,
      type: 1,
      active: active
    }

    cy.request({
      method: METHOD_HTTP.GET,
      url: endpointToGetAUser+idUser,
      headers: token,
    }).then((response) => {
      expect(response.status).to.be.eq(200)
      expect(response.body).to.be.deep.eq(usuario)
    });
  });

  it("GET listando usuário pelo id invalido deve retornar erro de bad request", () => {
    var token = {
      Authorization: `Bearer ${Cypress.env("ACCESS_TOKEN")}`,
    };

    cy.request({
      method: METHOD_HTTP.GET,
      url: endpointToGetAUser+'xpto',
      headers: token,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.be.eq(400)
    });
  });

  it("GET listando usuário pelo id inexistente deve retornar erro de not found", () => {
    
    var token = {
      Authorization: `Bearer ${Cypress.env("ACCESS_TOKEN")}`,
    };

    cy.request({
      method: METHOD_HTTP.GET,
      url: endpointToGetAUser+9999999999999,
      headers: token,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.be.eq(404)
    });
  });
});
