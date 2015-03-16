import {fromJS} from 'immutable';
import uuid from 'tiny-uuid';
import createAction from '../action';
import createStore from '../store';
import invStore from './inventory';

let store = createStore({
    'items': {}
});

export default store.public;

let emptyItem = {
    image: '',
    description: '',
    inStock: 0
};

function addItem(item = {}) {
    let id = uuid();
    item = Object.assign({isNew: true}, item, emptyItem);
    store.cursor('items').set(id, fromJS(item));
}

function editField(id, field, defaultValue = '') {
    let item = invStore.current.getIn(['items', id]);
    let value = defaultValue;
    if (item && item.has(field)) {
        value = item.get(field);
    }
    store.cursor(['items', id]).set(field, value);
}

function resetItem(id) {
    store.cursor(['items']).remove(id);
}

export let actions = {
    addItem: createAction(addItem),
    editField: createAction(editField),
    resetItem: createAction(resetItem)
};
