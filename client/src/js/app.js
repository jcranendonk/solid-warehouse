require('babel/polyfill');
require('file?name=index.html!../index.html');

import React from 'react';
import document from 'global/document';
import Shell from './views/Shell';

React.render(Shell({}), document.body);
