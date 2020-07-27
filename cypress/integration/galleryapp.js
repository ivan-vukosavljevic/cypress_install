const faker = require('faker');
let email = faker.internet.email();
let password = faker.internet.password();
let url1 = "https://gallery-app.vivifyideas.com/";

describe('Login module', () => {

  it('GA-19 : Login page layout', () => {
    cy.visit('/login')
    cy.wait(1000)
    cy.get('.nav-link').contains('Login')
    cy.wait(1000)
    cy.get('[type=email]').should('be.visible')
    cy.get('[type=password]').should('be.visible')
    cy.get('[type=submit]').contains('Submit').should('be.visible')
  })
  
  it('GA-28 : Login - valid data', () => {
    cy.visit('/')
    cy.get('.nav-link').contains('Login').click()
    cy.get('#email').type('ivanfly1986@gmail.com')
    cy.get('form > :nth-child(2)').type('Gucevogucevo1')
    cy.get('[type=submit]').click()
    cy.wait(1000)
    cy.get('.nav-link').contains('Logout').should('be.visible')    
  })

  it('GA-22 : Login - invalid data - username', () => {
      cy.visit('/')
      cy.get('.nav-link').contains('Login').click()
      cy.log(email)
      cy.get('#email').type(email)
      cy.get('#password').type('Gucevogucevo1')
      cy.get('[type=submit]').click()
  })

  it('GA-25 : Login - invalid data - password', () => {
      cy.visit('/')
      cy.get('.nav-link').contains('Login').click()
      cy.get('#email').type('ivanfly1986@gmail.com')
      cy.get('#password').type(password)
      cy.get('[type=submit]').click()
  })

  it('GA-26 : Login - invalid data - username and password', () => {
    cy.visit('/')
    cy.get('.nav-link').contains('Login').click()
    cy.log(email)
    cy.get('#email').type(email)
    cy.get('#password').type(password)
    cy.get('[type=submit]').click()
  })

  it('GA-32 : User is logged', () => {
    cy.visit('/')
    cy.get('.nav-link').contains('Login').click()
    cy.get('#email').type('ivanfly1986@gmail.com')
    cy.get('form > :nth-child(2)').type('Gucevogucevo1')
    cy.get('[type=submit]').click()
    cy.wait(1500)
    cy.get('.nav-link').contains('Logout').should('be.visible')
    cy.url().should('eq', url1)
  })
})

describe('Register module', () => {

  // it('GA-19 : Login page layout', () => {
  //   cy.visit('/login')
  //   cy.wait(1000)
  //   cy.get('.nav-link').contains('Register')
  //   cy.wait(1000)
  //   cy.get('[type=email]').should('be.visible')
  //   cy.get('[type=password]').should('be.visible')
  //   cy.get('[type=submit]').contains('Submit').should('be.visible')
  // })
  
  it('GA-9 : Register page test', () => {
    cy.visit('/')
    cy.get('.nav-link').contains('Login').click()
    cy.get('.nav-link').contains('Register').click()
    cy.wait(1000)
    cy.url().should('include', '/register')
    cy.get('#first-name').should('be.visible')
    cy.get('#last-name').should('be.visible')
    cy.get('#email').should('be.visible')
    cy.get('#password').should('be.visible')
    cy.get('#password-confirmation').should('be.visible')
    cy.get('.form-check-input').should('be.visible')
    cy.get('.btn').should('be.visible').contains('Submit')
    //cy.get('#email').type('ivanfly1986@gmail.com')
    //cy.get('form > :nth-child(2)').type('Gucevogucevo1')
    //cy.get('[type=submit]').click()
    //cy.wait(1000)
    //cy.get('.nav-link').contains('Logout').should('be.visible')    
  })

  it('GA-14 : Register page positive test', () => {
    cy.visit('/')
    cy.get('.nav-link').contains('Login').click()
    cy.get('.nav-link').contains('Register').click()
    cy.wait(1000)
    cy.url().should('include', '/register')
    cy.get('#first-name').type('Te')
    cy.get('#last-name').type('St')
    cy.get('#email').type(email)
    cy.get('#password').type(password)
    cy.get('#password-confirmation').type(password)
    cy.get('.form-check-input').click()
    cy.get('.btn').should('be.visible').contains('Submit').click()
    cy.wait(2000)
    cy.url().should('eq', url1)
  })

  it.only('GA-14 : Register page positive test', () => {
    cy.visit('/')
    cy.get('.nav-link').contains('Login').click()
    cy.get('.nav-link').contains('Register').click()
    cy.wait(1000)
    cy.url().should('include', '/register')
    cy.get('#first-name').type('Te')
    cy.get('#last-name').type('St')
    cy.get('#email').type(email)
    cy.get('#password').type(password)
    cy.get('#password-confirmation').type(password)
    cy.get('.form-check-input').click()
    cy.get('.btn').should('be.visible').contains('Submit').click()
    cy.wait(2000)
    cy.url().should('eq', url1)
    //cy.get('.nav-link').do.not.contains('Register')
    //cy.get('.nav-link').not('Logout')
   
  })
  // it('GA-22 : Login - invalid data - username', () => {
  //     cy.visit('/')
  //     cy.get('.nav-link').contains('Login').click()
  //     cy.log(email)
  //     cy.get('#email').type(email)
  //     cy.get('#password').type('Gucevogucevo1')
  //     cy.get('[type=submit]').click()
  // })

  // it('GA-25 : Login - invalid data - password', () => {
  //     cy.visit('/')
  //     cy.get('.nav-link').contains('Login').click()
  //     cy.get('#email').type('ivanfly1986@gmail.com')
  //     cy.get('#password').type(password)
  //     cy.get('[type=submit]').click()
  // })

  // it('GA-26 : Login - invalid data - username and password', () => {
  //   cy.visit('/')
  //   cy.get('.nav-link').contains('Login').click()
  //   cy.log(email)
  //   cy.get('#email').type(email)
  //   cy.get('#password').type(password)
  //   cy.get('[type=submit]').click()
  // })

  // it('GA-32 : User is logged', () => {
  //   cy.visit('/')
  //   cy.get('.nav-link').contains('Login').click()
  //   cy.get('#email').type('ivanfly1986@gmail.com')
  //   cy.get('form > :nth-child(2)').type('Gucevogucevo1')
  //   cy.get('[type=submit]').click()
  //   cy.wait(1500)
  //   cy.get('.nav-link').contains('Logout').should('be.visible')
  //   cy.url('/').should('eq', url1)
  // })
})