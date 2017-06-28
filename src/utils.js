import { Iterable, isImmutable } from 'immutable'

export const isImmutableCollection = collection => {
    if (typeof isImmutable === 'function') {
        return isImmutable(collection)
    } else if (typeof Iterable.isIterable === 'function') {
        return Iterable.isIterable(collection)
    } else {
        return false
    }
}
