module.exports.MESSAGE = (() => {
  let i = 1;
  return {
    INIT: i++,
    AUDIO: i++,
    STATE_UPDATE: i++,
  };
})();