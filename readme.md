## Requirements

- Node 5.7
- MongoDB 3.x

MongoDB Indices

```
db.accounts.createIndex({ 'username': 1 }, { unique: true });
```

## CURL Samples

### Create Account

```
curl -i -X POST 'http://localhost:8080/accounts' -H 'Content-Type: application/json' -d '{ "username": "boy1", "password": "abc123", "gender": "male", "age": 23, "preference": { "distance": 1000, "gender": "female", "age_range": { "from": 18, "to": 35 } } }'
curl -i -X POST 'http://localhost:8080/accounts' -H 'Content-Type: application/json' -d '{ "username": "girl1", "password": "abc123", "gender": "female", "age": 24, "preference": { "distance": 1000, "gender": "male", "age_range": { "from": 18, "to": 35 } } }'
curl -i -X POST 'http://localhost:8080/accounts' -H 'Content-Type: application/json' -d '{ "username": "girl2", "password": "abc123", "gender": "female", "age": 16, "preference": { "distance": 1000, "gender": "male", "age_range": { "from": 18, "to": 35 } } }'
curl -i -X POST 'http://localhost:8080/accounts' -H 'Content-Type: application/json' -d '{ "username": "girl3", "password": "abc123", "gender": "female", "age": 26, "preference": { "distance": 1000, "gender": "male", "age_range": { "from": 18, "to": 35 } } }'
curl -i -X POST 'http://localhost:8080/accounts' -H 'Content-Type: application/json' -d '{ "username": "girl4", "password": "abc123", "gender": "female", "age": 28, "preference": { "distance": 1000, "gender": "male", "age_range": { "from": 18, "to": 35 } } }'
curl -i -X POST 'http://localhost:8080/accounts' -H 'Content-Type: application/json' -d '{ "username": "girl5", "password": "abc123", "gender": "female", "age": 17, "preference": { "distance": 1000, "gender": "male", "age_range": { "from": 18, "to": 35 } } }'

```

### Login

```
curl -i -X POST 'http://localhost:8080/accounts/auth' -H 'Content-Type: application/json' -d '{ "username": "boy1", "password": "abc123" }'

```

### Suggest People

```
curl -i -X GET 'http://localhost:8080/users/:id/suggestions' -H 'Content-Type: application/json' -H 'Authorization: TOKEN token=<auth_token>'

```

### Like

```
curl -i -X PUT 'http://localhost:8080/users/:id/likes/:target_uid' -H 'Content-Type: application/json' -H 'Authorization: TOKEN token=<auth_token>'
```