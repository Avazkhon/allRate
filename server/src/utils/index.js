exports.sortByDate = (array) => {
  return array.sort((a, b) => {
    const aTime = a.createTime || a.serverTime || a.localTime;
    const bTime = b.createTime || b.serverTime || b.localTime;
    if (aTime < bTime) {
      return 1;
    } else if (aTime > bTime) {
      return -1;
    } else {
      return 0;
    }
  });
}
