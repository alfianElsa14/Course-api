# Basic Express

Basic express.js project with basic routes:
* Express
* Joi
* sequelize
* mySql
* nodemailer

---

## URL

_Server_
```
http://localhost:3000
```
---

### DOTENV CONFIGURATION
```
JWT_SECRET_KEY = "rahasia"
EMAIL_ADMIN = "alfianelsa14@gmail.com"
PASSWORD_ADMIN = "yazm eoue qpmy wrnl"
```

---
## Global Response

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---


## RESTful endpoints


### POST /users/register

> Register users

_Request Header_
```
not needed
```

_Request Body_
```
{
  "username" : <username>,
  "email" : <email>,
  "password" : <password>,
}
```

_Response (201)_
```
{
    "message": "success",
    "result": {
        "id": 4,
        "username": "minga",
        "email": "minga@gmail.com",
        "password": "$2a$10$8eIHMS2n51biTFZNKYcTfukuAIg.UEo2BfobTCEdfrCdErr1I2TWC",
        "updatedAt": "2023-11-17T06:19:08.913Z",
        "createdAt": "2023-11-17T06:19:08.913Z",
        "role": "user"
    }
}
```
_Response (400)_
```
{
    "status": "Error",
    "message": "Email sudah terdaftar, coba ganti dengan nama lain"
}
```
```
{
    "status": "Validation Failed",
    "message": "\"email\" is not allowed to be empty"
}
```

---

### POST /users/login

 > Login users

_Request Params_

```
not needed

```

_Request Header_

```
not needed
```

_Request Body_
```
{
  "email" : <email>,
  "password" : <password>,
}
```

_Response (201)_
```
{
    "userEmail": "minga@gmail.com",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJtaW5nYUBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTcwMDIwMzY5NH0.bwt1dMYi3MgavhVL-DfCuJHMcOfd71MjlSvIr-eQen8"
}
```
_Response (400)_
```
{
    "status": "Validation Failed",
    "message": "\"email\" is not allowed to be empty"
}
```

_Response (404)_
```
{
    "status": "Error",
    "message": "User tidak ditemukan"
}
```

---

### GET /users

 > Get all user

_Request Params_

```
not needed
```

_Request Header_

```
Authorization: Bearer <jwt.token>
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
    {
        "id": 1,
        "username": "laka",
        "email": "laka@gmail.com",
        "password": "$2a$10$woeTZTOikcOND18JfsOIien3l7pDr6tzcFvAUAVAAyMAyRVCimz6K",
        "role": "user",
        "createdAt": "2023-11-16T08:49:57.000Z",
        "updatedAt": "2023-11-17T03:48:43.000Z"
    },
    {
        "id": 2,
        "username": "huwa",
        "email": "huwa@gmail.com",
        "password": "$2a$10$9RkBTtgtivLnk2VaYWMDm.18dyJtkuK.x/yNdt1EZaO.yp8NGGqay",
        "role": "user",
        "createdAt": "2023-11-16T08:49:57.000Z",
        "updatedAt": "2023-11-16T08:49:57.000Z"
    },
    {
        "id": 3,
        "username": "kuwait",
        "email": "kuwait@gmail.com",
        "password": "$2a$10$Hz/CkqZChHWd7zcERWfFyOTl0O5wVsRmTGaAWVy/Q1L/MdhpjeWVm",
        "role": "user",
        "createdAt": "2023-11-16T09:26:37.000Z",
        "updatedAt": "2023-11-16T09:26:37.000Z"
    },
    {
        "id": 4,
        "username": "minga",
        "email": "minga@gmail.com",
        "password": "$2a$10$8eIHMS2n51biTFZNKYcTfukuAIg.UEo2BfobTCEdfrCdErr1I2TWC",
        "role": "user",
        "createdAt": "2023-11-17T06:19:08.000Z",
        "updatedAt": "2023-11-17T06:19:08.000Z"
    }
]
```

_Response (403)_
```
{
    "message": "Invalid Token"
}
```

---

### PUT /users/changePassword

> Edit user password

_Request Params_

```
not needed
```

_Request Header_
```
Authorization: Bearer <jwt.token>
```

_Request Body_
```
{
    oldPassword = "<oldPassword>"
    newPassword = "<newPassword>"
}
```

_Response (200)_
```
{
    "message": "Password berhasil diubah"
}
```

_Response (401 - Validation Error)_
```
{
    "message": "Password lama tidak valid"
}
```
_Response (403)_
```
{
    "message": "Invalid Token"
}
```

---


### POST /admins/register

 > Register admins

_Request Header_

```
not needed
```

_Request Body_
```
{
  "username" : <username>,
  "email" : <email>,
  "password" : <password>,
}
```

_Response (201)_
```
{
    "message": "success",
    "result": {
        "id": 4,
        "username": "migrena",
        "email": "migrena@gmail.com",
        "password": "$2a$10$ZA9b.Nx1ds5QuwCvytylKuTSfX2cMBKyA7eCyinyjdYoovTSRkQXm",
        "updatedAt": "2023-11-17T07:28:58.153Z",
        "createdAt": "2023-11-17T07:28:58.153Z",
        "role": "admin"
    }
}
```
_Response (400)_
```
{
    "status": "Error",
    "message": "Email sudah terdaftar, coba ganti dengan nama lain"
}
```
```
{
    "status": "Validation Failed",
    "message": "\"email\" is not allowed to be empty"
}
```

---
### POST /admins/login

> Login admin

_Request Params_

```
not needed

```

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email" : <email>,
  "password" : <password>,
}
```

_Response (201)_
```
{
    "adminEmail": "migren@gmail.com",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJtaWdyZW5AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzAwMjAyMzc1fQ.ZM7C3wj4O9707GuwXexaFfC0BgkvgUmLMZvVWu77OMw"
}
```

```
{
    "username": "uya",
    "gender": "pria",
    "totalPokemon": 0
}
```

_Response (400)_
```
{
    "status": "Validation Failed",
    "message": "\"email\" is not allowed to be empty"
}
```

_Response (404)_
```
{
    "status": "Error",
    "message": "Admin tidak ditemukan"
}
```

---

### GET /admins

> Get all admins

_Request Header_
```
Authorization: Bearer <jwt.token>
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
    {
        "id": 1,
        "username": "alfian",
        "email": "alfianelsaarief@gmail.com",
        "password": "$2a$10$J0hcU6DxLHntpB0W6femQeCPFSIK4RLH7GcnYCVE8qYLqNgcQXLhC",
        "role": "admin",
        "Courses": [
            {
                "id": 1,
                "title": "javascript",
                "description": "JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apach",
                "category": "backend",
                "adminId": 1,
                "createdAt": "2023-11-16T08:49:57.000Z",
                "updatedAt": "2023-11-16T08:49:57.000Z"
            },
            {
                "id": 3,
                "title": "HTML ",
                "description": "Hypertext Markup Language (HTML) adalah bahasa markah standar untuk dokumen yang dirancang untuk ditampilkan di peramban internet. Ini dapat dibantu oleh teknologi seperti Cascading Style Sheets (CSS) dan bahasa skrip lainnya seperti JavaScript, VBScript,",
                "category": "frontend",
                "adminId": 1,
                "createdAt": "2023-11-16T08:49:57.000Z",
                "updatedAt": "2023-11-17T06:03:11.000Z"
            },
            {
                "id": 8,
                "title": "React js",
                "description": "reactJS atau React adalah library JavaScript populer buatan Facebook yang digunakan dalam proses pengembangan aplikasi mobile dan web. React berisi kumpulan snippet kode JavaScript (disebut ‘komponen’) yang bisa digunakan berulang kali untuk mendesain ant",
                "category": "frontend",
                "adminId": 1,
                "createdAt": "2023-11-17T06:23:24.000Z",
                "updatedAt": "2023-11-17T06:23:24.000Z"
            },
            {
                "id": 9,
                "title": "Express js",
                "description": "Express.js sering disebut sebagai kerangka kerja (framework) untuk Node.js. Dalam konteks pengembangan software, framework adalah kumpulan kode untuk memberikan fungsionalitas dasar yang siap digunakan, sehingga developer tidak perlu menulis kode dasar da",
                "category": "backend",
                "adminId": 1,
                "createdAt": "2023-11-17T06:24:33.000Z",
                "updatedAt": "2023-11-17T06:24:33.000Z"
            },
            {
                "id": 10,
                "title": "Sequelize",
                "description": "Sequelize adalah Node.js promise-based ORM untuk MySQL, PostgreSQL, SQLite, MSSQL dan database SQL lainnya. Sequelize berfungsi untuk bekerja dengan database dan relasi-relasi di dalamnya.",
                "category": "backend",
                "adminId": 1,
                "createdAt": "2023-11-17T06:25:38.000Z",
                "updatedAt": "2023-11-17T06:25:38.000Z"
            }
        ]
    },
    {
        "id": 2,
        "username": "uya",
        "email": "uya@gmail.com",
        "password": "$2a$10$VwVyCwf31YMp2sEbwWytROSKTtpYzKRZNFbqfUgQSup85i31ah6uC",
        "role": "admin",
        "Courses": [
            {
                "id": 2,
                "title": "CSS",
                "description": "CSS is the language we use to style an HTML document.",
                "category": "frontend",
                "adminId": 2,
                "createdAt": "2023-11-16T08:49:57.000Z",
                "updatedAt": "2023-11-16T08:49:57.000Z"
            }
        ]
    },
    {
        "id": 3,
        "username": "migren",
        "email": "migren@gmail.com",
        "password": "$2a$10$ULC8Tve0tcSjUEoTDB8N6eaplr5aT588OsAO0.7UcE2WBFdDMuasu",
        "role": "admin",
        "Courses": [
            {
                "id": 11,
                "title": "Tailwind CSS",
                "description": " framework CSS yang didesain untuk mempermudah dan mempercepat pembuatan aplikasi menggunakan desain custom.",
                "category": "frontend",
                "adminId": 3,
                "createdAt": "2023-11-17T06:28:10.000Z",
                "updatedAt": "2023-11-17T06:28:10.000Z"
            },
            {
                "id": 12,
                "title": "Redis",
                "description": "Redis, yang merupakan singkatan dari Remote Dictionary Server, adalah penyimpanan data nilai-kunci, sumber terbuka, dan dalam memori yang cepat. Proyek ini dimulai ketika Salvatore Sanfilippo, yang merupakan developer awal Redis, mencoba meningkatkan skal",
                "category": "backend",
                "adminId": 3,
                "createdAt": "2023-11-17T06:30:03.000Z",
                "updatedAt": "2023-11-17T06:30:03.000Z"
            }
        ]
    },
    {
        "id": 4,
        "username": "migrena",
        "email": "migrena@gmail.com",
        "password": "$2a$10$ZA9b.Nx1ds5QuwCvytylKuTSfX2cMBKyA7eCyinyjdYoovTSRkQXm",
        "role": "admin",
        "Courses": []
    }
]
```

_Response (403)_
```
{
    "message": "Invalid Token"
}
```
```
{
    "message": "akses tidak di izinkan"
}
```

---

### GET /admins/:id

> Get admin by id

_Request Params_

```
/<admin_id>/

```

_Request Header_
```
Authorization: Bearer <jwt.token>
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "id": 1,
    "username": "alfian",
    "email": "alfianelsaarief@gmail.com",
    "password": "$2a$10$J0hcU6DxLHntpB0W6femQeCPFSIK4RLH7GcnYCVE8qYLqNgcQXLhC",
    "role": "admin",
    "createdAt": "2023-11-16T08:49:57.000Z",
    "updatedAt": "2023-11-16T08:49:57.000Z",
    "Courses": [
        {
            "id": 1,
            "title": "HTML ",
            "description": "Hypertext Markup Language (HTML) adalah bahasa markah standar untuk dokumen yang dirancang untuk ditampilkan di peramban internet. Ini dapat dibantu oleh teknologi seperti Cascading Style Sheets (CSS) dan bahasa skrip lainnya seperti JavaScript, VBScript,",
            "category": "frontend",
            "adminId": 1
        },
        {
            "id": 3,
            "title": "HTML 1",
            "description": "Hypertext Markup Language (HTML) adalah bahasa markah standar untuk dokumen yang dirancang untuk ditampilkan di peramban internet. Ini dapat dibantu oleh teknologi seperti Cascading Style Sheets (CSS) dan bahasa skrip lainnya seperti JavaScript, VBScript,",
            "category": "frontend",
            "adminId": 1
        },
        {
            "id": 8,
            "title": "React js",
            "description": "reactJS atau React adalah library JavaScript populer buatan Facebook yang digunakan dalam proses pengembangan aplikasi mobile dan web. React berisi kumpulan snippet kode JavaScript (disebut ‘komponen’) yang bisa digunakan berulang kali untuk mendesain ant",
            "category": "frontend",
            "adminId": 1
        },
        {
            "id": 9,
            "title": "Express js",
            "description": "Express.js sering disebut sebagai kerangka kerja (framework) untuk Node.js. Dalam konteks pengembangan software, framework adalah kumpulan kode untuk memberikan fungsionalitas dasar yang siap digunakan, sehingga developer tidak perlu menulis kode dasar da",
            "category": "backend",
            "adminId": 1
        },
        {
            "id": 10,
            "title": "Sequelize",
            "description": "Sequelize adalah Node.js promise-based ORM untuk MySQL, PostgreSQL, SQLite, MSSQL dan database SQL lainnya. Sequelize berfungsi untuk bekerja dengan database dan relasi-relasi di dalamnya.",
            "category": "backend",
            "adminId": 1
        }
    ]
}
```
_Response (404)_
```
{
    "status": "Error",
    "message": "Admin tidak ditemukan"
}
```
_Response (403)_
```
{
    "message": "Invalid Token"
}
```
```
{
    "message": "akses tidak di izinkan"
}
```
---

### GET /courses

> Get all courses

_Request Params_
```
not needed
```

_Request Header_
```
Authorization: Bearer <jwt.token>
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
    {
        "id": 1,
        "title": "javascript",
        "description": "JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apach",
        "category": "backend",
        "adminId": 1,
        "createdAt": "2023-11-16T08:49:57.000Z",
        "updatedAt": "2023-11-16T08:49:57.000Z"
    },
    {
        "id": 2,
        "title": "CSS",
        "description": "CSS is the language we use to style an HTML document.",
        "category": "frontend",
        "adminId": 2,
        "createdAt": "2023-11-16T08:49:57.000Z",
        "updatedAt": "2023-11-16T08:49:57.000Z"
    },
    {
        "id": 3,
        "title": "HTML ",
        "description": "Hypertext Markup Language (HTML) adalah bahasa markah standar untuk dokumen yang dirancang untuk ditampilkan di peramban internet. Ini dapat dibantu oleh teknologi seperti Cascading Style Sheets (CSS) dan bahasa skrip lainnya seperti JavaScript, VBScript,",
        "category": "frontend",
        "adminId": 1,
        "createdAt": "2023-11-16T08:49:57.000Z",
        "updatedAt": "2023-11-17T06:03:11.000Z"
    },
    {
        "id": 8,
        "title": "React js",
        "description": "reactJS atau React adalah library JavaScript populer buatan Facebook yang digunakan dalam proses pengembangan aplikasi mobile dan web. React berisi kumpulan snippet kode JavaScript (disebut ‘komponen’) yang bisa digunakan berulang kali untuk mendesain ant",
        "category": "frontend",
        "adminId": 1,
        "createdAt": "2023-11-17T06:23:24.000Z",
        "updatedAt": "2023-11-17T06:23:24.000Z"
    },
    {
        "id": 9,
        "title": "Express js",
        "description": "Express.js sering disebut sebagai kerangka kerja (framework) untuk Node.js. Dalam konteks pengembangan software, framework adalah kumpulan kode untuk memberikan fungsionalitas dasar yang siap digunakan, sehingga developer tidak perlu menulis kode dasar da",
        "category": "backend",
        "adminId": 1,
        "createdAt": "2023-11-17T06:24:33.000Z",
        "updatedAt": "2023-11-17T06:24:33.000Z"
    },
    {
        "id": 10,
        "title": "Sequelize",
        "description": "Sequelize adalah Node.js promise-based ORM untuk MySQL, PostgreSQL, SQLite, MSSQL dan database SQL lainnya. Sequelize berfungsi untuk bekerja dengan database dan relasi-relasi di dalamnya.",
        "category": "backend",
        "adminId": 1,
        "createdAt": "2023-11-17T06:25:38.000Z",
        "updatedAt": "2023-11-17T06:25:38.000Z"
    },
    {
        "id": 11,
        "title": "Tailwind CSS",
        "description": " framework CSS yang didesain untuk mempermudah dan mempercepat pembuatan aplikasi menggunakan desain custom.",
        "category": "frontend",
        "adminId": 3,
        "createdAt": "2023-11-17T06:28:10.000Z",
        "updatedAt": "2023-11-17T06:28:10.000Z"
    },
    {
        "id": 12,
        "title": "Redis",
        "description": "Redis, yang merupakan singkatan dari Remote Dictionary Server, adalah penyimpanan data nilai-kunci, sumber terbuka, dan dalam memori yang cepat. Proyek ini dimulai ketika Salvatore Sanfilippo, yang merupakan developer awal Redis, mencoba meningkatkan skal",
        "category": "backend",
        "adminId": 3,
        "createdAt": "2023-11-17T06:30:03.000Z",
        "updatedAt": "2023-11-17T06:30:03.000Z"
    }
]
```

_Response (403)_
```
{
    "message": "Invalid Token"
}
```
---

### GET /courses/category

> Get courses by Category

_Request Params_

```
/<category>/

```

_Request Header_
```
Authorization: Bearer <jwt.token>
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "totalCourse": 4,
    "coursesData": [
        {
            "id": 1,
            "title": "javascript",
            "description": "JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apach",
            "category": "backend",
            "adminId": 1,
            "createdAt": "2023-11-16T08:49:57.000Z",
            "updatedAt": "2023-11-16T08:49:57.000Z"
        },
        {
            "id": 9,
            "title": "Express js",
            "description": "Express.js sering disebut sebagai kerangka kerja (framework) untuk Node.js. Dalam konteks pengembangan software, framework adalah kumpulan kode untuk memberikan fungsionalitas dasar yang siap digunakan, sehingga developer tidak perlu menulis kode dasar da",
            "category": "backend",
            "adminId": 1,
            "createdAt": "2023-11-17T06:24:33.000Z",
            "updatedAt": "2023-11-17T06:24:33.000Z"
        },
        {
            "id": 10,
            "title": "Sequelize",
            "description": "Sequelize adalah Node.js promise-based ORM untuk MySQL, PostgreSQL, SQLite, MSSQL dan database SQL lainnya. Sequelize berfungsi untuk bekerja dengan database dan relasi-relasi di dalamnya.",
            "category": "backend",
            "adminId": 1,
            "createdAt": "2023-11-17T06:25:38.000Z",
            "updatedAt": "2023-11-17T06:25:38.000Z"
        },
        {
            "id": 12,
            "title": "Redis",
            "description": "Redis, yang merupakan singkatan dari Remote Dictionary Server, adalah penyimpanan data nilai-kunci, sumber terbuka, dan dalam memori yang cepat. Proyek ini dimulai ketika Salvatore Sanfilippo, yang merupakan developer awal Redis, mencoba meningkatkan skal",
            "category": "backend",
            "adminId": 3,
            "createdAt": "2023-11-17T06:30:03.000Z",
            "updatedAt": "2023-11-17T06:30:03.000Z"
        }
    ]
}
```

_Response (404)_
```
{
    "status": "Error",
    "message": "Category tidak ditemukan"
}
```

_Response (403)_
```
{
    "message": "Invalid Token"
}
```
---

### GET /courses/:id

> Get course by id

_Request Params_

```
/<course_id>/

```

_Request Header_
```
Authorization: Bearer <jwt.token>
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "id": 1,
    "title": "javascript",
    "description": "JavaScript (JS) is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apach",
    "category": "backend",
    "adminId": 1,
    "createdAt": "2023-11-16T08:49:57.000Z",
    "updatedAt": "2023-11-16T08:49:57.000Z",
    "Admin": {
        "username": "alfian"
    }
}
```
_Response (404)_
```
{
    "status": "Error",
    "message": "Course tidak ditemukan"
}
```
_Response (403)_
```
{
    "message": "Invalid Token"
}
```
---

### POST /courses/addCourse

> Add Course data

_Request Params_

```
not needed

```

_Request Header_
```
Authorization: Bearer <jwt.token>
```

_Request Body_
```
{
  "title" : "<title>"",
  "description" : "<description>",
  "category" : "<category>",
}
```

_Response (201)_
```
{
    "message": "sukses menambahkan course",
    "result": {
        "id": 12,
        "title": "Redis",
        "description": "Redis, yang merupakan singkatan dari Remote Dictionary Server, adalah penyimpanan data nilai-kunci, sumber terbuka, dan dalam memori yang cepat. Proyek ini dimulai ketika Salvatore Sanfilippo, yang merupakan developer awal Redis, mencoba meningkatkan skalabilitas perusahaan rintisan Italia miliknya. Dari sana, ia mengembangkan Redis, yang sekarang digunakan sebagai basis data, cache, broker pesan, dan antrean.",
        "category": "backend",
        "adminId": 3,
        "updatedAt": "2023-11-17T06:30:03.686Z",
        "createdAt": "2023-11-17T06:30:03.686Z"
    }
}
```
_Response (400)_
```
{
    "status": "Validation Failed",
    "message": "\"title\" is not allowed to be empty"
}
```
```
{
    "status": "Error",
    "message": "Course dengan title ini sudah di buat sebelumnya"
}
```

_Response (403)_
```
{
    "message": "Invalid Token"
}
```
```
{
    "message": "akses tidak di izinkan"
}
```
---

### PUT /courses/editCourse/:id

> Edit Course data by id

_Request Params_

```
<course_id>

```

_Request Header_
```
Authorization: Bearer <jwt.token>
```

_Request Body_
```
{
  "title" : "<title>"",
  "description" : "<description>",
  "category" : "<category>",
}
```

_Response (200)_
```
{
    "message": "Course berhasil di ubah",
    "newCourse": {
        "title": "HTML 1",
        "description": "Hypertext Markup Language (HTML) adalah bahasa markah standar untuk dokumen yang dirancang untuk ditampilkan di peramban internet. Ini dapat dibantu oleh teknologi seperti Cascading Style Sheets (CSS) dan bahasa skrip lainnya seperti JavaScript, VBScript, dan PHP.",
        "category": "frontend"
    }
}
```
_Response (400)_
```
{
    "status": "Validation Failed",
    "message": "\"title\" is not allowed to be empty"
}
```
```
{
    "status": "Error",
    "message": "Course dengan title ini sudah di buat sebelumnya"
}
```
_Response (403)_
```
{
    "message": "Invalid Token"
}
```
```
{
    "message": "akses tidak di izinkan"
}
```
_Response (404)_
```
{
    "status": "Error",
    "message": "Course tidak ditemukan"
}
```
---

### DELETE /courses/deleteCourse/:id

> Delete Course by id

_Request Params_

```
<course_id>

```

_Request Header_
```
Authorization: Bearer <jwt.token>
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "message": "Course telah di hapus",
    "courseData": {
        "id": 14,
        "title": "Redis",
        "description": "Redis, yang merupakan singkatan dari Remote Dictionary Server, adalah penyimpanan data nilai-kunci, sumber terbuka, dan dalam memori yang cepat. Proyek ini dimulai ketika Salvatore Sanfilippo, yang merupakan developer awal Redis, mencoba meningkatkan skal",
        "category": "backend",
        "adminId": 3,
        "createdAt": "2023-11-17T07:58:08.000Z",
        "updatedAt": "2023-11-17T07:58:08.000Z"
    }
}
```
_Response (403)_
```
{
    "message": "Invalid Token"
}
```
```
{
    "message": "akses tidak di izinkan"
}
```
_Response (404)_
```
{
    "status": "Error",
    "message": "Course tidak ditemukan"
}
```
---

