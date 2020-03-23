[Back to README](../README.md)

# Login user

**URL** : `/user/login`

**Method** : `POST`

**Fields** :

```json
{
  "email": String,
  "password": String
}
```

## Success Responses

**Code** : `200`

**Content** :

```json
{
  "token": String
}
```

## Failure Responses

**Code** : `400`
