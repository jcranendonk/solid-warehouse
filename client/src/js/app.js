require('babel/polyfill');
require('file?name=index.html!../index.html');

import {h, diff, patch, create} from 'virtual-dom';
import document from 'global/document';

let tree = h('div', 'hello wargglblgg');
let rootNode = create(tree);
document.body.appendChild(rootNode);
