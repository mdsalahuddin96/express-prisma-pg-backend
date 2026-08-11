# API Documentation

**Base URL:** `http://localhost:5000`
**Content-Type:** `application/json`

Protected endpoints require:

```http
Authorization: Bearer <JWT_TOKEN>
```

---

# Authentication APIs

## 1. Register User

**Endpoint:** `/api/auth/register`

**Method:** `POST`

**Description:** Register a new user account. Password is securely hashed using bcrypt.

**Request Body:**

```json
{
  "name": "Rahim Ahmed",
  "email": "rahim@example.com",
  "password": "12345678",
  "image": "https://example.com/image.jpg",
  "role": "User"
}
```

**Response:**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {}
}
```

**Status Codes:**

* `201` — User registered successfully
* `400` — Invalid registration data
* `500` — Server error

---

## 2. Login

**Endpoint:** `/api/auth/login`

**Method:** `POST`

**Description:** Authenticate a user and generate a JWT token.

**Request Body:**

```json
{
  "email": "rahim@example.com",
  "password": "12345678"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "JWT_TOKEN",
    "user": {}
  }
}
```

**Status Codes:**

* `200` — Login successful
* `401` — Invalid email or password
* `500` — Server error

---

# User APIs

## 3. Get Users

**Endpoint:** `/api/users`

**Method:** `GET`

**Description:** Regular users can retrieve their own information. Admin can retrieve all users.

**Request Body:** None

**Response:**

```json
{
  "success": true,
  "message": "User Info retrieve successfully",
  "data": {}
}
```

**Status Codes:**

* `200` — Users retrieved successfully
* `401` — Authentication required
* `500` — Server error

---

## 4. Update User

**Endpoint:** `/api/users/:id`

**Method:** `PATCH`

**Description:** Users can update their own profile. Admin can update any user's information.

**Request Body:**

```json
{
  "name": "Rahim Ahmed Updated",
  "image": "https://example.com/new-image.jpg"
}
```

**Admin Request Body:**

```json
{
  "name": "Rahim Ahmed Updated",
  "image": "https://example.com/new-image.jpg",
  "role": "Organizer"
}
```

**Response:**

```json
{
  "success": true,
  "message": "User Updated Successfully",
  "data": {}
}
```

**Status Codes:**

* `200` — User updated successfully
* `401` — Authentication required
* `403` — Not allowed to update this user
* `404` — User not found
* `500` — Server error

---

## 5. Delete User

**Endpoint:** `/api/users/:id`

**Method:** `DELETE`

**Description:** Delete a user account using soft delete. The user record remains in the database and `deletedAt` is updated.

**Request Body:** None

**Response:**

```json
{
  "success": true,
  "message": "User deleted successfully",
  "data": {}
}
```

**Status Codes:**

* `200` — User deleted successfully
* `401` — Authentication required
* `403` — Not allowed to delete this user
* `404` — User not found
* `500` — Server error

---

# Category APIs

## 6. Create Category

**Endpoint:** `/api/categories/create`

**Method:** `POST`

**Description:** Create a new event category.

**Request Body:**

```json
{
  "name": "Technology",
  "description": "Technology related events"
}
```

**Response:**

```json
{
  "success": true,
  "message": "New Category Created Successfully",
  "data": {}
}
```

**Status Codes:**

* `200` — Category created successfully
* `500` — Server error

---

## 7. Get Categories

**Endpoint:** `/api/categories`

**Method:** `GET`

**Description:** Retrieve all event categories.

**Request Body:** None

**Response:**

```json
{
  "success": true,
  "message": "Get All Categories Successfully",
  "data": []
}
```

**Status Codes:**

* `200` — Categories retrieved successfully
* `500` — Server error

---

## 8. Update Category

**Endpoint:** `/api/categories/update/:id`

**Method:** `PATCH`

**Description:** Update an existing category.

**Request Body:**

```json
{
  "name": "Technology & AI",
  "description": "Technology and AI related events"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Category Updated Successfully",
  "data": {}
}
```

**Status Codes:**

* `200` — Category updated successfully
* `404` — Category not found
* `500` — Server error

---

## 9. Delete Category

**Endpoint:** `/api/categories/delete/:id`

**Method:** `DELETE`

**Description:** Soft delete an event category.

**Request Body:** None

**Response:**

```json
{
  "success": true,
  "message": "Category deleted successfully",
  "data": {}
}
```

**Status Codes:**

* `200` — Category deleted successfully
* `404` — Category not found
* `500` — Server error

---

# Event APIs

## 10. Create Event

**Endpoint:** `/api/events/create`

**Method:** `POST`

**Description:** Create a new event. Only Organizer and Admin can create events. `organizerId` is taken from the authenticated user.

**Request Body:**

```json
{
  "title": "Bangladesh Tech Summit 2026",
  "categoryId": "category-uuid",
  "description": "A technology conference",
  "location": "Dhaka",
  "capacity": "500",
  "price": 1500,
  "image": "https://example.com/event.jpg",
  "startDate": "2026-09-15T09:00:00.000Z",
  "endDate": "2026-09-15T17:00:00.000Z",
  "status": "Published"
}
```

**Response:**

```json
{
  "success": true,
  "message": "New Event Created Successfully",
  "data": {}
}
```

**Status Codes:**

* `200` — Event created successfully
* `401` — Authentication required
* `403` — Only Organizer/Admin can create events
* `500` — Server error

---

## 11. Get Events

**Endpoint:** `/api/events`

**Method:** `GET`

**Description:** Retrieve all events with related category and organizer information.

**Request Body:** None

**Response:**

```json
{
  "success": true,
  "message": "Get All Events Successfully",
  "data": []
}
```

**Status Codes:**

* `200` — Events retrieved successfully
* `500` — Server error

---

## 12. Update Event

**Endpoint:** `/api/events/update?id=<eventId>`

**Method:** `PATCH`

**Description:** Organizer can update their own event. Admin can update any event.

**Request Body:**

```json
{
  "title": "Updated Tech Summit",
  "description": "Updated event description",
  "location": "Dhaka",
  "capacity": "600",
  "price": 1800,
  "status": "Published"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Event Updated Successfully",
  "data": {}
}
```

**Status Codes:**

* `200` — Event updated successfully
* `401` — Authentication required
* `403` — Not allowed to update this event
* `404` — Event not found
* `500` — Server error

---

## 13. Delete Event

**Endpoint:** `/api/events/delete?id=<eventId>`

**Method:** `DELETE`

**Description:** Organizer can delete their own event. Admin can delete any event. Uses soft delete.

**Request Body:** None

**Response:**

```json
{
  "success": true,
  "message": "Event deleted successfully",
  "data": {}
}
```

**Status Codes:**

* `200` — Event deleted successfully
* `401` — Authentication required
* `403` — Not allowed to delete this event
* `404` — Event not found
* `500` — Server error

---

# Booking APIs

## 14. Create Booking

**Endpoint:** `/api/bookings/create`

**Method:** `POST`

**Description:** Create a booking for an event. `userId` is taken from the authenticated user.

**Request Body:**

```json
{
  "eventId": "event-uuid",
  "quantity": 2,
  "totalAmount": 3000,
  "bookingDate": "2026-08-10T12:00:00.000Z"
}
```

**Response:**

```json
{
  "success": true,
  "message": "New Booking Created Successfully",
  "data": {}
}
```

**Status Codes:**

* `200` — Booking created successfully
* `401` — Authentication required
* `500` — Server error

---

## 15. Get My Bookings

**Endpoint:** `/api/bookings`

**Method:** `GET`

**Description:** Retrieve all bookings of the authenticated user.

**Request Body:** None

**Response:**

```json
{
  "success": true,
  "message": "Successfully get all bookings of a user",
  "data": []
}
```

**Status Codes:**

* `200` — Bookings retrieved successfully
* `401` — Authentication required
* `500` — Server error

---

## 16. Update Booking

**Endpoint:** `/api/bookings/update?id=<bookingId>`

**Method:** `PATCH`

**Description:** Update an existing booking according to the user's authorization.

**Request Body:**

```json
{
  "quantity": 3,
  "totalAmount": 4500,
  "status": "Confirm"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Booking Updated Successfully",
  "data": {}
}
```

**Status Codes:**

* `200` — Booking updated successfully
* `401` — Authentication required
* `403` — Not allowed to update this booking
* `404` — Booking not found
* `500` — Server error

---

## 17. Cancel Booking

**Endpoint:** `/api/bookings/delete?id=<bookingId>`

**Method:** `DELETE`

**Description:** Cancel a booking. The booking is not physically deleted; its status becomes `Cancelled`.

**Request Body:** None

**Response:**

```json
{
  "success": true,
  "message": "Booking deleted successfully",
  "data": {}
}
```

**Status Codes:**

* `200` — Booking cancelled successfully
* `401` — Authentication required
* `403` — Not allowed to cancel this booking
* `404` — Booking not found
* `500` — Server error

---

# Review APIs

## 18. Create Review

**Endpoint:** `/api/reviews/create`

**Method:** `POST`

**Description:** Create a review for an event.

**Request Body:**

```json
{
  "userId": "user-uuid",
  "eventId": "event-uuid",
  "rating": 5,
  "comment": "Excellent event!"
}
```

**Response:**

```json
{
  "success": true,
  "message": "New Review Created Successfully",
  "data": {}
}
```

**Status Codes:**

* `200` — Review created successfully
* `500` — Server error

---

## 19. Get Reviews

**Endpoint:** `/api/reviews`

**Method:** `GET`

**Description:** Retrieve all reviews.

**Request Body:** None

**Response:**

```json
{
  "success": true,
  "message": "Successfully get all reviews",
  "data": []
}
```

**Status Codes:**

* `200` — Reviews retrieved successfully
* `500` — Server error

---

## 20. Update Review

**Endpoint:** `/api/reviews/update?id=<reviewId>`

**Method:** `PATCH`

**Description:** Update an existing review.

**Request Body:**

```json
{
  "rating": 4,
  "comment": "Good event overall."
}
```

**Response:**

```json
{
  "success": true,
  "message": "Review Updated Successfully",
  "data": {}
}
```

**Status Codes:**

* `200` — Review updated successfully
* `404` — Review not found
* `500` — Server error

---

## 21. Delete Review

**Endpoint:** `/api/reviews/delete?id=<reviewId>`

**Method:** `DELETE`

**Description:** Delete an existing review.

**Request Body:** None

**Response:**

```json
{
  "success": true,
  "message": "Review deleted successfully",
  "data": {}
}
```

**Status Codes:**

* `200` — Review deleted successfully
* `404` — Review not found
* `500` — Server error

---

# Common Status Codes

| Status Code | Meaning                 |
| ----------- | ----------------------- |
| `200`       | Request successful      |
| `201`       | Resource created        |
| `400`       | Bad request             |
| `401`       | Authentication required |
| `403`       | Forbidden               |
| `404`       | Resource not found      |
| `500`       | Internal server error   |
