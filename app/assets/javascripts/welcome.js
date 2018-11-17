console.log('welcome out');

$(document).ready(function(){
  var baseUrl = 'http://json-server.devpointlabs.com/api/v1/users';

  console.log('welcome in');
  console.log(baseUrl);
  if (location.pathname === '/') {
    function getUsers() {
      $.ajax({
        url: baseUrl,
        type: 'GET',
        dataType: 'JSON'
      }).done(function(data) {
        var tbody = $('#users');
        tbody.children().remove();
        debugger
        data.users.forEach(function(user) {
          var firstName = user.first_name ? user.first_name : '';
          var lastName = user.last_name ? user.last_name : '';
          var phoneNumber = user.phone_number ? user.phone_number : '';
          var row = '<tr data-id="' + user.id + '"><td>' + user.first_name + '</td>';
          row += '<td>' + lastName + '</td>';
          row += '<td>' + phoneNumber + '</td>';
          row += '<td>'
          row += '<button class="btn btn-danger delete">Delete</button>';
          row += '<button class="btn btn-primary show">Show</button>';
          row += '</td>';
          row += '</tr>';
          tbody.append(row);
        });
      }).fail( function(err) {
        alert('Something went wrong call support');
      });
    }

    getUsers();

    $(document).on('click', '.delete', function() {
      var id = $(this).closest('tr').data().id;
      deleteUser(id);
    });

    $(document).on('click', '.show', function() {
      var id = $(this).closest('tr').data().id;
      location.pathname = '/welcome/' + id;
    })

    function deleteUser(id) {
      $.ajax({
        url: baseUrl + '/' + id,
        type: 'DELETE'
      }).done( function() {
        getUsers();
      }).fail( function(err) {
      })
    }

  } //root route

  var re = /\/welcome\/\d+/;
  if (location.pathname.match(re)) {
    var panel = $('#panel');
    var id = panel.data().id;
    $.ajax({
      url: baseUrl + '/' + id,
      type: 'GET',
      dataType: 'JSON'
    }).done( function(data) {
      var user = data.user;
      panel.children('#heading').html(user.id);
      var list = $('#user');
      var fname = '<li>First Name: ' + user.first_name + '</li>';
      var lname = '<li>Last Name: ' + user.last_name + '</li>';
      var pnum = '<li>Phone Number: ' + user.phone_number + '</li>';
      list.append(fname);
      list.append(lname);
      list.append(pnum)
    })
  }

  $('#new_user').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      url: baseUrl,
      type: 'POST',
      dataType: 'JSON',
      data: $(this).serializeArray()
    }).done( function() {
      location.pathname = '/';
    });
  })

})
