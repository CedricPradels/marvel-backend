[Back to README](../README.md)

# Add a favorite charater or comic to a user

**URL** : `/user/addfavorite`

**Method** : `POST`

**Fields** :

```json
{
  "type": String,
  "id": String
}
```

**Header** :

```json
{
  "headers": {
    "Authorization": `Bearer ${token}`
  }
}
```

## Success Responses

**Code** : `200`

**Content** :

```json
{
  "message": String
}
```

## Failure Responses

**Code** : `400`
