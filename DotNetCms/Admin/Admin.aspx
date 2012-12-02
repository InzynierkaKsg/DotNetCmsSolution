<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Admin.aspx.cs" Inherits="_Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1">

    <link rel="stylesheet" href="http://code.jquery.com/ui/1.9.1/themes/base/jquery-ui.css" />
    <link rel="stylesheet" href="../Gumby/css/imports.css" />
    <link rel="stylesheet" href="../colorPicker.css" />
    <link href="../jHtmlArea/style/jHtmlArea.css" rel="stylesheet" type="text/css" />


    <script type="text/javascript" src="http://code.jquery.com/jquery-1.8.2.js"></script>
    <script type="text/javascript" src="http://code.jquery.com/ui/1.9.1/jquery-ui.js"></script>
    <script src="https://maps.googleapis.com/maps/api/js?sensor=false"></script>
    <script type="text/javascript" src="https://www.google.com/jsapi"></script>

    <script type="text/javascript" src="../Gumby/js/libs/gumby.js"></script>
    <script type="text/javascript" src="../Gumby/js/plugins.js"></script>
    <script type="text/javascript" src="../Gumby/js/main.js"></script>

    <script type="text/javascript" src="../toolboxScripts/color.js"></script>
    <script type="text/javascript" src="../toolboxScripts/dialogAddPageForm.js"></script>
    <script type="text/javascript" src="../toolboxScripts/dialogAddTextEditor.js"></script>
    <script type="text/javascript" src="../toolboxScripts/dialogEditTabsForm.js"></script>
    <script type="text/javascript" src="../toolboxScripts/dialogEditPictureForm.js"></script>
    <script type="text/javascript" src="../toolboxScripts/dialogForm.js"></script>
    <script type="text/javascript" src="../toolboxScripts/dialogMapForm.js"></script>
    <script type="text/javascript" src="../toolboxScripts/dialogPagesForm.js"></script>
    <script type="text/javascript" src="../toolboxScripts/dialogPictureForm.js"></script>
    <script type="text/javascript" src="../toolboxScripts/dialogTabsForm.js"></script>
    <script type="text/javascript" src="../toolboxScripts/dialogTextEditor.js"></script>
    <script type="text/javascript" src="../toolboxScripts/dialogValidation.js"></script>
    <script type="text/javascript" src="../toolboxScripts/toolbox.js"></script>

    <script type="text/javascript" src="../jquery-ui-map/jquery.ui.map.js"></script>
    <script type="text/javascript" src="../jquery-ui-map/jquery.ui.map.services.js"></script>
    <script type="text/javascript" src="../jquery-ui-map/jquery.ui.map.extensions.js"></script>

    <script type="text/javascript" src="../jHtmlArea/scripts/jHtmlArea-0.7.5.js"></script>

    <script type="text/javascript" src="../jquery.highlightEdit.js"></script>
    <script type="text/javascript" src="../hover.js"></script>

    <title>DotNetCMS</title>
    <script type="text/javascript">
        $(function () {
            $('#logout').click(function () {
                WebService.LogOut();
                window.location.replace("../Login.aspx");
            });
        });
    </script>
</head>
<body>
    <form id="form1" runat="server">
        <div class="container">
            <div class="row">
                <div class="twelve columns">
                    <nav class="navbar clearfix" id="basicnav2">
                        <ul>
                            <li id="contentColor"><a class="hov" href="#">Color</a></li>
                            <li id="addPage"><a class="hov" href="#">Add Page</a></li>
                            <li id="pages"><a class="hov" href="#">Pages</a></li>
                            <li id="admin"><a class="hov" href="#">Admin</a></li>
                            <li id="logout"><a class="hov" href="#">LogOut</a></li>
                        </ul>
                    </nav>
                    <nav class="navbar clearfix" id="basicnav">
                        <ul id="toolbox">
                            <li id="textEditor"><a class="hov" href="#">Text</a></li>
                            <li id="accordion"><a class="hov" href="#">Accordion</a></li>
                            <li id="tab1"><a class="hov" href="#">Tab1</a></li>
                            <li id="tab2"><a class="hov" href="#">Tab2</a></li>
                            <li id="picture"><a class="hov" href="#">Picture</a></li>
                            <li id="map"><a class="hov" href="#">Map</a></li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div class="row">
                <div class="twelve columns">
                    <nav class="pretty navbar clearfix" id="prettynav">
                        <h1 class="logo">
                            <a class="notDeleteable tooltp" href="#" id="logo" title="Double click to edit Logo.">
                                <%= PageLogo%>
                            </a>
                        </h1>
                        <a id="tog" href="#" class="toggle" data-for="#prettynav > ul">
                            <img src="../Gumby/img/icon_nav_toggle.gif" style="margin-top: 10px"/>
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

        <div id="pictureForm" title="Add picture"></div>
        <div id="pictureFormEdit" title="Save picture"></div>
        <div id="tabForm" title="Titles"></div>
        <div id="tabEditForm" title="Titles"></div>
        <div id="picker" title="Color"></div>
        <div id="textEditorForm" title="Edit text"></div>
        <div id="textAddForm" title="Add text editor"></div>
        <div id="mapForm" title="Add map"></div>
        <div id="pageForm" title="Pages"></div>
        <div id="addPageForm" title="Add Page"></div>
    </form>
</body>
</html>
