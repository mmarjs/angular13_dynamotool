import { Component, OnInit } from '@angular/core';
import { ItemMaintenanceService } from './itemMaintenance.service';
import { NgForm, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
@Component({
    selector: 'app-iteminquiry',
    templateUrl: './itemMaintenance.component.html',
    styleUrls: ['./itemMaintenance.component.css'],
    providers: [ItemMaintenanceService]
})
export class ItemMaintenanceComponent implements OnInit {
    loader: string;
    title: string;
    companyName: string;
    editViewData: any;
    editTreemenu: any;
    birthDate: string;
    birthTime: string;
    form: FormGroup;
    tokenNo: string;
    constructor(private _itemMaintenanceService: ItemMaintenanceService, private _activeRoute: ActivatedRoute,
        private _router: Router, private titleService: Title) {

    }

    ngOnInit() {
    this.title = this._activeRoute.snapshot.queryParams['title'];
    this.companyName = localStorage.getItem('companyName');
    this.titleService.setTitle(this._activeRoute.snapshot.queryParams['title']);


        this.editViewData = {
            type: 'editView',
            title: 'Example View',
            rows: [
                {
                    fieldName: 'TEXT_A',
                    description: 'TEXT_A',
                    type: 'text',
                    maxlength: '10'
                },
                {
                    fieldName: 'TEXT_L',
                    description: 'TEXT_B_L',
                    type: 'text',
                    maxlength: '10'
                },
                {
                    fieldName: 'TEXT_R',
                    description: 'TEXT_R',
                    type: 'text',
                    maxlength: '10'
                },
                {
                    fieldName: 'NUMBER_N',
                    description: 'Number_n',
                    type: 'number',
                    value: '0',
                    min: '5',
                    max: '9999999',
                    comma: true
                },
                {
                    fieldName: 'NUMBER_B',
                    description: 'Number_b',
                    type: 'number',
                    value: '.00',
                    step: '.01',
                    comma: true
                },
                {
                    fieldName: 'NUMBER_NTYPE',
                    description: 'Number_ntype',
                    type: 'number',
                    value: '0',
                    max: '9999999',
                    step: 'any'
                },
                {
                    fieldName: 'DATE_U3',
                    description: 'Date_J',
                    type: 'date',
                    min: '2018-04-08',
                    max: '2018-06-07'
                },
                {
                    fieldName: 'DATE_C8',
                    description: 'DATE_C8_D',
                    type: 'date'
                },
                {
                    fieldName: 'DATE_N6',
                    description: 'DATE_N6_S',
                    type: 'date'
                },
                {
                    fieldName: 'DATE_C6',
                    description: 'DATE_C6_s',
                    type: 'date'
                },
                {
                    fieldName: 'TIME',
                    description: 'Time',
                    type: 'time',
                    value: '00:00:00'
                },
                {
                    fieldName: 'YN',
                    description: 'Yn',
                    type: 'switch',
                    value: false
                },
                {
                    fieldName: 'CODES',
                    description: 'Codes',
                    type: 'select',
                    options: [{
                            value: 'AAA',
                            show: 'AAA'
                        },
                        {
                            value: 'BBB',
                            show: 'BBB'
                        },
                        {
                            value: 'CCC',
                            show: 'CCC',
                            selected: true
                        },
                        {
                            value: 'DDD',
                            show: 'DDD'
                        },
                        {
                            value: 'EEE',
                            show: 'EEE'
                        }
                    ]
                },
                {
                    fieldName: 'STATE',
                    description: 'State',
                    type: 'select',
                    options: [{
                            value: 'OH',
                            show: 'OH Ohio'
                        },
                        {
                            value: 'PA',
                            show: 'PA Pennsylvania'
                        },
                        {
                            value: 'NY',
                            show: 'NY New York'
                        },
                        {
                            value: 'NJ',
                            show: 'NJ New Jersey'
                        }
                    ]
                },
                {
                    fieldName: 'REPEAT',
                    index: 1,
                    description: 'Repeat[1]',
                    type: 'select',
                    options: [{
                            value: '0',
                            show: '0'
                        },
                        {
                            value: '1',
                            show: '1'
                        },
                        {
                            value: '2',
                            show: '2'
                        },
                        {
                            value: '3',
                            show: '3'
                        },
                        {
                            value: '4',
                            show: '4'
                        },
                        {
                            value: '5',
                            show: '5',
                            selected: true
                        },
                        {
                            value: '6',
                            show: '6'
                        },
                        {
                            value: '7',
                            show: '7'
                        },
                        {
                            value: '8',
                            show: '8'
                        },
                        {
                            value: '9',
                            show: '9'
                        }
                    ]
                },
                {
                    fieldName: 'REPEAT',
                    index: 2,
                    description: 'Repeat[2]',
                    type: 'select',
                    options: [{
                            value: '0',
                            show: '0'
                        },
                        {
                            value: '1',
                            show: '1'
                        },
                        {
                            value: '2',
                            show: '2'
                        },
                        {
                            value: '3',
                            show: '3'
                        },
                        {
                            value: '4',
                            show: '4'
                        },
                        {
                            value: '5',
                            show: '5'
                        },
                        {
                            value: '6',
                            show: '6'
                        },
                        {
                            value: '7',
                            show: '7',
                            selected: true
                        },
                        {
                            value: '8',
                            show: '8'
                        },
                        {
                            value: '9',
                            show: '9'
                        }
                    ]
                },
                {
                    fieldName: 'REPEAT',
                    index: 3,
                    description: 'Repeat[3]',
                    type: 'select',
                    options: [{
                            value: '0',
                            show: '0'
                        },
                        {
                            value: '1',
                            show: '1'
                        },
                        {
                            value: '2',
                            show: '2'
                        },
                        {
                            value: '3',
                            show: '3'
                        },
                        {
                            value: '4',
                            show: '4'
                        },
                        {
                            value: '5',
                            show: '5'
                        },
                        {
                            value: '6',
                            show: '6'
                        },
                        {
                            value: '7',
                            show: '7'
                        },
                        {
                            value: '8',
                            show: '8'
                        },
                        {
                            value: '9',
                            show: '9'
                        }
                    ]
                }
            ]
        };

        this.loader = 'none';
    }
    saveItemMaintenance(item: NgForm) {

    }
}
