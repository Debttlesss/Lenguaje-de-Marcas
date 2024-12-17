$(document).ready(function () {
    // Función para filtrar los productos según las categorías seleccionadas
    function filterProducts() {
        // Obtener las categorías seleccionadas desde los enlaces (etiquetas)
        var selectedCategories = [];
        $('.category_item.ct_item-active').each(function () {
            selectedCategories.push($(this).attr('category'));
        });

        // Obtener las categorías seleccionadas desde los toggles (checkboxes)
        var toggledCategories = [];
        $('.toggle-checkbox:checked').each(function () {
            toggledCategories.push($(this).attr('category'));
        });

        // Combinar todas las categorías seleccionadas (enlaces + toggles)
        var allSelectedCategories = selectedCategories.concat(toggledCategories);

        // Si la categoría seleccionada es "all", mostramos todos los productos
        if (allSelectedCategories.includes("all")) {
            $('.product-item').show().css('transform', 'scale(1)');
            return;
        }

        // Ocultamos todos los productos primero
        $('.product-item').css('transform', 'scale(0)');
        function hideProduct() {
            $('.product-item').hide();
        }
        setTimeout(hideProduct, 400);

        // Mostrar productos según las categorías seleccionadas
        function showFilteredProducts() {
            $('.product-item').each(function () {
                var productCategories = $(this).attr('category').split(' '); // Extraemos todas las categorías del producto
                
                // Comprobamos si hay coincidencias entre las categorías del producto y las seleccionadas
                var matches = allSelectedCategories.some(function (category) {
                    return productCategories.includes(category);
                });

                // Mostrar el producto si coincide con alguna categoría seleccionada
                if (matches) {
                    $(this).show().css('transform', 'scale(1)');
                } else {
                    $(this).hide();
                }
            });
        }

        setTimeout(showFilteredProducts, 400);
    }

    // Filtrado por CATEGORÍAS (click en enlaces) ========================
    $('.category_item').click(function (e) {
        e.preventDefault(); // Prevenir el comportamiento por defecto del enlace

        var category = $(this).attr('category');

        // Lógica específica para el botón "Todo"
        if (category === "all") {
            $('.category_item').removeClass('ct_item-active'); // Desmarcar todo
            $(this).addClass('ct_item-active'); // Marcar solo "Todo"
        } else {
            // Alternar la clase activa para categorías individuales
            $(this).toggleClass('ct_item-active');

            // Si alguna categoría distinta a "Todo" está activa, desmarcar "Todo"
            $('.category_item[category="all"]').removeClass('ct_item-active');
        }

        // Llamar a la función para filtrar productos
        filterProducts();
    });

    // Filtrado por TOGGLES (checkboxes) ========================
    $('.toggle-checkbox').change(function () {
        // Llamar a la función para filtrar productos cuando cambie el estado de un toggle
        filterProducts();
    });

    // Inicialización: Si hay toggles o categorías ya seleccionados por defecto
    $('.category_item.ct_item-active').each(function () {
        var category = $(this).attr('category');
        console.log('Categoría seleccionada desde el inicio:', category);
    });
    $('.toggle-checkbox:checked').each(function () {
        var category = $(this).attr('category');
        console.log('Toggle seleccionado desde el inicio:', category);
    });

    // Llamar a la función de filtrado al cargar la página para establecer el estado inicial
    filterProducts();
});
