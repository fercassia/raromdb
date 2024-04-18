/// <reference types="Cypress" />

const dataUser = require("../../fixtures/user.json");
const { METHOD_HTTP } = require("../../support/methodshttp");

describe("Testes relacionados a listagem de todos os usuários", () => {

  const endpointToListUsers = "/api/users";

  let idUser;

  beforeEach(() => {
    cy.createUser(dataUser.createUserToBeAdmin).then((response) => {
      expect(response.body.id);
      idUser = response.body.id;
    });
    cy.authUser(
      dataUser.createUserToBeAdmin.email,
      dataUser.createUserToBeAdmin.password
    );
    cy.promoteToAdmin();
  });

  afterEach(() => {
    cy.deleteUser(idUser);
  });

  it("GET listando todos os usuários", () => {
 
    var token = {
      Authorization: `Bearer ${Cypress.env("ACCESS_TOKEN")}`,
    };

    cy.request({
      method: METHOD_HTTP.GET,
      url: endpointToListUsers,
      headers: token,
    }).then((response) => {

      let lethResponse = response.body.length;

      expect(response.status).to.eq(200)
      expect(response.body).to.be.a("Array")
      expect(response.body[0]).to.be.a("Object");
      expect(response.body[0]).to.have.property("id")
      expect(response.body[0]).to.have.property("name")
      expect(response.body[0]).to.have.property("email")
      expect(response.body[0]).to.have.property("type")
      expect(response.body[0]).to.have.property("active")
      expect(response.body[lethResponse-1]).to.be.a("Object");
      expect(response.body[lethResponse-1]).to.have.property("id")
      expect(response.body[lethResponse-1]).to.have.property("name")
      expect(response.body[lethResponse-1]).to.have.property("email")
      expect(response.body[lethResponse-1]).to.have.property("type")
      expect(response.body[lethResponse-1]).to.have.property("active")
    });
  });
});
