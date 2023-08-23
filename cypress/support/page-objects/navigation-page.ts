//ul.expanded, ul.collapsed

export class Navigation {
    private expandMenuIfCollapsed(menuName: string): void {
        cy.contains(menuName).then((menu) => {
            cy.wrap(menu).find('nb-icon.expand-state')
            .invoke('attr', 'ng-reflect-icon')
            .then((icon) => {
                if (icon === 'chevron-left-outline')
                    cy.wrap(menu).click()
            })
        })
    }

    formLayoutsPage() {
        this.expandMenuIfCollapsed('Forms')
        cy.contains('Form Layouts').click()
    }

    datepickerPage() {
        this.expandMenuIfCollapsed('Forms')
        cy.contains('Datepicker').click()
    }

    smartTablePage() {
        this.expandMenuIfCollapsed('Tables & Data')
        cy.contains('Smart Table').click()
    }

    tooltipPage() {
        this.expandMenuIfCollapsed('Modal & Overlays')
        cy.contains('Tooltip').click()
    }
}

export const navigateTo = new Navigation()