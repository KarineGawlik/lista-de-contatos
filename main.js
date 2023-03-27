var appForm = document.getElementById('app-form'); //referenciar os elementos de tela
var listaPessoas = document.getElementById('listaPessoas');
var btnOrdenar = document.getElementById('btnOrdenar');

var pessoas = []; //variavel global que vai gerar a lista de nomes

appForm.onsubmit = addPessoa;
btnOrdenar.onclick = ordenarLista;
btnExemplo.onclick = gerarListaSeed;

function addPessoa(e){ //funcao que adiciona pessoa, é invocado no form
	e.preventDefault(); //tirar o padrao do botao submit, não fazer o f5 automatico

	console.log(e);

	var nome = e.target.pessoaNome.value; //recuperar as informacoes que estao no formulario, acessa pelo target
	var sobrenome = e.target.pessoaSobrenome.value; 
	var telefone = e.target.pessoaTelefone.value

	var pessoa = { nome, sobrenome, telefone }; //criou um objeto que recebe nome, sobrenome e telefone

	var validation = validarCampos(pessoa); // manda as informações para validar campo
	if(!validation.status){
		alert(validation.error);
		return;
	}

	pessoas.push(pessoa); //se os campos forem validados, dá um "push" para adicionar a pessoa no arrey
	appForm.reset(); //adiciona reset para zerar o campo e adicionar a próxima pessoa 
	mostrarLista(); //funcao (cria um objeto 'pessoa' para adicionar a lista)
	console.log(pessoas);
}

function validarCampos(pessoa){ // manda as informações para validar campo
	var validation = { status: true, error: '', }; //se o que a pessoa está preenchendo no form está cumprindo as especificacoes 

	if(pessoa.nome.length === 0){ //verifica se o campo nome não está vazio
		validation.status = false;
		validation.error = 'Preencha o campo Nome';
	}
	else if(pessoa.sobrenome.length === 0){ //verifica se o campo sobrenome não está vazio
		validation.status = false; 
		validation.error = 'Preencha o campo Sobrenome';
	}
	else if(pessoa.telefone.length < 10){ //verifica se o campo telefone tem 10 cractteres (só recebe números, type=number)
		validation.status = false;
		validation.error = 'Preencha o campo Telefone corretamente';
	}
	return validation;

    //qualquer uma das opcoes se for preenchidas incorretamente vai retornar msg para usuário
}

function mostrarLista(){ //faz a lista com os dados preenchidos, elemento 'ul' da tela  
	listaPessoas.innerHTML = ''; //limpa a tela
	for(pessoa of pessoas){ //vai varrer todos os itens, vai passar por todos os itens do arrey 
		var nomeEl = document.createElement('strong'); //elemento strong onde guarda o nome e sobrenome da pessoa
		nomeEl.appendChild(document.createTextNode(pessoa.nome + ' ' + pessoa.sobrenome));

		var telefoneEl = document.createElement('p'); //cria um elemento do tipo 'p' para guardar o telefone
		telefoneEl.appendChild(document.createTextNode('Telefone: ' + pessoa.telefone));

        //criou dois elementos, um para guardar nome e um para guardar telefone

		var indice = pessoas.indexOf(pessoa); //esse indice vem depois, na hora de remover ou alterar pessoa cadastrada

        //indexOf é um metodo de arrey, onde pasa um item no argumento desse metodo,ele retorna qual que é o indice que aquele item está e devolve na variavel

		var removerEl = document.createElement('a'); //renderizacao vai guardar o indice na lista
		removerEl.setAttribute('href', '#');
		var removerText = document.createTextNode('Remover');
		removerEl.appendChild(removerText);
		removerEl.setAttribute('onclick', 'removerPessoa(' + indice + ')');  //gera um botao para excluir

		var alterarEl = document.createElement('a');
		alterarEl.setAttribute('href', '#');
		var alterarText = document.createTextNode('Alterar');
		alterarEl.appendChild(alterarText);
		alterarEl.setAttribute('onclick', 'alterarPessoa(' + indice + ')'); //gera um novo botao para alterar passando como argumento o indice 

		var itemEl = document.createElement('li'); //cria um elemento 'li', vai ser um elemento da lista
		itemEl.appendChild(nomeEl); 
		itemEl.appendChild(telefoneEl); //adiciona nome + telefone
		itemEl.appendChild(alterarEl);
		itemEl.appendChild(removerEl);

		listaPessoas.appendChild(itemEl); //após adicionar o nome e telefone, em seguida vai no elemento tela e adiciona o item na lista 
	}
}

function removerPessoa(indice){; //funcao splice
	pessoas.splice(indice, 1);; //remover um item da arrey (indice e a posicao do arrey)
	mostrarLista(); //renderiza na tela
}

function alterarPessoa(indice){
	var btnCadastrar = document.getElementById('btnCadastrar');
	var btnEditar = document.getElementById('btnEditar');
	var input_nome = document.getElementById('pessoaNome');
	var input_sobrenome = document.getElementById('pessoaSobrenome');
	var input_telefone = document.getElementById('pessoaTelefone'); //criou uma variavel para cada campo que criou na tela
    
	btnCadastrar.setAttribute('style', 'display:none'); //vai ocultar o botao cadastrar e trocar pelo botao editar (salvar os dados)
	btnEditar.setAttribute('style', 'display:'); //mostrando btn-editar

	input_nome.value = pessoas[indice].nome; 
	input_sobrenome.value = pessoas[indice].sobrenome;
	input_telefone.value = pessoas[indice].telefone;

	btnEditar.onclick = function(){ //invoca essa funcao no botao editar
		var pessoaAlterada = { //vai criar um objeto novo (pessoa alterada)
			nome: input_nome.value,
			sobrenome: input_sobrenome.value,
			telefone: input_telefone.value,
		};

		var validation = validarCampos(pessoaAlterada); //vai cair no mesmo validar campos; 
		if(!validation.status){
			alert(validation.error);
			return;
		}

		input_nome.value = '';
		input_sobrenome.value = '';
		input_telefone.value = '';

		btnCadastrar.setAttribute('style', 'display:');
		btnEditar.setAttribute('style', 'display:none');

		pessoas[indice] = pessoaAlterada; //atualiza o item no arrey (subscreve o item com os novos dados)
		mostrarLista();
	};
}

function ordenarLista(){
	pessoas.sort(function(a, b){ //funcao sort, serve para colocar um arrey em ordem alfabetica. Como a arrey que criamos é somente objetos, adiciona uma funcao 
		var x = a.nome.toLowerCase() + a.sobrenome.toLowerCase(); //essa funcao compara o nome e sobrenome
		var y = b.nome.toLowerCase() + b.sobrenome.toLowerCase();
		if(x < y) return -1;
		if(x > y) return 1;
		return 0;
	});
	mostrarLista();
}