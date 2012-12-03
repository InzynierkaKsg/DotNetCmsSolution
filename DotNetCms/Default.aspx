<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1">

    <link rel="stylesheet" href="http://code.jquery.com/ui/1.9.1/themes/base/jquery-ui.css" />
    <link rel="stylesheet" href="Gumby/css/imports.css" />
    
    <link href="editPane.css" rel="stylesheet" type="text/css" />

    <script type="text/javascript" src="http://code.jquery.com/jquery-1.8.2.js"></script>
    <script type="text/javascript" src="http://code.jquery.com/ui/1.9.1/jquery-ui.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?sensor=false"></script>
    <script type="text/javascript" src="https://www.google.com/jsapi"></script>

    <script type="text/javascript" src="Gumby/js/libs/gumby.js"></script>
    <script type="text/javascript" src="Gumby/js/plugins.js"></script>
    <script type="text/javascript" src="Gumby/js/main.js"></script>

    <script type="text/javascript" src="toolboxScripts/color.js"></script>
 

    <script type="text/javascript" src="jquery-ui-map/jquery.ui.map.js"></script>
    <script type="text/javascript" src="jquery-ui-map/jquery.ui.map.services.js"></script>
    <script type="text/javascript" src="jquery-ui-map/jquery.ui.map.extensions.js"></script>
     
    <script type="text/javascript" src="hover.js"></script>
    
    <title>DotNetCMS</title>
</head>
<body>
    <form id="form1" runat="server">
        <div class="container">
           

            <div class="row">
                <div class="twelve columns">
                    <nav class="pretty navbar clearfix" id="prettynav">
                        <h1 class="logo">
                            <a class="notDeleteable tooltp" href="#" id="logo">
                                <%= PageLogo%>
                            </a>
                        </h1>
                        <a id="tog" href="#" class="toggle" data-for="#prettynav > ul">
                            <img src="Gumby/img/icon_nav_toggle.gif" style="margin-top: 10px"/>
                        </a>

                        <ul id="menuNav">
                            <%= PagesCollection%>                    
                        </ul>
                    </nav>
                </div>
            </div>

            <div class="row">
                <div class="twelve columns" id="content">
                    <ul id="contentUL">
                        <%= PageContent %>
                    </ul>
                </div>
            </div>

            <div class="row">
                <div class="twelve columns">
                    <p id="footer">
                        Stopka
                    </p>
                </div>
            </div>
        </div>

        <div id="currentPage" style="display: none"><%= PageId%></div>
        <asp:ScriptManager ID="ScriptManager1" runat="server">
            <Services>
                <asp:ServiceReference Path="~/WebService.asmx" />
            </Services>
        </asp:ScriptManager>

       

       

    </form>
</body>
</html>
