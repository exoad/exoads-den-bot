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