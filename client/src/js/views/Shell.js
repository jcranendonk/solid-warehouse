import React from 'react';
let {div} = React.DOM;
import Inventory from './Inventory';

export default React.createFactory(React.createClass({
    displayName: 'Shell',
    render() {
        return div({}, Inventory({}));
    }
}));
