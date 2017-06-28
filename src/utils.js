import { Iterable, isImmutable } from 'immutable'

export const checkIfImmutableCollection = collection => {
    if (typeof isImmutable === 'function') {
        return isImmutable(collection)
    } else if (typeof Iterable === 'object' && typeof Iterable.isIterable === 'function') {
        return Iterable.isIterable(collection)
    } else {
        return false
    }
}
