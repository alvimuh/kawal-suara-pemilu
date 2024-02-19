const json = (param: any): any => {
  return JSON.parse(
    JSON.stringify(
      param,
      (key, value) => (typeof value === "bigint" ? Number(value) : value) // return everything else unchanged
    )
  );
};
export default json;
