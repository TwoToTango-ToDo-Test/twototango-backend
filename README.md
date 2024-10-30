## Descripción
Prueba técnica para TwoToTango donde se crea una aplicación CRUD utilizando Node.js 22, MySQL, Sequelize, Docker. 

El proyecto está diseñado para gestionar usuarios. Contiene dos vistas principales:
1. **Vista de Autenticación**: Permite registrar nuevos usuarios y autenticar las credenciales de los usuarios existentes.
2. **Vista de Tareas**: Se puede ver tareas por usuario, por id de tarea, crear y actualizar tareas.


## Requisitos

1. Docker
2. VSC
3. Extensión Remote Development

## Instalación

1. Clonar el repositorio.
2. Se debe abrir el dev container Ctrl + Shift + p => Dev Containers: Reopen Container
3. Crear y Ejecutar las migraciones (Las instrucción se encuentran en src/readme.md)
4. Seguir el paso número 2, con el repositorio twototango-frontend para que la aplicación se ejecute en el puerto 80 gracias al nginx
4. En este punto puede probar la aplicación en un servicio consistente con los ambientes de producción
    
    ```bash
    http://localhost/api/swagger
    ```
   
   O puede ejecutar la aplicación en un ambiente de desarrollo accediendo a src/Api

    ```bash
    cd src/Api
    http://localhost:5500/api/swagger
    ```

5. Para acceder a PhpMyAdmin se puede desde:

    ```bash
    http://localhost:8081
    ```


En la aplicación hay dos archivos que son importantes para mi solución:

Repository.ts: Contiene una clase abstracta que contiene los métodos CRUD reutilizables, al tener un tipado generico permite que cualquier módelo lo utilice facilitando la creación de nuevos servicios y manteniendo una consistencia.

IService.ts Contiene un conjunto de interfaces que mantienen una consistencia de la manera en que se deben desarrollar los diferentes servicios, esto ayuda a mantener un orden tanto en el desarrollo del código como en las respuestas de las APIs.