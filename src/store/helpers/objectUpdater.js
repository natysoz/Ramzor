const objectUpdater = (state, newObj) => {
  return {
    ...state,
    ...newObj
  };
};

export default objectUpdater;
