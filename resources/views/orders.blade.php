@extends('layouts.master')

@section('content')

    <!-- DataTables CSS -->
    <link href="vendor/datatables-plugins/dataTables.bootstrap.css" rel="stylesheet">

    <!-- DataTables Responsive CSS -->
    <link href="vendor/datatables-responsive/dataTables.responsive.css" rel="stylesheet">
            <div class="row">
                <div class="col-lg-12">
                    <h1 class="page-header">Orders</h1>
                </div>
                <!-- /.col-lg-12 -->
            </div>
            <!-- /.row -->
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                                <a href="#" id="new-user-btn" class="btn btn-lg btn-success btn-block">Add New</a>
                        </div>
                        <!-- /.panel-heading -->
                        <div class="panel-body">
                            <table width="100%" class="table table-striped table-bordered table-hover" id="dataTables-example">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Customer Name</th>
                                        <th>Customer Email</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody id="order-list">
                                    <tr class="table-row gradeX">
                                        <input type="hidden" name="item_id">
                                        <td class="created_at"></td>
                                        <td class="name"></td>
                                        <td class="email"></td>
                                        <td class="total"></td>
                                    </tr>
                                </tbody>
                            </table>
                            <!-- /.table-responsive -->
                            
                        </div>
                        <!-- /.panel-body -->
                    </div>
                    <!-- /.panel -->
                </div>
                <!-- /.col-lg-12 -->
            </div>
            <!-- /.row -->
@endsection

@section('scripts')

    <!-- DataTables JavaScript -->
    <script src="vendor/datatables/js/jquery.dataTables.min.js"></script>
    <script src="vendor/datatables-plugins/dataTables.bootstrap.min.js"></script>
    <script src="vendor/datatables-responsive/dataTables.responsive.js"></script>
    <script src="vendor/datatables-responsive/dataTables.responsive.js"></script>
    <script src="js/controllers/order-manage-controller.js"></script>
    <script src="js/viewmodels/order-viewmodel.js"></script>
    <script>
    $(document).ready( function() {
      // use active controller for navigation, or instantiate new onctoller on load
      // var controller = SiteController.pageController === null ? new TableNameManageController() : $.extend({}, SiteController.pageController);
      var controller = new OrderManageController();
      
      // explicity set (or reset) the site controller
      SiteController.pageController = controller;

      // Activate the "onReady" method to prepare the form
      SiteController.pageController.onReady();
    });
    </script>
     <!-- <script>
    $(document).ready(function() {
        $('#dataTables-example').DataTable({
            responsive: true
        });
    });
    </script> -->
@endsection