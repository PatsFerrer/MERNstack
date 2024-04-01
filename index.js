const express = require('express')
const app = express()

// express: app.get('/rota), funcao de callback);
/*app.get('/rota', (req, res) => {})

*/

//exemplo
app.get('/home', (req, res) => {
  const soma = 2 + 1;

  res.send({soma: soma})

})
app.listen(3000)