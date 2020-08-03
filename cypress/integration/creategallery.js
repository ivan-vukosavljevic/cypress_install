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



describe('Create New Gallery Page', () => {

  before (() => {
    cy.visit('/login')
    authPage.login(EMAIL.EXISTING, EMAIL.PASSWORD)
    cy.server()
        cy.route(Cypress.env('apiUrl') + '/galleries?page=1&term=').as('galleries')
        cy.wait('@galleries')
        cy.get('.nav-link').contains('Create Gallery').click()
    
  })

  afterEach(() => {
    // cy.get().clear()
  })

  it('GA-12 : Create New Gallery Page', () => {
    cy.get('#title').type('New Gallery - Cypress')
    cy.get('#description').type('New Description - Cypress')
    cy.get("[type=url]").type(img1)
    cy.get("[type=button]").contains('Add image').click()
    cy.get("[type=url]").eq(1).type(img2)
    cy.get("[type=submit]").contains('Submit').click()
    cy.url().should('eq', url1)
  })

   
  it.only('GA-33 : Home Page - paginacija', () => {
    for (var i = 0; i < 11; i++) {
      cy.visit('/create')
      createGalleryPage.create('New Gallery - Cypress', 'New Description - Cypress', img2)
    }

    cy.visit('/my-galleries')
    cy.get('.grid').children().should('have.length', 10)
    cy.visit('/create')
    createGalleryPage.create('New Gallery - Cypress', 'New Description - Cypress', img1)
    // cy.route(Cypress.env('apiUrl') + '/my-galleries?page=1&term=').as('mygalleries')
    //     cy.wait('@mygalleries')
    cy.visit('/my-galleries')
    cy.get(".btn").contains('Load More').click()
    //cy.visit('/my-galleries')
    cy.get('.grid').children().should('have.length', 11)

    for (var i = 0; i < 11; i++) {
      cy.visit('/my-galleries')
      cy.get('.box-title').eq(0).click()
      cy.wait(1000)
      cy.get('.btn').contains('Delete Gallery').click()
    }

    cy.visit('/my-galleries')
    cy.get('.container').contains('No galleries found').should('be.visible')
    
  })

  // it('GA-33 : Delete gallery', () => {
  //   for (var i = 0; i < 11; i++) {
  //     cy.visit('/my-galleries')
  //     cy.get('.box-title').eq(0).click()
  //     cy.wait(1000)
  //     cy.get('.btn').contains('Delete Gallery').click()
  //   }
  // })

  
    //createGalleryPage.create('New Gallery - Cypress', 'New Description - Cypress', img2)
    //cy.url().should('eq', url1)
})