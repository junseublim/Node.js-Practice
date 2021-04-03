# Node.js, Express.js 학습

## Routing

Routing이란 각 엔드포인트에 대한 request에 대해 어떻게 응답할 것인지를 의미한다.
Express 객체인 app은 각 HTTP request method에 대해 매칭할 수 있는 메소드들을 가지고 있다.

```js
app.METHOD(PATH, HANDLER)
```
- METHOD: HTTP Method. get, post, put, delete 등이 있다.
    - all은 모든 http method에 대해 매칭하는 Method다.
- PATH: Request를 받는 path를 의미한다.
- Handler: 이 리퀘스트가 들어오면 실행할 함수를 의미한다. Handler는 3개의 매개변수를 받는다. 
    - req : request 객체
    - res : response 객체
    - next : 다음 콜백 함수로 넘어가기 위해 호출하는 함수이다.

### Route Parameters    

Route parameter는 req.params에 키와 값의 형태로 존재한다. Path를 설정할때는 :key의 형태로 설정한다.
예를 들어 path를 "/users/:userId/books/:bookId" 로 설정하고 http://localhost:3000/users/34/books/8989로의 request가 들어온다면 req.params는 { "userId": "34", "bookId": "8989" }의 형태를 보일 것이다.

### app.route 
app.route()를 이용한다면 여러 http method에 대해 체인닝된 핸들러를 부착할 수 있다.
```js 
app.route('/book')
  .get(function (req, res) {
    res.send('Get a random book')
  })
  .post(function (req, res) {
    res.send('Add a book')
  })
  .put(function (req, res) {
    res.send('Update the book')
  })
```

### express.Router
express.Router 인스턴스를 사용한다면 router를 모듈링하여 사용할 수 있다.

```js
//'birds.js'

var express = require('express')
var router = express.Router()

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', function (req, res) {
  res.send('Birds home page')
})
// define the about route
router.get('/about', function (req, res) {
  res.send('About birds')
})

module.exports = router
```
app에서는 app.use로 해당 라우터를 사용하면 된다.
```js
var birds = require('./birds')
app.use('/birds', birds)
```

## 미들웨어

미들웨어 함수는 요청 객체, 응담 객체, 그리고 애플리케이션의 요청-응답 주기 중 그 다음의 미들웨어 함수 대한 액세스 권한을 갖는 함수이다. 그 다음의 미들웨어 함수는 일반적으로 next라는 이름의 변수로 표시됩니다.

현재의 미들웨어 함수가 요청-응답 주기를 종료하지 않는 경우에는 next()를 호출하여 그 다음 미들웨어 함수에 제어를 전달해야 한다. 그렇지 않으면 해당 요청은 정지된 채로 방치된다.

미들웨어를 사용하려면 app.use()를 호출해야한다.

## EJS

Embedded JavaScript templating.

자바스크립트를 위한 템플릿 언어이다.