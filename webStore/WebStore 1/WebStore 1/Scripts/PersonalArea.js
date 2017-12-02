$(document).ready(function () {
   

        $('#uploadFile').change(function () {
            var filename = $('#uploadFile').val();
            $("#submit").text("Загрузить(" + filename.split('\\')[this.value.split('\\').length - 1] + ")");
        });

});

$(document).on('click', ".loadAppId", function (e) {
    // debugger;
    window.Id = $(this).attr('id').split(':')[1];
    $('#submitUpd').attr('class', "ID:" + window.Id);
});

$(document).on('click', ".setAppCategory", function (e) {
    // debugger;
    window.Id = $(this).attr('id').split(':')[1];
    $('.setCategory').attr('id', "ID:" + window.Id);
});


$(document).on('click', "#submitUpd", function (e) {
    debugger;
    window.Id = $(this).attr('class').split(':')[1];
    window.boolUpd = false;
    window.Host = '/api/Update/' + window.Id;
    e.preventDefault();
    var files = document.getElementById('uploadFileUpd').files;
    if (files.length > 0) {
        if (window.FormData !== undefined) {
            var data = new FormData();
            for (var x = 0; x < files.length; x++) {
                data.append("file" + x, files[x]);
            }

            $.ajax({
                type: "POST",
                url: window.Host,
                contentType: false,
                processData: false,
                data: data,
                success: function (result) {
                    debugger;
                    $("#successUpd").show();   $("#successUpd").append("<li>Вы успешно загрузили Обновление (Ожидаеться подтверждение Админом)<a href='#' class='close' data-dismiss='alert'>×</a> </li>");
                   // $(".closeUpd").trigger('click');
                    //document.location.reload();
                },
                error: function (data) {
                    // парсинг json-объекта
                    // debugger;
                    if (typeof data.responseJSON.Using !== 'undefined') {
                        window.errorDuplicate = false;
                        window.errorDuplicate = false; var errors = data.responseJSON.Using._errors;
                        errors.forEach(function (entry) {
                            // debugger;
                            for (i in entry) {
                                // debugger;
                                if (i == "<ErrorMessage>k__BackingField" && window.errorDuplicate == false) {
                                    window.errorDuplicate = true;

                                    
                                    $("#errorsUpd").show(); $("#errorsUpd").append("<li><strong>Ошибка!</strong>" + entry[i] + "<a href='#' class='close' data-dismiss='alert'>×</a> </li>");
                                    window.boolUpd = true;
                                }
                            }
                        });
                    }





                    if (typeof data.responseJSON.Author !== 'undefined') {
                        window.errorDuplicate = false; var errors = data.responseJSON.Author._errors;
                        errors.forEach(function (entry) {
                            // debugger;
                            for (i in entry) {
                                // debugger;
                                if (i == "<ErrorMessage>k__BackingField" && window.errorDuplicate == false) {
                                    window.errorDuplicate = true;
                                    $("#errorsUpd").show(); $("#errorsUpd").append("<li><strong>Ошибка!</strong>" + entry[i] + "<a href='#' class='close' data-dismiss='alert'>×</a> </li>");
                                    window.boolUpd = true;
                                }
                            }
                        });
                    }



                    if (typeof data.responseJSON.Version !== 'undefined') {
                        window.errorDuplicate = false; var errors = data.responseJSON.Version._errors;
                        errors.forEach(function (entry) {
                            // debugger;
                            for (i in entry) {
                                // debugger;
                                if (i == "<ErrorMessage>k__BackingField" && window.errorDuplicate == false) {
                                    window.errorDuplicate = true;
                                    $("#errorsUpd").show(); $("#errorsUpd").append("<li><strong>Ошибка!</strong>" + entry[i] + "<a href='#' class='close' data-dismiss='alert'>×</a> </li>");
                                    window.boolUpd = true;
                                }


                            }
                        });
                    }

                    if (typeof data.responseJSON.ValidManifest !== 'undefined') {
                        window.errorDuplicate = false; var errors = data.responseJSON.ValidManifest._errors;
                        errors.forEach(function (entry) {

                            for (i in entry) {

                                if (i == "<ErrorMessage>k__BackingField" && window.errorDuplicate == false) {
                                    window.errorDuplicate = true;
                                    debugger;
                                    $("#errorsUpd").show();
                                    $("#errorsUpd").append("<li><strong>Ошибка!</strong>" + entry[i].split("\n")[0] + "<a href='#' class='close' data-dismiss='alert'>×</a> </li>");
                                    window.boolUpd = true;

                                }


                            }
                        });
                    }

                    if (typeof data.responseJSON.ValidateUpd !== 'undefined') {
                        window.errorDuplicate = false; var errors = data.responseJSON.ValidateUpd._errors;
                        errors.forEach(function (entry) {
                            // // debugger;
                            for (i in entry) {
                                debugger;
                                if (i == "<ErrorMessage>k__BackingField" && window.errorDuplicate == false) {
                                    window.errorDuplicate = true;
                                    $("#errorsUpd").show(); $("#errorsUpd").append("<li><strong>Ошибка!</strong>" + entry[i] + "<a href='#' class='close' data-dismiss='alert'>×</a> </li>");
                                    window.boolUpd = true;
                                }


                            }
                        });
                    }



                    if (typeof data.responseJSON.Name !== 'undefined') {
                        window.errorDuplicate = false; var errors = data.responseJSON.Name._errors;
                        errors.forEach(function (entry) {
                            // // debugger;
                            for (i in entry) {
                                // // debugger;
                                if (i == "<ErrorMessage>k__BackingField" && window.errorDuplicate == false) {
                                    window.errorDuplicate = true;
                                    $("#errorsUpd").show(); $("#errorsUpd").append("<li><strong>Ошибка!</strong>" + entry[i] + "<a href='#' class='close' data-dismiss='alert'>×</a> </li>");
                                    window.boolUpd = true;
                                }


                            }
                        });
                    }


                    if (typeof data.responseJSON.setting !== 'undefined') {

                        window.errorDuplicate = false; var errors = data.responseJSON.setting._errors;
                        errors.forEach(function (entry) {
                            // // debugger;
                            for (i in entry) {
                                // // debugger;
                                if (i == "<ErrorMessage>k__BackingField" && window.errorDuplicate == false) {
                                    window.errorDuplicate = true;
                                    $("#errorsUpd").show(); $("#errorsUpd").append("<li><strong>Ошибка!</strong>" + entry[i] + "<a href='#' class='close' data-dismiss='alert'>×</a> </li>");
                                    window.boolUpd = true;
                                }


                            }
                        });
                    }



                    if (typeof data.responseJSON.Description !== 'undefined') {
                        window.errorDuplicate = false; var errors = data.responseJSON.Description._errors;
                        errors.forEach(function (entry) {
                            // // debugger;
                            for (i in entry) {
                                // // debugger;
                                if (i == "<ErrorMessage>k__BackingField" && window.errorDuplicate == false) {
                                    window.errorDuplicate = true;
                                    $("#errorsUpd").show(); $("#errorsUpd").append("<li><strong>Ошибка!</strong>" + entry[i] + "<a href='#' class='close' data-dismiss='alert'>×</a> </li>");
                                    window.boolUpd = true;
                                }


                            }
                        });
                    }

                    if (window.boolUpd == false) {
                        debugger;
                        $("#errorsUpd").show(); $("#errorsUpd").html("<li><strong>Ошибка!</strong> Неизветсная ошибка на сервере!Виноват Димон<a href='#' class='close' data-dismiss='alert'>×</a> </li>");
                    }

                }
            });
        } else {
            $("#errorsUpd").show(); $("#errorsUpd").append("<li><strong>Предупреждение!</strong> Ваш браузер не поддерживает загрузку файлов<a href='#' class='close' data-dismiss='alert'>×</a> </li>");
        }
    }

    else
    { $("#errorsUpd").show(); $("#errorsUpd").append("<li><strong>Предупреждение!</strong> Выберите файл<a href='#' class='close' data-dismiss='alert'>×</a> </li>"); }
});




$(document).on('click', "#submit", function (e) {
    debugger;
    e.preventDefault();
    if ($("#uploadFile").val() != "") {
        $(this).val($("#uploadFile").val());
    }
    var files = document.getElementById('uploadFile').files;
    window.bool = false;
    if (files.length > 0) {
        if (window.FormData !== undefined) {
            var data = new FormData();
            for (var x = 0; x < files.length; x++) {
                data.append("file" + x, files[x]);
            }

            $.ajax({
                type: "POST",
                url: '/api/application/post',
                contentType: false,
                processData: false,
                data: data,
                success: function (result) {
                    debugger;
                    if (result.Hide) {
                        $("#success").show(); $("#success").append("<li> Вы успешно загрузили приложение (Ожидаеться подтверждение Админом)<a href='#' class='close' data-dismiss='alert'>×</a> </li>");
                    }
                    else {
                        $("#success").show(); $("#success").append("<li> Вы успешно загрузили приложение <a href='#' class='close' data-dismiss='alert'>×</a> </li>");
                    }
                    //document.location.reload();
                    
                    
                    $("#application").load("/Room/LoadApp");
                },
                error: function (data) {
                    // парсинг json-объекта
                    // debugger;
                    if (typeof data.responseJSON.Using !== 'undefined') {
                        window.errorDuplicate = false; var errors = data.responseJSON.Using._errors;
                        errors.forEach(function (entry) {
                            // // debugger;
                            for (i in entry) {
                                // // debugger;
                                if (i == "<ErrorMessage>k__BackingField" && window.errorDuplicate == false) {
                                    window.errorDuplicate = true;
                                    $("#errors").show(); $("#errors").append("<li><strong>Ошибка!</strong>" + entry[i] + "<a href='#' class='close' data-dismiss='alert'>×</a> </li>");
                                    window.bool = true;

                                }


                            }
                        });
                    }
                    if (typeof data.responseJSON.Author !== 'undefined') {
                        window.errorDuplicate = false; var errors = data.responseJSON.Author._errors;
                        errors.forEach(function (entry) {
                            // // debugger;
                            for (i in entry) {
                                // // debugger;
                                if (i == "<ErrorMessage>k__BackingField" && window.errorDuplicate == false) {
                                    window.errorDuplicate = true;
                                    $("#errors").show(); $("#errors").append("<li><strong>Ошибка!</strong>" + entry[i] + "<a href='#' class='close' data-dismiss='alert'>×</a> </li>");
                                    window.bool = true;

                                }


                            }
                        });
                    }


                    if (typeof data.responseJSON.ValidateApp !== 'undefined') {
                        window.errorDuplicate = false; var errors = data.responseJSON.ValidateApp._errors;
                        errors.forEach(function (entry) {
                            // // debugger;
                            for (i in entry) {
                                debugger;
                                if (i == "<ErrorMessage>k__BackingField" && window.errorDuplicate == false) {
                                    window.errorDuplicate = true;
                                    $("#errors").show(); $("#errors").append("<li><strong>Ошибка!</strong>" + entry[i] + "<a href='#' class='close' data-dismiss='alert'>×</a> </li>");
                                    window.bool = true;
                                }


                            }
                        });
                    }


                    if (typeof data.responseJSON.ApplicationId !== 'undefined') {
                        window.errorDuplicate = false; var errors = data.responseJSON.ApplicationId._errors;
                        errors.forEach(function (entry) {
                            // // debugger;
                            for (i in entry) {
                                // // debugger;
                                if (i == "<ErrorMessage>k__BackingField" && window.errorDuplicate == false) {
                                    window.errorDuplicate = true;
                                    $("#errors").show(); $("#errors").append("<li><strong>Ошибка!</strong>" + entry[i] + "<a href='#' class='close' data-dismiss='alert'>×</a> </li>");
                                    window.bool = true;

                                }
                            }
                        });
                    }

                    if (typeof data.responseJSON.ValidManifest !== 'undefined') {
                        window.errorDuplicate = false; var errors = data.responseJSON.ValidManifest._errors;
                        errors.forEach(function (entry) {
                            // // debugger;
                            for (i in entry) {
                                // debugger;
                                if (i == "<ErrorMessage>k__BackingField" && window.errorDuplicate == false) {
                                    window.errorDuplicate = true;
                                    $("#errors").show(); $("#errors").append("<li><strong>Ошибка!</strong>" + entry[i] + "<a href='#' class='close' data-dismiss='alert'>×</a> </li>");
                                    window.bool = true;


                                }


                            }
                        });
                    }




                    if (typeof data.responseJSON.Version !== 'undefined') {
                        window.errorDuplicate = false; var errors = data.responseJSON.Version._errors;
                        errors.forEach(function (entry) {
                            // // debugger;
                            for (i in entry) {
                                // // debugger;
                                if (i == "<ErrorMessage>k__BackingField" && window.errorDuplicate == false) {
                                    window.errorDuplicate = true;
                                    $("#errors").show(); $("#errors").append("<li><strong>Ошибка!</strong>" + entry[i] + "<a href='#' class='close' data-dismiss='alert'>×</a> </li>");
                                    window.bool = true;

                                }


                            }
                        });
                    }

                    if (typeof data.responseJSON.Name !== 'undefined') {
                        window.errorDuplicate = false; var errors = data.responseJSON.Name._errors;
                        errors.forEach(function (entry) {
                            // // debugger;
                            for (i in entry) {
                                // // debugger;
                                if (i == "<ErrorMessage>k__BackingField" && window.errorDuplicate == false) {
                                    window.errorDuplicate = true;
                                    $("#errors").show(); $("#errors").append("<li><strong>Ошибка!</strong>" + entry[i] + "<a href='#' class='close' data-dismiss='alert'>×</a> </li>");
                                    window.bool = true;

                                }


                            }
                        });
                    }


                    if (typeof data.responseJSON.setting !== 'undefined') {

                        window.errorDuplicate = false; var errors = data.responseJSON.setting._errors;
                        errors.forEach(function (entry) {
                            // // debugger;
                            for (i in entry) {
                                // // debugger;
                                if (i == "<ErrorMessage>k__BackingField" && window.errorDuplicate == false) {
                                    window.errorDuplicate = true;
                                    $("#errors").show(); $("#errors").append("<li><strong>Ошибка!</strong>" + entry[i] + "<a href='#' class='close' data-dismiss='alert'>×</a> </li>");
                                    window.bool = true;

                                }


                            }
                        });
                    }



                    if (typeof data.responseJSON.Description !== 'undefined') {
                        window.errorDuplicate = false; var errors = data.responseJSON.Description._errors;
                        errors.forEach(function (entry) {
                            // // debugger;
                            for (i in entry) {
                                // // debugger;
                                if (i == "<ErrorMessage>k__BackingField" && window.errorDuplicate == false) {
                                    window.errorDuplicate = true;
                                    $("#errors").show(); $("#errors").append("<li><strong>Ошибка!</strong>" + entry[i] + "<a href='#' class='close' data-dismiss='alert'>×</a> </li>");
                                    window.bool = true;

                                }


                            }
                        });
                    }

                    if (window.bool == false) {

                        $("#errors").show(); $("#errors").append("<li><strong>Ошибка!</strong> Неизветсная ошибка на сервере!Виноват Димон<a href='#' class='close' data-dismiss='alert'>×</a> </li>");
                    }

                }
            });
        } else {
            $("#errors").show(); $("#errors").append("<li><strong>Предупреждение!</strong> Ваш браузер не поддерживает загрузку файлов<a href='#' class='close' data-dismiss='alert'>×</a> </li>");
        }
    }
    else
    { $("#errors").show(); $("#errors").append("<li><strong>Предупреждение!</strong> Выберите файл<a href='#' class='close' data-dismiss='alert'>×</a> </li>"); }
});

$(document).on("click", ".dowApp", function () {
    //// // debugger;
    window.Id = $(this).attr('id').split(':')[1];
    window.Host = 'Room/DowloadApp/' + window.Id;
    $.ajax({
        type: 'get',
        url: window.Host,


        success: function (upds) {
            debugger;
            location.href = window.Host;
        },
        error: function (data) {
            debugger;
            if (data.statusText == "Not Found") {
                $("#errors").show(); $("#errors").append("<li><strong>Предупреждение!</strong> Вы не имеете права качать этот ресурс<a href='#' class='close' data-dismiss='alert'>×</a> </li>");
                return;
            }

            $("#errors").show(); $("#errors").append("<li><strong>Ошибка!</strong> Неизветсная ошибка на сервере!Виноват Димон<a href='#' class='close' data-dismiss='alert'>×</a> </li>");



        }
    });
});


$(document).on("click", ".delID", function () {
     debugger;
    window.Id = $(this).attr('id').split(':')[1];
    window.Host = '/api/Application/' + window.Id;
    $.ajax({
        type: 'DELETE',
        url: window.Host,


        success: function (upds) {
             debugger;
            $("#success").show(); $("#success").append("<li> Приложение Успешно Удалено<a href='#' class='close' data-dismiss='alert'>×</a> </li>");
            //document.location.reload();
            $("#application").load("/Room/LoadApp");

        },
        error: function (data) {
             debugger;
            if (data.responseJSON == "Не достаточно прав для удаления ресурса") {
                $("#errors").show(); $("#errors").append("<li><strong>Предупреждение!</strong> Вы не имеете права удалять этот ресурс<a href='#' class='close' data-dismiss='alert'>×</a> </li>");
                return;
            }
            if (data.statusText == "Not Found") {
                $("#errors").show(); $("#errors").append("<li><strong>Предупреждение!</strong> Приложение не найдено<a href='#' class='close' data-dismiss='alert'>×</a> </li>");
                return;
            }

            $("#errors").show(); $("#errors").append("<li><strong>Ошибка!</strong> Неизветсная ошибка на сервере!Виноват Димон<a href='#' class='close' data-dismiss='alert'>×</a> </li>");



        }
    });
});

$(document).on("click", ".setCategory", function () {
    debugger;

    window.AppId = $(this).attr('id').split(':')[1];
    window.CategoryId = $('#categories').val();

    if (window.CategoryId == null) 
    {
        $("#errorsCat").show(); $("#errorsCat").append("<li><strong>Предупреждение!</strong> Вы не выбрали ни одной категории<a href='#' class='close' data-dismiss='alert'>×</a> </li>");
        return;
    }

     window.obj = {
         AppId: window.AppId,
         CategoryId: window.CategoryId
     };
    
    window.Host = '/api/Category/setCategoryForApp/';
    $.ajax({
        type: 'POST',
        url: window.Host,
        data: JSON.stringify(window.obj),
        contentType: "json",
        contentType: 'application/json',
        success: function (data) {
            // // debugger;
            $("#successCat").show(); $("#successCat").append("<li> Приложение Успешно добавлено в выбранные категории<a href='#' class='close' data-dismiss='alert'>×</a> </li>");
            //$(".close").trigger('click');
            //GetApplication();

        },
        error: function (data) {
             debugger;

            if (data.statusText == "Not Found") {
                $("#errorsCat").show(); $("#errorsCat").append("<li><strong>Предупреждение!</strong> Категория не найдена не найдено<a href='#' class='close' data-dismiss='alert'>×</a> </li>");
                return;
            }

            $("#errorsCat").show(); $("#errorsCat").append("<li><strong>Ошибка!</strong> " + data.responseText + "<a href='#' class='close' data-dismiss='alert'>×</a> </li>");



        }
    });
});


$(document).on("click", ".upddelID", function () {
    //// // debugger;
    window.Id = $(this).attr('id').split(':')[1];
    window.Host = '/api/Update/' + window.Id;
    $.ajax({
        type: 'DELETE',
        url: window.Host,


        success: function (upds) {
            // // debugger;
            $("#success").show(); $("#success").append("<li> Обновление Успешно Удалено<a href='#' class='close' data-dismiss='alert'>×</a> </li>");
            // document.location.reload();
            $("#updates:" + window.id).html("/Room/LoadUpd/");

        },
        error: function (data) {
            // // debugger;
            if (data.statusText == "Not Found") {
                $("#errors").show(); $("#errors").append("<li><strong>Предупреждение!</strong> Обновление не найдено<a href='#' class='close' data-dismiss='alert'>×</a> </li>");
            }
            else {
                $("#errors").show(); $("#errors").append("<li><strong>Ошибка!</strong> Неизветсная ошибка на сервере!Виноват Димон<a href='#' class='close' data-dismiss='alert'>×</a> </li>");

            }

        }
    });
});


