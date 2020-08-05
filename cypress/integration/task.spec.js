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



describe('Task1', () => {

  before(() => {
    cy.visit('/')
    cy.get('.nav-link').contains('Login').click()
    authPage.login(EMAIL.EXISTING, EMAIL.PASSWORD)
        cy.server()
        cy.route(Cypress.env('apiUrl') + '/galleries?page=1&term=').as('galleries')
        cy.wait('@galleries')
    cy.get('.nav-link').contains('Logout').should('be.visible')
  })

  it('createGallery', () => {
    cy.visit('/create')
    createGalleryPage.create('New Gallery - Cypress', 'New Description - Cypress', img2)
    cy.wait(2000)
    cy.visit('/')
    cy.get('.container').contains('My Galleries').click()
    cy.wait(1000)
    cy.get('.box-title').eq(0).click()
    cy.wait(1000)
    // cy.visit('/galleries/1607')
    cy.get('.btn').contains('Edit Gallery').click()
    cy.wait(1000)
    cy.get('button[type="button"]').contains('Add image').click()
    cy.get('.fas').eq(2).click()
    cy.get('.form-control').eq(2).type(img1)
    cy.get('.btn').contains('Submit').click()
    cy.visit('/my-galleries')
    cy.get('.box-title').eq(0).click()
    cy.wait(1000)
    cy.get('.btn').contains('Delete Gallery').click()
  })

})