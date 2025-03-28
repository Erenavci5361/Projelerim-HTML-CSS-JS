// EmailJS ile e-posta göndermek için public key'i başlat
emailjs.init("FzLtsN9onE3YY_rSW"); // EmailJS Public Key'i buraya ekleyin

const sendBtn = document.querySelector('.send-btn');
const result = document.querySelector('.result');

sendBtn.addEventListener('click', sendEmail);

function sendEmail() {
    // Form verilerini al
    const to = document.getElementById("to").value; // Formdan alınan alıcı e-posta adresi
    const subject = document.getElementById("subject").value; // Formdan alınan konu
    const message = document.getElementById("message").value; // Formdan alınan mesaj içeriği

    // EmailJS ile e-posta gönder
    emailjs.send("service_iszcwnf", "template_ko4hnwf", {
        to_email: to,       // Formdan alınan alıcı e-posta adresi
        subject: subject,   // Formdan alınan konu
        message: message    // Formdan alınan mesaj içeriği
    })
    .then(function (response) {
        // Başarılı geri dönüş
        result.innerHTML = "Email başarıyla gönderildi!";
        result.style.opacity = 1;
        console.log("Email gönderimi başarılı:", response.status, response.text);
    }, function (error) {
        // Hata durumunda geri dönüş
        result.innerHTML = `Email gönderimi başarısız oldu! Hata: ${error.text}`;
        result.style.opacity = 1;
        console.error("Email gönderimi hatası:", error);
    });
}


