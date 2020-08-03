import {EMAIL} from '../fixtures/constants';
import {NAME} from '../fixtures/constants';
import { authPage } from '../page_object/login.page';
import { randomEmail } from '../utils';
import { createGalleryPage } from '../page_object/createGallery.page';


const faker = require('faker');
let email = faker.internet.email();
let password = faker.internet.password();
let url1 = "https://gallery-app.vivifyideas.com/";
let img1 = "https://image.freepik.com/free-photo/black-white-angelfish-swimming-aqua-scape-planted-tropical-fish-tank_47840-73.jpg";
let img2 = "https://thewallpaper.co//wp-content/uploads/2019/09//reptiles-lizard-cute-pc-tropical-pet-images-animals-samsung-green-color-jpg.jpg";

describe('Login module', () => {

  before (() => {
    cy.visit('/login')

  })

  afterEach(() => {
    //cy.clear()
  })

  it('GA-19 : Login page layout', () => {
    // cy.visit('/login')
    //cy.wait(1000)
    cy.get('.nav-link').contains('Login').should('be.visible')
    cy.wait(1000)
    // cy.get('[type=email]').should('be.visible')
    // cy.get('[type=password]').should('be.visible')
    // cy.get('[type=submit]').contains('Submit').should('be.visible')
    //Sve gore menja importovana funkcija
    authPage.email.should('be.visible')
    authPage.password.should('be.visible')
    authPage.loginButton.click()
  })
  
  it('GA-28 : Login - valid data', () => {
    //cy.visit('/') - Za ovaj korak uradjena je before funkcija
    cy.get('.nav-link').contains('Login').click()
    // cy.get('#email').type('ivanfly1986@gmail.com')
    // cy.get('form > :nth-child(2)').type('Gucevogucevo1')
    // cy.get('[type=submit]').click()
    //cy.wait(1000)
    // Umesto wait (koji se jako retko koristi) ide funkcija koja ceka da se prethodni korak izvrsi (dobije GET respond) tek onda nastavlja sledeci korak
    authPage.login(EMAIL.EXISTING, EMAIL.PASSWORD)
        cy.server()
        cy.route(Cypress.env('apiUrl') + '/galleries?page=1&term=').as('galleries')
        cy.wait('@galleries')
    cy.get('.nav-link').contains('Logout').should('be.visible').click()    
  })
  
  it('GA-22 : Login - invalid data - username ', () => {
    cy.visit('/') 
    //cy.visit('/') 
    cy.get(".nav-link").contains("Login").click()
    //cy.get('#email').clear()
    //cy.get('#email').type('ivanflygmail.com')
    //cy.get('#password').clear()
    //cy.get('#password').type('0637379360')
    cy.get('#email').clear()
    authPage.email.type('test')
    cy.get('#password').clear()
    authPage.password.type('0637379360')
    cy.get("[type=submit]").contains("Submit").click()
    //cy.get(".alert").contains("Bad Credentials").should('be.visible')
    authPage.email.then(($input) => {
      expect($input[0].validationMessage).to.eq('Please include an \'@\' in the email address. \'test\' is missing an \'@\'.')
  })
    //cy.get(".alert").contains("Bad Credentials").should('be.visible')
    })

  

  it('GA-25 : Login - invalid data - password', () => {
      //cy.visit('/')
      cy.get('.nav-link').contains('Login').click()
      // cy.get('#email').type('ivanfly1986@gmail.com')
      // cy.get('#password').type(password)
      authPage.email.type(EMAIL.EXISTING)
      authPage.password.type(password)
      cy.get('[type=submit]').click()
      cy.get(".alert").should('be.visible')
                      .should('have.text', 'Bad Credentials')
                      .should('have.class', 'alert')
  })

  it('GA-26 : Login - invalid data - username and password', () => {
    //cy.visit('/')
    cy.get('.nav-link').contains('Login').click()
    // cy.log(email)
    // cy.get('#email').type(email)
    // cy.get('#password').type(password)
    authPage.email.type(email)
    authPage.password.type(password)
    cy.get('[type=submit]').click()
    cy.get(".alert").should('be.visible')
                      .should('have.text', 'Bad Credentials')
                      .should('have.class', 'alert')
  })

  it('GA-32 : User is logged', () => {
    //cy.visit('/')
    //cy.get('.nav-link').contains('Login').click()
    // cy.get('#email').type('ivanfly1986@gmail.com')
    // cy.get('form > :nth-child(2)').type('Gucevogucevo1')
    // cy.get('[type=submit]').click()
    cy.get('#email').clear()
    cy.get('#password').clear()
    authPage.login(EMAIL.EXISTING, EMAIL.PASSWORD)
        cy.server()
        cy.route(Cypress.env('apiUrl') + '/galleries?page=1&term=').as('galleries')
        cy.wait('@galleries')
    cy.get('.nav-link').contains('Logout').should('be.visible')
    cy.url().should('eq', url1)
  })
})