


$(document).ready(function () {
    //GetCategories();


    $('#uploadFileUpd').change(function () {
        var filename = $('#uploadFileUpd').val();
        $("#submitUpd").text("Загрузить(" + filename.split('\\')[this.value.split('\\').length - 1] + ")");
    });


    /*document.getElementById('uploadFileUpd').onchange = function () {
        debugger;
        $("#submitUpd").text("Загрузить(" + this.value.split('\\')[this.value.split('\\').length - 1] + ")");
    };*/
});



