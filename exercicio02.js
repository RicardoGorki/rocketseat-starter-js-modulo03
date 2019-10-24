var listElement = document.querySelector('ul#lista')
var inputElement = document.querySelector('input#inputTexto')
var listaUsuarios = [];
inputElement.focus()

var buscaUsuario = function() {
  return new Promise(function(resolve, reject) {
 
    listElement.innerHTML ='';
  
  for (var listaUsuario of listaUsuarios){
    var itemElement = document.createElement('li');
    var inputText = document.createTextNode(listaUsuario)
    
    itemElement.appendChild(inputText);
    listElement.appendChild(itemElement);
  }
    var xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.github.com/users/${listaUsuario}/repos`);
    xhr.send(null);
 
    xhr.onreadystatechange = function(){
      if(xhr.readyState === 4) {
        if(xhr.status=== 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject('Erro na requisição'); 
        }
      }
    }
 
  });

}



  function addUsuario () {
    var inputText = inputElement.value;
    listaUsuarios.push(inputText);
    inputElement.value = '';
    inputElement.focus()

    buscaUsuario()
    .then(function(response){
      console.log(response);
    })
    .catch(function(error){
    console.warn(error);
    });
  }
