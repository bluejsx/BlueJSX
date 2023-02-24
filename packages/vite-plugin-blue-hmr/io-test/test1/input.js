// @ts-nocheck

export default ({ attr1, children }) => {
  const self = Blue.r("div", null, Blue.r(Comp, { class: "hello" }));
  return self;
};
export const AA = ({ children }) => (Blue.r("div", null, children));

// {

/*
  {
*/
export const BB = ({ children }) => {
  const reff = getRefs();
  const pp = Blue.r(Brogress, null);
  const self = Blue.r(
    "div",
    null,
    Blue.r(Progress, { value: 5, max: 10, ref: [reff, "p"] }),
    pp,
    children,
  );
  const { p } = reff;
  p.value = 90;
  const { unko, ahyo } = p;
  unko.get(4);
  ahyo(345);
  p.hi.yo({
    u: 56,
  });

  pp.er = 90;
  return self;
};

document.body.append(Blue.r(AA, null));
