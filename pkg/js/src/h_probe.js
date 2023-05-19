// Software created by Jack Meng (AKA exoad). Licensed by the included "LICENSE" file. If this file is not found, the project is fully copyrighted.

const default_str_str_link_img = "A valid URL to an image (PNG/JPEG).";

class TYPE {
  static IMAGE = TYPE("IMAGE");
  static NULL = TYPE("NULL");

  constructor(str_value) {
    this.str_value = str_value;
  }
}

let MAP_PROBES = [
  {
    blurhash: {
      name: "blurhash",
      type: "IMAGE",
      aliases: ["blur_h"],
      version: 0.1,
      runtime: "Java",
      arguments_n_type: [
        {
          name: "x",
          x: {
            fx: b_u_int,
            args: [undefined, 1, 6],
          },
          positional: false,
          valids: {
            required: false,
            default: 3,
          },
          descriptor: "The ratio of X components. Bounds: [1,6]",
        },
        {
          name: "y",
          y: {
            fx: b_u_int,
            args: [undefined, 1, 6],
          },
          positional: false,
          valids: {
            required: false,
            default: 4,
          },
          descriptor: "The ratio of Y components. Bounds: [1,6]",
        },
        {
          name: "img",
          src: strlink_img,
          positional: false,
          valids: {
            required: true,
            default: null,
          },
          descriptor: default_str_str_link_img,
        },
      ],
      descriptors: {
        main: "BlurHash applies a blur using the classic BlurHash implementation. The original algorithm can be found here: https://github.com/woltapp/blurhash",
      },
    },
  },
];

function parse(str_content) {
  // cmd_name,
}

function u_int(content) {
  let temp = parseInt(content);
  return temp < 0 ? -temp : temp;
}

function b_u_int(content, min, max) {
  let temp = parseInt(content);
  return temp < min ? min : temp > max ? max : temp;
}

function strlink(content) {}

function strlink_img(content) {}
