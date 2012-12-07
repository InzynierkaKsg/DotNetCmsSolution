using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using System.Web.Security;
using AdminModel;
using System.Security.Cryptography;
using System.Text;




public partial class Login : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

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

    protected void Login1_Authenticate(object sender, AuthenticateEventArgs e)
    {
        AdminModelContainer model = new AdminModelContainer();

        AdminModel.Admin record = null;

        string encodePassword = EncodePassword(Login1.Password);
        try
        {
            record = (from x in model.AdminSet where x.Login == Login1.UserName && x.Password == encodePassword select x).First();
        }
        catch (Exception)
        { }
        if (record != null)
            FormsAuthentication.RedirectFromLoginPage(Login1.UserName, Login1.RememberMeSet);
        
    }
}