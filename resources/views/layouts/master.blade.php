<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>{{ config('app.name', 'Accounting') }}</title>

    <!-- Bootstrap Core CSS -->
    <link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <!-- MetisMenu CSS -->
    <link href="vendor/metisMenu/metisMenu.min.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="dist/css/sb-admin-2.css" rel="stylesheet">

    <!-- Morris Charts CSS -->
    <link href="vendor/morrisjs/morris.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="vendor/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">
    <style>


        .modal-body, .modal-footer {
            width: 70%;
            background: #fff;
            margin: auto;
        }
        .modal-body {
            margin-top:3%;
            max-height: 80%;
            overflow: auto;
        }
    </style>

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body>

    <div id="wrapper">

        <!-- Navigation -->
        <nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="index.html">{{ config('app.name', 'Accounting') }}</a>
            </div>
            <!-- /.navbar-header -->

            <ul class="nav navbar-top-links navbar-right">
                
                <li class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                        <i class="fa fa-user fa-fw"></i> <i class="fa fa-caret-down"></i>
                    </a>
                    <ul class="dropdown-menu dropdown-user">
                        <li><a href="#"><i class="fa fa-user fa-fw"></i> User Profile</a>
                        </li>
                        <li><a href="#"><i class="fa fa-gear fa-fw"></i> Settings</a>
                        </li>
                        <li class="divider"></li>
                        <li><a href="login.html"><i class="fa fa-sign-out fa-fw"></i> Logout</a>
                        </li>
                    </ul>
                    <!-- /.dropdown-user -->
                </li>
                <!-- /.dropdown -->
            </ul>
            <!-- /.navbar-top-links -->

            <div class="navbar-default sidebar" role="navigation">
                <div class="sidebar-nav navbar-collapse">
                    <ul class="nav" id="side-menu">
                        <li class="sidebar-search" style="display:none;">
                            <div class="input-group custom-search-form">
                                <input type="text" class="form-control" placeholder="Search...">
                                <span class="input-group-btn">
                                <button class="btn btn-default" type="button">
                                    <i class="fa fa-search"></i>
                                </button>
                            </span>
                            </div>
                            <!-- /input-group -->
                        </li>
                        <li>
                            <a href="{{ route('home') }}"><i class="fa fa-dashboard fa-fw"></i> Dashboard</a>
                        </li>
                        <li>
                            <a href="{{ route('ledger') }}"><i class="fa fa-bar-chart-o fa-fw"></i> Ledger</a>
                        </li>
                        <li>
                            <a href="{{ route('orders') }}"><i class="fa fa-shopping-cart fa-fw"></i> Orders</a>
                        </li>
                        <li>
                            <a href="{{ route('catalog') }}"><i class="fa fa-list fa-fw"></i> Catalog</a>
                        </li>
                        <li>
                            <a href="{{ route('reports') }}"><i class="fa fa-page fa-fw"></i> Reports</a>
                        </li>
                        <!--
                        <li>
                            <a href="{{ route('inventory') }}"><i class="fa fa-list fa-fw"></i> Inventory</a>
                        </li>
                        
                        <li>
                            <a href="{{ route('expenses') }}"><i class="fa fa-table fa-fw"></i> Expenses</a>
                        </li>
                        <li>
                            <a href="{{ route('employees') }}"><i class="fa fa-wrench fa-fw"></i> Users</a>
                        </li>
                        <li>
                            <a href="{{ route('settings') }}"><i class="fa fa-sitemap fa-fw"></i> Settings</a>
                        </li>
                        -->
                    </ul>
                </div>
                <!-- /.sidebar-collapse -->
            </div>
            <!-- /.navbar-static-side -->
        </nav>

        <div id="page-wrapper">
        @yield('content')

        </div>
        <!-- /#page-wrapper -->

    </div>
    <!-- /#wrapper -->

    <!-- jQuery -->
    <script src="vendor/jquery/jquery.min.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="vendor/bootstrap/js/bootstrap.min.js"></script>

    <!-- Metis Menu Plugin JavaScript -->
    <script src="vendor/metisMenu/metisMenu.min.js"></script>

    <!-- Morris Charts JavaScript -->
    <script src="vendor/raphael/raphael.min.js"></script>
    <script src="vendor/morrisjs/morris.min.js"></script>
    <!-- <script src="data/morris-data.js"></script> -->
    @yield('scripts')
        <!-- Dashboard files -->
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="vendor/jquery.cookie.js" type="text/javascript"></script>
    <!-- <script src="../js/vendor/jquery.ba-hashchange.min.js" type="text/javascript"></script> -->

    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js"></script>
    <script type="text/javascript" src="js/bootbox.min.js"></script>
    <script type="text/javascript" src="js/dashboard-ui/dashboard-ui.js"></script>
    <script type="text/javascript" src="js/dashboard-ui/dashboard-storage.js"></script>
    <script type="text/javascript" src="js/dashboard-ui/dashboard-form.js"></script>
    <script type="text/javascript" src="js/dashboard-ui/dashboard-datatable.js"></script>
    <script type="text/javascript" src="js/dashboard-ui/dashboard-response.js"></script>
    <script type="text/javascript" src="js/dashboard-ui/modal-form.js"></script>

    <script type="text/javascript" src="js/dashboard-ui/pagination.js"></script>
    <script type="text/javascript" src="js/site-viewmodel.js"></script>
    <script type="text/javascript" src="js/site-controller.js"></script>

    <script type="text/javascript" src="js/cache.js"></script>
    <script type="text/javascript" src="js/hud.js"></script>
    <script type="text/javascript" src="js/sdk-bridge.js"></script>
    <script type="text/javascript" src="js/accounting-app.js"></script>
    <script type="text/javascript" src="js/accounting-app-ext.js"></script>

    <!-- Custom Theme JavaScript -->
    <script src="dist/js/sb-admin-2.js"></script>

</body>

</html>
