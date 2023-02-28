# Login & Register Menggunakan JWT

## Setup Server

    - cd backend : npm init
    - npm intsall express mysql2 sequelize jsonwebtoken dotenv bcrypt cookie-parser cors
    - config.json :
        tambahkan baris berikut  "type": "module", dibawah "main":"index"

        contoh :
            "main": "index.js",
            "type": "module",
    - index.js
    - install nodemon secara global untuk menjalankan server: npm install -g nodemon
    - jalankan server : nodemon index

    - jalankan xampp : sudo /opt/lampp/lampp start
        #handle mysql error:
        - sudo service mysql status
        - sudo service mysql stop
        - sudo service mysql start
        Jika sudah,maka silahkan kalian running mysql database yang ada di xampp nya.
        - buat database dengan nama auth_db
        - buat file config/Database.js
        - lalu panggil di dalam file index

## Generate Tabel users pada database dengan Schema

    - backend/models/UserModel.js
        buat schema users
    - index.js
        import dan panggil UserModels.js , setelah digunakan matikan kembali
        setelah berhasil mengenerate users tabel di setiap kali servernya direstart
