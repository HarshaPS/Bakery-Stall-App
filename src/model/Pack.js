const NOT_AVAILABLE = -1;
const UNDEFINED_PACK = -2;

class Pack {
    constructor(another) {
        if (another) {
            this.packQty = another.packQty;
            this.packs = another.packs.slice();
        } else {
            this.packQty = UNDEFINED_PACK;
            this.packs = [];
        }
    }

    mergeSubPack(another, p) {
        if (another) {
            this.packQty = another.packQty + 1;
            this.packs = another.packs, this.packs.push(p);
        }
    }

    setPacks(ps) {
        this.packs = (ps || []).slice();
    }

    getPacks() {
        return this.packs;
    }

    setPackQuantity(val) {
        this.packQty = val;
    }

    getPackQuantity() {
        return this.packQty;
    }

    isPackUndefined() {
        return this.packQty === UNDEFINED_PACK;
    }

    isPackNotAvailable() {
        return this.packQty === NOT_AVAILABLE;
    }

    setPackQuantityNotAvailable() {
        this.packQty = NOT_AVAILABLE;
    }

    addPack(p) {
        this.packs.push(p);
    }

}

export {
    Pack
};