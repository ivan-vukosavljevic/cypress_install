export default class DeletePage {

  get method() {
  return cy.get('DELETE')
}
get url() {
  return cy.get(`${Cypress.env('apiUrl')}/galleries/${useCaseID}`)
}

get form() {
  return cy.get(true)
}

get followRedirect() {
  return cy.get(true)
}

get headers() {
  return cy.get({
    authorization: `Bearer ${window.localStorage.getItem('token')}`
})
}

delete(){
  this.method()
  this.url()
  this.form()
  this.followRedirect()
  this.headers()
}


}

export const deletePage = new DeletePage()

// for(var i=0; i<count; i++){
//   let useCaseID = resp.body.galleries[i].id
//   cy.request({
//       method: 'DELETE',
//       url:`${Cypress.env('apiUrl')}/galleries/${useCaseID}`,
//       form: true,
//       followRedirect: true,
//       headers: {
//           authorization: `Bearer ${window.localStorage.getItem('token')}`
//       }
//       })}