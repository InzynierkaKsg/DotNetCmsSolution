using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;
using Model;

public partial class _Default : System.Web.UI.Page
{
    
    private string _PagesCollection;
    public string PagesCollection
    {
        get { return _PagesCollection; }
        set { _PagesCollection = value; }
    }

    private string _PageContent;
    public string PageContent
    {
        get { return _PageContent; }
        set { _PageContent = value; }
    }

    private int _PageId;
    public int PageId
    {
        get { return _PageId; }
        set { _PageId = value; }
    }

    public string PageLogo { get; set; }

    protected void Page_Load(object sender, EventArgs e)
    {
        ModelContainer1 mc = new ModelContainer1();
        var contentForAllPages = (from x in mc.AllPagesSet select x).First();
        PageLogo = contentForAllPages.Logo;

        var defaultPage = (from x in mc.PageSet select x).First();

        PagesCollection = "";

        var pageCollection = (from x in mc.PageSet orderby x.Id ascending select x);
        foreach (Model.Page p in pageCollection)
        {
            PagesCollection += "<li><a class='hovGradient' id='pageId" + p.Id + "' href='?pageId=" + p.Id + "'>" + p.Name + "</a></li>";
        }

        string pageId = Request.QueryString["pageId"];
        if (pageId != null)
        {
            int id = int.Parse(pageId);
            Model.Page page = null;
            try
            {
                page = (from x in mc.PageSet where x.Id == id select x).First();
            }
            catch(Exception)
            { }
            if (page == null)
            {
                page = (Model.Page)defaultPage;
                Response.Redirect("Default.aspx?pageId="+page.Id);
            }
       
            
            PageId = id;
            PageContent = page.Content;
            
        }
        else
        {
            PageId = defaultPage.Id;
            PageContent = defaultPage.Content;
         
        }

    }
}