$(document).ready(function() {
    

    $('.btn-outline-success').on('click', function() {
        const card = $(this).closest('.card');
        const itemTitulo = card.find('h5').text();
        const itemPrecio = card.find('.text-body-secondary').text();
        const itemImagen = card.find('div[style*="background-image"]').css('background-image').replace('url("', '').replace('")', '');

        const nuevoProducto = {
            titulo: itemTitulo,
            precio: itemPrecio,
            imagen: itemImagen,
            cantidad: 1
        };

        agregarAlCarrito(nuevoProducto);
    });

    function agregarAlCarrito(producto) {
        let encontrado = false;
        $('.row-product').each(function() {
            let titulo = $(this).find('.text-truncate').text().trim();
            if (titulo === producto.titulo) {
                let cantidadElement = $(this).find('h6 span');
                let cantidad = parseInt(cantidadElement.text());
                cantidad++;
                cantidadElement.text(cantidad);
                encontrado = true;
            }
        });

        if (!encontrado) {
            const productoHTML = `
                <div class="row-product">
                    <div class="cart-product">
                        <div class="container text-center">
                            <div class="row justify-content-start">
                                <div class="col-4">
                                    <img src="${producto.imagen}" class="img-fluid" style="max-height: 60px;" alt="${producto.titulo}">
                                </div>
                                <div class="col-4">
                                    <h5 class="text-truncate" style="color: rgb(239, 239, 15);">${producto.titulo}</h5>
                                    <h6><span>1</span>X${producto.precio}</h6>
                                </div>
                                <div class="col-4 d-flex justify-content-center align-items-center" style="padding-left:90px;">
                                    <button type="button" class="btn-close" aria-label="Close"></button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr>
                </div>
                
            `;
            $('.offcanvas-body').append(productoHTML);
        }
        actualizarContadorCarrito();
    }

    $('.offcanvas-body').on('click', '.btn-close', function() {
        const rowProduct = $(this).closest('.row-product');
        let cantidad = parseInt(rowProduct.find('h6 span').text());
        if (cantidad > 1) {
            cantidad--;
            rowProduct.find('h6 span').text(cantidad);
        } else {
            rowProduct.remove();
        }
        actualizarContadorCarrito();
    });

    function actualizarContadorCarrito() {
        let totalItems = 0;
        $('.row-product').each(function() {
            totalItems += parseInt($(this).find('h6 span').text());
        });
        $('.badge').text(totalItems + ' ');
    }

    
});
