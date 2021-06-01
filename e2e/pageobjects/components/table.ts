import { By } from 'selenium-webdriver';
import { by, ElementFinder, element } from 'protractor';

import { Component } from './component';
import { TableRow } from './table-row';
import * as className from './className';
import { waitForInvisibilityOfBlockUI, waitForVisibilityOfElement } from '../common/wait.po';

export class Table extends Component {

    private tablePaginator: ElementFinder;
    private itemsPerPageDropdown: ElementFinder;

    constructor(locator: By) {
        super(locator);
        this.tablePaginator = element(locator).all(by.tagName('p-paginator')).first();
        this.itemsPerPageDropdown = element(locator).all(by.tagName('p-paginator')).first().all(by.tagName('p-dropdown')).first();
    }

    async selectCellByText(searchTextValue: string): Promise<void> {
        const table = this.getElement();
        const rows = table.all(by.css('tbody tr'));
        const rowCount = await rows.count();
        for ( let i = 0; i < rowCount; ++i ) {
            const cells = rows.get(i).all(by.css('td'));
            const cellCount = await cells.count();
            for ( let j = 0; j < cellCount; ++j ) {
                const cell = cells.get(j);
                const cellText = await cell.getText();
                if (cellText === searchTextValue) {
                    await cell.click();
                }
            }
        }
    }

    async getRowAndCellValue(rowNumber: number, cellNumber: number): Promise<string> {
        const row = await this.getRow(rowNumber);
        const cell = await row.getCell(cellNumber);
        if (cell !== undefined) {
            const cellElement =  cell.getElementFinder();
            if (cellElement !== undefined) {
              return await cellElement.getText();
            }
        }
        throw new Error('Row ' + rowNumber + ' does not exist in table!');
    }

    async getRow(rowNumber: number): Promise<TableRow> {
        const rows = await this.getRows();
        if (rowNumber > rows.length - 1) {
            throw new Error('Row ' + rowNumber + ' does not exist in table!');
        }
        return rows[rowNumber];
    }

    async getRowCount(): Promise<number> {
        await waitForVisibilityOfElement(this.getElement());
        const rows = await this.getRows();
        return Promise.resolve(rows.length);
    }

    async getRows(): Promise<Array<TableRow>> {
        const tableRows = await this.getElement().all(by.css('.ui-table-scrollable-body-table .ui-table-tbody')).all(by.tagName('tr'));
        const tableRowsArray = new Array<TableRow>();
        for (const elementFinder of tableRows) {
            if (elementFinder !== null) {
                tableRowsArray.push(new TableRow(elementFinder.locator, elementFinder));
            }
        }
        return tableRowsArray;
    }

    async isEmpty(): Promise<boolean> {
        const tableRows = await this.getElement().all(by.tagName('table')).all(by.tagName('tr'));
        return Promise.resolve(tableRows.length <= 1);
    }

    async isColumnPresent(headerName: string): Promise<boolean> {
        if (this.getColumnHeader(headerName) != null) {
            return Promise.resolve(true);
        }
        return Promise.resolve(false);
    }

    async getColumnHeader(headerName: string): Promise<ElementFinder> {
        const header = await this.getElement().all(by.tagName('table')).all(by.tagName('th'));
        for ( let i = 0; i < header.length; ++i ) {
            const cellText = await header[i].getText();
            if (cellText === headerName) {
                return Promise.resolve(header[i]);
            }
        }
        return Promise.resolve(null);
    }

    async clickHeader(headerName: string): Promise<void> {
        const header = await this.getColumnHeader(headerName);
        await header.click();
    }

    async clickPaginatorNavigation(navigation: string): Promise<void> {
        switch (navigation) {
            case 'first':
                await this.tablePaginator.all(by.className(className.paginatorFirst)).first().click();
                break;
            case 'previous':
                await this.tablePaginator.all(by.className(className.paginatorPrevious)).first().click();
                break;
            case 'next':
                await this.tablePaginator.all(by.className(className.paginatorNext)).first().click();
                break;
            case 'last':
                await this.tablePaginator.all(by.className(className.paginatorLast)).first().click();
                break;
            default:
                throw new Error('Navigation ' + navigation + 'not found!');
        }
    }

    async selectItemsPerPage(value: string): Promise<void> {
        this.itemsPerPageDropdown.click();
        await waitForVisibilityOfElement(this.itemsPerPageDropdown.all(by.tagName('ul')).first());
        const menuList = await this.itemsPerPageDropdown.all(by.tagName('li'));
        for ( let i = 0; i < menuList.length; ++i ) {
            const cellText = await menuList[i].getText();
            if (cellText === value) {
                return await menuList[i].click();
            }
        }
        throw new Error('Menu ' + value + ' does not exist in dropdown!');
    }

    async clickHyperlink(rowNumber: number, cellNumber: number): Promise<void> {
        const row = await this.getRow(rowNumber);
        const cell = await row.getCell(cellNumber);
        if (cell !== undefined) {
            const cellElement =  cell.getElementFinder();
            if (cellElement !== undefined) {
                const link = cellElement.all(by.tagName('a'));
                if (await link.length === 0) {
                    throw new Error('No hyperlink found!');
                }
                return await link.first().click();
            }
        }
        throw new Error('Row ' + rowNumber + ' does not exist in table!');
    }

    async getTableMessage(): Promise<string> {
        await waitForInvisibilityOfBlockUI();
        await waitForVisibilityOfElement(this.getElement());
        const tableMessage = element(by.css('.noResultsText'));
        if (tableMessage) {
            return tableMessage.getText();
        }
        throw new Error('Table message not found!');
    }

}
