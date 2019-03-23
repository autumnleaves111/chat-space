$(function() {
  function buildHTML(message){
    var image = message.image ? `<img src ="${message.image}">` : "";
  var html =
   `<div class="message" data-message-id="${message.id}">
      <div class="upper-message">
        <div class="upper-message__user-name">
          ${message.user_name}
        </div>
        <div class="upper-message__date">
          ${message.date}
        </div>
      </div>
      <div class="lower-message">
        <p class="lower-message__content">
          ${message.content}
        </p>
          ${image}
      </div>
    </div>`
  return html;
  }

  var interval = setInterval(function(){
    var message_id = $('.message:last').data('id');
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      $.ajax({
        url: location.href,
        type: 'GET',
        data: {id: message_id},
        dataType: 'json',
      })
        .done(function(new_messages){
          new_messages.forEach(function(new_message){
          var html = buildHTML(new_message);
          $('.messages').append(html);
        });
          $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
          })
        .fail(function(){
          alert('自動更新できません。');
        });
      } else {
        clearInterval(interval);
      }
    }, 5000);

  $('#new_message').on('submit', function(e){
  e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
     .done(function(new_message){
     var html = buildHTML(new_message);
     $('.messages').append(html);
     $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
     $('form')[0].reset();
     })
     .fail(function(){
       alert('error');
     });
     return false;
  });
});
