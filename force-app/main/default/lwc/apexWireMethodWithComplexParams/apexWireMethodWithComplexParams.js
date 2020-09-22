import { LightningElement, wire } from 'lwc';
import checkApexTypes from '@salesforce/apex/ApexTypesController.checkApexTypes';

export default class ApexWireMethodWithComplexParams extends LightningElement {
    listItemValue = 0;
    numberValue = 50;
    stringValue = 'Some string';

    parameterObject = {
        someString: this.stringValue,
        someInteger: this.numberValue,
        someList: []
    };

    @wire(checkApexTypes, { wrapper: '$parameterObject' })
    apexResponse;

    handleStringChange(event) {
        this.parameterObject = {
            ...this.parameterObject,
            someString: (this.stringValue = event.target.value)
        };
    }

    handleNumberChange(event) {
        this.parameterObject = {
            ...this.parameterObject,
            someInteger: (this.numberValue = parseInt(event.target.value, 10))
        };
    }

    handleListItemChange(event) {
        const someList = [...Array(parseInt(event.target.value, 10))].map(
            () => {
                return {
                    someInnerString: this.stringValue,
                    someInnerInteger: this.numberValue
                };
            }
        );

        this.parameterObject = {
            ...this.parameterObject,
            someList
        };
    }
}
