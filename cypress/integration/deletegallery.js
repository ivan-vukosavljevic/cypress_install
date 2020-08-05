const { EMAIL } = require("../fixtures/constants")
import { createGalleryPage } from '../page_object/createGallery.page';
import { deletPage } from '../page_object/deleteGallery.page';
let img2 = "https://thewallpaper.co//wp-content/uploads/2019/09//reptiles-lizard-cute-pc-tropical-pet-images-animals-samsung-green-color-jpg.jpg";

describe('Delete gallery', () => {
  // beforeEach(() => {
  //     cy.server()
  //     cy.route('GET', Cypress.env('apiUrl')  +'/galleries?page=1&term=', 'fixture:all.json').as('stubing')
  // })

  beforeEach(() => {
    
    cy.server()
    cy.route('GET', Cypress.env('apiUrl')  + '/my-galleries?page=1&term=').as('stubing')
})
  
  // it('GA-33 : Home Page - paginacija', () => {
  //   cy.loginBe(EMAIL.EXISTING, EMAIL.PASSWORD)
  // for (var i = 0; i < 11; i++) {
  //   cy.visit('/create')
  //   createGalleryPage.create('New Gallery - Cypress', 'New Description - Cypress', img2)
  // }
  // })

  // it('Delete galleries', () => {
  //   let count = 3
  //   cy.loginBe(EMAIL.EXISTING, EMAIL.PASSWORD)
  //   for (var i = 0; i < count; i++) {
  //     cy.visit('/create')
  //     createGalleryPage.create('New Gallery - Cypress', 'New Description - Cypress', img2)
  //   }
  //   cy.visit('/my-galleries')
  //   cy.wait('@stubing')
  //   cy.get('@stubing')
  //   .its('response').then((resp)=>{
  //     for(var i=0; i<count; i++){
  //     let useCaseID = resp.body.galleries[i].id
  //     cy.request({
  //         method: 'DELETE',
  //         url:`${Cypress.env('apiUrl')}/galleries/${useCaseID}`,
  //         form: true,
  //         followRedirect: true,
  //         headers: {
  //             authorization: `Bearer ${window.localStorage.getItem('token')}`
  //         }
  //         })
  //     }
  //     })
  //     cy.visit('/my-galleries')
  //     cy.get('.container').contains('No galleries found').should('be.visible')
  //   // .its('response')
  //   // .then((response) => {
  //   //   cy.log(response.body.galleries[0].id)
  //   //   for (var i = 0; i < 11; i++) {
  //   //     // cy.visit('/my-galleries')
  //   //     // cy.get('.box-title').eq(0).click()
  //   //     // cy.wait(1000)
  //   //     // cy.get('.btn').contains('Delete Gallery').click()
        
  //   //   // Brisanje galerije pomocu id
  //   //     let useCaseId = response.body.galleries[i].id
  //   //     cy.request({ 
  //   //     method: 'DELETE',
  //   //     url: `${Cypress.env('apiUrl')}/galleries/${useCaseId}`,
  //   //     // url: Cypress.env('apiUrl') + '/galleries/' + response.body.galleries[i].id,
  //   //     form: true,
  //   //     followRedirect: true,
  //   //     headers: {
  //   //       authorization: `Bearer ${window.localStorage.getItem('token')}`,
  //   //     }
  //   //   })
  //   //   }
  //   // })
  // })

  it('Delete galleries', () => {
    let count = 3
    cy.loginBe(EMAIL.EXISTING, EMAIL.PASSWORD)
    for (var i = 0; i < count; i++) {
      cy.visit('/create')
      createGalleryPage.create('New Gallery - Cypress', 'New Description - Cypress', img2)
    }
    cy.visit('/my-galleries')
    cy.wait('@stubing')
    cy.get('@stubing')
    .its('response').then((resp)=>{
      for(var i=0; i<count; i++){
      let useCaseID = resp.body.galleries[i].id
      cy.request({
        deletPage.delete()
          // method: 'DELETE',
          // url:`${Cypress.env('apiUrl')}/galleries/${useCaseID}`,
          // form: true,
          // followRedirect: true,
          // headers: {
          //     authorization: `Bearer ${window.localStorage.getItem('token')}`
          // }
          })
      }
      })
      cy.visit('/my-galleries')
      cy.get('.container').contains('No galleries found').should('be.visible')
  })

})
