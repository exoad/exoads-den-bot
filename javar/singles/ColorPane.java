package javar.singles;

import javax.swing.*;
import java.awt.*;
import javax.swing.text.*;

public class ColorPane extends JTextPane
{
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

  static final Color D_Black = Color.getHSBColor(0.000f, 0.000f, 0.000f);
  static final Color D_Red = hexToRGB("#ff4245");
  static final Color D_Blue = hexToRGB("#578cff");
  static final Color D_Magenta = hexToRGB("#e54fff");
  static final Color D_Green = hexToRGB("#7bff57");
  static final Color D_Yellow = hexToRGB("#f9ff7b");
  static final Color D_Cyan = hexToRGB("#4ed1b7");
  static final Color D_White = hexToRGB("#f4f4f4");
  static final Color B_Black = Color.getHSBColor(0.000f, 0.000f, 0.502f);
  static final Color B_Red = hexToRGB("#f44a4a");
  static final Color B_Blue = hexToRGB("#4088f4");
  static final Color B_Magenta = hexToRGB("#ff6cf1");
  static final Color B_Green = hexToRGB("#87ff62");
  static final Color B_Yellow = hexToRGB("#f8ff65");
  static final Color B_Cyan = hexToRGB("#58d2b4");
  static final Color B_White = hexToRGB("#f4f4f4");
  static final Color cReset = Color.getHSBColor(0.000f, 0.000f, 1.000f);
  static Color colorCurrent = cReset;
  String remaining = "";

  public void append(Color c, String s)
  {
    StyleContext sc = StyleContext.getDefaultStyleContext();
    AttributeSet aset = sc.addAttribute(SimpleAttributeSet.EMPTY, StyleConstants.Foreground, c);
    int len = getDocument().getLength();
    setCaretPosition(len);
    setCharacterAttributes(aset, false);
    replaceSelection(s);
  }

  public void appendANSI(String s)
  {
    int aPos = 0;
    int aIndex = 0;
    int mIndex = 0;
    String tmpString = "";
    boolean stillSearching = true;
    String addString = remaining + s;
    remaining = "";

    if (addString.length() > 0)
    {
      aIndex = addString.indexOf("\u001B");
      if (aIndex == -1)
      {
        append(colorCurrent, addString);
        return;
      }

      if (aIndex > 0)
      {
        tmpString = addString.substring(0, aIndex);
        append(colorCurrent, tmpString);
        aPos = aIndex;
      }

      stillSearching = true;
      while (stillSearching)
      {
        mIndex = addString.indexOf("m", aPos);
        if (mIndex < 0)
        {
          remaining = addString.substring(aPos, addString.length());
          stillSearching = false;
          continue;
        }
        else
        {
          tmpString = addString.substring(aPos, mIndex + 1);
          colorCurrent = getANSIColor(tmpString);
        }
        aPos = mIndex + 1;

        aIndex = addString.indexOf("\u001B", aPos);

        if (aIndex == -1)
        {
          tmpString = addString.substring(aPos, addString.length());
          append(colorCurrent, tmpString);
          stillSearching = false;
          continue;
        }

        tmpString = addString.substring(aPos, aIndex);
        aPos = aIndex;
        append(colorCurrent, tmpString);

      }
    }
  }

  public Color getANSIColor(String ANSIColor)
  {
    if (ANSIColor.equals("\u001B[30m"))
    {
      return D_Black;
    }
    else if (ANSIColor.equals("\u001B[31m"))
    {
      return D_Red;
    }
    else if (ANSIColor.equals("\u001B[32m"))
    {
      return D_Green;
    }
    else if (ANSIColor.equals("\u001B[33m"))
    {
      return D_Yellow;
    }
    else if (ANSIColor.equals("\u001B[34m"))
    {
      return D_Blue;
    }
    else if (ANSIColor.equals("\u001B[35m"))
    {
      return D_Magenta;
    }
    else if (ANSIColor.equals("\u001B[36m"))
    {
      return D_Cyan;
    }
    else if (ANSIColor.equals("\u001B[37m"))
    {
      return D_White;
    }
    else if (ANSIColor.equals("\u001B[0;30m"))
    {
      return D_Black;
    }
    else if (ANSIColor.equals("\u001B[0;31m"))
    {
      return D_Red;
    }
    else if (ANSIColor.equals("\u001B[0;32m"))
    {
      return D_Green;
    }
    else if (ANSIColor.equals("\u001B[0;33m"))
    {
      return D_Yellow;
    }
    else if (ANSIColor.equals("\u001B[0;34m"))
    {
      return D_Blue;
    }
    else if (ANSIColor.equals("\u001B[0;35m"))
    {
      return D_Magenta;
    }
    else if (ANSIColor.equals("\u001B[0;36m"))
    {
      return D_Cyan;
    }
    else if (ANSIColor.equals("\u001B[0;37m"))
    {
      return D_White;
    }
    else if (ANSIColor.equals("\u001B[1;30m"))
    {
      return B_Black;
    }
    else if (ANSIColor.equals("\u001B[1;31m"))
    {
      return B_Red;
    }
    else if (ANSIColor.equals("\u001B[1;32m"))
    {
      return B_Green;
    }
    else if (ANSIColor.equals("\u001B[1;33m"))
    {
      return B_Yellow;
    }
    else if (ANSIColor.equals("\u001B[1;34m"))
    {
      return B_Blue;
    }
    else if (ANSIColor.equals("\u001B[1;35m"))
    {
      return B_Magenta;
    }
    else if (ANSIColor.equals("\u001B[1;36m"))
    {
      return B_Cyan;
    }
    else if (ANSIColor.equals("\u001B[1;37m"))
    {
      return B_White;
    }
    else if (ANSIColor.equals("\u001B[0m"))
    {
      return cReset;
    }
    else
    {
      return B_White;
    }
  }
}