import { OrderItems, OrderProductItem } from '../types/custom-types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export const id_to_id = (attrs: any): any => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const props: any = attrs;
  props._id = props.id;
  delete props.id;
  return props;
};

export const expiresIn = (minutes: number): Date => {
  return new Date(new Date().getTime() + minutes * 60 * 1000);
};

interface OrderObject {
  [key: string]: OrderProductItem;
}

const _itemsArrToObj = (itemsArr: OrderItems) => {
  return itemsArr.reduce((acc: OrderObject, cur: OrderProductItem) => {
    acc[cur.id] = cur;
    return acc;
  }, {});
};

export const calcOrderChanges = (
  previous: OrderItems,
  current: OrderItems
): OrderItems => {
  const curObj = _itemsArrToObj(current);
  previous = [...previous];
  const obj = previous.reduce(
    (acc: OrderObject, cur: OrderProductItem) => {
      const { id, quantity } = cur;
      if (acc[id]) {
        const diff = acc[id].quantity - quantity;
        !diff ? delete acc[id] : (acc[id].quantity = diff);
      } else {
        acc[id] = cur;
        acc[id].quantity = -quantity;
      }
      return acc;
    },
    { ...curObj }
  );
  const answer = Object.values(obj);
  return answer;
};

export const applyChangesToOrder = (
  dbItems: OrderItems,
  deltaItems: OrderItems
): OrderItems => {
  const orderObj = _itemsArrToObj(dbItems);
  const merged = deltaItems.reduce(
    (acc: OrderObject, cur: OrderProductItem) => {
      const { id, quantity } = cur;
      const diff = acc[id]?.quantity + quantity;
      if (acc[id]) {
        acc[id] = { ...cur };
        acc[id].quantity = diff;
        !diff ? delete acc[id] : (acc[id].quantity = diff);
      } else {
        acc[id] = { ...cur };
      }
      return acc;
    },
    { ...orderObj }
  );
  return Object.values(merged);
};
