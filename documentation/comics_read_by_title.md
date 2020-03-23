[Back to README](../README.md)

# Read comics by title

**URL** : `/comics`

**Method** : `GET`

**Query** :

- `limit`: number of items per page
- `page`: actual page number
- `title`: title of the comics to search

## Success Responses

**Code** : `200`

**Content** :

```json
{
  "total": Number,
  "datas": Object
}
```
