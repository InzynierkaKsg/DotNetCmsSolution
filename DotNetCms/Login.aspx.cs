using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using System.Web.Security;
using AdminModel;

public partial class Login : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {

    }
    protected void Login1_Authenticate(object sender, AuthenticateEventArgs e)
    {
        AdminModelContainer model = new AdminModelContainer();

        AdminModel.Admin record = null;

        try
        {
            record = (from x in model.AdminSet where x.Login == Login1.UserName && x.Password == Login1.Password select x).First();
        }
        catch (Exception)
        { }
        if (record != null)
            FormsAuthentication.RedirectFromLoginPage(Login1.UserName, Login1.RememberMeSet);
        
    }
}