export const hmrload = (self) => {
  self.__canUpdate = true;
  //---------------
  self.__mod_props = new Map();
  self.__func_call = new Map();

  //---------------
  const p_handler = {
    get(target, prop) {
      const desc = Object.getOwnPropertyDescriptor(target, prop);
      const got = target[prop];
      if (desc) {
        if (desc.get || !desc.writable || !desc.configurable) {
          target.__canUpdate = false;
          return got;
        } else if (typeof got === "function") {
          return (...args) => {
            target.__func_call.set(prop, args);
            return got.bind(target)(...args);
          };
        }
      }
      target.__canUpdate = false;
      return got.bind?.(target) || got;
    },
    set(target, prop, value) {
      target.__mod_props.set(prop, value);
      target[prop] = value;
      return true;
    },
  };
  self.__newestElem = new Proxy(self, p_handler);
  return p_handler;
};
