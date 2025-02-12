<?php
// MSSQL veritabanı bağlantısı
ini_set('display_errors', 1);  // PHP hata raporlamayı aç
error_reporting(E_ALL);

// MSSQL bağlantı ayarları
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

// Çorbalar
$sqlCorbalar = "EXEC GetAllCorbalar";
$stmtCorbalar = sqlsrv_query($conn, $sqlCorbalar);
if ($stmtCorbalar === false) {
    die(print_r(sqlsrv_errors(), true)); // Sorgu hatası
} 
$Corbalar = [];
while ($row = sqlsrv_fetch_array($stmtCorbalar, SQLSRV_FETCH_ASSOC)) {
    $Corbalar[] = $row;
}

// Ara Sıcaklar
$sqlAraSicaklar = "EXEC GetAllAraSicaklar";
$stmtAraSicaklar = sqlsrv_query($conn, $sqlAraSicaklar);
if ($stmtAraSicaklar === false) {
    die(print_r(sqlsrv_errors(), true)); // Sorgu hatası
} 
$AraSicaklar = [];
while ($row = sqlsrv_fetch_array($stmtAraSicaklar, SQLSRV_FETCH_ASSOC)) {
    $AraSicaklar[] = $row;
}

// Kebaplar
$sqlKebaplar = "EXEC GetAllKebaplar";
$stmtKebaplar = sqlsrv_query($conn, $sqlKebaplar);
if ($stmtKebaplar === false) {
    die(print_r(sqlsrv_errors(), true)); // Sorgu hatası
} 
$Kebaplar = [];
while ($row = sqlsrv_fetch_array($stmtKebaplar, SQLSRV_FETCH_ASSOC)) {
    $Kebaplar[] = $row;
}

// Hamburgerler
$sqlHamburgerler = "EXEC GetAllHamburgerler";
$stmtHamburgerler = sqlsrv_query($conn, $sqlHamburgerler);
if ($stmtHamburgerler === false) {
    die(print_r(sqlsrv_errors(), true)); // Sorgu hatası
} 
$Hamburgerler = [];
while ($row = sqlsrv_fetch_array($stmtHamburgerler, SQLSRV_FETCH_ASSOC)) {
    $Hamburgerler[] = $row;
}

// Pizzalar
$sqlPizzalar = "EXEC GetAllPizzalar";
$stmtPizzalar = sqlsrv_query($conn, $sqlPizzalar);
if ($stmtPizzalar === false) {
    die(print_r(sqlsrv_errors(), true)); // Sorgu hatası
} 
$Pizzalar = [];
while ($row = sqlsrv_fetch_array($stmtPizzalar, SQLSRV_FETCH_ASSOC)) {
    $Pizzalar[] = $row;
}

// Tatlılar
$sqlTatlilar = "EXEC GetAllTatlilar";
$stmtTatlilar = sqlsrv_query($conn, $sqlTatlilar);
if ($stmtTatlilar === false) {
    die(print_r(sqlsrv_errors(), true)); // Sorgu hatası
} 
$Tatlilar = [];
while ($row = sqlsrv_fetch_array($stmtTatlilar, SQLSRV_FETCH_ASSOC)) {
    $Tatlilar[] = $row;
}

// İçecekler
$sqlIcecekler = "SELECT * FROM Icecekler";
$stmtIcecekler = sqlsrv_query($conn, $sqlIcecekler);
if ($stmtIcecekler === false) {
    die(print_r(sqlsrv_errors(), true)); // Sorgu hatası
} 
$Icecekler = [];
while ($row = sqlsrv_fetch_array($stmtIcecekler, SQLSRV_FETCH_ASSOC)) {
    $Icecekler[] = $row;
}

$sqlKahveler = "SELECT * FROM Kahveler";
$stmtKahveler = sqlsrv_query($conn, $sqlKahveler);
if ($stmtKahveler === false) {
    die(print_r(sqlsrv_errors(), true)); // Sorgu hatası
} 
$Kahveler = [];
while ($row = sqlsrv_fetch_array($stmtKahveler, SQLSRV_FETCH_ASSOC)) {
    $Kahveler[] = $row;
}

// JSON döndürme
$menu = [
    "Corbalar" => $Corbalar,
    "AraSicaklar" => $AraSicaklar,
    "Kebaplar" => $Kebaplar,
    "Hamburgerler" => $Hamburgerler,
    "Pizzalar" => $Pizzalar,
    "Tatlilar" => $Tatlilar,
    "Icecekler" => $Icecekler,
    "Kahveler" => $Kahveler
];

echo json_encode($menu);

// Bağlantıyı kapat
sqlsrv_close($conn);
?>

