// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: true,
    isNCDS: false,
    baseUrl: 'https://dev.excellware.com',
    dybaseUrl: 'https://dev.excellware.com:8443',
    notifyUrl: 'https://dterror.excellware.com:8443/dt/notify/noresponse',
    notifymsg: 'This application is currently unavailable, please try again later.',
    errmsg: 'Invalid or expired token',
    displayNone: 'none',
    displayBlock: 'block',
    selectType: 'please select any one from list',
    httpsPort: ':8443',
    httpPort: ':8888',
    soundFilePath: 'CD/guitest',
    selectFile: 'please select any file',
    localhost: 'localhost',
    street_number: 'street_number',
    route: 'route',
    locality: 'locality',
    administrative_area_level_2: 'administrative_area_level_2',
    administrative_area_level_1: 'administrative_area_level_1',
    country: 'country',
    postal_code: 'postal_code',
    postal_code_suffix: 'postal_code_suffix',
    countryUS: 'US',
    numberPipe: '1.2-2',
    unknownError: 'APPLICATION NOT AVAILABLE',
    serviceNotAvailable: 'DYNAMO TOOLS BY EXCELLWARE',
    formRequiredMessage: 'Please fill all required fields',
    singleEntryGrid: "Please enter all required  <span style='color:#ff6699'>*&nbsp;</span>  fields before saving",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
