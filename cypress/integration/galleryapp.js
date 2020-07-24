describe('Login module', () => {
  it.only('GA-28 : Login - valid data ', () => {
    cy.visit('/')
    cy.get('.nav-link').contains('Login').click()
    cy.get('#email').type('zoomght@gmail.com')
    cy.get('form > :nth-child(2)').type('sifrica1')
    cy.get('[type=submit]').click()
    cy.wait(1000)
    cy.get('.nav-link').contains('Logout').should('be.visible')    
  })
  it('GA-22 : Login - invalid data - username ', () => {
      cy.visit('/')
      cy.get('.nav-link').contains('Login').click()
      cy.get('#email').type('zoomrwerwrwght@gmail.com')
      cy.get('#password').type('sifrica1')
      cy.get('[type=submit]').click()
  })
  it('GA-25 : Login - invalid data - password ', () => {
      cy.visit('/')
      cy.get('.nav-link').contains('Login').click()
      cy.get('#email').type('zoomght@gmail.com')
      cy.get('#password').type('dsadasdadasdsad')
      cy.get('[type=submit]').click()
  })
})