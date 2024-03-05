export async function getImageDimensions(file: File) {
  let img = new Image();
  img.src = URL.createObjectURL(file);
  await img.decode();
  let width = img.width;
  let height = img.height;

  return {
    width,
    height,
  };
}

export function aspect_ratio(val: number, lim: number = 50) {
  var lower = [0, 1];
  var upper = [1, 0];

  while (true) {
    var mediant = [lower[0] + upper[0], lower[1] + upper[1]];

    if (val * mediant[1] > mediant[0]) {
      if (lim < mediant[1]) {
        return upper;
      }
      lower = mediant;
    } else if (val * mediant[1] == mediant[0]) {
      if (lim >= mediant[1]) {
        return mediant;
      }
      if (lower[1] < upper[1]) {
        return lower;
      }
      return upper;
    } else {
      if (lim < mediant[1]) {
        return lower;
      }
      upper = mediant;
    }
  }
}
