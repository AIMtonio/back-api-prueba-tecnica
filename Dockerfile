# Usar una imagen base de Node.js
FROM node:20

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

ENV DB_HOST=host.docker.internal
ENV DB_PORT=3306
ENV DB_USER=root
ENV DB_PASS=
ENV DB_NAME=test
ENV JWT_SECRET=secret

# Copiar el archivo package.json y package-lock.json al contenedor
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto de los archivos del proyecto al contenedor
COPY . .

# Compilar el proyecto (si es necesario)
RUN npm run build

# Exponer el puerto en el que la aplicación escucha
EXPOSE 3000

# Definir el comando para iniciar la aplicación
CMD ["npm", "run", "start:dev"]