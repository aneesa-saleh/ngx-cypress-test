/// <reference types="cypress" />

import { navigateTo } from "../support/page-objects/navigation-page"

describe.skip('Our first suite', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it ('test the first time', () => {
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid').then(gridForm => {
            const emailLabelFirst = gridForm.find('[for="inputEmail1"]').text();
            const passwordLabelFirst = gridForm.find('[for="inputPassword2"]').text();

            expect(emailLabelFirst).to.equal('Email')
            expect(passwordLabelFirst).to.equal('Password')
        })
    })

    it ('interacts with radiobuttons', () => {
        cy.contains('Forms').click()
        cy.contains('Form Layouts').click()

        cy.contains('nb-card', 'Using the Grid')
            .find('nb-radio label')
            .then((radioButtons) => {
                cy.wrap(radioButtons)
                    .first()
                    .click()

                cy.wrap(radioButtons)
                    .first()
                    .find('input[type="radio"]')
                    .should('be.checked')

                cy.wrap(radioButtons)
                    .eq(1)
                    .find('input[type="radio"]')
                    .should('not.be.checked')

                cy.wrap(radioButtons)
                    .eq(2)
                    .find('input[type="radio"]')
                    .should('be.disabled')

            })
    })

    it('selects all checkboxes', () => {
        cy.contains('Modal & Overlays').click()
        cy.contains('Toastr').click()

        cy.get('nb-checkbox label').click({ multiple: true });
    })

    it('selects future date from datepicker', () => {
        cy.contains('Forms').click()
        cy.contains('Datepicker').click()

        const date = new Date()

        date.setDate(date.getDate() + 40)

        const futureDay = date.getDate()
        const futureMonth = date.toLocaleString('default', { month: 'short' });

        cy.contains('nb-card', 'Common Datepicker')
            .find('input')
            .click();

        function selectNewMonth() {
            cy.get('nb-calendar-navigation')
            .invoke('attr', 'ng-reflect-date')
            .then((dateAttribute) => {
                if (!dateAttribute.includes(futureMonth)) {
                    cy.get('[data-name="chevron-right"]').click()
                    selectNewMonth()
                }
            })
        }

        selectNewMonth()

        cy.get('nb-calendar-day-cell.day-cell.ng-star-inserted').contains(new RegExp(futureDay.toString())).click()
    })

    it('changes color theme when theme is selected from dropdown', () => {
        
        const colorThemeClass = {
            Dark: 'nb-theme-dark',
            Cosmic: 'nb-theme-cosmic',
            Corporate: 'nb-theme-corporate',
            Light: 'nb-theme-default',
        }

        cy.get('nav nb-select').then((dropdown) => {

            cy.wrap(dropdown).click()
            
            cy.get('.options-list nb-option').each((option, index, list) => {
                const optionText = option.text().trim()

                cy.wrap(option).click()
                
                cy.wrap(dropdown).should('contain.text', optionText)

                cy.get('body').should('have.class', colorThemeClass[optionText])

                if (index < list.length - 1)
                    cy.wrap(dropdown).click()
            })
        })
        

    })

    it('updates data in a table', () => {
        navigateTo.smartTablePage()

        cy.get('tbody').contains('tr', 'Larry').then((tableRow) => {
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find('[ng-reflect-name="age"]').clear().type('25')
            cy.wrap(tableRow).find('a.ng2-smart-action-edit-save').click()
            cy.wrap(tableRow).find('td').eq(6).should('have.text', '25')
        })
    })

    it('adds a new row to the table', () => {
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        const newRowData = {
            id: '500',
            firstName: 'Hadiza',
            lastName: 'Ibrahim',
            username: 'hadi',
            email: 'hadi@spec.com',
            age: '28'
        }
        // click the add button
        cy.get('a.ng2-smart-action-add-add').click()

        // fill the form
        cy.get('thead tr[ng2-st-thead-form-row]').then((formRow) => {
            cy.wrap(formRow).find('input[ng-reflect-name="id"]').type(newRowData.id)
            cy.wrap(formRow).find('input[ng-reflect-name="firstName"]').type(newRowData.firstName)
            cy.wrap(formRow).find('input[ng-reflect-name="lastName"]').type(newRowData.lastName)
            cy.wrap(formRow).find('input[ng-reflect-name="username"]').type(newRowData.username)
            cy.wrap(formRow).find('input[ng-reflect-name="email"]').type(newRowData.email)
            cy.wrap(formRow).find('input[ng-reflect-name="age"]').type(newRowData.age)

            // click the save button
            cy.wrap(formRow).find('a.ng2-smart-action-add-create').click()
        })

        // verify that we can find the newly added row with correct data

        // find row containing our id
        cy.contains('td', new RegExp(`^${newRowData.id}$`))
            .parent('tr')
            .then((newRow) => {
                // row should have only one td matching each data item
                Object.keys(newRowData).forEach((field) => {
                    cy.wrap(newRow).contains('td', new RegExp(`^${newRowData[field]}$`))
                        .should('have.length', 1)
            })
            
        })
    })

    it('should filter results from column filters', () => {
        cy.contains('Tables & Data').click()
        cy.contains('Smart Table').click()

        cy.get('th.age input').type('20')

        cy.wait(1000)

        cy.get('td:nth-child(7)')
            .each((td) => {
                expect(td.text()).to.match(/^20$/)
            })
    })

    it('shows tooltip', () => {
        cy.contains('Modal & Overlays').click()
        cy.contains('Tooltip').click()

        cy.contains('button', 'Show Tooltip')
            .trigger('mouseenter')

        cy.get('nb-tooltip')
            .should('contain.text', 'This is a tooltip')
        
    })

})