/* eslint-disable linebreak-style */
// eslint-disable-next-line import/prefer-default-export
export function obtainUrlParameters(url) {
  let offset;
  let limit;
  try {
    offset = /offset=([0-9]+)/gi.exec(url).pop();
    limit = /limit=([0-9]+)/gi.exec(url).pop();
  } catch (e) {
    offset = undefined;
    limit = undefined;
  }
  return { offset, limit };
}
