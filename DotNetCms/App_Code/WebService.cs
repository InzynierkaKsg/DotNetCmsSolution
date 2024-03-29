﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using Model;
using System.Web.Security;
using System.IO;
using AdminModel;
using System.Web.Script.Services;
using System.Security.Cryptography;
using System.Text;

/// <summary>
/// Summary description for WebService
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
 [System.Web.Script.Services.ScriptService]
public class WebService : System.Web.Services.WebService {

    public WebService () {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }



    [WebMethod]
    public void ChangeLogin(string login)
    {
        AdminModelContainer mc = new AdminModelContainer();
        var admin = (from x in mc.AdminSet select x).First();
        admin.Login = login;
        mc.SaveChanges();
    }


    [WebMethod]
    public void ChangePassword(string password)
    {
        AdminModelContainer mc = new AdminModelContainer();
        var admin = (from x in mc.AdminSet select x).First();

        admin.Password = EncodePassword(password);
        mc.SaveChanges();
    }

    
    public string EncodePassword(string originalPassword)
    {
        Byte[] originalBytes;
        Byte[] encodedBytes;
        MD5 md5;

        md5 = new MD5CryptoServiceProvider();
        originalBytes = ASCIIEncoding.Default.GetBytes(originalPassword);
        encodedBytes = md5.ComputeHash(originalBytes);

        return BitConverter.ToString(encodedBytes);
    }


    [WebMethod]
    public bool LogOut()
    {
        try
        {
            FormsAuthentication.SignOut();
            return true;
        }
        catch (Exception)
        {
            return false;
        }
    }

    [WebMethod]
    public void CreatePage(string name)
    {
        ModelContainer1 mc = new ModelContainer1();
        var newPage = new Page();
        newPage.Name = name;
        newPage.Content = "<li class='editable'>Welcome to the new site!</li><li>&#160;</li>";
        mc.AddToPageSet(newPage);
        mc.SaveChanges();
        
    }

    [WebMethod]
    public void AddMarker(int siteId, string markerX, string markerY, string comment)
    {
        ModelContainer1 mc = new ModelContainer1();
        var page = (from x in mc.PageSet where x.Id == siteId select x).First();
        page.Marker_x = markerX;
        page.Marker_y = markerY;
        page.Marker_comment = comment;

        mc.SaveChanges();
    }

    [WebMethod]
    [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
    public string GetMarker(int id)
    {
        ModelContainer1 mc = new ModelContainer1();
        var page = (from x in mc.PageSet where x.Id == id select x).First();
        string value = page.Marker_x + ";;;" + page.Marker_y + ";;;" + page.Marker_comment;
        return value;
    }

    [WebMethod]
    public void DeleteMarker(int siteId)
    {
        ModelContainer1 mc = new ModelContainer1();
        var page = (from x in mc.PageSet where x.Id == siteId select x).First();
        page.Marker_x = null;
        page.Marker_y = null;
        page.Marker_comment = null;

        mc.SaveChanges();
    }

    [WebMethod]
    public int GetLastPage()
    {
        ModelContainer1 mc = new ModelContainer1();
        var page = (from x in mc.PageSet orderby x.Id ascending select x).First();
        return page.Id;

    }

    [WebMethod]
    public void DeletePage(int id)
    {
        ModelContainer1 mc = new ModelContainer1();
        var page = (from x in mc.PageSet where x.Id == id select x).First();
        mc.PageSet.DeleteObject(page);
        mc.SaveChanges();
    }

    [WebMethod]
    public void UpdatePage(int id, string name)
    {
        ModelContainer1 mc = new ModelContainer1();
        var page = (from x in mc.PageSet where x.Id == id select x).First();
        page.Name = name;
        mc.SaveChanges();
    }

    [WebMethod]
    public void SaveContent(string html, int id)
    {
        ModelContainer1 mc = new ModelContainer1();
        var page = (from x in mc.PageSet where x.Id == id select x).First();
        page.Content = html;
        mc.SaveChanges();
    }
    [WebMethod]
    public string GetContent(int id)
    {
        ModelContainer1 mc = new ModelContainer1();
        var page = (from x in mc.PageSet where x.Id == id select x).First();
        return page.Content;
    }
    [WebMethod]
    public string GetLogo()
    {
        ModelContainer1 mc = new ModelContainer1();
        var page = (from x in mc.AllPagesSet select x).First();
        return page.Logo;
    }
    [WebMethod]
    public void SaveLogo(string html)
    {
        ModelContainer1 mc = new ModelContainer1();
        var page = (from x in mc.AllPagesSet select x).First();
        page.Logo = html;
        mc.SaveChanges();
    }
    [WebMethod]
    public void UpdateLogo(string html)
    {
        ModelContainer1 mc = new ModelContainer1();
        var page = (from x in mc.AllPagesSet select x).First();
        page.Logo = html;
        mc.SaveChanges();
    }

    [WebMethod]
    public void UpdateColor(int red, int green ,int blue)
    {
        ModelContainer1 mc = new ModelContainer1();
        var page = (from x in mc.AllPagesSet select x).First();
        page.ColorR = red;
        page.ColorG = green;
        page.ColorB = blue;

        mc.SaveChanges();
    }

    [WebMethod]
    public int GetColorR()
    {
        ModelContainer1 mc = new ModelContainer1();
        var page = (from x in mc.AllPagesSet select x).First();

        return page.ColorR;
        
    }
    [WebMethod]
    public int GetColorG()
    {
        ModelContainer1 mc = new ModelContainer1();
        var page = (from x in mc.AllPagesSet select x).First();

        return page.ColorG;

    }
    [WebMethod]
    public int GetColorB()
    {
        ModelContainer1 mc = new ModelContainer1();
        var page = (from x in mc.AllPagesSet select x).First();

        return page.ColorB;

    }

    
}
