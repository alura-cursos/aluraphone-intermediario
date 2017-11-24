//watson, eu quero usar a sua api
//requerimento para essa api
var conversationV1 = require('watson-developer-cloud/conversation/v1');
var prompt = require('prompt-sync')();


//vou te passar o que você precisa acessar
//nome de usuario, senha, workspace, data de versao
var conversation = new conversationV1({
	username:'<coloque o nome de usuário aqui>',
	password:'<coloque a senha aqui>',
	path: {workspace_id:'<coloque o workspace id aqui>'},
	version_date:'2016-05-26'
});

//vou mandar uma mensagem vazia para receber a msg de boas vindas 
conversation.message({ }, processarResposta);

//o que é essa resposta, quero ver essa resposta
function processarResposta (erro, response){
	if (erro){
		console.log(erro)
	}

	//encerrar a conversa eh falso
	var encerrarConversa = false;

	//mas se voce achar encerrar
	if(response.output.acao === 'encerrar'){
		//fazer algo --> fazer o prompt parar de pedir mais msgs
		console.log(response.output.text[0]);
		//faca encerrar ser verdadeiro - é verdade que estou encerrando
		encerrarConversa = true;
	}

	else{

		if (response.output.text.length != 0){
			console.log(response.output.text[0])
		}
	}

	//se a gente nao encerrar a conversa
	if(!encerrarConversa){
		//manda um prompt
		var novaMensagemUsuario = prompt('>> ');
		conversation.message({ input: {text: novaMensagemUsuario },
			context : response.context
		}, processarResposta);
		
	}
};








