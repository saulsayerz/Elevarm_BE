# API Documentation for Restaurant Service
This document provides a brief overview of the Restaurant API and its routes. The Restaurant API provides basic CRUD (Create, Read, Update, Delete) operations for restaurants in an Elevarm database.

# POST /restaurant
Create a new restaurant.

Request Body
```
Copy code
{
  "id": "<string>",
  "name": "<string>",
  "address": "<string>"
}
```
All fields are required.

Response
json
```
{
  "status": "success",
  "message": "Restaurant created successfully",
  "data": {
    "insertedId": "<ObjectId>"
  }
}
```
# GET /restaurant
Get all restaurants.

Response
json
```
[
  {
    "_id": "<ObjectId>",
    "id": "<string>",
    "name": "<string>",
    "address": "<string>"
  },
  ...
]
```

# DELETE /restaurant/:restaurantId
Delete a restaurant and its menu items.

Parameters
```
restaurantId: The ID of the restaurant to be deleted.
```
Response
json
```
{
  "status": "success",
  "message": "Restaurant deleted successfully",
  "data": {
    "deletedCount": 1
  }
}
```

# PUT /restaurant/:restaurantId
Update a restaurant.

Parameters
restaurantId: The ID of the restaurant to be updated.
Request Body
json
```
{
  "name": "<string>",
  "address": "<string>"
}
```
Response
json
```
{
  "status": "success",
  "message": "Restaurant updated successfully",
  "data": {
    "matchedCount": 1,
    "modifiedCount": 1,
    "upsertedCount": 0
  }
}
```