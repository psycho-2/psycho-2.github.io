function show(aid,ddid){
  $(".lanmu > li").attr("class","");//title> a鐨刢lass涓虹┖鏃�
  $(".anli").hide();//listDetail闅愯棌
  $("#" + aid ).toggleClass("active");
  $("#" + ddid).show();
  }