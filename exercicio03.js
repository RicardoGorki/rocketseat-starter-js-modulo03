var listElement = document.querySelector("ul#lista");
var inputElement = document.querySelector("input#inputTexto");
var res = document.getElementById("res");
var carregando = document.getElementById("carregando");
var listaUsuarios = [];
inputElement.focus();

var buscaUsuario = function() {
  return new Promise(function(resolve, reject) {
    listElement.innerHTML = "";
   
    for (var listaUsuario of listaUsuarios) {
      var itemElement = document.createElement("li");
      var inputText = document.createTextNode(listaUsuario);

      itemElement.appendChild(inputText);
      listElement.appendChild(itemElement);
    }

    var xhr = new XMLHttpRequest();
    xhr.open("GET", `https://api.github.com/users/${listaUsuario}/repos`);
    xhr.send(null);

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else if (xhr.status === 404) {
          reject("Erro 404");
        } else {
          reject("Erro na requisição");
        }
      }
    };
  });
};

function setLoading(loading = true) {
  if ( loading === true ) {
    carregando.innerHTML = "Carregando...";
  } else {
    carregando.innerHTML = "";
  }
}

function addUsuario() {
setLoading()
  var inputText = inputElement.value;

  if ( inputText.length != 0 ) {
  listaUsuarios.push(inputText);
  inputElement.value = "";
  res.innerHTML = "";
  inputElement.focus();

  buscaUsuario()
    .then(function(response) {
      console.log(response);
    })
    .catch(function(error) {
      res.innerHTML = `Usuario ${inputText} não existe.`;
      console.warn(error);
    });
  } else{
    alert("Escreva o nome de um repositorio")
  }
  setLoading(false)
}
