<?php
// Veritabanına bağlan
$serverName = "localhost"; // SQL Server'ın bulunduğu sunucu
$connectionOptions = array(
    "Database" => "menu", // Veritabanı adı
    "Uid" => "sa",        // Kullanıcı adı
    "PWD" => "miracpvp123",    // Şifre
    "CharacterSet" => "UTF-8"
);

// Bağlantıyı kurma
$conn = sqlsrv_connect($serverName, $connectionOptions);
if ($conn === false) {
    die(print_r(sqlsrv_errors(), true)); // Veritabanı bağlantısı hatası
} 

// Verileri çekmek için ayrı sorgular yazıyoruz

$sqlmasa1 = "SELECT yemek_id, yemek_adi,adet,fiyat FROM masa1";
$stmtmasa1 = sqlsrv_query($conn, $sqlmasa1);
if ($stmtmasa1 === false) {
    die(print_r(sqlsrv_errors(), true)); // Sorgu hatası
} 
$masa1 = [];
while ($row = sqlsrv_fetch_array($stmtmasa1, SQLSRV_FETCH_ASSOC)) {
    $masa1[] = $row;
}


$sqlmasa2 = "SELECT yemek_id, yemek_adi,adet,fiyat FROM masa2";
$stmtmasa2 = sqlsrv_query($conn, $sqlmasa2);
if ($stmtmasa2 === false) {
    die(print_r(sqlsrv_errors(), true)); // Sorgu hatası
} 
$masa2 = [];
while ($row = sqlsrv_fetch_array($stmtmasa2, SQLSRV_FETCH_ASSOC)) {
    $masa2[] = $row;
}


$sqlmasa3 = "SELECT yemek_id, yemek_adi,adet,fiyat FROM masa3";
$stmtmasa3 = sqlsrv_query($conn, $sqlmasa3);
if ($stmtmasa3 === false) {
    die(print_r(sqlsrv_errors(), true)); // Sorgu hatası
} 
$masa3 = [];
while ($row = sqlsrv_fetch_array($stmtmasa3, SQLSRV_FETCH_ASSOC)) {
    $masa3[] = $row;
}



$sqlmasa4 = "SELECT yemek_id, yemek_adi,adet,fiyat FROM masa4";
$stmtmasa4 = sqlsrv_query($conn, $sqlmasa4);
if ($stmtmasa4 === false) {
    die(print_r(sqlsrv_errors(), true)); // Sorgu hatası
} 
$masa4 = [];
while ($row = sqlsrv_fetch_array($stmtmasa4, SQLSRV_FETCH_ASSOC)) {
    $masa4[] = $row;
}




$sqlmasa5 = "SELECT yemek_id, yemek_adi,adet,fiyat FROM masa5";
$stmtmasa5 = sqlsrv_query($conn, $sqlmasa5);
if ($stmtmasa5 === false) {
    die(print_r(sqlsrv_errors(), true)); // Sorgu hatası
} 
$masa5 = [];
while ($row = sqlsrv_fetch_array($stmtmasa5, SQLSRV_FETCH_ASSOC)) {
    $masa5[] = $row;
}


$masalar = [
    "masa1" => $masa1,
    "masa2" => $masa2,
    "masa3" => $masa3,
    "masa4" => $masa4,
    "masa5" => $masa5
];

echo json_encode($masalar);
?>
