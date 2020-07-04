@extends('layouts.master')

@section('content')

    <!-- DataTables CSS -->
    <link href="vendor/datatables-plugins/dataTables.bootstrap.css" rel="stylesheet">

    <!-- DataTables Responsive CSS -->
    <link href="vendor/datatables-responsive/dataTables.responsive.css" rel="stylesheet">
            <div class="row">
                <div class="col-lg-12">
                    <h1 class="page-header">Items</h1>
                </div>
                <!-- /.col-lg-12 -->
            </div>
            <!-- /.row -->
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                                <a href="#" id="new-item-btn" class="btn btn-lg btn-success btn-block">Add New</a>
                        </div>
                        <!-- /.panel-heading -->
                        <div class="panel-body">
                            <table width="100%" class="table table-striped table-bordered table-hover" id="dataTables-example">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Type</th>
                                        <th>Cost</th>
                                        <th>Notes</th>
                                    </tr>
                                </thead>
                                <tbody id="item-list">
                                    <tr class="table-row gradeX">
                                        <input type="hidden" class="item-id" name="item_id">
                                        <td class="name"></td>
                                        <td class="item_type"></td>
                                        <td class="cost"></td>
                                        <td class="notes"></td>
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

            <div style="display:none;" >
              <div id="item-edit">
                <div class="x_content">
                  <br />
                  <form id="item-form" data-parsley-validate class="form-horizontal form-label-left">
                    <!-- <div class="form-group">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12" for="created_at">Date<span class="required">*</span>
                      </label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                        <input type="text" name="created_at" required="required" class="created_at form-control col-md-7 col-xs-12">
                      </div>
                    </div> -->
                    <div class="form-group">
                      {{ csrf_field() }}
                      <label class="control-label col-md-3 col-sm-3 col-xs-12" for="total">Name<span class="required">*</span>
                      </label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                        <input type="text" name="name" required="required" class="name form-control col-md-7 col-xs-12">
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12" for="status">Status<span class="required">*</span>
                      </label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                        <select name="status" class="status form-control" required>
                          <option value="Product">Product</option>
                          <option value="Service">Service</option>
                        </select>
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12" for="cost">Cost<span class="required">*</span>
                      </label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                        <input type="text" name="cost" required="required" class="cost form-control col-md-7 col-xs-12">
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12" for="notes">Notes<span class="required">*</span>
                      </label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                        <input type="text" name="notes" required="required" class="notes form-control col-md-7 col-xs-12">
                      </div>
                    </div>
                    <div class="ln_solid"></div>
                    <div class="form-group control-buttons" style="display:none;">
                      <div class="col-md-6 col-sm-6 col-xs-12 col-md-offset-3">
                        <button class="btn btn-primary btn-cancel" type="button">Cancel</button>
                        <button type="submit" id="save-line-item-btn" class="btn btn-success">Submit</button>
                      </div>
                    </div>

                  </form>
                </div>
              </div>
            </div>
@endsection

@section('scripts')

    <!-- DataTables JavaScript -->
    <script src="vendor/datatables/js/jquery.dataTables.min.js"></script>
    <script src="vendor/datatables-plugins/dataTables.bootstrap.min.js"></script>
    <script src="vendor/datatables-responsive/dataTables.responsive.js"></script>
    <script src="vendor/datatables-responsive/dataTables.responsive.js"></script>
    <script src="js/controllers/item-manage-controller.js"></script>
    <script src="js/viewmodels/item-viewmodel.js"></script>
    <script>
    $(document).ready( function() {
      // use active controller for navigation, or instantiate new onctoller on load
      // var controller = SiteController.pageController === null ? new TableNameManageController() : $.extend({}, SiteController.pageController);
      var controller = new ItemManageController();
      
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