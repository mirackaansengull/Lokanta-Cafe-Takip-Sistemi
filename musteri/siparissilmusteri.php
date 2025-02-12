<?php
// Veritabanı bağlantısı için MSSQL ayarları
$servername = "localhost";  // SQL Server'ınızın adresi
$username = "sa"; // SQL Server kullanıcı adı
$password = "miracpvp123";  // SQL Server şifresi
$dbname = "menu"; // Veritabanı adı

// MSSQL bağlantısı
$conn = sqlsrv_connect($servername, array(
    "Database" => $dbname,
    "UID" => $username,
    "PWD" => $password
));

// Bağlantı kontrolü
if( !$conn ) {
    die( print_r(sqlsrv_errors(), true));
}

// Seçilen masa adını alıyoruz
if (isset($_POST['masa_adi'])) {
    $secilenMasa = $_POST['masa_adi'];

    // SecilenMasa'nın güvenli bir tablo adı olduğundan emin ol
    $allowedTables = ['masa1', 'masa2', 'masa3','masa4','masa5']; // Sadece izin verilen tablo adları
    if (in_array($secilenMasa, $allowedTables)) {
        // Dinamik olarak tabloyu TRUNCATE et
        $sql = "TRUNCATE TABLE $secilenMasa";

        // Sorguyu çalıştır
        $stmt = sqlsrv_query($conn, $sql);

        if ($stmt) {
            echo "Masa $secilenMasa için siparişler başarıyla silindi.";
        } else {
            echo "Hata: " . print_r(sqlsrv_errors(), true);
        }
    } else {
        echo "Geçersiz masa adı!";
    }
} else {
    echo "Masa adı gönderilmedi!";
}
?>

