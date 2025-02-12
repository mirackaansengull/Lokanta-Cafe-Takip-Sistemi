<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

$serverName = "localhost";
$connectionOptions = array(
    "Database" => "menu",
    "Uid" => "sa",
    "PWD" => "miracpvp123",
    "CharacterSet" => "UTF-8"
);

$conn = sqlsrv_connect($serverName, $connectionOptions);
if ($conn === false) {
    die(json_encode(['success' => false, 'error' => sqlsrv_errors()]));
}

$masaNo = $_POST['masaNo']; // Örnek: "masa1"
$siparisler = json_decode($_POST['siparisler'], true);

foreach($siparisler as $siparis) {
    $sql = "INSERT INTO $masaNo (yemek_id, yemek_adi, adet, fiyat) VALUES (?, ?, ?, ?)";
    $params = array(
        $siparis['yemekId'],
        $siparis['yemekAdi'],
        $siparis['adet'],
        $siparis['fiyat']
    );
    
    $stmt = sqlsrv_query($conn, $sql, $params);
    if (!$stmt) {
        echo json_encode(['success' => false, 'error' => sqlsrv_errors()]);
        exit;
    }
}

echo json_encode(['success' => true]);
sqlsrv_close($conn);
var_dump($_POST['siparisler']);

?>