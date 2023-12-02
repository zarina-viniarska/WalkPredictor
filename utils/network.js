function activation(x) {
  return x < 0.5 ? 0 : 1;
}

export function go(sun, clouds, rain,) {
  let x = [clouds, rain, sun];

  let w11 = [0.3, 0.3, 0];
  let w12 = [0.4, -0.5, 1];
  let weight1 = [w11, w12];

  let weight2 = [-1, 1];

  let sum_hidden = weight1.map((weights) => {
    return x.reduce((acc, val, index) => acc + val * weights[index], 0);
  });

  let out_hidden = sum_hidden.map((val) => activation(val));

  let sum_end = weight2.reduce((acc, val, index) => acc + val * out_hidden[index], 0);
  let y = activation(sum_end);

  return y;
}