function checaIdade(idade) {
  return new Promise(function(resolve, reject) {
    var checaIdade = idade;

    if (checaIdade > 18) {
      resolve();
    } else {
      reject();
    }
  });
}

checaIdade(20)
  .then(function() {
    console.log("Maior que 18");
  })
  .catch(function() {
    console.log("Menor que 18");
  });
