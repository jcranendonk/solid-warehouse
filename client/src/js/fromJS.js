import immutable from 'immutable';

// Unlike Immutable.fromJS, handles custom objects (non-Object class instances) correctly.
export default function fromJS(value) {
    if (value === null || value === undefined) {
        return null;
    }

    if (value instanceof Object && !immutable.Iterable.isIterable(value)) {
        if (Array.isArray(value)) {
            return immutable.Seq.Indexed(value).map(fromJS).toList();
        } else {
            return immutable.Seq.Keyed(value).map(fromJS).toMap();
        }
    }

    // 'value' assumed to be a primitive or immutable, returned as-is
    return value;
}
