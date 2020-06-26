using Microsoft.Win32;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace Codex
{
  /// <summary>
  /// Interaction logic for MainWindow.xaml
  /// </summary>
  public partial class MainWindow : Window
  {
    public MainWindow()
    {
      InitializeComponent();
    }
    private byte[] pass = new byte[] { 199, 233, 194, 144, 139, 153, 94, 21,8, 124, 231,  45,  15,  72, 190, 161, 136,
 42, 164, 84, 240, 51, 211, 17, 143, 17, 213, 43, 101, 81, 18, 14, 255 };
    private byte[] saltBytes = new byte[] { 16, 34, 158, 55, 7, 97, 43, 12 };

    private void Button_Click(object sender, RoutedEventArgs e)
    {
      string filePath = this.textblock_selected_file.Text;
      if (!ValidateFile(filePath))
      {
        MessageBox.Show("Invalid file - Please check input file");
      }

      try
      {

        var fileName = System.IO.Path.GetFileName(filePath);
        var fileNameExt = System.IO.Path.GetExtension(filePath);
        var fileNameWithoutExt = System.IO.Path.GetFileNameWithoutExtension(filePath);

        var tempPath = System.IO.Path.GetDirectoryName(filePath);

        var originlFile = File.ReadAllBytes(filePath);
        var encryptedFile = AES_EncryptDecrypt(originlFile, pass, CipherMode.CBC, true);

        var TimeStamp = DateTime.Now.ToString("yyyyMMdd_hhmmss");

        var encryptedFileName = fileNameWithoutExt + "_ENCRYPTED_" + TimeStamp + fileNameExt;
        var encryptedFileNamePath = System.IO.Path.Combine(tempPath, encryptedFileName);

        File.WriteAllBytes(encryptedFileNamePath, encryptedFile);

        MessageBox.Show("PROCESS FINISHED: The file has been save in the following path - " + encryptedFileNamePath);

      }
      catch(Exception ex)
      {
        MessageBox.Show("An error has occurred: ", ex.Message);
      }
    }
       

    private void Button_decrypt_Click(object sender, RoutedEventArgs e)
    {
      string filePath = this.textblock_selected_file.Text;
      if (!ValidateFile(filePath))
      {
        MessageBox.Show("Invalid file - Please check input file");
      }

      try
      {

        var fileName = System.IO.Path.GetFileName(filePath);
        var fileNameExt = System.IO.Path.GetExtension(filePath);
        var fileNameWithoutExt = System.IO.Path.GetFileNameWithoutExtension(filePath);

        var tempPath = System.IO.Path.GetDirectoryName(filePath);

        var originlFile = File.ReadAllBytes(filePath);
        var decryptedFile = AES_EncryptDecrypt(originlFile, pass, CipherMode.CBC, false);

        var TimeStamp = DateTime.Now.ToString("yyyyMMdd_hhmmss");

        var decryptedFileName = fileNameWithoutExt + "_DECRYPTED_" + TimeStamp + fileNameExt;
        var decryptedFileNamePath = System.IO.Path.Combine(tempPath, decryptedFileName);

        File.WriteAllBytes(decryptedFileNamePath, decryptedFile);

        MessageBox.Show("PROCESS FINISHED: The file has been save in the following path - " + decryptedFileNamePath);

      }
      catch (Exception ex)
      {
        MessageBox.Show("An error has occurred: ", ex.Message);
      }
    }


    public byte[] AES_EncryptDecrypt(byte[] bytesToProcess, byte[] passwordBytes, CipherMode cipherMode, bool encrypt)
    {
      byte[] resultingBytes = null;
     
      using (MemoryStream ms = new MemoryStream())
      {
        using (RijndaelManaged AES = new RijndaelManaged())
        {
          AES.KeySize = 256;
          AES.BlockSize = 128;

          var key = new Rfc2898DeriveBytes(passwordBytes, saltBytes, 1000);
          AES.Key = key.GetBytes(AES.KeySize / 8);
          AES.IV = key.GetBytes(AES.BlockSize / 8);

          AES.Mode = cipherMode;

          if (encrypt)
          {
            using (var cs = new CryptoStream(ms, AES.CreateEncryptor(), CryptoStreamMode.Write))
            {
              cs.Write(bytesToProcess, 0, bytesToProcess.Length);
              cs.Close();
            }
          }
          else
          {
            using (var cs = new CryptoStream(ms, AES.CreateDecryptor(), CryptoStreamMode.Write))
            {
              cs.Write(bytesToProcess, 0, bytesToProcess.Length);
              cs.Close();
            }
          }
          resultingBytes = ms.ToArray();
        }
      }

      return resultingBytes;
    }

    private bool ValidateFile(string path)
    {
      
      if (string.IsNullOrEmpty(this.textblock_selected_file.Text))
      {
        return false;
      }

      try
      {
        var result = File.Exists(path);
        return result;
      }
      catch (Exception)
      {
        return false;
      }        
    }

    private void Button_Click_1(object sender, RoutedEventArgs e)
    {
      OpenFileDialog dialog = new OpenFileDialog();
      if (dialog.ShowDialog() == true)
      {
        this.textblock_selected_file.Text = dialog.FileName;
      }
      
    }
  }
}
