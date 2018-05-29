# Server


## API


### Authorization

See [auth middleware](./api/middlewares/auth.js).

To send authenticated request, user should generate new token, and send it in `Authorization` header with `token ` prefix. Example:

```
Authorization: token 8jvu4i1%fhyq2zf%9nh6dc9%bnq5hfn%1r3hyb4
```

- If authorization token is incorrect `invalid_token` is returned.
- If route require authenticated user `invalid_authorization` is returned.


### Api Wrapper

[apiWrapper](./api/middlewares/api-wrapper.js) is a middleware to wrap any return from route to standard api response.

Example for correct response:
```json
{
  "ok": true,
  "result": { "data": 12 },
  "status": 200
}
```

Example for failed response:
```json
{
  "ok": false,
  "error": "invalid_token",
  "status": 400
}
```

Route can return Result, Option or any value.
- Any correct value from route will be setted into `result` field inside answer
- `Option.None` will be converted to `Result` with `EmptyResultError`
- `undefined` or `null` will be converted to `Result` with `EmptyResultError`
- Any exception will be converted to `{ error: 'internal_server_error', ok: false, status: 500 }`
- `EmptyResultError` converts status to `204 No Content` and empty response body

> Not exists route returns `204 No Content`


### Validation

[validate](./middlewares/validate.js) middleware checks request body to correct form through [ajv](https://npmjs.com/ajv).

If request body is incorrect, route return `400 Bad Request` with `invalid_request_body` error.

### Routes

All routes should be placed in `./api/routes/`


#### `GET /` api test

If all OK should return
```json
{
  "ok": true,
  "result": { "cards": "works" },
  "status": 200
}
```


#### `GET /status` Status check

If all OK should return:

```json
{
  "ok": true,
  "result": { "status": "ok" },
  "status": 200
}
```

> In future releases should return db status


#### `GET /account` User account status

**Should be authenticated!**

If request authenticated return:

```json
{
  "ok": true,
  "result": { "user": { "email": "foo@bar.com" } },
  "status": true
}
```


#### `POST /account` Create user account

Create new account.

Receive:

```json
{
  "email": "foo@bar.com",
  "password": "example1"
}
```

Response with user id:

```json
{
  "ok": true,
  "result": 1,
  "status": true
}
```

If email already registered, response:

```json
{
  "ok": false,
  "error": "already_exists",
  "status": 400
}
```


#### `POST /account/session` Create session token

Create new session token for email/password pair.

Receive:

```json
{
  "email": "foo@bar.com",
  "password": "example1"
}
```

If credentials correct response:

```json
{
  "ok": true,
  "result": {
    "token": "12johb9m%uzrthb3%18ihxmjz%ve3n9fp%yt8g2nt"
  },
  "status": 200
}
```

If email not found:

```json
{
  "ok": false,
  "error": "not_found",
  "status": 400
}
```

If password wrong:

```json
{
  "ok": false,
  "error": "bad_credentials",
  "status": 400
}
```


#### `DELETE /account/session` Drop session

**Should be authenticated!**

Receive optional:

```json
{
  "token": "12johb9m%uzrthb3%18ihxmjz%ve3n9fp%yt8g2nt"
}
```

Remove single token if passed.
If no token passed, remove all session tokens.

If auth correct, always return:

```json
{
  "ok": true,
  "result": true,
  "status": 200
}
```


