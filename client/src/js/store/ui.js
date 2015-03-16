import {fromJS} from 'immutable';
import uuid from 'tiny-uuid';
import createAction from '../action';
import createStore from '../store';

let store = createStore({
    sorting: {
        inventory: {
            field: '',
            descending: false
        }
    }
});

export default store.public;

function sortInventory(field, descending) {
    let sortBy = store.cursor(['sorting', 'inventory']);
    if (descending === undefined) {
        if (field === sortBy.get('field')) {
            // toggle direction
            sortBy.update('descending', x => !x);
        } else {
            // just set field
            sortBy.set('field', field).set('descending', true);
        }
    } else {
        sortBy.set('field', field).set('descending', descending);
    }
}

export let actions = {
    sortInventory: createAction(sortInventory)
};
