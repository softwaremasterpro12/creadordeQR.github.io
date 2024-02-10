<?php
// Datos de conexión a la base de datos MySQL
$servername = "localhost"; // Cambia esto si tu servidor MySQL no está en localhost
$username = "root"; // Cambia esto al nombre de usuario de tu base de datos MySQL
$password = "clara1220"; // Cambia esto a la contraseña de tu base de datos MySQL
$dbname = "formulario_db"; // Cambia esto al nombre de tu base de datos MySQL

// Crear una conexión a la base de datos
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Recibir los datos del formulario
$item = $_POST['item'];
$insumo = $_POST['insumo'];
$cantidad = $_POST['cantidad'];
$valorUnidad = $_POST['valorUnidad'];
$valorTotal = $_POST['valorTotal'];
$qrImageBase64 = $_POST['qrImageBase64'];

// Preparar la consulta SQL para insertar los datos en la tabla
$sql = "INSERT INTO formulario (item, insumo, cantidad, valor_unidad, valor_total, qr_image_base64) VALUES ('$item', '$insumo', $cantidad, $valorUnidad, $valorTotal, '$qrImageBase64')";

// Ejecutar la consulta y verificar si fue exitosa
if ($conn->query($sql) === TRUE) {
    echo "Datos guardados exitosamente";
} else {
    echo "Error al guardar los datos: " . $conn->error;
}

// Cerrar la conexión a la base de datos
$conn->close();
?>
