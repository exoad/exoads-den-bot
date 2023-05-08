// Software created by Jack Meng (AKA exoad). Licensed by the included "LICENSE" file. If this file is not found, the project is fully copyrighted.

import java.awt.image.*;
import java.io.File;
import java.awt.*;
import javax.imageio.*;

public final class Imp
{
  private static void _return(String argument)
  {
    System.out.println(argument);
    System.exit(0);
  }

  public static BufferedImage optimizedLoadImage(String imagePath) throws IOException {

    // Load the image into a BufferedImage object
    BufferedImage originalImage = ImageIO.read(new File(imagePath));

    // Get the default GraphicsConfiguration object
    GraphicsConfiguration gfxConfig = GraphicsEnvironment.getLocalGraphicsEnvironment().getDefaultScreenDevice().getDefaultConfiguration();

    // If the original image has the same format as the default GraphicsConfiguration, return it
    if (originalImage.getColorModel().equals(gfxConfig.getColorModel())) {
        return originalImage;
    }

    // Create a new VolatileImage object with the same dimensions and transparency as the original image,
    // but with the format of the default GraphicsConfiguration and the VOLATILE hint
    ImageCapabilities imgCaps = new ImageCapabilities(true);
    VolatileImage newImage = gfxConfig.createCompatibleVolatileImage(originalImage.getWidth(), originalImage.getHeight(), Transparency.TRANSLUCENT, imgCaps);

    // Get the Graphics2D object from the new VolatileImage object
    Graphics2D graphics = newImage.createGraphics();

    // Draw the original image onto the Graphics2D object
    graphics.drawImage(originalImage, 0, 0, null);

    // Dispose of the Graphics2D object
    graphics.dispose();

    // Return the new VolatileImage object as a BufferedImage object
    return newImage.getSnapshot();
}

  /**
   * In the format of:
   * [img_path] [method_name] [named_properties]
   *
   * Named_properties format:
   * [property1_name]=[property1_value] [property2_name]=[property2_value]
   *
   * @param args
   */
  public static void main(String... args)
  {

    if (args != null && args.length > 0)
    {
      String img_path = args[0];
      String method_name = args[0];
      String[] temp = new String[args.length - 2];

    }
    else _return("T^T you have to input something");
  }
}