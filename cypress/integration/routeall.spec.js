const { EMAIL } = require("../fixtures/constants")

describe('Route all', () => {
  // beforeEach(() => {
  //     cy.server()
  //     cy.route('GET', Cypress.env('apiUrl')  +'/galleries?page=1&term=', 'fixture:all.json').as('stubing')
  // })

  beforeEach(() => {
    cy.server()
    cy.route('GET', Cypress.env('apiUrl')  + '/galleries?page=1&term=').as('stubing')
})

  it('Wait for request to load', () => {
   cy.visit('/')
   cy.wait('@stubing')
  })


it('Send request for login to backend', () => {
  cy.request('POST', Cypress.env('apiUrl')  + '/auth/login', {"email":"ivanfly1986@gmail.com","password":"Gucevogucevo1"})
  .then((response) => {
    // response.body is automatically serialized into JSON
    expect(response.body).to.have.property('access_token') // true
    expect(response.body).to.have.property('token_type')
    localStorage.setItem('token', response.body.access_token)
    
  })
  cy.visit('/')
 })

 it.only('Send request for login to backend using commands.js from support', () => {
   cy.loginBe(EMAIL.EXISTING, EMAIL.PASSWORD)
  // cy.request('POST', Cypress.env('apiUrl')  + '/auth/login', {"email":"ivanfly1986@gmail.com","password":"Gucevogucevo1"})
  // .then((response) => {
  //   // response.body is automatically serialized into JSON
  //   expect(response.body).to.have.property('access_token') // true
  //   expect(response.body).to.have.property('token_type')
  //   localStorage.setItem('token', response.body.access_token)
  //   })
  cy.wait('@stubing')
  cy.get('@stubing')
    .its('response')
    .then((response) =>{
      // cy.log(response.body.galleries[0].id)
      // Brisanje galerije pomocu id
      cy.request({ 
        method: 'DELETE',
        url: Cypress.env('apiUrl') + '/galleries/' + response.body.galleries[0].id,
        form: true,
        followRedirect: true,
        headers: {
          authorization: `Bearer ${window.localStorage.getItem('token')}`,
        },
      })
    }) // Izvlacenje vrednosti iz alajasa i koriscenje vrednosti u dalje svrhe
 })

})
