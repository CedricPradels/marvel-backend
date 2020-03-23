[Back to README](../README.md)

# Read character by name

**URL** : `/characters`

**Method** : `GET`

**Query** :

- `limit`: number of items per page
- `page`: actual page number
- `name`: name of the character to search

## Success Responses

**Code** : `200`

**Content** :

```json
{
  "total": Number,
  "datas": Object
}
```
