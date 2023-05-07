// Software created by Jack Meng (AKA exoad). Licensed by the included "LICENSE" file. If this file is not found, the project is fully copyrighted.

import java.awt.image.*;
import java.util.Map;

interface impl_SimpleFilter {
  BufferedImage filter(BufferedImage image, Map<String, String> properties);
}