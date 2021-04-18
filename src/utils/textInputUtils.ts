type getMatchType = (a: string, b: string) => string

export const getMatch : getMatchType = (a: string, b: string) => {
  if (!(a && b)) {
    return "";
  }
  if (a.length > b.length) {
    [a, b] = [b, a]
  }
  let ret = "";
  for (let i = 0; i < a.length; i++) {
    if (a[i] === b[i]) {
      ret += a[i];
    } else {
      break;
    }
  }
  return ret;
}