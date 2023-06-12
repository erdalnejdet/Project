
  

$('.mobile-menu-burger-container').click(function () {
  $(this).toggleClass('burger-active');
  $('body').toggleClass('scroll-disabled');
  $('.mobile-header-menu').toggleClass('mobile-header-menu-active');

  $('.mobile-header-menu ul').find('ul').slideUp();
});

var modal = document.querySelector(".form");
var trigger = document.querySelector(".trigger");
var closeButton = document.querySelector(".close");
var giveup = document.querySelector(".give-up");

function toggleModal() {
  modal.classList.toggle("show-modal");
}

function preventDefaultSubmit(event) {
  event.preventDefault();
  if (confirm("Emin misiniz?")) {
    toggleModal();
  } else {
    
  }
}
// pop-up vazgeç butonuna tıklandıgında emin misin yazısı cıkıyor sonra  evet derse kapatıyor

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
giveup.addEventListener("click", preventDefaultSubmit);
//window.addEventListener("click", windowOnClick);  Body'ye tıklandıgında pop-up'ı



const savebutton = document.querySelector(".save");

savebutton.addEventListener("click",function(e){
  ekleKayit();

  //butona tıkaldıgında ekle kayit fonksiyonunu cağırıyor


});

// Sayfa yüklendiğinde kaydedilmiş verileri yükle
window.onload = function() {
  loadSavedData();
};

// Kaydedilmiş verileri yükle
function loadSavedData() {
  var savedData = localStorage.getItem("kayitlar");
  if (savedData) {
    var kayitlar = JSON.parse(savedData);
    for (var i = 0; i < kayitlar.length; i++) {
      addKayitRow(kayitlar[i]);
    }
  }
}

// Yeni kayıt ekle
function ekleKayit() {
  event.preventDefault();
  var social = document.getElementById("social").value;
  var name = document.getElementById("name").value;
  var explanation = document.getElementById("explanation").value;
  //burada kayıt eklendikten sonra inputları temizledik

  if (social === "" || name === "" || explanation === "") {
    alert("Lütfen boş bırakmayınız!");
    return;
  }
    //burada kayıt eklerken alanları boş bırakılmasını kontrol ettik

  var kayit = {
    social: social,
    name: name,
    explanation: explanation
      //burada nesne oluşturduk
  };



  if (kayitVarMi(kayit)) {
    alert("Bu kayıt zaten mevcut!");
    document.getElementById("social").value = "";
    document.getElementById("name").value = "";
    document.getElementById("explanation").value = "";
    return;
  }
    //burada kayıt eklendikten  sonra aynı kayıt eklenemiyor kullanıcı adı kişiye özel oldugu için böyle bir kontrol yaptım

  addKayitRow(kayit);
  saveKayitData(kayit);

  // Input alanlarını temizle
  document.getElementById("social").value = "";
  document.getElementById("name").value = "";
  document.getElementById("explanation").value = "";

  alert("Kayıt başarıyla eklendi!");
}

// Kayıtları kontrol et
function kayitVarMi(kayit) {
var savedData = localStorage.getItem("kayitlar");
if (savedData) {
  var kayitlar = JSON.parse(savedData);
  for (var i = 0; i < kayitlar.length; i++) {
    if (
      kayitlar[i].social === kayit.social &&
      kayitlar[i].name === kayit.name &&
      kayitlar[i].explanation === kayit.explanation
    )
    {
      return true;
    }
  }
}
return false;
}

// Yeni kayıt satırını tabloya ekle
function addKayitRow(kayit) {
  var table = $('#case').DataTable();
  table.row.add([kayit.social, kayit.name, kayit.explanation]).draw();  
}

// Kayıt verilerini yerel depolamaya kaydet
function saveKayitData(kayit) {
  var savedData = localStorage.getItem("kayitlar");
  var kayitlar = [];

  if (savedData) {
    kayitlar = JSON.parse(savedData);
  }

  kayitlar.push(kayit);
  localStorage.setItem("kayitlar", JSON.stringify(kayitlar));
}

