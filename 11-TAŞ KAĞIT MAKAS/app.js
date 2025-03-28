// DOM öğelerini önbelleğe al ve başlangıç değerlerini sıfırla
let kullaniciSkor = 0;
let bilgisayarSkor = 0;

const kullaniciSkor_span = document.getElementById('user-score');
const bilgisayarSkor_span = document.getElementById('computer-score');
const skorTahtasi_div = document.querySelector('.score-board');
const sonuc_div = document.querySelector('.result');
const tas_div = document.getElementById('rock');
const kagit_div = document.getElementById('paper');
const makas_div = document.getElementById('scissors');

// Bilgisayarın seçim yapmasını sağlayan fonksiyon
function bilgisayarSecimi() {
  const secenekler = ['rock', 'paper', 'scissors'];
  const rastgeleSayi = Math.floor(Math.random() * 3);
  return secenekler[rastgeleSayi];
}

// Seçimi baş harfi büyük hale getirerek kullanıcıya göstermek için fonksiyon
function secimiCevir(secim) {
  if (secim === 'paper') return 'Kağıt';
  if (secim === 'scissors') return 'Makas';
  return 'Taş';
}

// Kullanıcının kazandığı senaryo
function kazan(kullanici, bilgisayar) {
  kullaniciSkor++;
  kullaniciSkor_span.innerHTML = kullaniciSkor;

  const kullaniciAdi = ' (Kullanıcı)'.fontsize(3).sup();
  const bilgisayarAdi = ' (Bilgisayar)'.fontsize(3).sup();
  sonuc_div.innerHTML = `<p>${secimiCevir(kullanici)}${kullaniciAdi}, ${secimiCevir(bilgisayar)}${bilgisayarAdi}'ı yendi. Kazandınız!</p>`;

  const turDurumu = document.getElementById(kullanici);
  turDurumu.classList.add('winningStyles');
  setTimeout(() => turDurumu.classList.remove('winningStyles'), 300);
}

// Bilgisayarın kazandığı senaryo
function kaybet(kullanici, bilgisayar) {
  bilgisayarSkor++;
  bilgisayarSkor_span.innerHTML = bilgisayarSkor;

  const kullaniciAdi = ' (Kullanıcı)'.fontsize(3).sup();
  const bilgisayarAdi = ' (Bilgisayar)'.fontsize(3).sup();
  sonuc_div.innerHTML = `<p>${secimiCevir(bilgisayar)}${bilgisayarAdi}, ${secimiCevir(kullanici)}${kullaniciAdi}'ı yendi. Kaybettiniz!</p>`;

  const turDurumu = document.getElementById(kullanici);
  turDurumu.classList.add('losingStyles');
  setTimeout(() => turDurumu.classList.remove('losingStyles'), 300);
}

// Berabere kalma senaryosu
function berabere(kullanici, bilgisayar) {
  const kullaniciAdi = ' (Kullanıcı)'.fontsize(3).sup();
  const bilgisayarAdi = ' (Bilgisayar)'.fontsize(3).sup();
  sonuc_div.innerHTML = `<p>Berabere! İkiniz de ${secimiCevir(kullanici)} seçtiniz.</p>`;

  const turDurumu = document.getElementById(kullanici);
  turDurumu.classList.add('drawStyles');
  setTimeout(() => turDurumu.classList.remove('drawStyles'), 300);
}

// Oyunun mantığını çalıştıran ana fonksiyon
function oyun(kullaniciSecimi) {
  const bilgisayarSecimiSonucu = bilgisayarSecimi();

  switch (kullaniciSecimi + bilgisayarSecimiSonucu) {
    case 'paperrock':
    case 'rockscissors':
    case 'scissorspaper':
      kazan(kullaniciSecimi, bilgisayarSecimiSonucu);
      break;
    case 'rockpaper':
    case 'scissorsrock':
    case 'paperscissors':
      kaybet(kullaniciSecimi, bilgisayarSecimiSonucu);
      break;
    case 'rockrock':
    case 'scissorsscissors':
    case 'paperpaper':
      berabere(kullaniciSecimi, bilgisayarSecimiSonucu);
      break;
  }
}

// Oyun başlatma ve tıklama olaylarını dinleme
function baslat() {
  tas_div.addEventListener('click', () => oyun('rock'));
  kagit_div.addEventListener('click', () => oyun('paper'));
  makas_div.addEventListener('click', () => oyun('scissors'));
}

baslat();
