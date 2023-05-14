// Software created by Jack Meng (AKA exoad). Licensed by the included "LICENSE" file. If this file is not found, the project is fully copyrighted.

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintStream;
import java.sql.Date;
import java.text.SimpleDateFormat;

import javar.singles.ColorPane;
import java.util.Enumeration;
import java.util.Optional;
import java.util.Stack;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicLong;
import java.util.function.Consumer;

import javax.imageio.ImageIO;
import javax.swing.*;
import javax.swing.text.BadLocationException;
import javax.swing.text.html.HTMLDocument;
import javax.swing.text.html.HTMLEditorKit;

import com.formdev.flatlaf.intellijthemes.FlatArcDarkOrangeIJTheme;

import java.awt.Color;
import java.awt.Font;
import java.awt.Dimension;
import java.awt.FontFormatException;
import java.awt.GraphicsEnvironment;
import java.awt.GridLayout;
import java.awt.Insets;

final class Launcher
{
  static
  {
    System.setOut(new PrintStream(new text_outputstream()));
    System.setErr(System.out);
    System.setProperty("sun.java2d.opengl", "True");
    UIManager.put("TabbedPane.selectedBackground", hexToRGB("#000000"));
    UIManager.put("Button.arc", 25);
    UIManager.put("Component.arc", 500);
    UIManager.put("TextComponent.arc", 5);
    UIManager.put("ScrollBar.trackInsets", new Insets(2, 4, 2, 4));
  }
  static JEditorPane internalConsole = new JEditorPane("text/html", "<html><body>");
  static ColorPane console = new ColorPane();
  static long i_uptime = 0x0L, p_uptime = 0x0L, p_count = 0x0L;
  static wrap< Long > last_p_uptime = new wrap<>(0x0L);
  static final String START_CMD = "node --expose-gc .";
  static Optional< PStream > stream = Optional.empty();
  static final Timer runner = new Timer("daoxe-java-launcher-thread");
  static final Stack< String > logs = new Stack<>();
  static final String _green = "#b0db5e", _red = "#d94d45", _pink = "#e673b0", _yellow = "#e6db73", _cyan = "#58d2b4";
  static wrap< Boolean > started = new wrap<>(false);
  static wrap< Optional< Thread > > ioProcess = new wrap<>(Optional.empty());
  static final ExecutorService thread_service = Executors.newWorkStealingPool();
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

  static String make_fg(String hex, String str)
  {
    return "<p style=\"color:" + hex + "\">" + str + "</p>";
  }

  static String blue_fg(String str)
  {
    return make_fg(_cyan, str);
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

  static String time_format(long val)
  {
    StringBuilder buf = new StringBuilder(20);
    String sgn = "";

    if (val < 0)
    {
      sgn = "-";
      val = Math.abs(val);
    }

    append(buf, sgn, 0, (val / 60000));
    val %= 60000;
    append(buf, ":", 2, (val / 10000));
    val %= 10000;
    append(buf, ":", 2, (val));
    return buf.toString();
  }

  static void append(StringBuilder tgt, String pfx, int dgt, long val)
  {
    tgt.append(pfx);
    if (dgt > 1)
    {
      int pad = (dgt - 1);
      for (long xa = val; xa > 9 && pad > 0; xa /= 10)
        pad--;
      for (int xa = 0; xa < pad; xa++)
        tgt.append('0');
    }
    tgt.append(val);
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
    console.appendANSI(str + "\n");
  }

  public static void tell(String cmd, Process env)
  {
    if (env != null)
    {
      try (BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(env.getOutputStream())))
      {
        bw.write(cmd);
        bw.flush();
      } catch (Exception e)
      {
        e.printStackTrace();
      }
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

      JSplitPane splitPane = new JSplitPane(JSplitPane.HORIZONTAL_SPLIT);
      splitPane.setPreferredSize(jf.getSize());
      splitPane.setDividerLocation(850 / 2);
      splitPane.setOpaque(true);

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
            tell("testmessage[" + Math.random() + "]", process.get().get());
            System.out.println(
                green_fg("See the process output for details.<br>Printed a test message to the outputstream of process["
                    + process.get().get().pid() + "]"));
          }
        }
        else
          System.out.println(red_fg("The process could not be contacted:<br>isAlive: " + Boolean.TRUE.equals(started.e)
              + "<br>isPresent: " + process.get().isPresent()));
      });

      JPanel infoPane = new JPanel();
      infoPane.setLayout(new GridLayout(3, 1));

      JLabel internalUptime = new JLabel("<html><strong>I_Uptime: </strong> " + i_uptime);
      JLabel processUptime = new JLabel("<html><strong>P_Uptime: </strong> " + p_uptime);
      JLabel processCount = new JLabel("<html><strong>P_Count: </strong> " + p_count);

      JPanel clearButtons = new JPanel();
      clearButtons.setLayout(new GridLayout(1, 3));

      JButton clearInternalConsole = new JButton("<html>Clean<br>I_Output");
      clearInternalConsole
          .addActionListener(x -> SwingUtilities.invokeLater(() -> internalConsole
              .setText("<html><body style=\"font-family:" + varFont.getFamily() + ";font-size:9.5px;color:#ffff;\">")));
      clearInternalConsole.setOpaque(true);
      clearInternalConsole.setFont(varFont.deriveFont(11F));
      clearInternalConsole.setForeground(Color.black);
      clearInternalConsole.setBackground(hexToRGB(_cyan));

      JButton clearProcessConsole = new JButton("<html>Clean<br>P_Output");
      clearProcessConsole
          .addActionListener(x -> SwingUtilities.invokeLater(() -> console.setText("")));
      clearProcessConsole.setOpaque(true);
      clearProcessConsole.setFont(varFont.deriveFont(11F));
      clearProcessConsole.setForeground(Color.black);
      clearProcessConsole.setBackground(hexToRGB(_pink));

      clearButtons.add(clearInternalConsole);
      clearButtons.add(clearProcessConsole);

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
            ioProcess.get().ifPresent(xrr -> {
              if (xrr.isAlive())
                xrr.interrupt();
            });
            ioProcess.set(Optional.empty());
            ioProcess.set(Optional.of(new Thread(stream.get())));
            ioProcess.get().ifPresent(Thread::start);
            print(important("started the process with command\nrunning in background"));
          } catch (IOException e)
          {
            e.printStackTrace();
          }
          p_count++;
          last_p_uptime.set(System.currentTimeMillis());
          SwingUtilities.invokeLater(() -> {
            jb.setText("Stop");
            processCount.setText("<html><strong>P_Count: </strong> " + p_count);
          });
        }
        else
        {
          process.get().ifPresent(x -> {
            x.destroy();
            process.set(Optional.empty());
            stream = Optional.empty();
            new Thread(() -> {
              ioProcess.get().ifPresent(xrr -> {
                if (xrr.isAlive())
                  xrr.interrupt();
              });
            }).start();
            last_p_uptime.set(0x0L);
            print(important("Killed the desired process: " + x.pid()));
          });
          SwingUtilities.invokeLater(() -> jb.setText("Start"));
        }
        started.set(!started.get());
        SwingUtilities.invokeLater(
            () -> jb.setBackground(Boolean.TRUE.equals(started.get()) ? hexToRGB(_red) : hexToRGB(_green)));
      });

      console.setPreferredSize(new Dimension(750 / 2, 850 / 2));
      console.setEditable(false);
      console.setOpaque(true);
      console.setContentType("text/html");
      console.setForeground(Color.white);
      console.setFont(varFont.deriveFont(10.5F));
      console
          .setBorder(BorderFactory.createTitledBorder(BorderFactory.createEmptyBorder(2, 6, 0, 0), "Process Output"));
      console.setBackground(hexToRGB("#1d2128"));

      internalConsole.setPreferredSize(new Dimension(750 / 2, 850 / 2));
      internalConsole.setEditable(false);
      internalConsole.setOpaque(true);
      internalConsole.setFont(varFont.deriveFont(10));
      internalConsole.setForeground(Color.white);
      internalConsole
          .setBorder(BorderFactory.createTitledBorder(BorderFactory.createEmptyBorder(2, 6, 0, 0), "Internal Output"));
      internalConsole.setBackground(hexToRGB("#1d2128"));

      infoPane.add(internalUptime);
      infoPane.add(processUptime);
      infoPane.add(processCount);

      JPanel controlPane = new JPanel();
      controlPane.setLayout(new GridLayout(13, 1));
      controlPane.setBorder(BorderFactory.createEmptyBorder(0, 0, 0, 0));
      controlPane.setPreferredSize(new Dimension(750 / 2, 850));
      controlPane.add(infoPane);
      controlPane.add(jb);
      controlPane.add(clearButtons);
      controlPane.add(gcCaller);
      controlPane.add(processInputTest);

      JTabbedPane bottomConsoles = new JTabbedPane(SwingConstants.BOTTOM);
      bottomConsoles.setTabLayoutPolicy(JTabbedPane.SCROLL_TAB_LAYOUT);
      bottomConsoles.setBorder(BorderFactory.createEmptyBorder(0, 0, 0, 0));
      bottomConsoles.setPreferredSize(new Dimension(750 / 2, 850 / 2));
      bottomConsoles.addTab("I_Output", new JScrollPane(internalConsole));

      JSplitPane temp1 = new JSplitPane(JSplitPane.VERTICAL_SPLIT);
      temp1.setPreferredSize(new Dimension(750 / 2, 850));
      temp1.setDividerLocation(750 / 2);
      temp1.setBorder(BorderFactory.createEmptyBorder(0, 0, 0, 0));

      temp1.setTopComponent(new JScrollPane(console));
      temp1.setBottomComponent(bottomConsoles);

      splitPane.setTopComponent(temp1);
      splitPane.setBottomComponent(controlPane);

      runner.schedule(new TimerTask() {
        // watchdog for if the process itself stops without the button being pressed. by
        // doing so it will be able to handle crashes and set program states to the
        // proper states for further processing without messing up the launcher itself.
        // this is especially useful as well for the hotreload command
        // this command does not modify the process wrapper and instead only watches
        // and alters program states
        //
        // hotreloading allows for the bot to be automatically restarted on code change
        // or on a fixed interval
        @Override public void run()
        {
          if (Boolean.TRUE.equals(started.e))
            process.e.ifPresentOrElse(x -> {
              if (!x.isAlive())
              {
                started.set(false);
                SwingUtilities.invokeLater(() -> {
                  jb.setBackground(Boolean.TRUE.equals(started.get()) ? hexToRGB(_red) : hexToRGB(_green));
                  jb.setText("Start");
                });
                print(warn("The watchdog process saw the process exit?"));
              }
            }, () -> {
              started.set(false);
              SwingUtilities.invokeLater(() -> {
                jb.setBackground(Boolean.TRUE.equals(started.get()) ? hexToRGB(_red) : hexToRGB(_green));
                jb.setText("Start");
              });
              print(warn("The watchdog process saw the process exit?<br>" + process.hashCode()));

            });
        }
      }, 50L, 300L);

      runner.schedule(new TimerTask() {
        @Override public void run()
        {
          i_uptime = ((System.currentTimeMillis() - start) / 1000);
          SwingUtilities.invokeLater(() -> {
            jf.setTitle("daoxe-dashboard:" + ((System.currentTimeMillis() - start) / 1000));
            internalUptime.setText("<html><strong>I_Uptime: </strong> " + time_format(i_uptime));
          });

          if (Boolean.TRUE.equals(started.e) && process.get().isPresent())
          {
            if (process.get().get().isAlive())

              SwingUtilities.invokeLater(() -> processUptime
                  .setText("<html><strong>P_Uptime: </strong> "
                      + time_format(((System.currentTimeMillis() - last_p_uptime.get()) / 1000L))));
          }
          else
            SwingUtilities.invokeLater(() -> processUptime.setText("<html><strong>P_Uptime: </strong> " + 0x0L));

        }
      }, 600L, 100L);

      jf.setContentPane(splitPane);
      jf.pack();
      jf.setLocationRelativeTo(null);
      jf.setVisible(true);

      print(
          "<p style=\"color:#6969\">jackm bootGL 4.6 version<br>Copyright (C) Jack Meng 2020-2022<br>Copyright (C) Khronos Group<br>Runtime Version: "
              + System.getProperty("java.version")
              + "-threadbin->1.2u8<br>&nbsp;[!] this version is experimental (fallback to ES:4.3)<br>&nbsp;[!] default vertex[fp64] was turned off???<br>&nbsp;[!] cmake couldn't detect a proper compile kit (defaulting to clang)");
      print(warn("Daoxe GUI Launcher effective!<br>Took: " + (System.currentTimeMillis() - start) + "ms"));

    }
  }
}