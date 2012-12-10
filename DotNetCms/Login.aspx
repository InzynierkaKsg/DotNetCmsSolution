<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Login.aspx.cs" Inherits="Login" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
     <link href="login.css" rel="stylesheet" type="text/css" />
     <script type="text/javascript" src="http://code.jquery.com/jquery-1.8.2.js"></script>
     <script type="text/javascript" src="login.js"></script>
     <!--[if gte IE 9]>
      <style type="text/css">
        .gradient {
           filter: none;
        }
      </style>
    <![endif]-->
</head>
<body>
    <form id="form1" runat="server">
    <div id="loginLogo">
        <h1>
            Dot Net Cms
        </h1>
    </div>
    <div id = "logInForm">
        <asp:Login ID="Login1" runat="server" onauthenticate="Login1_Authenticate">
        </asp:Login>
    </div>
    </form>
</body>
</html>