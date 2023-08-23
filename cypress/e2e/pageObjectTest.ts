import { onFormLayoutsPage } from "../support/page-objects/form-layouts-page"
import { navigateTo } from "../support/page-objects/navigation-page"
import { Column, onSmartTablePage } from "../support/page-objects/table-page"

describe('Test with Page Objects', () => {

    beforeEach(() => {
        cy.openHomePage()
    })

    it('verifies navigation accross the pages', () => {
        navigateTo.formLayoutsPage()

        navigateTo.datepickerPage()

        navigateTo.smartTablePage()

        navigateTo.tooltipPage()
    })

    it('should submit inline and basic form and select tommorrow in calendar', () => {
        navigateTo.formLayoutsPage()

        const name = 'Aneesa'
        const email = 'a@s.com'

        onFormLayoutsPage.submitInlineForm(name, email)

        navigateTo.datepickerPage()
    })

    it.only('updates data in a table', () => {
        navigateTo.smartTablePage()

        const newAge = '22'

        onSmartTablePage.updateRow(Column.Age, newAge)
            .then((updatedTableRow) => {
                onSmartTablePage.getTableRowValue(updatedTableRow, Column.Age)
                    .should('equal', newAge)
            })
    })
})