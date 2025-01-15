describe('Activity5 To-Do List Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/activity5');
  });

  it('should render the To-Do List header', () => {
    cy.contains('h1', 'To-Do List').should('be.visible');
    cy.wait(3000); // 3-second delay
  });

  it('should add a task when the Add button is clicked', () => {
    cy.get('input[placeholder="Add a task"]').type('New Task');
    cy.contains('button', 'Add').click();

    // Check if the task is added
    cy.contains('li', 'New Task').should('be.visible');
    cy.wait(3000); // 3-second delay
  });

  it('should display an error if the input is empty and Add button is clicked', () => {
    cy.contains('button', 'Add').click();
    cy.contains('Task cannot be empty!').should('be.visible');
    cy.wait(3000); // 3-second delay
  });

  it('should toggle the task completion state when clicked', () => {
    cy.get('input[placeholder="Add a task"]').type('Task to Toggle');
    cy.contains('button', 'Add').click();

    // Toggle the task
    cy.contains('Task to Toggle').click();
    cy.contains('✓ Task to Toggle').should('be.visible');

    // Wait to observe toggle
    cy.wait(3000); // 3-second delay

    // Untoggle the task
    cy.contains('✓ Task to Toggle').click();
    cy.contains('Task to Toggle').should('be.visible');
    cy.wait(3000); // 3-second delay
  });

  it('should remove a task when the Remove button is clicked', () => {
    cy.get('input[placeholder="Add a task"]').type('Task to Remove');
    cy.contains('button', 'Add').click();

    // Wait for the task to appear
    cy.contains('li', 'Task to Remove').should('be.visible');
    cy.wait(3000); // 3-second delay

    // Remove the task
    cy.contains('li', 'Task to Remove')
      .contains('button', 'Remove')
      .click();

    // Wait to observe removal
    cy.wait(3000); // 3-second delay

    // Confirm the task is removed
    cy.contains('Task to Remove').should('not.exist');
  });
});
