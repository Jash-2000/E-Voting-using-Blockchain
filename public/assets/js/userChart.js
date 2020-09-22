<script>

$(document).ready(function() {
    //$('#hideChart').hide();
    console.log('<%= userdata.length %>');
    if(' <%= userdata.length %> ' != 0){
      $('#hideChartUser').show();
    } else {
      $('#hideChartUser').hide();
    }
});
( function ( $ ) {
"use strict";

//pie chart
var ctx = document.getElementById( "userChart" );
ctx.height = 300;
  var userdata =[];
      userdata.push('<%=totalData.countTotalUserInfo%>');
      console.log(userdata);


var myChart = new Chart( ctx, {
    type: 'pie',
    data: {
        datasets: [ {
            data:userdata,
            backgroundColor: [
                                "rgba(0, 123, 255,0.9)",
                                "rgba(0, 123, 255,0.7)",
                                "rgba(0, 123, 255,0.5)",
                                "rgba(0,0,0,0.07)"
                            ],
            hoverBackgroundColor: [
                                "rgba(0, 123, 255,0.9)",
                                "rgba(0, 123, 255,0.7)",
                                "rgba(0, 123, 255,0.5)",
                                "rgba(0,0,0,0.07)"
                            ]

                        } ]

    },
    options: {
        responsive: true
    }
} );


} )( jQuery );
</script>
