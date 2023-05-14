// Software created by Jack Meng (AKA exoad). Licensed by the included "LICENSE" file. If this file is not found, the project is fully copyrighted.

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.PrintStream;

import javar.singles.ColorPane;
import java.util.Enumeration;
import java.util.Optional;
import java.util.Stack;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.function.Consumer;

import javax.imageio.ImageIO;
import javax.swing.*;
import javax.swing.text.BadLocationException;
import javax.swing.text.html.HTMLDocument;
import javax.swing.text.html.HTMLEditorKit;

import com.formdev.flatlaf.intellijthemes.FlatArcDarkOrangeIJTheme;

import java.awt.*;

final class Launcher
{
  static
  {
    System.setOut(new PrintStream(new text_outputstream()));
    System.setErr(System.out);
    System.setProperty("sun.java2d.opengl", "True");
  }

  static final String _green = "#b0db5e", _red = "#d94d45", _pink = "#e673b0", _yellow = "#e6db73";

  static String make_fg(String hex, String str)
  {
    return "<p style=\"color:" + hex + "\">" + str + "</p>";
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

  static String important(String str)
  {
    return "<p style=\"background-color:" + _red + ";color:#000\">" + str + "</p>";
  }

  static String warn(String str)
  {
    return "<p style=\"background-color:" + _yellow + ";color:#000\">" + str + "</p>";
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

  static class text_outputstream
      extends OutputStream
  {
    @Override public void write(byte[] buffer, int offset, int length)
    {
      SwingUtilities.invokeLater(() -> print(new String(buffer, offset, length)));
    }

    @Override public void write(int b) throws IOException
    {
      write(new byte[] { (byte) b }, 0, 1);
    }
  }

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

  public static void setUIFont(javax.swing.plaf.FontUIResource f)
  {
    Enumeration< ? > keys = UIManager.getDefaults().keys();
    while (keys.hasMoreElements())
    {
      Object key = keys.nextElement();
      Object value = UIManager.get(key);
      if (value instanceof javax.swing.plaf.FontUIResource)
        UIManager.put(key, f);
    }
  }

  public static void print(String str)
  {
    try
    {
      ((HTMLEditorKit) internalConsole.getEditorKit()).insertHTML((HTMLDocument) internalConsole.getDocument(),
          ((HTMLDocument) internalConsole.getDocument()).getLength(), str, 0, 0, null);
    } catch (BadLocationException | IOException e)
    {
      e.printStackTrace();
    }
  }

  public static void print2(String str)
  {
    try
    {
      ((HTMLEditorKit) console.getEditorKit()).insertHTML((HTMLDocument) console.getDocument(),
          ((HTMLDocument) console.getDocument()).getLength(), str, 0, 0, null);
    } catch (BadLocationException | IOException e)
    {
      e.printStackTrace();
    }
  }

  static JEditorPane internalConsole = new JEditorPane("text/html", "<html><body>");
  static ColorPane console = new ColorPane();
  static Optional< PStream > stream = Optional.empty();
  static final Timer runner = new Timer("daoxe-java-launcher-thread");
  static final Stack< String > logs = new Stack<>();
  static final ExecutorService thread_service = Executors.newCachedThreadPool();
  static Font varFont;
  static
  {
    try
    {
      varFont = Font.createFont(Font.TRUETYPE_FONT, new File("javar/fonts/ttf/JetBrainsMono-Regular.ttf"));
    } catch (FontFormatException | IOException e)
    {
      e.printStackTrace();
    }
  }

  public static void main(String... args)
      throws Exception
  {
    long start = System.currentTimeMillis();

    internalConsole = new JEditorPane("text/html",
        "<html><body style=\"font-family:" + varFont.getFamily() + ";font-size:9.5px;color:#ffff;\">");
    GraphicsEnvironment ge = GraphicsEnvironment.getLocalGraphicsEnvironment();
    ge.registerFont(varFont);
    wrap< Optional< Process > > process = new wrap<>(Optional.empty());
    Runtime.getRuntime().addShutdownHook(new Thread(() -> process.get().ifPresent(Process::destroy)));
    if (args != null && args.length > 0)
    {
      if ("nogui".equals(args[0]))
        exec(START_CMD);
    }
    else
    {
      UIManager.setLookAndFeel(new FlatArcDarkOrangeIJTheme());
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
      wrap< Boolean > started = new wrap<>(false);

      JButton gcCaller = new JButton("Java:GC");
      gcCaller.addActionListener(ev -> {
        long currentFreeHeap = (Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory()) / 1000000;
        System.gc();
        System.out.println(pink_fg("Java GC called.<br>Original: " + currentFreeHeap + "mB ") + "Current: "
            + ((Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory()) / 1000000) + "mB<br>Net: "
            + (currentFreeHeap - ((Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory()) / 1000000))
            + "mB");
      });

      JButton processInputTest = new JButton("I/O Test");
      processInputTest.addActionListener(ev -> {
        if (Boolean.TRUE.equals(started.e) && process.get().isPresent())
        {
          if (process.get().get().isAlive())
          {
            new PrintStream(process.get().get().getOutputStream()).print("Test#297489237");
            System.out.println(
                green_fg("See the process output for details.<br>Printed a test message to the outputstream of process["
                    + process.get().get().pid() + "]"));
          }
        }
      });

      JButton jb = new JButton("Start");
      jb.setOpaque(true);
      jb.setBackground(hexToRGB(_green));
      jb.setForeground(Color.BLACK);
      jb.addActionListener(ev -> {
        if (Boolean.FALSE.equals(started.get()))
        {
          try
          {
            process.set(Optional.of(exec(START_CMD)));
            stream = Optional.of(new PStream(process.get().get().getInputStream(), Launcher::print2));
            thread_service.submit(stream.get());
            print(important("started the process with command:<br>" + START_CMD));
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
            stream = Optional.empty();
            console.setText("");
            print(important("Killed the desired process: " + x.pid()));
          });
          jb.setText("Start");
        }
        started.set(!started.get());
        jb.setBackground(Boolean.TRUE.equals(started.get()) ? hexToRGB(_red) : hexToRGB(_green));
      });

      console.setPreferredSize(new Dimension(750 / 2, 850 / 2));
      console.setEditable(false);
      console.setOpaque(true);
      console.setForeground(Color.white);
      console.setFont(varFont.deriveFont(10F));
      console.setBorder(BorderFactory.createTitledBorder("Process Output"));
      console.setBackground(hexToRGB("#1d2128"));

      internalConsole.setPreferredSize(new Dimension(750 / 2, 850 / 2));
      internalConsole.setEditable(false);
      internalConsole.setOpaque(true);
      internalConsole.setFont(varFont.deriveFont(10));
      internalConsole.setForeground(Color.white);
      internalConsole
          .setBorder(BorderFactory.createTitledBorder(BorderFactory.createEmptyBorder(2, 6, 0, 0), "Internal Output"));
      internalConsole.setBackground(hexToRGB("#1d2128"));

      JPanel controlPane = new JPanel();
      controlPane.setLayout(new GridLayout(13, 1));
      controlPane.setPreferredSize(new Dimension(750 / 2, 850));
      controlPane.add(jb);
      controlPane.add(gcCaller);
      controlPane.add(processInputTest);

      JSplitPane temp1 = new JSplitPane(JSplitPane.VERTICAL_SPLIT);
      temp1.setPreferredSize(new Dimension(750 / 2, 850));
      temp1.setDividerLocation(750 / 2);

      temp1.setTopComponent(new JScrollPane(console));
      temp1.setBottomComponent(new JScrollPane(internalConsole));

      splitPane.setTopComponent(temp1);
      splitPane.setBottomComponent(controlPane);

      jf.setContentPane(splitPane);
      jf.pack();
      jf.setLocationRelativeTo(null);
      jf.setVisible(true);

      print(warn("Daoxe GUI Launcher effective!<br>Took: " + (System.currentTimeMillis() - start) + "ms"));

    }
  }
}