const { EMAIL } = require("../fixtures/constants")
import { createGalleryPage } from '../page_object/createGallery.page';
import { authPage } from '../page_object/login.page';
import { deletPage } from '../page_object/deleteGallery.page';
import { eq } from 'cypress/types/lodash';
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
    cy.get('.box-title').eq(0).click()
    cy.wait(1000)
    // cy.visit('/galleries/1607')
    cy.get('.btn').contains('Edit Gallery').click()
    cy.wait(1000)
    cy.get('[type="button"]').contains('Add image').click()
    cy.get('.fas').eq(0).click()
  })

})