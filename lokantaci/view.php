<?php $serverName = "localhost"; // SQL Server'ın bulunduğu sunucu
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

// Çorbalar
$sqlbilgi = "SELECT * FROM MüşteriBilgisi";
$stmtbilgi = sqlsrv_query($conn, $sqlbilgi);
if ($stmtbilgi === false) {
    die(print_r(sqlsrv_errors(), true)); // Sorgu hatası
} 
$bilgi = [];
while ($row = sqlsrv_fetch_array($stmtbilgi, SQLSRV_FETCH_ASSOC)) {
    $bilgi[] = $row;
}

echo json_encode(["bilgi" => $bilgi]);

?>