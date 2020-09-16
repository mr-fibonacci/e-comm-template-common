import { calcOrderChanges } from '../../index';
import { applyChangesToOrder } from '../utils';

describe('calcOrderChanges...', () => {
  it('is pure', () => {
    const prev = [
      { quantity: 3, id: '5f4fd90c29d82068b0932812' },
      { quantity: 4, id: '5f4fd90c29d82068b0932813' },
    ];
    const cur = [
      { quantity: 1, id: '5f4fd90c29d82068b0932812' },
      { quantity: 0, id: '5f4fd90c29d82068b0932813' },
    ];
    calcOrderChanges(prev, cur);
    expect(prev).toEqual([
      { quantity: 3, id: '5f4fd90c29d82068b0932812' },
      { quantity: 4, id: '5f4fd90c29d82068b0932813' },
    ]);
    expect(cur).toEqual([
      { quantity: 1, id: '5f4fd90c29d82068b0932812' },
      { quantity: 0, id: '5f4fd90c29d82068b0932813' },
    ]);
  });

  describe('calculates delta correctly:', () => {
    it('for positive and negative values', () => {
      const delta = calcOrderChanges(
        [
          { quantity: 1, id: '5f4fd90c29d82068b0932810' },
          { quantity: 2, id: '5f4fd90c29d82068b0932811' },
        ],
        [
          { quantity: 2, id: '5f4fd90c29d82068b0932810' },
          { quantity: 1, id: '5f4fd90c29d82068b0932811' },
        ]
      );
      expect(delta).toEqual([
        { quantity: 1, id: '5f4fd90c29d82068b0932810' },
        { quantity: -1, id: '5f4fd90c29d82068b0932811' },
      ]);
    });

    it('unchanged items (duplicates) are omitted', () => {
      const delta = calcOrderChanges(
        [
          { quantity: 1, id: '5f4fd90c29d82068b0932810' },
          { quantity: 2, id: '5f4fd90c29d82068b0932811' },
          { quantity: 3, id: '5f4fd90c29d82068b0932812' },
          { quantity: 4, id: '5f4fd90c29d82068b0932813' },
        ],
        [
          { quantity: 2, id: '5f4fd90c29d82068b0932810' },
          { quantity: 1, id: '5f4fd90c29d82068b0932811' },
          { quantity: 3, id: '5f4fd90c29d82068b0932812' },
          { quantity: 4, id: '5f4fd90c29d82068b0932813' },
        ]
      );
      expect(delta).toEqual([
        { quantity: 1, id: '5f4fd90c29d82068b0932810' },
        { quantity: -1, id: '5f4fd90c29d82068b0932811' },
      ]);
    });

    it('items omitted in current order have -quantity and isReturned: true flag', () => {
      const delta = calcOrderChanges(
        [{ quantity: 3, id: '5f4fd90c29d82068b0932812' }],
        []
      );
      expect(delta).toEqual([
        { quantity: -3, id: '5f4fd90c29d82068b0932812', isReturned: true },
      ]);
    });

    it('empty arrays return an empty array', () => {
      const delta = calcOrderChanges([], []);
      expect(delta).toEqual([]);
    });

    it('empty array and an item array results in the second item array', () => {
      const delta = calcOrderChanges(
        [],
        [
          { quantity: 1, id: '5f4fd90c29d82068b0932810' },
          { quantity: 2, id: '5f4fd90c29d82068b0932811' },
          { quantity: 3, id: '5f4fd90c29d82068b0932812' },
        ]
      );
      expect(delta).toEqual([
        { quantity: 1, id: '5f4fd90c29d82068b0932810' },
        { quantity: 2, id: '5f4fd90c29d82068b0932811' },
        { quantity: 3, id: '5f4fd90c29d82068b0932812' },
      ]);
    });

    it('an array and [] (delete action) results in -qty and isReturned:true', () => {
      const delta = calcOrderChanges(
        [
          { quantity: 1, id: '5f4fd90c29d82068b0932810' },
          { quantity: 2, id: '5f4fd90c29d82068b0932811' },
          { quantity: 3, id: '5f4fd90c29d82068b0932812' },
        ],
        []
      );
      expect(delta).toEqual([
        { quantity: -1, id: '5f4fd90c29d82068b0932810', isReturned: true },
        { quantity: -2, id: '5f4fd90c29d82068b0932811', isReturned: true },
        { quantity: -3, id: '5f4fd90c29d82068b0932812', isReturned: true },
      ]);
    });

    it('redundant, i.e. qty: 0 items filtered out from delta array', () => {
      const delta = calcOrderChanges(
        [
          { quantity: 0, id: '5f4fd90c29d82068b0932810' },
          { quantity: 1, id: '5f4fd90c29d82068b0932811' },
        ],
        [
          { quantity: 1, id: '5f4fd90c29d82068b0932812' },
          { quantity: 0, id: '5f4fd90c29d82068b0932813' },
        ]
      );
      expect(delta).toEqual([
        { quantity: 1, id: '5f4fd90c29d82068b0932812' },
        { quantity: -1, id: '5f4fd90c29d82068b0932811', isReturned: true },
      ]);
    });
  });
});

describe('applyChangesToOrder...', () => {
  it('has order changes calculated, applies them and is pure', () => {
    const dbOrder = [
      { quantity: 1, id: '5f4fd0bb0833cd3222d5de68' },
      { quantity: 2, id: '5f4fd90c29d82068b0932811' },
      { quantity: 3, id: '5f4fd90c29d82068b0932812' },
      { quantity: 4, id: '5f4fd90c29d82068b0932813' },
      { quantity: 5, id: '5f4fd90c29d82068b0932814' },
      { quantity: 6, id: '5f4fd90c29d82068b0932815' },
    ];
    const desiredOrder = [
      { quantity: 1, id: '5f4fd0bb0833cd3222d5de68' },
      { quantity: 5, id: '5f4fd90c29d82068b0932812' },
      { quantity: 13, id: '5f4fd90c29d82068b0932814' },
      { quantity: 4, id: '5f4fd90c29d82068b0932816' },
    ];
    const delta = calcOrderChanges(dbOrder, desiredOrder);
    const calculatedOrder = applyChangesToOrder(dbOrder, delta);
    expect(calculatedOrder).toEqual(desiredOrder);
    expect(dbOrder).toEqual([
      { quantity: 1, id: '5f4fd0bb0833cd3222d5de68' },
      { quantity: 2, id: '5f4fd90c29d82068b0932811' },
      { quantity: 3, id: '5f4fd90c29d82068b0932812' },
      { quantity: 4, id: '5f4fd90c29d82068b0932813' },
      { quantity: 5, id: '5f4fd90c29d82068b0932814' },
      { quantity: 6, id: '5f4fd90c29d82068b0932815' },
    ]);
    expect(delta).toEqual([
      { quantity: 2, id: '5f4fd90c29d82068b0932812' },
      { quantity: 8, id: '5f4fd90c29d82068b0932814' },
      { quantity: 4, id: '5f4fd90c29d82068b0932816' },
      { quantity: -2, id: '5f4fd90c29d82068b0932811', isReturned: true },
      { quantity: -4, id: '5f4fd90c29d82068b0932813', isReturned: true },
      { quantity: -6, id: '5f4fd90c29d82068b0932815', isReturned: true },
    ]);
  });
});
