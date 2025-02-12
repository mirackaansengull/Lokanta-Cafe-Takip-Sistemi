document.addEventListener('DOMContentLoaded', function () {
    // Ekleme butonlarına olay tanımlama
    document.body.addEventListener('click', function (event) {
        if (event.target.classList.contains('ekleme')) {
            var button = event.target;
            var id = button.getAttribute('data-id');
            var isim = button.getAttribute('data-isim');
            var fiyat = button.getAttribute('data-fiyat');
            siparisEkle(id, isim, fiyat);
        }
    });
});

let toplamFiyat = 0;  // Toplam fiyatı tutacak değişken

function siparisEkle(id, isim, fiyat) {
    var siparisListesi = document.getElementById('siparis-listesi');
    var siparislerDiv = document.getElementById('siparisler');
    
    // Siparişler divini aç
    siparislerDiv.classList.add('acik');

    setTimeout(() => {
        siparisler.classList.add("sonraki-kapanma");
    }, 1500);

    // Mevcut siparişin olup olmadığını kontrol et
    var mevcutSiparis = siparisListesi.querySelector('div[data-id="'+ id +'"]');

    if (mevcutSiparis) {
        // Eğer sipariş zaten var, adeti artır
        adetDegistir(mevcutSiparis, fiyat, 1);
        return; // Yeni div eklemeye gerek yok
    }

    // Yeni bir div oluştur
    var yeniSiparis = document.createElement('div');
    yeniSiparis.className = 'siparis-item'; // CSS ile stil vermek için bir sınıf ekleyebilirsiniz
    yeniSiparis.setAttribute('data-id', id);

    // Yemek adı ve fiyatı metin olarak ekle
    var siparisBilgisi = document.createElement('span');
    siparisBilgisi.textContent = isim + ' - ' + fiyat + ' TL';
    yeniSiparis.appendChild(siparisBilgisi);

    // Adet artırma butonu ekle
    var arttirButton = document.createElement('button');
    arttirButton.textContent = '+'; // Adet artırma butonu
    arttirButton.className = 'adet-arttir'; // CSS ile stil vermek için sınıf
    arttirButton.addEventListener('click', function () {
        adetDegistir(yeniSiparis, fiyat, 1); // Adet artır
    });
    yeniSiparis.appendChild(arttirButton);

    // Adet gösterge alanı ekle
    var adetSpan = document.createElement('span');
    adetSpan.textContent = '1'; // Varsayılan adet
    adetSpan.className = 'adet-gosterge';
    yeniSiparis.appendChild(adetSpan);

    // Adet azaltma butonu ekle
    var azaltButton = document.createElement('button');
    azaltButton.textContent = '-'; // Adet azaltma butonu
    azaltButton.className = 'adet-azalt'; // CSS ile stil vermek için sınıf
    azaltButton.addEventListener('click', function () {
        adetDegistir(yeniSiparis, fiyat, -1); // Adet azalt
    });
    yeniSiparis.appendChild(azaltButton);

    // Yeni siparişi listeye ekle
    siparisListesi.appendChild(yeniSiparis);

    // Fiyatı toplam fiyat değişkenine ekle
    toplamFiyat += parseFloat(fiyat);

    // Toplam fiyatı güncelle
    document.getElementById('toplam-tutar').textContent = toplamFiyat.toFixed(2);
   

    // Veritabanına kaydetme işlemi
    
}

// Adet değiştirme işlevi
function adetDegistir(siparisItem, fiyat, degisim) {
    var adetSpan = siparisItem.querySelector('.adet-gosterge');
    var mevcutAdet = parseInt(adetSpan.textContent);
    var yeniAdet = mevcutAdet + degisim;

    // Adet sıfırdan küçük olursa, yemeği sil
    if (yeniAdet <= 0) {
        // Yemeği sil
        siparisItem.remove();
        toplamFiyat -= parseFloat(fiyat); // Toplam fiyatı güncelle
        document.getElementById('toplam-tutar').textContent = toplamFiyat.toFixed(2); // 2 ondalıklı gösterim
        return; // Eğer yemek silindiyse, geri kalan işlemleri yapma
    }

    // Adeti güncelle
    adetSpan.textContent = yeniAdet;

    // Toplam fiyatı güncelle
    toplamFiyat += parseFloat(fiyat) * degisim;
    document.getElementById('toplam-tutar').textContent = toplamFiyat.toFixed(2);
}



function siparisKaydet() {
    const siparisListesi = document.getElementById('siparis-listesi');
    const siparisItems = siparisListesi.getElementsByClassName('siparis-item');
    const masaNo = document.getElementById('masasecim').value;
    
    var secilenMasa = $('#masasecim').val();
    console.log(secilenMasa)
    
    let siparisler = [];
    
    for(let item of siparisItems) {
        siparisler.push({
            yemekId: item.getAttribute('data-id'),
            yemekAdi: item.querySelector('span').textContent.split(' - ')[0],
            adet: item.querySelector('.adet-gosterge').textContent,
            fiyat: parseFloat(item.querySelector('span').textContent.split(' - ')[1])
        });
    }

    $.ajax({
        url: 'kaydetsiparis.php',
        type: 'POST',
        data: {
            masaNo: masaNo,
            siparisler: JSON.stringify(siparisler)
        },
        success: function(response) {
            alert('Sipariş kaydedildi');
            siparisListesi.innerHTML = '';
            $.ajax({
                url: 'gostersiparismusteri.php',
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    console.log(data);
                    
                    if (data[secilenMasa]) {
                        var secilenMasaContent = '';
                        var toplamFiyat = 0;
                        data[secilenMasa].forEach(function (item) { // data.secilenMasa yerine data[secilenMasa] olmalı
                            secilenMasaContent += '<div id="yemek-' + item.yemek_id + '" class="siparis-item" >';
                            secilenMasaContent += '<div class="menu-item-content">';
                            secilenMasaContent += '<p>'+ item.yemek_adi + '</p>';
                            secilenMasaContent += '<p>'+ item.adet + '</p>';
                            secilenMasaContent += '<p>'+ item.fiyat + '</p>';
                            secilenMasaContent += '</div>';
                            secilenMasaContent += '</div>';
                            
                            toplamFiyat += item.fiyat * item.adet; 
                        });
                        $('#siparis-listesi').html(secilenMasaContent);
                        $('#toplam-tutar').text(toplamFiyat.toFixed(2));
                        $('#masano').text('Masa No:'+secilenMasa+'')
                        
                        // text(secilenMasa);  // Bu fonksiyon tanımlı değil, kullanımı yoksa kaldırabilirsiniz.
                        $('#iptal').show();
                        $('#masasecim').hide(); // Masa seçme alanını gizler
                        $('#onayla').hide();
                        
                        
                    } else {
                        alert('hata oldu yarram');
                    }
                    
   
            }
        });
        },
        error: function(xhr, status, error) {
            console.log("Hata detayı:", xhr.responseText);
            alert('Hata oluştu: ' + error);
        }
    });
}
    
function siparisSil() {
    // Masa id'sini alarak AJAX isteği yapıyoruz
    const siparisListesi = document.getElementById('siparis-listesi');

    var secilenMasa = $('#masasecim').val();
    console.log(secilenMasa)
    
    $.ajax({
        url: 'siparissilmusteri.php', // Siparişi silmek için PHP dosyanız
        method: 'POST', // Veriyi gönderme yöntemi
        data: { masa_adi: secilenMasa }, // Hangi masanın siparişi silinecek
        success: function(response) {
            alert('Sipariş başarıyla silindi!');
            siparisListesi.innerHTML = '';
            $.ajax({
                url: 'gostersiparismusteri.php',
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    console.log(data);
                    
                    if (data[secilenMasa]) {
                        var secilenMasaContent = '';
                        var toplamFiyat = 0;
                        data[secilenMasa].forEach(function (item) { // data.secilenMasa yerine data[secilenMasa] olmalı
                            secilenMasaContent += '<div id="yemek-' + item.yemek_id + '" class="siparis-item" >';
                            secilenMasaContent += '<div class="menu-item-content">';
                            secilenMasaContent += '<p>'+ item.yemek_adi + '</p>';
                            secilenMasaContent += '<p>'+ item.adet + '</p>';
                            secilenMasaContent += '<p>'+ item.fiyat + '</p>';
                            secilenMasaContent += '</div>';
                            secilenMasaContent += '</div>';
                            
                            toplamFiyat += item.fiyat * item.adet; 
                        });
                        $('#siparis-listesi').html(secilenMasaContent);
                        $('#toplam-tutar').text(toplamFiyat.toFixed(2));
                        $('#masano').text('Masa No:'+secilenMasa+'')
                        $('#iptal').hide(); // Butonu gizle
                        $('#masasecim').show(); // Masa seçme alanını gizler
                        $('#onayla').show();
                        
                        // text(secilenMasa);  // Bu fonksiyon tanımlı değil, kullanımı yoksa kaldırabilirsiniz.
                        
                    } else {
                        alert('hata oldu yarram');
                    }
                    
   
            }
        });
            
      
        },
        error: function() {
            alert('Sipariş silinirken bir hata oluştu.');
        }
    });
}


    
    
    $.ajax({
        url: 'menu.php',
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            console.log(data);

            // Ara Sıcaklar
            if (data.Corbalar) {
                var CorbalarContent = '';
                data.Corbalar.forEach(function (item) {
                    CorbalarContent += '<div id="corba-' + item.Corbaid + '" class="menu-item">';
                    CorbalarContent += '<div class="menu-item-content">';
                    CorbalarContent += '<div class="menu-item-text">';
                    CorbalarContent += '<h2>' + item.Corbaad + '</h2>';
                    CorbalarContent += '<h3>Fiyat: ' + item.Corbafiyat + ' TL</h3>';
                    CorbalarContent += '</div>';
                    CorbalarContent += '<div class="menu-item-image">';
                    CorbalarContent += '<img src="' + item.Corbaresim + '" alt="' + item.Corbaad + '" />';
                    CorbalarContent += '</div>';
                    CorbalarContent += '</div>';
                    CorbalarContent += '<button class="ekleme" data-id="corba-' + item.Corbaid + '"  data-isim="' + item.Corbaad + '" data-fiyat="' + item.Corbafiyat + '">+</button>';
                    CorbalarContent += '</div>';
                });
                $('#corbalar').html(CorbalarContent);
            } else {
                alert("Çorba verisi bulunamadı.");
            }
            
            if (data.AraSicaklar) {
                var AraSicaklarContent = '';
                data.AraSicaklar.forEach(function (item) {
                    AraSicaklarContent += '<div id="arasicak-' + item.AraSicakid + '" class="menu-item">';
                    AraSicaklarContent += '<div class="menu-item-content">';
                    AraSicaklarContent += '<div class="menu-item-text">';
                    AraSicaklarContent += '<h2>' + item.AraSicakad + '</h2>';
                    AraSicaklarContent += '<h3>Fiyat: ' + item.AraSicakfiyat + ' TL</h3>';
                    AraSicaklarContent += '</div>';
                    AraSicaklarContent += '<div class="menu-item-image">';
                    AraSicaklarContent += '<img src="' + item.AraSicakresim + '" alt="' + item.AraSicakad + '" />';
                    AraSicaklarContent += '</div>';
                    AraSicaklarContent += '</div>';
                    AraSicaklarContent += '<button class="ekleme" data-id="AraSicak-' + item.AraSicakid + '" data-isim="' + item.AraSicakad + '" data-fiyat="' + item.AraSicakfiyat + '">+</button>';
                    AraSicaklarContent += '</div>';
                });
                $('#arasicaklar').html(AraSicaklarContent); 
            } else {
                alert("Ara Sıcak verisi bulunamadı.");
            }
            
            if (data.Kebaplar) {
                var KebaplarContent = '';
                data.Kebaplar.forEach(function (item) {
                    KebaplarContent += '<div id="kebap-' + item.Kebapid + '" class="menu-item">';
                    KebaplarContent += '<div class="menu-item-content">';
                    KebaplarContent += '<div class="menu-item-text">';
                    KebaplarContent += '<h2>' + item.Kebapad + '</h2>';
                    KebaplarContent += '<h3>Fiyat: ' + item.Kebapfiyat + ' TL</h3>';
                    KebaplarContent += '</div>';
                    KebaplarContent += '<div class="menu-item-image">';
                    KebaplarContent += '<img src="' + item.Kebapresim + '" alt="' + item.Kebapad + '" />';
                    KebaplarContent += '</div>';
                    KebaplarContent += '</div>';
                    KebaplarContent += '<button class="ekleme" data-id="Kebap-' + item.Kebapid + '" data-isim="' + item.Kebapad + '" data-fiyat="' + item.Kebapfiyat + '">+</button>';
                    KebaplarContent += '</div>';
                });
                $('#kebaplar').html(KebaplarContent);
            } else {
                alert("Kebap verisi bulunamadı.");
            }
            
            if (data.Hamburgerler) {
                var HamburgerlerContent = '';
                data.Hamburgerler.forEach(function (item) {
                    HamburgerlerContent += '<div id="hamburger-' + item.Hamburgerid + '" class="menu-item">';
                    HamburgerlerContent += '<div class="menu-item-content">';
                    HamburgerlerContent += '<div class="menu-item-text">';
                    HamburgerlerContent += '<h2>' + item.Hamburgerad + '</h2>';
                    HamburgerlerContent += '<h3>Fiyat: ' + item.Hamburgerfiyat + ' TL</h3>';
                    HamburgerlerContent += '</div>';
                    HamburgerlerContent += '<div class="menu-item-image">';
                    HamburgerlerContent += '<img src="' + item.Hamburgerresim + '" alt="' + item.Hamburgerad + '" />';
                    HamburgerlerContent += '</div>';
                    HamburgerlerContent += '</div>';
                    HamburgerlerContent += '<button class="ekleme" data-id="Hamburger-' + item.Hamburgerid + '" data-isim="' + item.Hamburgerad + '" data-fiyat="' + item.Hamburgerfiyat + '">+</button>';
                    HamburgerlerContent += '</div>';
                });
                $('#hamburgerler').html(HamburgerlerContent);
            } else {
                alert("Hamburger verisi bulunamadı.");
            }
            
            if (data.Pizzalar) {
                var PizzalarContent = '';
                data.Pizzalar.forEach(function (item) {
                    PizzalarContent += '<div id="pizza-' + item.Pizzaid + '" class="menu-item">';
                    PizzalarContent += '<div class="menu-item-content">';
                    PizzalarContent += '<div class="menu-item-text">';
                    PizzalarContent += '<h2>' + item.Pizzaad + '</h2>';
                    PizzalarContent += '<h3>Fiyat: ' + item.Pizzafiyat + ' TL</h3>';
                    PizzalarContent += '</div>';
                    PizzalarContent += '<div class="menu-item-image">';
                    PizzalarContent += '<img src="' + item.Pizzaresim + '" alt="' + item.Pizzaad + '" />';
                    PizzalarContent += '</div>';
                    PizzalarContent += '</div>';
                    PizzalarContent += '<button class="ekleme" data-id="Pizza-' + item.Pizzaid + '" data-isim="' + item.Pizzaad + '" data-fiyat="' + item.Pizzafiyat + '">+</button>';
                    PizzalarContent += '</div>';
                });
                $('#pizzalar').html(PizzalarContent);
            } else {
                alert("Pizza verisi bulunamadı.");
            }
            
            if (data.Tatlilar) {
                var TatlilarContent = '';
                data.Tatlilar.forEach(function (item) {
                    TatlilarContent += '<div id="tatli-' + item.Tatliid + '" class="menu-item">';
                    TatlilarContent += '<div class="menu-item-content">';
                    TatlilarContent += '<div class="menu-item-text">';
                    TatlilarContent += '<h2>' + item.Tatliad + '</h2>';
                    TatlilarContent += '<h3>Fiyat: ' + item.Tatlifiyat + ' TL</h3>';
                    TatlilarContent += '</div>';
                    TatlilarContent += '<div class="menu-item-image">';
                    TatlilarContent += '<img src="' + item.Tatliresim + '" alt="' + item.Tatliad + '" />';
                    TatlilarContent += '</div>';
                    TatlilarContent += '</div>';
                    TatlilarContent += '<button class="ekleme" data-id="Tatli-' + item.Tatliid + '" data-isim="' + item.Tatliad + '" data-fiyat="' + item.Tatlifiyat + '">+</button>';
                    TatlilarContent += '</div>';
                });
                $('#tatlilar').html(TatlilarContent);
            } else {
                alert("Tatlı verisi bulunamadı.");
            }
            
            if (data.Icecekler) {
                var IceceklerContent = '';
                data.Icecekler.forEach(function (item) {
                    IceceklerContent += '<div id="icecek-' + item.Icecekid + '" class="menu-item">';
                    IceceklerContent += '<div class="menu-item-content">';
                    IceceklerContent += '<div class="menu-item-text">';
                    IceceklerContent += '<h2>' + item.Icecekad + '</h2>';
                    IceceklerContent += '<h3>Fiyat: ' + item.Icecekfiyat + ' TL</h3>';
                    IceceklerContent += '</div>';
                    IceceklerContent += '<div class="menu-item-image">';
                    IceceklerContent += '<img src="' + item.Icecekresim + '" alt="' + item.Icecekad + '" />';
                    IceceklerContent += '</div>';
                    IceceklerContent += '</div>';
                    IceceklerContent += '<button class="ekleme" data-id="Icecek-' + item.Icecekid + '" data-isim="' + item.Icecekad + '" data-fiyat="' + item.Icecekfiyat + '">+</button>';
                    IceceklerContent += '</div>';
                });
                $('#icecekler').html(IceceklerContent);
            } else {
                alert("İçecek verisi bulunamadı.");
            }


            if (data.Kahveler) {
                var KahvelerContent = '';
                data.Kahveler.forEach(function (item) {
                    KahvelerContent += '<div id="kahve-' + item.Kahveid + '" class="menu-item">';
                    KahvelerContent += '<div class="menu-item-content">';
                    KahvelerContent += '<div class="menu-item-text">';
                    KahvelerContent += '<h2>' + item.Kahvead + '</h2>';
                    KahvelerContent += '<h3>Fiyat: ' + item.Kahvefiyat + ' TL</h3>';
                    KahvelerContent += '</div>';
                    KahvelerContent += '<div class="menu-item-image">';
                    KahvelerContent += '<img src="' + item.Kahveresim + '" alt="' + item.Kahvead + '" />';
                    KahvelerContent += '</div>';
                    KahvelerContent += '</div>';
                    KahvelerContent += '<button class="ekleme" data-id="Icecek-' + item.Kahveid + '" data-isim="' + item.Kahvead + '" data-fiyat="' + item.Kahvefiyat + '">+</button>';
                    KahvelerContent += '</div>';
                });
                $('#kahveler').html(KahvelerContent);
            } else {
                alert("Kahve verisi bulunamadı.");
            }
            
        },
        error: function (xhr, status, error) {
            console.log("AJAX Hatası: ", status, error);
            alert("Veri yüklenemedi!");
        }
    });
    