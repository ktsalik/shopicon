export const capitalizeDashes = (string: String) => {
  return string.replace(/(^|[\s-])\S/g, function (match) {
    return match.toUpperCase();
  }).replace(/-/, ' ');
};