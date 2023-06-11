

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

function windowOnClick(event) {
    if (event.target === modal || event.target === document.body) {
      event.preventDefault();
      if (confirm("Emin misiniz?")) {
        toggleModal();
      }
    }
  }
  
  

  function preventDefaultSubmit(event) {
    event.preventDefault();
    if (confirm("Emin misiniz?")) {
      toggleModal();
    } else {
      // Kapatma işlemi gerçekleştirme
    }
  }
  
trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
giveup.addEventListener("click", preventDefaultSubmit);
//window.addEventListener("click", windowOnClick);  Body'ye tıklandıgında pop-up'ı



const savebutton = document.querySelector(".save");

savebutton.addEventListener("click",function(e){
    ekleKayit();

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
  
    if (social === "" || name === "" || explanation === "") {
      alert("Lütfen boş bırakmayınız!");
      return;
    }
  
    var kayit = {
      social: social,
      name: name,
      explanation: explanation
    };
  
    addKayitRow(kayit);
    saveKayitData(kayit);
  
    // Input alanlarını temizle
    document.getElementById("social").value = "";
    document.getElementById("name").value = "";
    document.getElementById("explanation").value = "";
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
  