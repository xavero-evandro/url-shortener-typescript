# URL Shortener in TypeScript

## Receive a URL and return a short version.

### Express API running on port 3333

### Docker compose file included

- Remember to change the host to "mongo" in the ormconfig.json file

#### Just run

```bash
docker-compose up -d
```

### Standard node server

- Remember to change the host to "localhost" in the ormconfig.json file

#### Just run

```bash
npm install
```

#### then

```bash
npm run start
```

# Endpoints

## POST

```text
/api/v1/
```

### Json Body

```json
{
  "url": "https://ww.google.com"
}
```

### Response

```json
{
  "shortUrl": "http://tier.app/-l0nZM-lm"
}
```

## GET

### Query Params

```text
http://localhost:3333/api/v1/?url=http://tier.app/-l0nZM-lm
http://localhost:3333/api/v1/?url=http%3A%2F%2Ftier.app%2F-l0nZM-lm
```

### Response

```json
{
  "originalUrl": "https://www.google.com/"
}
```

# Test

## To run test

```bash
npm run test
```

## To run coverage test

```bash
npm run test:coverage
```

### I also add a exported file to be imported on Insomnia

## Fell free to play and improve it
