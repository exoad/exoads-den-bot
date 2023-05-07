import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;

// Software created by Jack Meng (AKA exoad). Licensed by the included "LICENSE" file. If this file is not found, the project is fully copyrighted.

public final class Changelog
{
  private static void _return(String argument)
  {
    System.out.println(argument);
    System.exit(0);
  }

  public static void main(String... args)
        throws Exception
  {
    _return(new String(Files.readAllBytes(Paths.get("./files/Changelog")), StandardCharsets.UTF_8));
  }
}