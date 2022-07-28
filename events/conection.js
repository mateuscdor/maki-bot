 
const fs = require('fs');
module.exports = MakiConection =  async (update) =>{

 const { connection, lastDisconnect } = update
  //console.log(connection);
 if (connection === 'close '){
 const reconexao = new Boom(lastDisconnect?.error)?.output.statusCode
   //tratamento de error de conexão
   if(reconexao === DisconnectReason.badSession){
     console.log("Error na sesão , exclua a existente e Scaneie novamente por favor !");
     maki.logout();
   }
   else if (reconexao === DisconnectReason.connectionClosed || DisconnectReason.connectionLost){
     console.log("Conexão Fechada ou Perdida , Reconectando...");
     startbot();
   }
   else if (reconexao === DisconnectReason.connectionReplaced){
     console.log("Conexão substituída, outra nova sessão aberta, feche a sessão atual primeiro");
     maki.logout();
   }
   else if (reconexao === DisconnectReason.loggedOut){
     console.log("Dispositivo deslogado , rode e tente novamente.");
     maki.logout();
   }
   else if (reconexao === DisconnectReason.restartRequired){
     console.log("Restart pedido , Reiniciando....");
     startbot();
   }
   else if (reconexao === DisconnectReason.timedOut){
     console.log("Tempo de conexão esgotado, Reconectando....");
     startbot()
   }
   else  maki.end(`Razão de desconexao desconhecida , motivo ${reconexao} ${conection}`);
  } 
  console.log("[ STATUS : CONECTADO ]")
}
