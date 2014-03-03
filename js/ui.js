
$(document).ready(function(){

  $("#sign-up-form input[name='EMAIL']").focus(function(){
    $("#expandable-section").slideDown(300);
  });

  $("#sign-up-form").keyup(function(event){
    validateForm($(this));
  });

  function validateForm(form){
    var fields = form.find("input");
    $.each(fields,function(i,field){
      if ( !field.value || ( $(field).attr("type") == "email" && !validateEmail(field.value)) ) {
        $(field).addClass("invalid-field");
        form.find("button[type='submit']").attr("disabled","");
      }else {
        $(field).removeClass("invalid-field");
      }
    });

    if ( $(".invalid-field").length == 0 ){
      form.find("button[type='submit']").removeAttr("disabled");

      $("#sign-up-form").submit(function(event){
        event.preventDefault();
        $.ajax({
          url: $(this).attr("action"),
          data: $(this).serialize(),
          type: $(this).attr('method'),
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          beforeSend: function(){
          },
          success: function(data, textStatus, jqXHR){
          },
          error: function(jqXHR, textStatus, errorThrown){
          },
          complete: function(jqXHR,textStatus){
            if ( textStatus != "success" ){
              $("#thanks-for-signup").html("Uh oh, something went wrong! Please try inputting your information again.");
            }
            $("#sign-up-form").hide();
            $("#thanks-for-signup").show();
          }

        });
      });
    }else{
      return false;
    }
  }


  function validateEmail(email) {
    var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }




});
