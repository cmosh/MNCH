@extends('template')
@section('title')
 <title>MNCH | {{$title}}</title>
@endsection



@section('content')




<div class="box box-primary">
  <div class="box-header">
    <!--  <a style="float:right" href="/usermanagement/export/{{$location}}/users/all/all">Download excel</a> -->
    <br>
    <a style="float:right" id="copy-button" data-clipboard-text="{{$users}}">Copy to Clipboard</a>
    <br>
    <button style="float:right" id="print-button" >Print</button>
    <h3 class="box-title">
    Users
    </h3>
    </div><!-- /.box-header -->
    <div class="box-body">
      <table id="example1" class="table table-bordered"> 
      <thead>
          <tr>
            <th>Name</th>
            <th>Day Before Day before Yesterday ({{ $dates['three_days_ago_string']}})</th>
            <th>Day Before Yesterday ({{ $dates['two_days_ago_string']}})</th>
            <th>Completed Yesterday ({{ $dates['yesterday_string']}})</th>
            <th >Completed Today</th>
            <th>Completed in Total</th>            
          </tr>
        </thead>        
        <tbody>   
        @foreach($users as $user)          
          <tr>
            <td > {{ $user->name}}</td>
            <td>{{count($user->assessmentsP)}}</td>            
            <td>{{count($user->assessmentsJ)}}</td>            
            <td>{{count($user->assessmentsY)}}</td>     
            <td>{{count($user->assessmentsT)}}</td>
            <td>{{count($user->assessments)}}</td>
            </tr>          
          @endforeach
        </tbody>
        <tfoot>
        <tr>
           <th>Name</th>
            <th>Day Before Day before Yesterday ({{ $dates['three_days_ago_string']}})</th>
            <th>Day Before Yesterday ({{ $dates['two_days_ago_string']}})</th>
            <th>Completed Yesterday ({{ $dates['yesterday_string']}})</th>
            <th >Completed Today</th>
            <th>Completed in General</th>     
        </tr>
        </tfoot>
      </table>
    </div>
  </div>

               


@endsection


 @section('javascript')

  



 
  
    
   
 <!-- DATA TABLES -->
  <script type="text/javascript">


      $(function () {
        $("#example1").DataTable();
       
      });





      $(document).ready(function() {
       

            // Zero Clipboard initialization
            var client = new ZeroClipboard($('#copy-button'));

         
        });
      $('#print-button').click(function()

      {  window.print(); });

      
    </script>

         
  @endsection
 