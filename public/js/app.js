function soloNumeros(e){
  var key = e.charCode;
  return key >= 48 && key <= 57;
}

function onValidate(data, type) {
  document.getElementById('nit_mod').addEventListener('keypress',  function(e) {
    if (!soloNumeros(event)){
      e.preventDefault();
    }
  })
    
}

function onAgreeData (data) {  
  var tag = document.getElementById('process_data_id')
  tag.value = data.id
  tag.name = data.id
}

(function() {
    
    window.addEventListener('load', function() {
      var forms = document.getElementsByClassName('needs-validation');      
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {            
          if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
          }
          form.classList.add('was-validated')
        }, false)
      })
    }, false)
  })()