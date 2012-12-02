<%@ WebHandler Language="C#" Class="FileUploaderHandler" %>

using System;
using System.IO;
using System.Web;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;

public class FileUploaderHandler : IHttpHandler {
    
    string imagesDir = "";
    string currFileName;
    
    public void ProcessRequest (HttpContext context) {
        if (context.Request.Files.Count > 0)
        {
            HttpFileCollection files = context.Request.Files;
            foreach (string key in files)
            {
                HttpPostedFile file = files[key];
                currFileName = file.FileName;
                var originalFilePath = context.Server.MapPath("~/images/original_" + currFileName);
                file.SaveAs(originalFilePath);
                
                imagesDir = originalFilePath.Substring(0, originalFilePath.LastIndexOf('\\') + 1);

                using (var bitmapa = Image.FromFile(originalFilePath))
                {
                    addResizedImage(bitmapa, 600, 80L, "medium_");
                    addResizedImage(bitmapa, 300, 50L, "small_");
                }
            }
        }
        context.Response.ContentType = "text/plain";
        context.Response.Write("File(s) uploaded successfully!");
    }

    private void addResizedImage(Image bitmapa, int newMaxWidth, Int64 quality, string prefix)
    {
        decimal origWidth = bitmapa.Width;
        if (origWidth < newMaxWidth) { 
            newMaxWidth = Convert.ToInt32(origWidth);
        }
        
        decimal origHeight = bitmapa.Height;
        decimal sngRatio = origWidth / origHeight;
        int newWidth = newMaxWidth;
        decimal newWidth_temp = newWidth / sngRatio;
        int newHeight = Convert.ToInt16(newWidth_temp);

        using (Image newImage = new Bitmap(newWidth, newHeight))
        {

            using (Graphics graphicsHandle = Graphics.FromImage(newImage))
            {
                graphicsHandle.InterpolationMode = InterpolationMode.HighQualityBicubic;
                graphicsHandle.DrawImage(bitmapa, 0, 0, newWidth, newHeight);
            }

            var myImageCodecInfo = GetEncoderInfo("image/jpeg");
            var myEncoder = Encoder.Quality;
            var myEncoderParameters = new EncoderParameters(1);

            var myEncoderParameter = new EncoderParameter(myEncoder, quality);
            myEncoderParameters.Param[0] = myEncoderParameter;

            newImage.Save(imagesDir + prefix + currFileName, myImageCodecInfo, myEncoderParameters);
        }
    }

    private static ImageCodecInfo GetEncoderInfo(String mimeType)
    {
        int j;
        ImageCodecInfo[] encoders;
        encoders = ImageCodecInfo.GetImageEncoders();
        for (j = 0; j < encoders.Length; ++j)
        {
            if (encoders[j].MimeType == mimeType)
                return encoders[j];
        }
        return null;
    }

    
    public bool IsReusable {
        get {
            return false;
        }
    }

}