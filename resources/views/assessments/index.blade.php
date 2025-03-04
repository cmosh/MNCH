@extends('template')

@section('title')
 <title>MNCH | {{$title}}</title>
@endsection

@section('pageinfo')

 <h1> </h1>

         
  @endsection

  @section('cdns')

  <!-- Select2 -->
  
 

 

@endsection 

@section('content')

{!! Form::open() !!}
{!! Form::close() !!}
<div class="col-md-12">
              <div class="box box-default">
                <div class="box-header with-border">
                 <h3 class="box-title">Surveys</h3>
                </div><!-- /.box-header -->
                <div class="box-body">
                 
             <!--  @foreach ($Surveys as $Survey) -->
            <?php $loc = substr ($Survey->surveyID, 0,2) ?>
            <!-- @endforeach -->
             
              @if ($loc == 'CH')
                    <div class="small-box bg-aqua">
              @elseif ($loc == 'MN')
    <div class="small-box bg-yellow">
@else
    <div class="small-box bg-red">
@endif
             
                <div class="inner">
                  <h2>{{$Survey->Name}} Survey</h2>
                
                </div>
                <div class="icon">
                  <i class="ion ion-stats-bars"></i>
                </div>
               
              </div>

             
             <!-- Horizontal Form -->
              <div class="row">
               
              <div class="col-md-6">
    <div class="box box-danger">
                <div class="box-header with-border">
                  <h3 class="box-title">Begin New Assessment</h3>
                </div><!-- /.box-header -->
                <!-- form start -->
               
             

                  <div class="box-body">
                     <div class="form-horizontal">
                  <?php $loc = substr ($Survey->surveyID, 0,2) ?>
                @if($loc=='CH' or $loc=='MN')
                    <div class="form-group">
                      <label for="County" class="col-sm-2 control-label">Select County</label>
                      <div class="col-sm-10">
                       <select class="form-control select2 " style="width: 100%;" name="County" id="County"> 
                       <option value ="" >Select County</option>
                       @foreach($Counties as $County)
                        <!-- change if later -->
                        
                       <option value ="{{$County->Name}}" id ="{{$County->Name}}" >{{$County->Name}}</option>
                       
                        @endforeach
                       </select>
                     
                      </div>
                      </div>
                          <!-- the stuff 1 -->
            <div class="form-group">
                       <label for="SubCounty1" class="col-sm-2 control-label">Select Sub-County</label>
                      <div class="col-sm-10">
                      <select class="form-control select2 subcounty " style="width: 100%;" name="SubCounty1" id="SubCounty1"> 
                        <option value ="" >Select Sub-County</option>
                      
                      
                       </select>
                      </div>
                    </div>
<!-- the stuff 1 -->


					<div class="form-group">
                      <label for="Version1" class="col-sm-2 control-label">Select Version</label>
                      <div class="col-sm-10">
                      <select class="form-control select2 " style="width: 100%;" name="Version1" id="Version1"> 
                      <option value ="" >Select Version</option>
                       @foreach($Surveys->reverse() as $Survey)
                       <!-- change if later -->
                         
                       <option value ="{{$Survey->surveyID}}" id ="{{$Survey->Version}}" >Version {{$Survey->Version}} :{{$Survey->Runtime}} </option>
                      
                        @endforeach
                       </select>
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="date" class="col-sm-2 control-label">Date</label>
                      <div class="col-sm-10">
                       <input  placeholder="Select Date" name="date" id="date" value="" />
                      </div>
                    </div>
                     <div class="form-group">
                      <label for="Term" class="col-sm-2 control-label">Term</label>
                      <div class="col-sm-10">
                       <select class="form-control select2 " style="width: 100%;" name="Term" id="Term"> 
                        <option value ="" >Select Term</option>
                       <option value ="Baseline" id ="Term1" >Baseline</option>
                        <option value ="Midterm" id ="Term2" >Midterm</option>
                         <option value ="Endterm" id ="Term1" >Endterm</option>
                       </select>
                     
                      </div>
                    </div>
                    @else


                



                    <div class="form-group">
                      <label for="Version1" class="col-sm-2 control-label">Select Version</label>
                      <div class="col-sm-10">
                      <select class="form-control select2 " style="width: 100%;" name="Version1" id="Version1"> 
                       <option value ="" >Select Version</option>
                       @foreach($Surveys->reverse() as $Survey)
                       <option value ="{{$Survey->surveyID}}" id ="{{$Survey->Version}}" >Version {{$Survey->Version}} :{{$Survey->Runtime}}</option>
                        @endforeach
                       </select>
                      </div>
                    </div>

                     <div class="form-group">
                      <label for="date" class="col-sm-2 control-label">Date</label>
                      <div class="col-sm-10">
                       <input  name="date" id="date" placeholder="Select Date" value="" />
                      </div>
                    </div>
                    <p>Click Next to select Health Workers</p>
@endif
                   


                                       
                  </div><!-- /.box-body -->
                  
                  <div class="box-footer">
                   
                    <button  id="some_id" class="btn btn-danger form-control">Begin</button>

                  </div><!-- /.box-footer -->


                </div>
                </div>
              </div><!-- /.box -->
              

               <div class="col-md-6"  style="height: 100%;">

              <div class="box box-info">
                <div class="box-header with-border">
                  <h3 class="box-title">View Previous Assessments</h3>
                </div><!-- /.box-header -->
                <!-- form start -->
               
   

                  <div class="box-body">
                     <div style="min-height: 100%;" class="form-horizontal">
                  @if($loc == 'CH' or $loc == 'MN')
                    <div class="form-group">
                      <label for="County2" class="col-sm-2 control-label">Select County</label>
                      <div class="col-sm-10">
                       <select class="form-control select2 " style="width: 100%;" name="County2" id="County2"> 
                       <option value ="">Select County</option>

                       @foreach($Counties as $County)
                       <option value ="{{$County->Name}}" id ="{{$County->Name}}" >{{$County->Name}}</option>
                        @endforeach

                       </select>
						</div>
						</div>

<!-- the stuff 2 -->
            <div class="form-group">
                       <label for="Version2" class="col-sm-2 control-label">Select Sub-County</label>
                      <div class="col-sm-10">
                      <select class="form-control select2 subcounty" style="width: 100%;" name="SubCounty2" id="SubCounty2"> 
                        <option value ="" >Select Sub-County</option>
                      
                       @foreach($Surveys->reverse() as $Survey)
                     
                       <option value ="{{$Survey->surveyID}}" id ="{{$Survey->Version}}" >Version {{$Survey->Version}} :{{$Survey->Runtime}}</option>
                        
                        @endforeach
                       </select>
                      </div>
                    </div>
<!-- the stuff 2 -->

						<div class="form-group">
                       <label for="Version2" class="col-sm-2 control-label">Select Version</label>
                      <div class="col-sm-10">
                      <select class="form-control select2 " style="width: 100%;" name="Version2" id="Version2"> 
                        <option value ="" >Select Version</option>
                      
                       @foreach($Surveys->reverse() as $Survey)
                     
                       <option value ="{{$Survey->surveyID}}" id ="{{$Survey->Version}}" >Version {{$Survey->Version}} :{{$Survey->Runtime}}</option>
                        
                        @endforeach
                       </select>
                      </div>
                    </div>
                  <div class="form-group">

                      <label for="Term" class="col-sm-2 control-label">Term</label>
                      <div class="col-sm-10">
                       <select class="form-control select2 " style="width: 100%;" name="Term" id="Term_2"> 
                       <option value ="" >Select Term</option>
                       <option value ="Baseline" id ="Term1" >Baseline</option>
                        <option value ="Midterm" id ="Term2" >Midterm</option>
                         <option value ="Endterm" id ="Term1" >Endterm</option>
                       </select>
                     
                    
                      </div>
                   @else
                   <div class="form-group">
                      <label for="Version2" class="col-sm-2 control-label">Select Version</label>
                      <div class="col-sm-10">
                      <select class="form-control select2 " style="width: 100%;" name="Version1" id="Version2"> 
                        <option value ="" >Select Version</option>
                       @foreach($Surveys->reverse() as $Survey)
                       <!-- change if later -->
                         
                       <option value ="{{$Survey->surveyID}}" id ="{{$Survey->Version}}" >Version {{$Survey->Version}} :{{$Survey->Runtime}}</option>
                     
                        @endforeach
                       </select>
                      </div>
                    </div>
                    
                    <div>
                   <p>Click Next to view evaluated Health Workers</p>
    
</div>

                  @endif
                   


                   
                  </div><!-- /.box-body -->
                  <div class="box-footer">
                   
                    <button  id="some_id2" class="btn btn-info form-control">View</button>

                  </div><!-- /.box-footer -->


                </div>
              </div><!-- /.box -->
              </div>
              
                 
                 
                  
                </div><!-- /.box-body -->
              </div><!-- /.box -->
            </div>
            </div>

</div>

</div>

  @endsection

 @section('javascript')
<script>
 
$('#date').datepicker({
   dateFormat: 'yy-mm-dd'
}); 
</script>

<script type="text/javascript">
$('#some_id').click(function() {

  

    @if ($loc == 'IM')
     if($('#Version1').val() == ""||$('#Term').val()==""|| $('#date').val()=="") alert("Please choose the version and date.");
  
    @else

     if($('#Version1').val() == ""||$('#County').val()==""||$('#SubCounty1').val()==""||$('#Term').val()==""|| $('#date').val()=="") alert("Please choose the county,sub-county,version,date and term.");
 
@endif
   else{
 // assessments/{id}/{date}/{term}/{county}
  var linki = '/assessments/' + $('#Version1').val() + '/'+ $('#date').val() +'/' +$('#Term').val() +'/'+ $('#County').val()+'/'+ $('#SubCounty1').val();
  //alert(linki);
  if(window.offline) e.preventDefault();
   $(location).attr('href', linki);
 }

 
});

           
      </script>     
         
         <script type="text/javascript">
$('#some_id2').click(function() {


  if($('#Version2').val() == ""||$('#SubCounty2').val()==""||$('#County2').val()==""||$('#Term_2').val()=="") 
       @if ($loc == 'IM')
    alert("Please choose  the version.");
    @else
     alert("Please choose the county,sub-county,version and term.");
    @endif
  else{

 // assessments/{id}/{date}/{term}/{county}
  var linki = '/assessments/' + $('#Version2').val() + '/'+ $('#County2').val()+ '/'+ $('#Term_2').val()+'/'+ $('#SubCounty2').val();
  //alert(linki);
   if(window.offline) e.preventDefault();
   $(location).attr('href', linki);
  

 }
});

           
      </script>     
               




 

   <!-- Select2 -->
  
 <script type="text/javascript">
      $(function () {
        //Initialize Select2 Elements
        $(".select2").select2();

               
      });



          
    </script>



 <script type="text/javascript">





  $.fn.select2.amd.require([
    "select2/core",
    "select2/utils",
    "select2/compat/matcher"
  ], function (Select2, Utils, oldMatcher) {
   
  
    var $ajax = $(".subcounty");

    function formatFset (fset) {
      if (fset.loading) return fset.text;



      var markup = "<div>"+fset.text+"</div>";

      return markup;
    }

    function formatFsetSelection (fset) {
      return fset.text || fset.text; 
    }

    $ajax.select2({
      ajax: {
        url: "/assessment/subcounties",
        type:'post',
        dataType: 'json',
       
        delay: 250,
        data: function (params) {

          $x = $(this).attr('id');
          if ($x=='SubCounty1') var county =  $('#County').val();
          else var county =  $('#County2').val();

          return {
            search: params.term,
            county: county,
            page: params.page,
            _token: $('input[name=_token]').val()
          };
        },
        processResults: function (data, params) {
          // parse the results into the format expected by Select2
          // since we are using custom formatting functions we do not need to
          // alter the remote JSON data, except to indicate that infinite
          // scrolling can be used
          params.page = params.page || 1;

           var select2Data = $.map(data, function (obj) {
                    obj.id = obj.District;
                    obj.text = obj.District;

                    return obj;
                });

          return {
            results: select2Data,
            pagination: {
              more: (params.page * 30) < data.total_count
            }
          };
        },
        cache: true
      },
      escapeMarkup: function (markup) { return markup; },
      minimumInputLength: 1,
      templateResult: formatFset,
      templateSelection: formatFsetSelection
    });

  

});
  

  
  
</script>

  @endsection