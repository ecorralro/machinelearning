window.onload = function(){
    // Cargamos el contexto del lienzo 1
    var contexto = document.getElementById("lienzo").getContext("2d");
    // Cargamos el contexto del lienzo 2
    var contexto2 = document.getElementById("lienzo2").getContext("2d");
    // Creo una nueva imagen en memoria de Javascript
    let imagen = new Image();
    // Cargo una imagen que tengo en el disco duro
    imagen.src = "img/mano.jpg";
    // Me espero a que a imagen cargue, y entonces ejecuto esta función
    imagen.onload = function(){
        // Primero pinto la imagen original en el lienzo original
        contexto.drawImage(imagen,0,0);
        // Detectamos bordes en la imagen
        // Primero cargamos la imagen 1 en memoria
        let imagenlienzo1 = contexto.getImageData(0,0,512,512);
        // Luego cargamos la imagen 2 en memoria
        let imagenlienzo2 = contexto2.getImageData(0,0,512,512);
        // Para cada uno de los pixeles de la imagen
        for(let i = 0;i<imagenlienzo1.data.length;i+=4){
            // Miro la diferencia del canal rojo con en horizontal
            let diferencia = Math.abs(imagenlienzo1.data[i] - imagenlienzo1.data[i+4])
            // Miro la diferencia del canal rojo en vertical
            let diferencia2 = Math.abs(imagenlienzo1.data[i] - imagenlienzo1.data[i+512*4])
            // En el caso de que la diferencia sea notable
            if(diferencia > 10 || diferencia2 > 10){
                // Pinto un pixel negro
                imagenlienzo2.data[i] = 0;
                imagenlienzo2.data[i+1] = 0;
                imagenlienzo2.data[i+2] = 0;
                imagenlienzo2.data[i+3] = 255;
            }else{
                // Pinto un pixel blanco
                imagenlienzo2.data[i] = 255;
                imagenlienzo2.data[i+1] = 255;
                imagenlienzo2.data[i+2] = 255;
                imagenlienzo2.data[i+3] = 255;
            }
        }
        // Por ultimo, pongo la imagen
        contexto2.putImageData(imagenlienzo2,0,0); 
    }
}