# API Documentation for Menu Service
This document provides a brief overview of the Menu Service API and its routes.

The Menu Service provides basic CRUD (Create, Read, Update, Delete) operations for menu items in an Elevarm database.

# POST /menu
Create a new menu item.

Request Body JSON

```
{
  "itemName": "<string>",
  "restaurantId": "<string>",
  "price": "<number>"
}
```
All fields are required.

Response JSON
```
{
  "status": "success",
  "message": "Menu item created successfully",
  "data": {
    "insertedId": "<ObjectId>"
  }
}
```
# GET /menu
Get all menu items.

Response JSON array

css
```
[  {    "_id": "<ObjectId>",    "itemName": "<string>",    "restaurantId": "<string>",    "price": "<number>"  },  ...]
```
# GET /menu/:restaurantId
Get all menu items by restaurant ID.

Response JSON array

```
[  {    "_id": "<ObjectId>",    "itemName": "<string>",    "restaurantId": "<string>",    "price": "<number>"  },  ...]
```
# DELETE /menu/:menuId
Delete a menu item.

Response JSON
```
{
  "status": "success",
  "message": "Menu item deleted successfully",
  "data": {
    "deletedCount": "<number>"
  }
}
```
# PUT /menu/:menuId
Update a menu item.

Request Body JSON
```
{
  "itemName": "<string>",
  "restaurantId": "<string>",
  "price": "<number>"
}
```
At least one field is required.

Response JSON
```
{
  "status": "success",
  "message": "Menu item updated successfully",
  "data": {
    "modifiedCount": "<number>"
  }
}
```
# GET /menu-item/:menuItemId
Get a menu item by ID.

Response JSON

json
```
{
  "_id": "<ObjectId>",
  "itemName": "<string>",
  "restaurantId": "<string>",
  "price": "<number>"
}
```