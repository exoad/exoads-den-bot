// Software created by Jack Meng (AKA exoad). Licensed by the included "LICENSE" file. If this file is not found, the project is fully copyrighted.

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import javar.singles.ColorPane;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.function.Consumer;

import javax.swing.*;

import com.formdev.flatlaf.intellijthemes.materialthemeuilite.FlatArcDarkIJTheme;

import java.awt.*;

final class Launcher
{
  static
  {
    System.setProperty("sun.java2d.opengl", "True");
  }

  static final String START_CMD = "node --expose-gc .";

  static class PStream
      implements Runnable
  {
    private InputStream inputStream;
    private Consumer< String > consumer;

    public PStream(InputStream inputStream, Consumer< String > consumer)
    {
      this.inputStream = inputStream;
      this.consumer = consumer;
    }

    @Override public void run()
    {
      new BufferedReader(new InputStreamReader(inputStream)).lines().forEach(consumer);
    }
  }

  public static Process exec(String command)
      throws IOException
  {
    return Runtime.getRuntime().exec(command);
  }

  static final Deque< Runnable > queue = new ArrayDeque<>();
  static final Timer runner = new Timer("daoxe-java-launcher-thread");

  static Color green = new Color(179, 232, 118);
  static Color red = new Color(219, 57, 57);

  public static void main(String[] args)
      throws Exception
  {
    if (args != null && args.length > 0)
    {
      if ("nogui".equals(args[0]))
      {
        exec("node --expose-gc .");
      }
    }
    else
    {
      UIManager.setLookAndFeel(new FlatArcDarkIJTheme());

      JFrame jf = new JFrame("daoxe-dashboard");
      jf.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
      jf.setSize(new Dimension(750, 850));

      JSplitPane splitPane = new JSplitPane(JSplitPane.HORIZONTAL_SPLIT);
      splitPane.setPreferredSize(jf.getSize());
      splitPane.setDividerLocation(850 / 2);
      splitPane.setOpaque(true);

      ColorPane console = new ColorPane();
      console.setPreferredSize(new Dimension(750, 850 / 2));

      runner.schedule(new TimerTask() {
        @Override public void run()
        {
          if (queue.getFirst() != null)
            queue.pollFirst().run();
        }
      }, 350L, 75L);

      AtomicBoolean started = new AtomicBoolean(false);

      JButton jb = new JButton("Start");
      jb.setOpaque(true);
      jb.setBackground(green);
      jb.setForeground(Color.BLACK);
      jb.addActionListener(ev -> {
        if (!started.get())
          queue.addLast(() -> {
            try
            {
              exec(START_CMD);
            } catch (IOException e)
            {
              e.printStackTrace();
            }
          });
      });

      jf.getContentPane().add(splitPane);
      jf.pack();
      jf.setVisible(true);

    }
  }
}