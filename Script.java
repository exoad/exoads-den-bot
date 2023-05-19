import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;

// Software created by Jack Meng (AKA exoad). Licensed by the included "LICENSE" file. If this file is not found, the project is fully copyrighted.

public class Script
{
  public static void main(String[] args)
      throws Exception
  {
    Files.list(Path.of(new File("./pkg").toURI()))
        .forEach(x -> x.toFile().renameTo(new File(x.toAbsolutePath().toString().replace(".js", ".ts"))));
  }
}