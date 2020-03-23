[Back to README](../README.md)

[Back to README](../README.md)

# Read comics by title

**URL** : `/comics`

**Method** : `GET`

**Query** :

- `limit`: number of items per page
- `page`: actual page number
- `id`: id of the character to search

## Success Responses

**Code** : `200`

**Content** :

```json
{
  "total": Number,
  "datas": Object
}
```
