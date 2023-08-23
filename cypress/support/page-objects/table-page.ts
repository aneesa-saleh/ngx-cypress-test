export enum Column {
    ID = 'id',
    FirstName = 'firstName',
    LastName = 'lastName',
    Username = 'username',
    Email = 'email',
    Age = 'age',
}

export class SmartTablePage {
    private columnIndexes = {
        id: 1,
        firstName: 2,
        lastName: 3,
        username: 4,
        email: 5,
        age: 6,
    }

    /** Updates table row and returns the updated row */
    updateRow(column: Column, newValue: string) {
        return cy.get('tbody').contains('tr', 'Larry').then((tableRow) => {
            cy.wrap(tableRow).find('.nb-edit').click()
            cy.wrap(tableRow).find(`[ng-reflect-name="${column}"]`).clear().type(newValue)
            cy.wrap(tableRow).find('a.ng2-smart-action-edit-save').click()

            return cy.wrap(tableRow)
        })
    }

    getTableRowValue(tableRow: JQuery<HTMLDivElement>, column: Column) {
        const columnIndex = this.columnIndexes[column];
        return cy.wrap(tableRow)
            .find('td')
            .eq(columnIndex)
            .invoke('text')
    }
}

export const onSmartTablePage = new SmartTablePage()