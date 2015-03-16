export function compareAscending(a, b) {
    if (a < b) {
        return -1;
    } else if (a > b) {
        return 1;
    }
    return 0;
}

export function compareDescending(a, b) {
    return -compareAscending(a, b);
}

export function getKeyPath(keyOrPath) {
    if (keyOrPath === undefined) {
        return [];
    }
    if (typeof keyOrPath === 'string' ||
        typeof keyOrPath === 'number') {
        return [keyOrPath];
    }
    if (Array.isArray(keyOrPath)) {
        return keyOrPath;
    }
    throw new Error(`Can't figure out key path for '${keyOrPath}'`);
}
