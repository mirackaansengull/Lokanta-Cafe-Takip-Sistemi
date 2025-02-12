$.ajax({
    url: 'view.php',
    type: 'GET',
    dataType: 'json',
    success: function (data){
        console.log(data)
        if (data.bilgi) {
            var bilgiContent = ''; 
            data.bilgi.forEach(function (item) {
                bilgiContent += '<p>' + item.Ad + ' ' +item.Soyad +'</p>';
            });
            $('#musteribilgisi').html(bilgiContent);
        }
    }
})

 function siparisSil(secilenMasa){
    // Tıklanan butonun id'sini alıyoruz
    console.log(secilenMasa)  // Masa numarasını kontrol etmek için

    // Ajax ile ödeme yapıldığında masa siparişlerini silmek için PHP'ye gönderiyoruz
    $.ajax({
        url: 'siparissillokanta.php',  // PHP dosyasının yolu
        method: 'POST',
        data: { masa_adi: secilenMasa },
        success: function(response) {
            alert('Siparişler başarıyla silindi!');
            // Siparişler silindikten sonra ekranı güncellemek veya sıfırlamak için
            $('#' + secilenMasa).html('sipariş yok'); 
            $('.para').text(''); // Masa bilgilerini sıfırlıyoruz
            
        },
        error: function(xhr, status, error) {
            console.error("Hata oluştu: " + error);
        }
    });
};


$.ajax({
    url: 'gostersiparislokantaci.php',
    type: 'GET',
    dataType: 'json',
    success: function (data) {
        console.log(data);
        
        if (data.masa1 && data.masa1.length > 0) {
            var masa1Content = '';
            var toplamFiyat = 0;
        
            data.masa1.forEach(function (item) {
                masa1Content += '<div id="yemek-' + item.yemek_id + '" >';
                masa1Content += '<div class="menu-item-content">';
                masa1Content += '<p>' + item.yemek_adi + '</p>';
                masa1Content += '<p>' + item.adet + ' adet' + '</p>';
                masa1Content += '<p>' + item.fiyat + '</p>';
                masa1Content += '</div>';
                masa1Content += '</div>';
        
                toplamFiyat += item.fiyat * item.adet;
            });
        
            $('#masa1').html(masa1Content);
            $('#toplam-tutar1').text(toplamFiyat.toFixed(2));
        } else if (!data.masa1 || (data.masa1 && data.masa1.length === 0)) {
            // Eğer data.masa2 yoksa ya da boşsa
            $('#masa1').text('Sipariş yok!');
        } else {
            // Diğer durumlar (hata)
            alert('Bir hata oldu.');
        }
        


        if (data.masa2 && data.masa2.length > 0) {
            // Eğer data.masa2 var ve içinde eleman varsa
            var masa2Content = '';
            var toplamFiyat = 0;
        
            data.masa2.forEach(function (item) {
                masa2Content += '<div id="yemek-' + item.yemek_id + '" >';
                masa2Content += '<div class="menu-item-content">';
                masa2Content += '<p>' + item.yemek_adi + '</p>';
                masa2Content += '<p>' + item.adet + ' adet' + '</p>';
                masa2Content += '<p>' + item.fiyat + '</p>';
                masa2Content += '</div>';
                masa2Content += '</div>';
        
                toplamFiyat += item.fiyat * item.adet;
            });
        
            $('#masa2').html(masa2Content);
            $('#toplam-tutar2').text(toplamFiyat.toFixed(2));
        } else if (!data.masa2 || (data.masa2 && data.masa2.length === 0)) {
            // Eğer data.masa2 yoksa ya da boşsa
            $('#masa2').text('Sipariş yok!');
        } else {
            // Diğer durumlar (hata)
            alert('Bir hata oldu.');
        }


        if (data.masa3 && data.masa3.length > 0) {
            // Eğer data.masa2 var ve içinde eleman varsa
            var masa3Content = '';
            var toplamFiyat = 0;
        
            data.masa3.forEach(function (item) {
                masa3Content += '<div id="yemek-' + item.yemek_id + '" >';
                masa3Content += '<div class="menu-item-content">';
                masa3Content += '<p>' + item.yemek_adi + '</p>';
                masa3Content += '<p>' + item.adet + ' adet' + '</p>';
                masa3Content += '<p>' + item.fiyat + '</p>';
                masa3Content += '</div>';
                masa3Content += '</div>';
        
                toplamFiyat += item.fiyat * item.adet;
            });
        
            $('#masa3').html(masa3Content);
            $('#toplam-tutar3').text(toplamFiyat.toFixed(2));
        } else if (!data.masa3 || (data.masa3 && data.masa3.length === 0)) {
            // Eğer data.masa2 yoksa ya da boşsa
            $('#masa3').text('Sipariş yok!');
        } else {
            // Diğer durumlar (hata)
            alert('Bir hata oldu.');
        }



        if (data.masa4 && data.masa4.length > 0) {
            // Eğer data.masa4 var ve içinde eleman varsa
            var masa4Content = '';
            var toplamFiyat = 0;
        
            data.masa4.forEach(function (item) {
                masa4Content += '<div id="yemek-' + item.yemek_id + '" >';
                masa4Content += '<div class="menu-item-content">';
                masa4Content += '<p>' + item.yemek_adi + '</p>';
                masa4Content += '<p>' + item.adet + ' adet' + '</p>';
                masa4Content += '<p>' + item.fiyat + '</p>';
                masa4Content += '</div>';
                masa4Content += '</div>';
        
                toplamFiyat += item.fiyat * item.adet;
            });
        
            $('#masa4').html(masa4Content);
            $('#toplam-tutar4').text(toplamFiyat.toFixed(2));
        } else if (!data.masa4 || (data.masa4 && data.masa4.length === 0)) {
            // Eğer data.masa4 yoksa ya da boşsa
            $('#masa4').text('Sipariş yok!');
        } else {
            // Diğer durumlar (hata)
            alert('Bir hata oldu.');
        }



        if (data.masa5 && data.masa5.length > 0) {
            // Eğer data.masa5 var ve içinde eleman varsa
            var masa5Content = '';
            var toplamFiyat = 0;
        
            data.masa5.forEach(function (item) {
                masa5Content += '<div id="yemek-' + item.yemek_id + '" >';
                masa5Content += '<div class="menu-item-content">';
                masa5Content += '<p>' + item.yemek_adi + '</p>';
                masa5Content += '<p>' + item.adet + ' adet' + '</p>';
                masa5Content += '<p>' + item.fiyat + '</p>';
                masa5Content += '</div>';
                masa5Content += '</div>';
        
                toplamFiyat += item.fiyat * item.adet;
            });
        
            $('#masa5').html(masa5Content);
            $('#toplam-tutar5').text(toplamFiyat.toFixed(2));
        } else if (!data.masa5 || (data.masa5 && data.masa5.length === 0)) {
            // Eğer data.masa5 yoksa ya da boşsa
            $('#masa5').text('Sipariş yok!');
        } else {
            // Diğer durumlar (hata)
            alert('Bir hata oldu.');
        }
    }
});

