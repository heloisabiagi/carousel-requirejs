requirejs.config({
    "baseUrl": "assets/js/modules",
    "paths": {
        "jquery": "../libs/jquery.min",
        "main": "../main"
    }
});
 
// Chamando módulo principal para iniciar a aplicação
requirejs(["main"]);