window.onload = function(){
    var contexto = document.getElementById("lienzo").getContext("2d");
    var contexto2 = document.getElementById("lienzo2").getContext("2d");
    let imagen = new Image();
    imagen.src = "mano.jpg";
    imagen.onload = function(){
        // Primero pinto la imagen original
        contexto.drawImage(imagen,0,0);
        contexto2.fillStyle = "white";
        contexto2.fillRect(0,0,512,512);
        // Detectamos bordes en la imagen
        let imagenlienzo1 = contexto.getImageData(0,0,512,512);
        let imagenlienzo2 = contexto2.getImageData(0,0,512,512);
        for(let i = 0;i<imagenlienzo1.data.length;i+=4){
            let diferencia = Math.abs(imagenlienzo1.data[i] - imagenlienzo1.data[i+4])
            if(diferencia > 10){
                imagenlienzo2.data[i] = 0;
                imagenlienzo2.data[i+1] = 0;
                imagenlienzo2.data[i+2] = 0;
                imagenlienzo2.data[i+3] = 255;
            }else{
                imagenlienzo2.data[i] = 255;
                imagenlienzo2.data[i+1] = 255;
                imagenlienzo2.data[i+2] = 255;
                imagenlienzo2.data[i+3] = 255;
            }
        }
        contexto2.putImageData(imagenlienzo2,0,0); 
    }
}