#Dockerfile the tictactoe_app

#necesario para el correcto funcionamiento de vite (qeu requiere Node.js para la compilacion del codigo)
#basada en la img de alpine Linux - dockerhub - ligera y segura
FROM node:18-alpine

#directorio de trabajo dentro del contenedor, dnd se ejecutaran los comandos
WORKDIR /app

#ejecucion de las instrucciones durante la construccion de la img -- en este caso será para instalar las dependecias de vite + react
# para la optimizacion de la instalacion de las dependencias, se copia el archivo package.json y package-lock.json
COPY package.json package-lock.json ./
RUN npm install 

#copiar el resto de los archivos del proyecto al directorio de trabajo del contenedor (al establecido en WORKDIR)
COPY . .

#puerto de escucha del contenedor - puerto pro defecto de vite
EXPOSE 5173

#para inciar el servidor
CMD ["npm", "run", "dev"]
