// DOM öğelerine referans al
const body = document.querySelector("body"),
  hourHand = document.querySelector(".hour"),
  minuteHand = document.querySelector(".minute"),
  secondHand = document.querySelector(".second"),
  modeSwitch = document.querySelector(".mode-switch");

// Eğer mod zaten "Karanlık Mod" olarak localStorage'da kayıtlıysa kontrol et
if (localStorage.getItem("mode") === "Dark Mode") {
  // body öğesine "dark" sınıfını ekle ve modeSwitch metnini "Aydınlık Mod" olarak ayarla
  body.classList.add("dark");
  modeSwitch.textContent = "Light Mode";
}

// modeSwitch butonuna tıklama olayı ekle
modeSwitch.addEventListener("click", () => {
  // body öğesi üzerindeki "dark" sınıfını aç/kapat (toggle)
  body.classList.toggle("dark");

  // body öğesinin şu an "dark" sınıfı içerip içermediğini kontrol et
  const isDarkMode = body.classList.contains("dark");

  // modeSwitch butonunun metnini "dark" sınıfının varlığına göre değiştir
  modeSwitch.textContent = isDarkMode ? "Light Mode" : "Dark Mode";

  // localStorage'da "mode" anahtarını "dark" sınıfının durumuna göre güncelle
  localStorage.setItem("mode", isDarkMode ? "Dark Mode" : "Light Mode");
});

const updateTime = () => {
  // Güncel zamanı al ve saat ibreleri için açıyı hesapla
  let date = new Date(),
    secToDeg = (date.getSeconds() / 60) * 360, // Saniye ibresi için derece hesapla
    minToDeg = (date.getMinutes() / 60) * 360, // Dakika ibresi için derece hesapla
    hrToDeg = (date.getHours() / 12) * 360; // Saat ibresi için derece hesapla

  // Saat ibrelerini mevcut zamana göre döndür
  secondHand.style.transform = `rotate(${secToDeg}deg)`;
  minuteHand.style.transform = `rotate(${minToDeg}deg)`;
  hourHand.style.transform = `rotate(${hrToDeg}deg)`;
};

// updateTime fonksiyonunu her saniyede bir çağırarak saati güncelle
setInterval(updateTime, 1000);

// Sayfa yüklendiğinde updateTime fonksiyonunu çağırarak saati ayarla
updateTime();
