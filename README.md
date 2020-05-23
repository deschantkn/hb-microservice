# HB Nodejs Microservice

#### Features

1. JWT Token Authentication
2. JSON Patching API
3. Generate Image Thumbnail

Endpoints and sample requests are included below for your convenience.

The **JSON Patching** and **Image Thumbnail** APIs are protected with JWT. Find authentication instructions locally with docs Swagger [here](http://localhost:3000/docs)

#### Running the service

1. Clone the repository with `git clone <insert_repo>`
2. Create `.env` file at project root update with `.env.example` as template
3. Run `npm install` from project root
4. Start the server with `npm start`

#### Run with docker

1. Run `docker pull deschant/deschant/hb-nodejs-microservice`
2. Start container with: `docker run --name hb-nodejs-microservice -p 3000:3000 -d deschant/hb-nodejs-microservice`

#### API Endpoints

##### Authentication:

`POST /api/auth/login`

Example request body:

```bash
  {
    "username": "jake",
    "password": "jakejake"
  }
```

##### JSON Patching:

`PATCH /api/json/patch`

Example request body:

```bash
  {
    json: {
      "baz": "qux",
      "foo": "bar"
    },
    patch: [
      { "op": "replace", "path": "/baz", "value": "boo" },
      { "op": "add", "path": "/hello", "value": ["world"] },
      { "op": "remove", "path": "/foo" }
    ]
  }
```

##### Generate Thumbnail:

`POST /api/thumbnail/generate`

Example request body:

```bash
  {
    "imgUrl": "https://images.pexels.com/photos/318391/pexels-photo-318391.jpeg"
  }
```
