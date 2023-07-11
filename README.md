Paso realizados segunda pre entrega:
Para la segunda pre entrega empece configurando mongo y movi fsproductmanager.js junto con uno nuevo que se llama mongoproductmanager.js dentro de src/dao/managers
Luego en /dao/models cree un carts.model.js y products.model.js con los esquemas

En products.router.js esta la logica del GET y POST de base de datos(omiti los otros metodos que ya utilice en trabajos pasados por falta de tiempo para probarlos para enfocarme mas en los que se solicitan en esta entrega
para no hacerte tardar mas la llegada del trabajo)

En carts.router.js esta la logica de los GET POST DELETE Y PUT del carrito

Hice las pruebas en http://localhost:8008/products con los siguientes metodos de GET:
http://localhost:8008/products?query=categoria(entre marcador cortante y muñeco)
http://localhost:8008/products?limit=2 me da 2 productos se puede modificar por cualquer numero
http://localhost:8008/products?sort=desc o asc para ordenar productos por precio de forma descencdente o ascendente
Eso con respecto a los productos luego con los carritos

Metodo POST para agregar carritos con un array de productos vacios que luego se modificara con metodos PUT y DELETE
http://localhost:8008/api/carts
{
"name": "nombre del carrito"
}

Metodo GET http://localhost:8008/api/carts/:cid, reemplazando cid con el ID del carrito te devuelve el carrito en especifico por ejemplo http://localhost:8008/api/carts/64aceb41395b14d4915a4271

Metodo PUT para agregar productos en http://localhost:8008/api/carts/:cid, reemplazando cid con el ID del carrito al que deseas agregar
Ejemplo:
http://localhost:8008/api/carts/64aceb41395b14d4915a4271

{
"products": [
{
"productId": "id de producto",
"quantity": cantidad del producto
}
]
}

Metodo PUT para actualizar la cantidad de un producto en el carrito en http://localhost:8008/api/carts/:cid/products/:pid
Reemplazando :cid con el ID del carrito
Reemplazando :pid con el ID del producto
Ejemplo:
http://localhost:8008/api/carts/64aceb41395b14d4915a4271/products/64ace2c7da5dcf8dd1a3479f
{
"quantity": cantidad del producto al que cambia
}

Metodo DELETE para eliminar un producto del carrito
http://localhost:8008/api/carts/:cid/products/:pid
Reemplazando :cid con el ID del carrito
Reemplazando :pid con el ID del producto que deseas eliminar
Ejemplo:http://localhost:8008/api/carts/64aceb41395b14d4915a4271/products/64ace2c7da5dcf8dd1a3479f

Metodo DELETE para eliminar todos los productos del carrito
http://localhost:8008/api/carts/:cid
Reemplazando :cid con el ID del carrito que deseas vaciar
Ejemplo:
http://localhost:8008/api/carts/64aceb41395b14d4915a4271
