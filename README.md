# southpark-api

### How to setup
Install `nodejs` on your laptop. Windows user will also have to install git-bash.

Follow following steps:
```
git clone git@github.com:piyushchauhan2011/southpark-api.git
cd southpark-api
npm install
DEBUG=myapp:* npm run debug
```

### Preferred editor
Visual Studio Code: https://code.visualstudio.com/

Install `Debugger for Chrome Plugin` from `extensions`.

We are using `Sequel Pro` on Mac and `MySQL Workbench` on Windows.

### Database Details

```
CREATE DATABASE southpark;
CREATE USER 'root'@'localhost' IDENTIFIED BY 'root';
GRANT ALL ON southpark.* TO 'root'@'localhost';
FLUSH PRIVILEGES;

CREATE TABLE users (
  id int(11) unsigned NOT NULL AUTO_INCREMENT,
  username varchar(255) DEFAULT NULL,
  password varchar(255) DEFAULT NULL,
  fullName varchar(255) DEFAULT NULL,
  email varchar(255) DEFAULT NULL,
  accessToken varchar(255) DEFAULT NULL,
  picture varchar(255) DEFAULT NULL,
  instagramId varchar(255) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
```

### Sample API routes

1. POST to `http://localhost:3000/auth/signup` with `email` and `password` using postman to signup
2. POST to `http://localhost:3000/auth/login` with `email` and `password` using postman to login
3. GET to `http://localhost:3000/users` with Headers set to `Authorization`: `Bearer <token>` to get all the users from database (Authenticated route)

### Debugging snapshots

![screen shot 2016-07-30 at 7 27 14 am](https://cloud.githubusercontent.com/assets/693487/17263935/27b3c450-5627-11e6-8e58-369f3e30e464.png)

![screen shot 2016-07-30 at 7 26 02 am](https://cloud.githubusercontent.com/assets/693487/17263936/2a3e8642-5627-11e6-8b5a-bcf93ab19f1c.png)