
import {auth,signInWithEmailAndPassword,signOut,createUserWithEmailAndPassword, onAuthStateChanged} from '../app.js'

const { JSDOM } = require('jsdom');
const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);
const document = dom.window.document


document.addEventListener("DOMContentLoaded", 
function() {
  let btnLogin = document.getElementById("btn-login"); 
  btnLogin.addEventListener("click", conectarComEmailSenha);
});



// Criando um contexto jsdom



function campoVazio(id){
  const campo = document.getElementById(id)
  if(campo === null){
    return true
  }
  const input = campo.value.trim()
  return input === ''
  
}

function verificaCamposVazios(event){
  const email = document.getElementById("email").value.trim()
  let hasError = false
  if(campoVazio('email')){
    alert("campo email vazio")
     hasError = true
  }else if(campoVazio('senha')){
    alert("campo senha vazio")
     hasError = true
  }else if(!validarEmail(email)){
    alert("e-mail invalido")
  }

  if(hasError){
    event.preventDefault()
  }
}

function validarEmail(email){
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return regex.test(email)
}

module.exports={validarEmail,campoVazio}



function conectarComEmailSenha(){

    let email = document.getElementById("email").value
    let senha = document.getElementById("senha").value

    signInWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user
      // ...
      window.location.href='../imc.html'
     // alert(`${user.email} logado com sucesso`)
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }


  function usuarioDesLogado(){

    signOut(auth).then(() => {
      // Sign-out successful.
      console("usuario desconectado")
    }).catch((error) => {
      // An error happened.
      console.log(`${error} ao desconectar`)
    });

  }

  function crirUsuarioComSenha(){
    
    let email = document.getElementById("email").value
    let senha = document.getElementById("senha").value

  createUserWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
   
      const usuario = userCredential.user;
      alert(usuario)
      alert("usuario criado com sucesso")
   
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    
    });
}

function usuarioLogado(){
    let email = document.getElementById("email").value

    
    onAuthStateChanged(auth, (user) => {
      
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const email = user.email;
        alert(`${email} logado com sucesso`)
        // ...
      } else {
        // User is signed out
        // ...
        console.log("usuario não logado")
      }
    });
  }

  