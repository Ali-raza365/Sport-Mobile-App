// ES6 module syntax
import React from 'react';


import LocalizedStrings from 'react-native-localization';
import eng from './eng.json';
import spanish from './spanish.json'

// CommonJS syntax
// let LocalizedStrings  = require ('react-native-localization');

let strings = new LocalizedStrings({
    en:eng,
    sp:spanish,
});

export default strings