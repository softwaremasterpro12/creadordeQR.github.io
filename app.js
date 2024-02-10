document.addEventListener("DOMContentLoaded", function() {
    const contenedor = document.querySelector(".contenedorQR");
    const formulario = document.getElementById("formulario");

    formulario.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const itemValue = document.getElementById("item").value;
        const insumoValue = document.getElementById("insumo").value;
        const cantidadValue = document.getElementById("cantidad").value;
        const valorUnidad = parseFloat(document.getElementById("valorUnidad").value);
        const valorTotalField = document.getElementById("valorTotal");

        // Calcular valor total
        const valorTotal = cantidadValue * valorUnidad;
        valorTotalField.value = valorTotal.toFixed(2);

        const texto = `Item: ${itemValue}\nInsumo: ${insumoValue}\nCantidad: ${cantidadValue}\nValor Unidad: $${valorUnidad}\nValor Total: $${valorTotal.toFixed(2)}`;

        if (texto !== "") {
            contenedor.innerHTML = ""; // Limpiamos el contenedor antes de agregar el nuevo QR
            const qrCode = new QRCode(contenedor, texto);
            
            // Convertir el QR a una imagen base64
            const qrImageBase64 = contenedor.querySelector('img').src;
            
            // Enviar los datos del formulario y el QR al servidor
            const formData = new FormData();
            formData.append('item', itemValue);
            formData.append('insumo', insumoValue);
            formData.append('cantidad', cantidadValue);
            formData.append('valorUnidad', valorUnidad);
            formData.append('valorTotal', valorTotal);
            formData.append('qrImageBase64', qrImageBase64);

            fetch('guardar_datos.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
        }
    });
});


