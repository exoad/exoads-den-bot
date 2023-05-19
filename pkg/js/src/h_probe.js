// Software created by Jack Meng (AKA exoad). Licensed by the included "LICENSE" file. If this file is not found, the project is fully copyrighted.

const default_str_str_link_img = "A valid URL to an image (PNG/JPEG).";

class TYPE {
  static IMAGE = TYPE("IMAGE");
  static STATIC = TYPE("STATIC");

  constructor(str_value) {
    this.str_value = str_value;
  }
}

let MAP_PROBES = [
  {
    blurhash: {
      name: "blurhash",
      type: TYPE.IMAGE,
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
        main: () =>
          "BlurHash applies a blur using the classic BlurHash implementation. The original algorithm can be found here: https://github.com/woltapp/blurhash",
      },
    },
    help: {
      name: "help",
      type: TYPE.STATIC,
      version: 1.0,
      runtime: "JS",
      arguments_n_type: [],
      descriptors: {
        main: () =>
          'This command is highly specific! You first must provide a link to an image (or you can use the dynamic version of this command with "dynprobe"), then the method you want to use (you can provide just the "list" argument to see avaliable options, and then set properties after in the format of:\nproperty1_name=property1_value property2_name=property2_value.]\n\nFinal format:\nprobe [argument/link] [method_name] [properties]\n\nExample: probe https://cdn.website/image.png gaussian_blur iterations=1\n\nAvaliable arguments: {list,docs}',
      },
    },
  },
];

/**
 *
 * @param {String} str_content
 */
function parse(str_content) {
  // cmd_name args1=args1_value ...
  let args = str_content.split(" ");
  let probe_name = args[0];
  if (!MAP_PROBES.at(0)[probe_name]) {
    return {
      payload_str:
        "Could not find the desired thing to probe at!\nInput: " +
        probe_name +
        "\nFor possible: " +
        MAP_PROBES.at(0).toString() +
        "\nRaw: " +
        str_content,
      payload: payload_str,
    };
  } else {
    let pot_args = [];
    for (var i = 1; i < args.length; i++) pot_args.push(args[i]);
  }
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
