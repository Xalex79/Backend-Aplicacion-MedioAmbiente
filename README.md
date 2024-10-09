# Backend Aplicacion MedioAmbiente

Repositorios:

Arduino:

*(https://github.com/Xalex79/Arduino-SparkFun-Beacon-Ozono---3-GTI)

Android:

*(https://github.com/Xalex79/Android-Beacon-a-Backend)

Frontend:

*(https://github.com/Xalex79/Forntend-Aplicacion-MedioAmbiente)

Backend:

*(https://github.com/Xalex79/Backend-Aplicacion-MedioAmbiente)


Descripción del proyecto:

Este es un proyecto creado para la asignatura de 3º de GTI "Proyecto de Biometría y Medioambiente". Consiste en medir la concentración de Ozono en el ambiente del usuario a través de un llavero, y darle feedback sobre la cantidad de exposición al usuario para mejorar la calidad del aire que respira a diario. Esto se puede traducir en evitar ciertas calles de la ciudad, o evitar según que zonas industriales, o la exposición a diferentes productos o métodos que contaminen con Ozono. 

Este proyecto hace uso de un SparkFun Pro nRF52840 Mini (Microcontrolador similar a un Arduino) con un sensor de Ozono ULPSM-O3-968-046, una aplicación móvil para dispositivos Android, y un Servidor que contiene el frontend, backend, y la base de datos. 

Para desplegar el proyecto necsitarás un SparkFun Pro nRF52840 Mini o similar, un teléfono Android relativamente moderno con capacidades WiFi y Bluetooth BLE, y un ordenador que hará de servidor local. 
Los detalles de como desplegarlo son los siguientes: 
- Descarga y abre el programa Arduino IDE (https://www.arduino.cc/en/software), y sube el código del repositorio* Arduino al microcontrolador. Deberá empezar a parpadear el led azul si todo funciona bien.

- Descarga y abre el programa Android Studio (https://developer.android.com/studio?hl=es), abre el repositorio* Android, conecta tu teléfono Android al ordenador (el teléfono debe tener las opciones de desarrollador activadas y la depuración USB), y sube la aplicación para instalarla en tu dispositivo cuando esté lista (ver como prepararla a continuación). Asegúrate de darle los permisos necesarios llendo a los detalles de la aplicación en Ajustes (Bluetooth, Ubicación, Escaneo de Dispositivos). El teléfono y el ordenador deben estar en la misma red WiFi, en la que idealmente hay pocos dispositivos conectados, si no solo estos dos. Tienes que saber la IP local del servidor. Para eso en Windows clica la tecla windows, busca "CMD", abre la terminal, y escribe ipconfig. En "Adaptador de LAN inalámbrica Wi-Fi" o similar, en el apartado "Dirección IPv4", verás una dirección IP parecida a esta 192.168.84.71 (puede empezar por 172 o 10, depende de la red). En Android Studio, en "MainActivity" en los métodos boton_recibir_pulsado() y boton_enviar_pulsado() en la linea "elPeticionario.hacerPeticionREST(..." cambia el 192.168.32.247 de "http://192.168.32.247:3000/api/v1/mediciones/" por la IP que tengas. Cuando lo hayas hecho, ya puedes subir la aplicación a tu teléfono Android.

- Abre o descarga un entorno de edición de código como Visual Studio Code (https://code.visualstudio.com/). Descarga los repositorios* de Frontend y Backend y sigue los siguientes pasos:

Para configurar el Frontend y Backend en un deployment, usaremos Docker.
Antes de nada es importante tener Docker instalado. La manera más sencilla e intuitiva de hacerlo es descargando la aplicación de escritorio Docker Desktop (https://www.docker.com/). Es resto de modulos que requiere este proyecto están en el propio contenedor que engloba todo el backend, frontend, y la base de datos en MongoDb en local (especificados en sus respectivos DockerFile). También se puede usar una base de datos en la nube con un cluster en MongoDB Atlas, pero para el desarrollo de este proyecto no es necesario y evita la necesidad de tener conexión a internet al probar el funcionamiento del proyecto (aunque para configurarlo usando Docker es necesaria una conexión a internet).

Si has descargado los dos repositorios* y quieres hacer tu propio contenedor, sigue los pasos a continuación:

Crea una carpeta donde guardarás ambos repositorios*, por ejemplo: Proyecto MedioAmbiente (raíz)
                                                                    |- Backend            (Subcarpetas)
                                                                    |_ Frontend           (Subcarpetas)

Dentro de la carpeta raíz (en este ejemplo "Proyecto MedioAmbiente"), pero fuera de los repositorios*, crearás un archivo llamado "docker-compose.yml". 

Proyecto MedioAmbiente (raíz)
    |- Backend            (Subcarpetas)
    |- Frontend           (Subcarpetas)
    |_ docker-compose.yml (configuración docker)

Con este código:

//---------------------------------------------------

version: '3.8'

services:
  backend:
    build:
      context: ./Backend/
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development

  frontend:
    build:
      context: ./Frontend/
      dockerfile: Dockerfile
    ports:
      - "8080:80"
    depends_on:
      - backend

  mongodb:
    image: mongo:5.0
    container_name: mongodb
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:

//---------------------------------------------------

En el archivo "docker-compose.yml" estarán especificadas las carpetas del proyecto y demás requerimientos necesarios. Cuando descargues los repositorios* de Backend y Frontend, asegurate de escribir la ruta correcta de cada uno. 
En frontend:
    build:
      context: AQUI PONES LA RUTA DEL FRONTEND, POR EJEMPLO ASI: ./Frontend/ (donde estarán las carpetas src, doc, test, ... etc)
      dockerfile: Dockerfile
    ports:
      - "8080:80"
    depends_on:
      - backend

Lo mismo con el backend. 

Una vez tengas esto completado, abrirás la terminal (por defecto la terminal de tu editor de código), y asegurándote que estás en la carpeta que guarda frontend y backend (en este ejemplo: Proyecto MedioAmbiente), escribirás el siguiente comando "docker-compose up --build". Si todo sale bien en la interfaz de Docker Desktop en "Containers" verás el nombre del contenedor y dentro al desplegar el icono verás tres imágenes, de frontend, backend, y mongodb. 

Entrando en el navegador en la página http://localhost:8080 podrás ver el frontend, junto con las medidas en la base de datos. Si aún no tienes un dispositivo Android que pueda mandar nuevas medidas a la base de datos o no tienes medidas guardadas, puedes acceder al archivo "request.http" del backend y probar diferentes métodos HTTP. Por ejemplo puedes hacer un POST para crear nuevas medidas, o hacer un GET para recibir todas las medidas, puedes actualizar medidas con PUT buscando por ID o borrar medidas por ID con DELETE. Si todo va bien deberías ver en el frontend como se van modificando las medidas al usar los métodos HTTP. 

Al usar entre otras cosas, REACT, el frontend se irá actualizando sin necesidad de recargar la página web con F5 o Shift+F5 como con otras tecnologías. En este proyecto esta puesto que se actualicen cada 5s, pero puedes modificarlo en "MeasurementDashboard.tsx" en la linea 30 al tiempo que veas conveniente en ms (5s = 5000ms).



- Como ejecutar los tests:

Los tests en la carpeta "test" son útiles para comprobar que todo funciona, se llaman a la vez con un simple comando en la terminal y comprueban automáticamente, y de manera independiente al código diferentes partes del proyecto para detectar posibles errores antes de continuar con la prueba final del proyecto. Es una forma muy sencilla de hacer debugging para errores comunes que te pueden ayudar a saber que parte de la cadena desde Arduino hasta el Frontend falla. Para probar los tests, sencillamente abre la terminal de tu editor de código, estando en la carpeta correspondiente, y escribe "npm test". Si todo va bien se te informará al par de segundos. Si hay algún problema podrás saber que test ha fallado. 
