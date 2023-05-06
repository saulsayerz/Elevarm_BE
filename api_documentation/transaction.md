# API Documentation for Transaction Service
This document provides a brief overview of the transaction service API and its routes.

The Transaction Service provides basic CRUD (Create, Read, Update, Delete) operations for transactions in an Elevarm database.

# POST /transactions
Create a new transaction.

Request Body

json
```
{
  "id_user": "<string>",
  "id_driver": "<string>",
  "id_restaurant": "<string>",
  "shipping_cost": "<number>",
  "transaction_type": "<string>",
  "food_items": [{
    "id_food": "<string>",
    "quantity": "<number>"
  }],
  "total_food_price": "<number>"
}
```
All fields are required except id_restaurant, food_items, and total_food_price for transactions with transaction_type of "goride".
If the transaction_type is "gofood", id_restaurant and food_items fields are required, and total_food_price field is calculated by the service based on the prices of the food items in the order.

Response

json
```
{
  "status": "success",
  "message": "Transaction created successfully",
  "data": {
    "insertedId": "<ObjectId>"
  }
}
```
# GET /transactions
Get all transactions.

Response

json
```
{
  "status": "success",
  "message": "Transactions retrieved successfully",
  "data": [{
    "id_user": "<string>",
    "id_driver": "<string>",
    "id_restaurant": "<string>",
    "shipping_cost": "<number>",
    "transaction_type": "<string>",
    "food_items": [{
      "id_food": "<string>",
      "quantity": "<number>"
    }],
    "total_food_price": "<number>"
  }]
}
```
# DELETE /transactions/:id
Delete a transaction with the specified ID.

Response

json
```
{
  "status": "success",
  "message": "Transaction deleted successfully",
  "data": {
    "deletedCount": "<number>"
  }
}
```
# PUT /transactions/:id
Update a transaction with the specified ID.

Request Body

json
```
{
  "id_user": "<string>",
  "id_driver": "<string>",
  "id_restaurant": "<string>",
  "shipping_cost": "<number>",
  "transaction_type": "<string>",
  "food_items": [{
    "id_food": "<string>",
    "quantity": "<number>"
  }],
  "total_food_price": "<number>"
}
```
All fields are required except id_restaurant, food_items, and total_food_price for transactions with transaction_type of "goride".
If the transaction_type is "gofood", id_restaurant and food_items fields are required, and total_food_price field is calculated by the service based on the prices of the food items in the order.

Response

json
```
{
  "status": "success",
  "message": "Transaction updated successfully",
  "data": {
    "modifiedCount": "<number>"
  }
}
```