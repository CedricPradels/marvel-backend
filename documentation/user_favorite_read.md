[Back to README](../README.md)

# Read favorites characters and comics of a user

**URL** : `/user/favorites`

**Method** : `get`

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
  "characters": Array,
  "comics": Array
}
```

## Failure Responses

**Code** : `400`
