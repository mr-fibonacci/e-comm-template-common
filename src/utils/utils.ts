// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export const id_to_id = (attrs: any): any => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const props: any = attrs;
  props._id = props.id;
  delete props.id;
  return props;
};
