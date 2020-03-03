export default function splitCoords(coords) {
  return coords.split(',').map(part => parseInt(part, 10));
}
