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

## Setup endpoint dan send request menggunakan REST client

    - backend/controllers/User.js
        mengambil seluruh data user yang tersimpan dalam database menggunakan Sequelize ORM.
    - backend/routes/index.js
        mendefinisikan sebuah router untuk meng-handle HTTP GET request pada endpoint '/users'.
    - index.js
        - agar kita dapat menerima data dalam format json
        - middleware
    - pada Vscode install REST Client
        - buat file didalam backend/request.test
        - didalamnya paggil method GET http://localhost:5000/users
            dan klik tesk Send Request, maka akan ada status 200 ok

## Function untuk register

    - backend/controllers/User.js
        - membuat function Register
    - backend/routes/index.js
        - pasang route register dengan method post
    - backend/request.test
        - POST http://localhost:5000/users
        - pasang Content-Type: application/json
    - pengujian pada file request.test
        - klik Send Request pada POST
        - jika success akan ada response: "msg": "Register Success"
        - jika gagal : "message": "Password not match"
