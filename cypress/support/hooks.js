// little reusable functions for our tests
// like "resetData" and "visitSite"
export function addTodo(input) {
    cy.get('.new-todo').type(input + '{enter}')
}
