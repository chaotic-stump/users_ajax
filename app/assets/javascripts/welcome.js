


$(document).ready(function(){
  var baseUrl =
  'http://devpoint-ajax-example-server.herokuapp.com/api/v1/users';

  if (location.pathname === '/') {
    function getUsers() {
      $.ajax({
        url: baseUrl,
        type: 'GET'
        dataType: 'JSON'
      }).done(function(data) {
        var tbody = $('#users');
        tbody.children().remove();
        data.users.forEach(
        function(user) {
          var 
        }
        )
      })
    }
  }
})
