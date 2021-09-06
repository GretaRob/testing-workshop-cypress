/// <reference types="cypress" />
import {
  addTodo
} from '../../support/hooks'

beforeEach(() => {
  cy.visit('/')
})
it('loads', () => {
  // application should be running at port 3000
  
  cy.contains('h1', 'todos')
})

// IMPORTANT ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️
// remember to manually delete all items before running the test
// IMPORTANT ⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️⚠️

it('adds two items', () => {
  // repeat twice
  //    get the input field
  //    type text and "enter"
  //    assert that the new Todo item
  //    has been added added to the list
  // cy.get(...).should('have.length', 2)
  cy.get('.new-todo').type('learn{enter}')
  cy.get('.new-todo').type('study{enter}')
  cy.get('li.todo').should('have.length', 2)
})

it('can mark an item as completed', () => {
  // adds a few items
  // marks the first item as completed
  // confirms the first item has the expected completed class
  // confirms the other items are still incomplete
  cy.get('.new-todo').type('learn{enter}')
  addTodo('study')
  cy.contains('li.todo', 'learn').should('exist').find('.toggle').check()
  cy.contains('li.todo', 'learn').should('have.class', 'completed')
  cy.contains('study').should('not.have.class', 'completed')
  
})

it('can delete an item', () => {
  // adds a few items
  addTodo('task1')
  addTodo('task2')

  // deletes the first item
  cy.contains('li.todo', 'task1').should('exist').find('.destroy').click({force: true})
  // use force: true because we don't want to hover
  // confirm the deleted item is gone from the dom
  cy.contains('li.todo', 'task1').should('not.exist')
  // confirm the other item still exists
  cy.contains('li.todo', 'task2').should('exist')
})

it('can add many items', () => {
  const N = 5
  for (let k = 0; k < N; k += 1) {
    // add an item
    addTodo('task1')
    // probably want to have a reusable function to add an item!
  }
  // check number of items
  cy.get('li.todo').should('have.length', N)
})

it('adds item with random text', () => {
  // use a helper function with Math.random()
  // or Cypress._.random() to generate unique text label
  // add such item
  const randomtxt = Cypress._.random()
  addTodo(randomtxt)
  // and make sure it is visible and does not have class "completed"
  cy.contains('li.todo', randomtxt).should('be.visible').and('not.have.class', 'completed')
})

it('starts with zero items', () => {
  // check if the list is empty initially
  cy.get('li.todo').should('have.length', 0)
  //   find the selector for the individual TODO items
  //   in the list
  //   use cy.get(...) and it should have length of 0
  //   https://on.cypress.io/get
  cy.get('.li.todo>li').should('have.length', 0)
})

it.only('does not allow adding blank todos', () => {
  // https://on.cypress.io/catalog-of-events#App-Events
  cy.on('uncaught:exception', (err) => {
    // check e.message to match expected error text
    // return false if you want to ignore the error
    if (err.message.includes('Cannot add a blank todo')) {
      return false
  }

  // try adding an item with just spaces

})

})

// what a challenge?
// test more UI at http://todomvc.com/examples/vue/
