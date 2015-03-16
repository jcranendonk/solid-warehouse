import React from 'react';
let {div, button, input, table, thead, tbody, tr, th, td} = React.DOM;
import {default as invStore, actions as invActions} from '../store/inventory';
import {default as editStore, actions as editActions} from '../store/edits';
import {default as uiStore, actions as uiActions} from '../store/ui';
import {compareAscending, compareDescending} from '../utils';
import {keys} from '../constants';

let ItemCell = React.createFactory(React.createClass({
    displayName: 'ItemCell',
    mixins: [
        invStore.connectTo('inventory'),
        editStore.connectTo('edits')
    ],
    componentDidUpdate(prevProps, prevState) {
        if (this.refs.input && !this.itemIsNew()) {
            this.refs.input.getDOMNode().select();
        }
    },
    itemIsNew() {
        return !!this.state.edits.getIn(['items', this.props.id, 'isNew'], false);
    },
    handleKey(e) {
        switch (e.keyCode) {
            case keys.enter:
                // invActions.updateItem(this.props.id);
                break;
            case keys.esc:
                editActions.resetItem(this.props.id);
                break;
        }
    },
    handleBlur(e) {
        if (!this.itemIsNew()) {
            editActions.resetItem(this.props.id);
        }
    },
    render() {
        let {id, field} = this.props;
        let item = this.state.inventory.getIn(['items', id]);
        let edits = this.state.edits.getIn(['items', id]);

        // TODO structure info
        if (this.itemIsNew() || (edits && edits.has(field))) {
            return td({key: field},
                        input({
                            type: 'text',
                            ref: 'input',
                            onBlur: this.handleBlur,
                            onKeyDown: this.handleKey,
                            defaultValue: edits.get(field, '')
                        }));
        } else {
            return td({
                        key: field,
                        onDoubleClick: _ => editActions.editField(id, field)
                    }, `${item.get(field, '')}`);
        }
    }
}));

function renderItemRow(id) {
    let cells = [for (field of ['image', 'description', 'inStock'])
                    ItemCell({key: field, id, field})];

    return tr({key: id}, cells);
}

function sortItems(inventory, sortBy) {
    let sortByField = sortBy.get('field') || 'description';
    let sortByDescending = sortBy.get('descending', false);
    if (sortByDescending) {
        return inventory.sortBy(x => x.get(sortByField), compareDescending);
    } else {
        return inventory.sortBy(x => x.get(sortByField), compareAscending);
    }
}

export default React.createFactory(React.createClass({
    displayName: 'Inventory',
    mixins: [
        invStore.connectTo('inventory'),
        editStore.connectTo('edits'),
        uiStore.connectTo('ui')
    ],
    render() {
        let items = this.state.inventory.get('items');
        let sortBy = this.state.ui.getIn(['sorting', 'inventory']);

        let edits = this.state.edits.get('items');

        let stockRows, newRows;
        if (items) {
            stockRows = [for (id of sortItems(items, sortBy).keys()) renderItemRow(id)];
        }
        if (edits) {
            let newItems = edits.filter(item => item.get('isNew'));
            newRows = [for (id of newItems.keys()) renderItemRow(id)];
        }

        return div({},
            table({},
                thead({},
                    tr({},
                        th({}, ''),
                        th({onClick: _ => uiActions.sortInventory('description')},
                            'Description'),
                        th({onClick: _ => uiActions.sortInventory('inStock')},
                            '# in stock'))),
                tbody({}, stockRows),
                tbody({}, newRows)),
            button({onClick: _ => editActions.addItem()}, '+')
        );
    }
}));
