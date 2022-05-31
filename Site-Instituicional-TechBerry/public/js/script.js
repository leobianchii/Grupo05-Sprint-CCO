let proximaAtualizacao;

// window.onload = obterDadosGrafico(1);

// window.onload = atualizarTemperatura(1);

window.onload = obterEstufa();

function obterEstufa(){
    var idUsuario = sessionStorage.ID_USUARIO;

    console.log(idUsuario);

    fetch(`/estufa/estufas/${idUsuario}`, {
        cache: 'no-store'
    }).then(function(response){
        if (response.ok) {
            response.json().then(function(resposta){
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

            })
        }else{
            console.error('Nenhuma quantidade de estufa encontrada');
        }
    }).catch(function(error){
        console.error(`Erro na obtenção das qtd de estufas: ${error.message}`);
    });
}

function obterDadosGrafico(idAquario) {

    if (proximaAtualizacao != undefined) {
        clearTimeout(proximaAtualizacao);
    }

    console.log(idAquario);


    fetch(`/medidas/ultimas/${idAquario}`, {
            cache: 'no-store'
        }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    resposta.reverse();

                    plotarGrafico(resposta, idAquario);
                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

        
        
        fetch(`/medidas/ultimas-hora/${idAquario}`, {
            cache: 'no-store'
        }).then(function (response) {
            if (response.ok) {
                response.json().then(function (resposta) {
                    console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                    resposta.reverse();
    
                    plotarGrafico2(resposta, idAquario);
                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API Na ultima hora');
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

// Esta função *plotarGrafico* usa os dados capturados na função anterior para criar o gráfico
// Configura o gráfico (cores, tipo, etc), materializa-o na página e, 
// A função *plotarGrafico* também invoca a função *atualizarGrafico*
function plotarGrafico(resposta, idAquario) {
    console.log('iniciando plotagem do gráfico...');

    var dados = {
        labels: [],
        datasets: [{
                label: 'Temperatura Maxima',
                borderColor: '#32B9CD',
                backgroundColor: '#FF0000',
                data: []
            },
            {
                label: 'Temperatura Minima',
                borderColor: '#FFF',
                backgroundColor: '#00FFFF',
                data: []
            }
        ]
    };

    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        dados.labels.push(registro.momento_grafico);
        dados.datasets[0].data.push(registro.max_temp);
        dados.datasets[1].data.push(registro.min_temp);
    }

    console.log(JSON.stringify(dados));

    var ctx = canvas5.getContext('2d');
    window.grafico_linha = new Chart(ctx, {
        type: 'bar',
        data: dados,
        options: {
            responsive: true,
            hoverMode: 'index',
            title: {
                display: false,
                text: 'Dados capturados'
            },
            scales: {
                yAxes: [{
                    type: 'bar',
                    display: true,
                    position: 'left',
                }, {
                    type: 'bar',
                    display: true,
                    position: 'right',

                }],
            }
        }
    });
}


function plotarGrafico2(resposta, idAquario) {
    console.log('iniciando plotagem do gráfico...');

    var dados = {
        labels: [],
        datasets: [
            {
                yAxisID: 'y-temperatura',
                label: 'Temperatura a cada 30m',
                borderColor: '#32B9CD',
                backgroundColor: '#32b9cd8f',
                fill: true,
                data: []
            }
        ]
    };

    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        dados.labels.push(registro.momento_grafico);
        dados.datasets[0].data.push(registro.temperatura);
    }

    console.log(JSON.stringify(dados));

    var ctx = canvas6.getContext('2d');
    window.grafico_linha = new Chart(ctx, {
        type: 'line',
        data: dados,
        options: {
            responsive: true,
            animation: { duration: 500 },
            hoverMode: 'index',
            stacked: false,
            title: {
                display: false,
                text: 'Dados capturados'
            },
            scales: {
                yAxes: [{
                    type: 'linear',
                    display: true,
                    id: 'y-temperatura',
                    ticks: {
                        beginAtZero: true,
                        max: 100,
                        min: 0
                    }
                }]
            }
        }
    });
    setTimeout(() => atualizarGrafico2(idAquario, dados), 2000);
}

// Esta função *atualizarGrafico* atualiza o gráfico que foi renderizado na página,
// buscando a última medida inserida em tabela contendo as capturas, 

//     Se quiser alterar a busca, ajuste as regras de negócio em src/controllers
//     Para ajustar o "select", ajuste o comando sql em src/models
function atualizarTemperatura(idAquario){

    fetch(`/medidas/tempo-real/${idAquario}`,{
        cache: 'no-store'
    }).then(
        function (response) {
            if (response.ok) {
                response.json().then(function(novaResposta){

                    var temp = novaResposta[novaResposta.length - 1].temperatura

                    span_temperatura_1.innerHTML = `${temp}`;

                    if ((temp >= 23 && temp < 27) || (temp <= 16 && temp > 13)) {
                        span_temperatura_1.style.color = '#FF7F00';
                        img_temp.src = 'https://cdn.dribbble.com/users/251873/screenshots/9288094/13539-sign-for-error-or-explanation-alert.gif';
                    }else if(temp >= 27 || temp <= 13){
                        span_temperatura_1.style.color = 'red';
                        img_temp.src = 'https://cdn.dribbble.com/users/251873/screenshots/9288094/13539-sign-for-error-or-explanation-alert.gif';
                    }else{
                        span_temperatura_1.style.color = '#ff7070';
                        img_temp.src = 'https://png.pngtree.com/png-vector/20190228/ourmid/pngtree-check-mark-icon-design-template-vector-isolated-png-image_711429.jpg';
                    }
                })

                setTimeout(() => atualizarTemperatura(idAquario), 2000);
            }
        }
    ).catch(function (error){
        console.log("Erro ao atualizar o gráfico");
    });
}

function atualizarGrafico2(idAquario, dados) {

    fetch(`/medidas/tempo-real/${idAquario}`, {
            cache: 'no-store'
        }).then(function (response) {
            if (response.ok) {
                response.json().then(function (novoRegistro) {

                    console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                    console.log(`Dados atuais do gráfico: ${dados}`);

                    // tirando e colocando valores no gráfico
                    dados.labels.shift(); // apagar o primeiro
                    dados.labels.push(novoRegistro[0].momento_grafico); // incluir um novo momento

                    dados.datasets[0].data.shift(); // apagar o primeiro de umidade
                    dados.datasets[0].data.push(novoRegistro[0].temperatura); // incluir uma nova medida de temperatura

                    window.grafico_linha.update();

                    // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                    proximaAtualizacao = setTimeout(() => atualizarGrafico2(idAquario, dados), 2000);
                });
            } else {
                console.error('Nenhum dado encontrado ou erro na API');
                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizarGrafico2(idAquario, dados), 2000);
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function atualizarGrafico(idAquario, dados) {

    fetch(`/medidas/tempo-dia/${idAquario}`, {
            cache: 'no-store'
        }).then(function (response) {
            if (response.ok) {
                response.json().then(function (novoRegistro) {

                    console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                    console.log(`Dados atuais do gráfico: ${dados}`);

                    // tirando e colocando valores no gráfico
                   dados.labels.shift(); // apagar o primeiro
                    dados.labels.push(novoRegistro[0].momento_grafico); // incluir um novo momento

                    dados.datasets[0].data.shift(); // apagar o primeiro de umidade
                    dados.datasets[0].data.push(novoRegistro[0].max_temp); // incluir uma nova medida de umidade

                    dados.datasets[1].data.shift(); // apagar o primeiro de temperatura
                    dados.datasets[1].data.push(novoRegistro[0].min_temp); // incluir uma nova medida de temperatura

                    window.grafico_linha.update();

                    // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                    proximaAtualizacao = setTimeout(() => atualizarGrafico(idAquario, dados), 2000);
                });
            } else {
                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizarGrafico(idAquario, dados), 2000);
            }
        })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}
