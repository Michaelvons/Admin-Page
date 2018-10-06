// Call the dataTables jQuery plugin
$(document).ready(function() {
  var t= $('#dataTable').DataTable();
  var counter = 1;


   $("#addproduct").on("click", function() {
     t.row
       .add([
         counter + ".1",
         counter + ".2",
         counter + ".3",
         counter + ".4",
         counter + ".5"
       ])
       .draw(false);

     counter++;
   });

   // Automatically add a first row of data
   $("#addproduct").click();
});
