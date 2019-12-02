const api = 'https://caflix.herokuapp.com/filmes';

$(function() {

    var lista = $('#jogos');
    var html = '';

    function exibirMensagem(texto) {
        setTimeout(function() {
            $("#mensagem").html(texto)
        }, 0);

        setTimeout(function() {
            $("#mensagem").html("")
        }, 5000);
    }

    function limparCampos() {
        $("#nome").val("");
        $("#ano").val("");
        $("#sinopse").val("");
        $("#url-imagem").val("");
    }

    function listarJogos() {
        $.getJSON(api, function(data) {
            html = '';
            lista.html(html);
            $.each(data, function(k, v) {
                html += "<tr>  " +
                    "<td>" + (k + 1) + "</td>" +
                    "<td>" + v.nome + "</td>" +
                    "<td>" + v.ano + "</td>" +
                    "<td>" + v.sinopse + "</td>" +
                    "<td>" + "<img width='40px' src='" + v.url_capa + "'>" + "</td>" +
                    "</tr>";
            });
            lista.html(html);
        });
    }

    listarJogos();


    $("#btn-cadastrar").click(function() {

        var jogo = {
            "nome": $("#nome").val(),
            "sinopse": $("#sinopse").val(),
            "url_capa": $("#url-imagem").val(),
        };

        $.ajax({
            url: api,
            dataType: 'json',
            type: 'post',
            contentType: 'application/json',
            data: JSON.stringify(jogo),
            success: function(data, textStatus, jQxhr) {
                exibirMensagem("Cadastrado com sucesso!");
                limparCampos();
                listarJogos();
            },
            error: function(jqXhr, textStatus, errorThrown) {
                console.log(errorThrown);
                exibirMensagem("Opss! Ocorreu um erro: " + errorThrown);
            }
        });
    });
});