from PIL import Image
import os
import json

carpeta = "machinelearning/imgcrudas"
carpeta_salida = "machinelearning/imgprocesadas"
imagenes = []
archivos = os.listdir(carpeta)


for archivo in archivos:
    imagen = os.path.join(carpeta,archivo)
    mi_imagen = Image.open(imagen)
    anchura = mi_imagen.width
    altura = mi_imagen.height

    if anchura > altura:
        caja = (
            anchura/2 - altura/2,
            0,
            anchura/2 + altura/2,
            altura
        )
    else:
        caja = (
            0,
            altura/2 - anchura/2,
            anchura,
            altura/2 + anchura/2
        )
    cortada = mi_imagen.crop(caja)
    escalada = cortada.resize((512,512))
    escalada.save(carpeta_salida + "/" + archivo)
    imagenes.append(archivo)

archivo_json = open("machinelearning/json/imagenes.json","w")
json.dump(imagenes,archivo_json)
archivo_json.close()