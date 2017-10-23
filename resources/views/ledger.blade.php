@extends('layouts.master')

@section('content')

    <!-- DataTables CSS -->
    <link href="vendor/datatables-plugins/dataTables.bootstrap.css" rel="stylesheet">

    <!-- DataTables Responsive CSS -->
    <link href="vendor/datatables-responsive/dataTables.responsive.css" rel="stylesheet">
            <div class="row">
                <div class="col-lg-12">
                    <h1 class="page-header">Ledger</h1>
                </div>
                <!-- /.col-lg-12 -->
            </div>
            <!-- /.row -->
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                                <a href="#" id="new-line-item-btn" class="btn btn-lg btn-success btn-block">Add New Line Item</a>
                        </div>
                        <!-- /.panel-heading -->
                        <div class="panel-body">
                            <table width="100%" class="table table-striped table-bordered table-hover" id="dataTables-example">
                                <thead>
                                    <tr>
                                        <th>Label</th>
                                        <th>Type</th>
                                        <th>Amount</th>
                                        <th>Date</th>
                                        <th>Notes</th>
                                    </tr>
                                </thead>
                                <tbody id="line-item-list">
                                    <tr class="table-row gradeX">
                                        <input type="hidden" class="item-id" name="item_id">
                                        <td class="label_field"></td>
                                        <td class="entry_type"></td>
                                        <td class="amount"></td>
                                        <td class="created_at"></td>
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
              <div id="line-item-edit">
                <div class="x_content">
                  <br />
                  <form id="line-item-form" data-parsley-validate class="form-horizontal form-label-left">
                    <div class="form-group">
                      {{ csrf_field() }}
                      <label class="control-label col-md-3 col-sm-3 col-xs-12" for="label_field">Label<span class="required">*</span>
                      </label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                        <input type="text" name="label" required="required" class="label_field form-control col-md-7 col-xs-12">
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12" for="amount">Amount<span class="required">*</span>
                      </label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                        <input type="text" name="amount" required="required" class="amount form-control col-md-7 col-xs-12">
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12" for="comment">Comment<span class="required">*</span>
                      </label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                        <input type="text" name="comment" required="required" class="comment form-control col-md-7 col-xs-12">
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="control-label col-md-3 col-sm-3 col-xs-12" for="entry_type">Type <span class="required">*</span>
                      </label>
                      <div class="col-md-6 col-sm-6 col-xs-12">
                        <select name="entry_type" class="entry_type form-control" required>
                          <option value="">Choose..</option>
                          <option value="Debit">Debit</option>
                          <option value="Credit">Credit</option>
                        </select>
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
    <script src="js/controllers/line-item-manage-controller.js"></script>
    <script src="js/viewmodels/line-item-viewmodel.js"></script>
    <script>
    $(document).ready( function() {
      // use active controller for navigation, or instantiate new onctoller on load
      // var controller = SiteController.pageController === null ? new TableNameManageController() : $.extend({}, SiteController.pageController);
      var controller = new LineItemManageController();
      
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