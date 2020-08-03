export default class CreateGalleryPage {

  get title() {
  return cy.get('#title')
}
get description() {
  return cy.get('#description')
}

get url() {
  return cy.get('input[type="url"]')
}

get submitButton() {
  return cy.get('button[type="submit"]').contains('Submit')
}

create(title, description, url){
  this.title.type(title)
  this.description.type(description)
  this.url.type(url)
  this.submitButton.click()
}


}

export const createGalleryPage = new CreateGalleryPage()