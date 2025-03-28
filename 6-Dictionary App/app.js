const url = "https://api.dictionaryapi.dev/api/v2/entries/en/"; //API aldığımız adres
const result = document.getElementById("result"); //result: Arama sonucunun gösterileceği HTML öğesini seçiyor.
const sound = document.getElementById("sound");//sound: Ses dosyasını içeren <audio> etiketini seçiyor.
const btn = document.getElementById("search-btn");//btn: Arama butonunu seçiyor.
btn.addEventListener("click", () => {//Butona tıklandığında aşağadaki kodlar çalışır
    let inpWord = document.getElementById("inp-word").value;//inpWord: Kullanıcının giriş kutusuna yazdığı kelimeyi alıyor.
    fetch(`${url}${inpWord}`)//fetch API istek atıyor url ile de kullanıcının girdiği kelime birleşip apı dan bilgi alıyoruz
        .then((response) => response.json())//API'den gelen JSON veriyi okunabilir hale getiriyoruz.
        .then((data) => {//data adlı değişkende API’den dönen bilgiler tutuluyor.
            console.log(data);//Geliştirme sürecinde hata ayıklamak için gelen veriyi tarayıcı konsoluna yazdırıyoruz.
            result.innerHTML = `
            <div class="word">
                    <h3>${inpWord}</h3>
                    <button onclick="playSound()">
                        <i class="fas fa-volume-up"></i>
                    </button>
                </div>
                <div class="details">
                    <p>${data[0].meanings[0].partOfSpeech}</p>
                    <p>/${data[0].phonetic}/</p>
                </div>
                <p class="word-meaning">
                   ${data[0].meanings[0].definitions[0].definition}
                </p>
                <p class="word-example">
                    ${data[0].meanings[0].definitions[0].example || ""}
                </p>`;
            sound.setAttribute("src", `https:${data[0].phonetics[0].audio}`);//Ses dosyasının URL'si alınarak <audio> etiketine ekleniyor.
        })
        .catch(() => {
            result.innerHTML = `<h3 class="error">Böyle Bir Kelime Yok</h3>`;//Eğer API isteği başarısız olursa veya kelime bulunamazsa, ekrana hata mesajı yazdırılıyor.
        });
});
function playSound() {
    sound.play();
}