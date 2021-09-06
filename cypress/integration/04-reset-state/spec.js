/// <reference types="cypress" />
/**
 * Adds a todo item
 * @param {string} text
 */
const addItem = (text) => {
  cy.get('.new-todo').type(`${text}{enter}`)
}

describe('reset data using XHR call', () => {
  beforeEach(() => {
    cy.request('POST', '/reset', {
      todos: []
    })
  })

  beforeEach(() => {
    // application should be running at port 3000
    // and the "localhost:3000" is set as "baseUrl" in "cypress.json"
    // TODO call /reset endpoint with POST method and object {todos: []}
    cy.visit('/')
  })

  it('adds two items', () => {
    addItem('first item')
    addItem('second item')
    cy.get('li.todo').should('have.length', 2)
  })
})

describe('reset data using cy.writeFile', () => {
  beforeEach(() => {
    const emptyTodos = {
      todos: []
    }
    const str = JSON.stringify(emptyTodos, null, 2) + '\n'
    // TODO write file "todomvc/data.json" with stringified todos object
    // file path is relative to the project's root folder
    // where cypress.json is located
    cy.writeFile('todomvc/data.json', str, 'utf-8')
    cy.visit('/')
  })

  it('adds two items', () => {
    addItem('first item')
    addItem('second item')
    cy.get('li.todo').should('have.length', 2)
  })
})

describe('reset data using a task', () => {
  beforeEach(() => {
    // TODO call a task to reset data
    cy.task('resetData')
    cy.visit('/')
  })

  it('adds two items', () => {
    addItem('first item')
    addItem('second item')
    cy.get('li.todo').should('have.length', 2)
  })
})

describe('set initial data', () => {
  it('sets data to complex object right away', () => {
    // TODO call task and pass an object with todos
    cy.task('resetData', {
      todos: [
        {
          id: '123456abc',
          completed: true,
          title: 'reset data before test'
        }
      ]
    }) 
    cy.visit('/')
    // check what is rendered
    cy.get('li.todo').should('have.length', 1)
  })

  it('sets data using fixture', () => {
    // TODO load todos from "cypress/fixtures/two-items.json"
    // and then call the task to set todos
    cy.fixture('two-items').then((todos) => {
      // "todos" is an array
      cy.task('resetData', { todos })
    })
    cy.visit('/')
    // check what is rendered
    cy.get('li.todo').should('have.length', 2)
  })
})
