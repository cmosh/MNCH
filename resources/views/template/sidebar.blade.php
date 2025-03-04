      <style>
      x50{ 
      	width: 10px;
      	word-wrap: break-word;}
     </style>
      <aside class="main-sidebar" >
        <section class="sidebar">
          <div class="user-panel">
            <div class="pull-left image">
            {!!image_tag('blank.png')!!}</div>
            <div class="pull-left info">
              <p> {{ Auth::user()->name }}</p>
              <p>
              <small>
              @if(Auth::user()->role==0)
                      County User                      
              @elseif(Auth::user()->role==1)                      
                      Data Clerk                      
                      @elseif(Auth::user()->role==2)                      
                       Program User                      
                       @elseif(Auth::user()->role>=3)                      
                        System User (Admin)                      
                        @elseif(Auth::user()->role=='')                      
                        "Unknown"
                        @endif
                        </small></p>
           </div>
           </div>
          <ul class="sidebar-menu" >
            <li class="header">Options</li>
            @if((!isset($location))) <?php $location = 'Home' ?>
        @endif
          @if($location == 'Admin')
           <li class=""><a href="/"><i class="fa fa-link"></i> <span>Dashboard</span></a></li>
           <li class=""><a href="/home"><i class="fa fa-link"></i> <span>My Home</span></a></li>          @else
          @if ($location == 'Home' ) 
             <li class=""><a href="/"><i class="fa fa-link"></i> <span>Dashboard</span></a></li>
           <li class="active"><a href="/home"><i class="fa fa-link"></i> <span>Home</span></a></li>
            <li><a href="/assessment/CH"><i class="fa fa-link"></i> <span>CH Surveys</span></a></li>
            <li><a href="/assessment/MNH" style="overflow:none"><i class="fa fa-link"></i> <span>MNH Surveys</span></a></li>
            <li><a href="/assessment/IMCI"><i class="fa fa-link"></i> <span>IMCI Surveys</span></a></li>
           @if( Auth::user()->role == 2)
                <li><a href="/usermanagement/monitor"><i class="fa fa-link"></i> <span>Progress Review</span></a></li>
                 <li><a href="/usermanagement/track"><i class="fa fa-link"></i> <span>Progress Tracker</span></a></li>
           @endif
           @if( Auth::user()->role >= 3)
                <li><a href="/usermanagement/viewusers"><i class="fa fa-link"></i> <span>User Management</span></a></li>
                <li><a href="/usermanagement/monitor"><i class="fa fa-link"></i> <span>Progress Review</span></a></li>
                <li><a href="/usermanagement/track"><i class="fa fa-link"></i> <span>Progress Tracker</span></a></li>
               @endif
               @elseif($location == 'ass' )

             <li class=""><a href="/"><i class="fa fa-link"></i> <span>Dashboard</span></a></li>
             <li><a href="/home"><i class="fa fa-link"></i> <span>My Home</span></a></li>
             <!-- if user_role is program-user or higher -->
               @if( Auth::user()->role == 2)
                  <li><a href="/usermanagement/monitor"><i class="fa fa-link"></i> <span>Progress Review</span></a></li>
                   <li><a href="/usermanagement/track"><i class="fa fa-link"></i> <span>Progress Tracker</span></a></li>
               @endif
               @if( Auth::user()->role >= 3)
                  <li><a href="/usermanagement/viewusers"><i class="fa fa-link"></i> <span>User Management</span></a></li>
                  <li><a href="/usermanagement/monitor"><i class="fa fa-link"></i> <span>Progress Review</span></a></li>
                   <li><a href="/usermanagement/track"><i class="fa fa-link"></i> <span>Progress Tracker</span></a></li>
               @endif
            

            @elseif ($location ==  'umanage' )

            <li class=""><a href="/"><i class="fa fa-link"></i> <span>Dashboard</span></a></li>
             <li ><a href="/home"><i class="fa fa-link"></i> <span>My Home</span></a></li>
            <li><a href="/assessment/CH"><i class="fa fa-link"></i> <span>CH Surveys</span></a></li>
            <li><a href="/assessment/MNH" style="overflow:none"><i class="fa fa-link"></i> <span>MNH Surveys</span></a></li>
            <li><a href="/assessment/IMCI"><i class="fa fa-link"></i> <span>IMCI Surveys</span></a></li>
            @if( Auth::user()->role == 2)
                <li><a href="/usermanagement/monitor"><i class="fa fa-link"></i> <span>Progress Review</span></a></li>
                 <li><a href="/usermanagement/track"><i class="fa fa-link"></i> <span>Progress Tracker</span></a></li>
               @endif
               @if( Auth::user()->role >= 3)
                <li class="active"><a href="/usermanagement/viewusers"><i class="fa fa-link"></i> <span>User Management</span></a></li>
                <li><a href="/usermanagement/monitor"><i class="fa fa-link"></i> <span>Progress Review</span></a></li>
                 <li><a href="/usermanagement/track"><i class="fa fa-link"></i> <span>Progress Tracker</span></a></li>
               @endif
     @elseif ($location ==  'tracker' )

            <li class=""><a href="/"><i class="fa fa-link"></i> <span>Dashboard</span></a></li>
             <li ><a href="/home"><i class="fa fa-link"></i> <span>My Home</span></a></li>
            <li><a href="/assessment/CH"><i class="fa fa-link"></i> <span>CH Surveys</span></a></li>
            <li><a href="/assessment/MNH" style="overflow:none"><i class="fa fa-link"></i> <span>MNH Surveys</span></a></li>
            <li><a href="/assessment/IMCI"><i class="fa fa-link"></i> <span>IMCI Surveys</span></a></li>
            @if( Auth::user()->role == 2)
                <li><a href="/usermanagement/monitor"><i class="fa fa-link"></i> <span>Progress Review</span></a></li>
                 <li class="active"><a href="/usermanagement/track"><i class="fa fa-link"></i> <span>Progress Tracker</span></a></li>
               @endif
               @if( Auth::user()->role >= 3)
                <li ><a href="/usermanagement/viewusers"><i class="fa fa-link"></i> <span>User Management</span></a></li>
                <li><a href="/usermanagement/monitor"><i class="fa fa-link"></i> <span>Progress Review</span></a></li>
                 <li  class="active"><a href="/usermanagement/track"><i class="fa fa-link"></i> <span>Progress Tracker</span></a></li>
               @endif





               @elseif ($location ==  'preview')
               <li class=""><a href="/"><i class="fa fa-link"></i> <span>Dashboard</span></a></li>
             <li ><a href="/home"><i class="fa fa-link"></i> <span>My Home</span></a></li>
             <li><a href="/assessment/CH"><i class="fa fa-link"></i> <span>CH Surveys</span></a></li>
            <li><a href="/assessment/MNH" style="overflow:none"><i class="fa fa-link"></i> <span>MNH Surveys</span></a></li>
            <li><a href="/assessment/IMCI"><i class="fa fa-link"></i> <span>IMCI Surveys</span></a></li>
             @if( Auth::user()->role == 2)
                <li class="active"><a href="/usermanagement/monitor"><i class="fa fa-link"></i> <span>Progress Review</span></a></li>
                 <li  ><a href="/usermanagement/track"><i class="fa fa-link"></i> <span>Progress Tracker</span></a></li>
               @endif
               @if( Auth::user()->role >= 3)
                <li ><a href="/usermanagement/viewusers"><i class="fa fa-link"></i> <span>User Management</span></a></li>
                <li class="active"><a href="/usermanagement/monitor"><i class="fa fa-link"></i> <span>Progress Review</span></a></li>
                 <li  ><a href="/usermanagement/track"><i class="fa fa-link"></i> <span>Progress Tracker</span></a></li>
               @endif
                @elseif ($location ==  'pass')
            <li class=""><a href="/"><i class="fa fa-link"></i> <span>Dashboard</span></a></li>
             <li ><a href="/home"><i class="fa fa-link"></i> <span>My Home</span></a></li>
           <li><a href="/assessment/CH"><i class="fa fa-link"></i> <span>CH Surveys</span></a></li>
            <li><a href="/assessment/MNH" style="overflow:none"><i class="fa fa-link"></i> <span>MNH Surveys</span></a></li>
            <li><a href="/assessment/IMCI"><i class="fa fa-link"></i> <span>IMCI Surveys</span></a></li>
             @if( Auth::user()->role == 2)
                <li class=""><a href="/usermanagement/monitor"><i class="fa fa-link"></i> <span>Progress Review</span></a></li>
               @endif
               @if( Auth::user()->role >= 3)
                <li ><a href="/usermanagement/viewusers"><i class="fa fa-link"></i> <span>User Management</span></a></li>
                <li class=""><a href="/usermanagement/monitor"><i class="fa fa-link"></i> <span>Progress Review</span></a></li>
               @endif
               <li  class="active"><a href="/usermanagement/changepass"><i class="fa fa-link"></i> <span>Change Password</span></a></li>
              @else 
            <li class=""><a href="/"><i class="fa fa-link"></i> <span>Dashboard</span></a></li>
             <li><a href="/home"><i class="fa fa-link"></i> <span>My Home</span></a></li>
              <li class="treeview active">              
                            <a href="#">                               
                                <span>{{$title}}</span>
                                </a>
                            <ul  class="treeview-menu" style="overflow:auto">
                      	@foreach ($secs as $sec)
                            	 <li  class="" >
                                    <a  href="#{{$sec['identifier']}}"><x50>{{$sec['name']}}</x50></a>
                                </li>
                            	@endforeach  
                               </ul>
                        </li>
           @endif
           @endif  
           @if($location !=  'pass')
           <li><a href="/usermanagement/changepass"><i class="fa fa-link"></i> <span>Change Password</span></a></li>
           @endif
            <li><a href="/auth/logout"><i class="fa fa-link"></i> <span>Log Out</span></a></li>
          </ul>
          </section>
      </aside>
