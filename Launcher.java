// Software created by Jack Meng (AKA exoad). Licensed by the included "LICENSE" file. If this file is not found, the project is fully copyrighted.

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintStream;
import java.lang.ref.Reference;
import java.lang.ref.SoftReference;
import java.text.SimpleDateFormat;

import javar.singles.ColorPane;
import java.util.ArrayDeque;
import java.util.Date;
import java.util.Deque;
import java.util.Optional;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.atomic.AtomicBoolean;
import java.util.concurrent.atomic.AtomicReference;
import java.util.function.Consumer;

import javax.imageio.ImageIO;
import javax.swing.*;

import com.formdev.flatlaf.intellijthemes.materialthemeuilite.FlatArcDarkIJTheme;

import java.awt.*;

final class Launcher
{
  static
  {
    System.setProperty("sun.java2d.opengl", "True");
    console = new ColorPane();
    internalConsole = new JTextPane();
  }

  static final String _green = "#b0db5e", _red = "#d94d45", _pink = "#e673b0", _yellow = "#e6db73";

  static String make_fg(String hex, String str)
  {
    return "<html><p style:\"color:" + hex + "\">" + str + "</p></html>";
  }

  static String green_fg(String str)
  {
    return make_fg(_green, str);
  }

  static String red_fg(String str)
  {
    return make_fg(_red, str);
  }

  static String pink_fg(String str)
  {
    return make_fg(_pink, str);
  }

  static String yellow_fg(String str)
  {
    return make_fg(_yellow, str);
  }

  public static Color hexToRGB(String hex)
  {
    if (!hex.startsWith("#"))
    {
      /*--------------------------------- /
      / this part is so hardcoded and bad /
      /----------------------------------*/
      hex = "#" + hex;
    }
    return new Color(
        Integer.valueOf(hex.substring(1, 3), 16),
        Integer.valueOf(hex.substring(3, 5), 16),
        Integer.valueOf(hex.substring(5, 7), 16));
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

  static class wrap< T >
  {
    T e;

    public wrap(T e)
    {
      this.e = e;
    }

    public T get()
    {
      return e;
    }

    public void set(T e)
    {
      this.e = e;
    }
  }

  public static Process exec(String command)
      throws IOException
  {
    return Runtime.getRuntime().exec(command);
  }

  public static void print(String str)
  {
    System.out.println(str);
    internalConsole.setText(internalConsole.getText() + str + "\n");
  }

  static final JTextPane internalConsole;
  static final ColorPane console;
  static final Deque< Runnable > queue = new ArrayDeque<>();
  static final Timer runner = new Timer("daoxe-java-launcher-thread");
  static final ExecutorService thread_service = Executors.newCachedThreadPool();

  public static void main(String[] args)
      throws Exception
  {
    long start = System.currentTimeMillis();
    runner.schedule(new TimerTask() {
      @Override public void run()
      {
        if (!queue.isEmpty())
        {
          queue.pollFirst().run();
          System.out.println("executing task[" + (queue.size()) + "]");
        }
      }
    }, 350L, 25L);
    wrap< Optional< Process > > process = new wrap<>(Optional.empty());
    Runtime.getRuntime().addShutdownHook(new Thread(() -> process.get().ifPresent(Process::destroy)));
    if (args != null && args.length > 0)
    {
      if ("nogui".equals(args[0]))
        exec(START_CMD);
    }
    else
    {
      UIManager.setLookAndFeel(new FlatArcDarkIJTheme());
      JFrame jf = new JFrame("daoxe-dashboard");
      jf.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
      jf.setSize(new Dimension(750, 850));
      jf.setIconImage(ImageIO.read(new File("./pkg/temp/pic5.png")));
      jf.setResizable(false);
      runner.schedule(new TimerTask() {
        @Override public void run()
        {
          jf.setTitle("daoxe-dashboard:" + ((System.currentTimeMillis() - start) / 1000));
        }
      }, 1000L, 5000L);

      JSplitPane splitPane = new JSplitPane(JSplitPane.HORIZONTAL_SPLIT);
      splitPane.setPreferredSize(jf.getSize());
      splitPane.setDividerLocation(850 / 2);
      splitPane.setOpaque(true);

      console.setPreferredSize(new Dimension(750 / 2, 850 / 2));
      console.setEditable(false);
      console.setOpaque(true);
      console.setBorder(BorderFactory.createTitledBorder(BorderFactory.createEmptyBorder(), "Process Output"));
      console.setBackground(hexToRGB("#1d2128"));

      internalConsole.setPreferredSize(new Dimension(750 / 2, 850 / 2));
      internalConsole.setEditable(false);
      internalConsole.setOpaque(true);
      internalConsole.setBorder(BorderFactory.createTitledBorder(BorderFactory.createEmptyBorder(), "Internal Output"));
      internalConsole.setContentType("text/html");
      internalConsole.setBackground(hexToRGB("#1d2128"));

      AtomicBoolean started = new AtomicBoolean(false);

      JButton jb = new JButton("Start");
      jb.setOpaque(true);
      jb.setBackground(hexToRGB(_green));
      jb.setForeground(Color.BLACK);
      jb.addActionListener(ev -> {
        if (!started.get())
        {
          try
          {
            process.set(Optional.of(exec(START_CMD)));
          } catch (IOException e)
          {
            e.printStackTrace();
          }
          jb.setText("Stop");
        }
        else
        {
          process.get().ifPresent(x -> {
            x.destroy();
            process.set(Optional.empty());
            print(red_fg("Killed the desired process: " + x.pid()));
          });
          jb.setText("Start");
        }
        started.set(!started.get());
        jb.setBackground(started.get() ? hexToRGB(_red) : hexToRGB(_green));
      });

      JPanel controlPane = new JPanel();
      controlPane.setLayout(new GridLayout(13, 1));
      controlPane.setPreferredSize(new Dimension(750 / 2, 850));
      controlPane.setMaximumSize(controlPane.getPreferredSize());
      controlPane.add(jb);

      JSplitPane temp1 = new JSplitPane(JSplitPane.VERTICAL_SPLIT);
      temp1.setPreferredSize(new Dimension(750 / 2, 850));
      temp1.setDividerLocation(750 / 2);

      temp1.setTopComponent(new JScrollPane(console));
      temp1.setBottomComponent(new JScrollPane(internalConsole));

      splitPane.setLeftComponent(temp1);
      splitPane.setRightComponent(controlPane);

      jf.getContentPane().add(splitPane);
      jf.pack();
      jf.setVisible(true);

      print(green_fg("Daoxe GUI Launcher effective!"));

    }
  }
}