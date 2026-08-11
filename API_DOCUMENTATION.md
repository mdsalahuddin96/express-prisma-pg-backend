# API Documentation

**Base URL:** `http://localhost:5000`
**Content-Type:** `application/json`

## Authentication

Protected routes require:

```http
Authorization: Bearer <JWT_TOKEN>
```

JWT contains `userId`, `email`, and `role`.

Roles:

* `User`
* `Organizer`
* `Admin`

---

# 1. Authentication

### Register

```http
POST /api/auth/register
```

**Auth:** Public

**Body:**

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

---

### Login

```http
POST /api/auth/login
```

**Auth:** Public

**Body:**

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

---

# 2. Users

### Get Users

```http
GET /api/users
```

**Auth:** Required

* User/Organizer → own information
* Admin → all users

---

### Update User

```http
PATCH /api/users/:id
```

**Auth:** Required

* User/Organizer → own profile only
* Admin → any user

**Body:**

```json
{
  "name": "Updated Name",
  "image": "https://example.com/image.jpg"
}
```

Admin can also update:

```json
{
  "role": "Organizer"
}
```

---

### Delete User

```http
DELETE /api/users/:id
```

**Auth:** Required

* User/Organizer → own account
* Admin → any account

**Note:** Uses soft delete (`deletedAt`).

---

# 3. Categories

### Create Category

```http
POST /api/categories/create
```

**Auth:** Public

**Body:**

```json
{
  "name": "Technology",
  "description": "Technology related events"
}
```

### Get Categories

```http
GET /api/categories
```

**Auth:** Public

### Update Category

```http
PATCH /api/categories/update?id=<categoryId>
```

**Auth:** Public

### Delete Category

```http
DELETE /api/categories/delete?id=<categoryId>
```

**Auth:** Public

---

# 4. Events

### Create Event

```http
POST /api/events/create
```

**Auth:** Required
**Role:** `Organizer`, `Admin`

**Body:**

```json
{
  "title": "Bangladesh Tech Summit 2026",
  "categoryId": "category-uuid",
  "description": "Technology conference",
  "location": "Dhaka",
  "capacity": "500",
  "price": 1500,
  "image": "https://example.com/event.jpg",
  "startDate": "2026-09-15T09:00:00.000Z",
  "endDate": "2026-09-15T17:00:00.000Z",
  "status": "Published"
}
```

`organizerId` is automatically taken from the authenticated user.

---

### Get Events

```http
GET /api/events
```

**Auth:** Public

Returns event information with related category/organizer information.

---

### Update Event

```http
PATCH /api/events/update?id=<eventId>
```

**Auth:** Required

* Organizer → own events
* Admin → any event

---

### Delete Event

```http
DELETE /api/events/delete?id=<eventId>
```

**Auth:** Required

* Organizer → own events
* Admin → any event

Uses soft delete.

---

# 5. Bookings

All booking routes require authentication.

### Create Booking

```http
POST /api/bookings/create
```

**Body:**

```json
{
  "eventId": "event-uuid",
  "quantity": 2,
  "totalAmount": 3000,
  "bookingDate": "2026-08-10T12:00:00.000Z"
}
```

`userId` is taken from the authenticated user.

---

### Get My Bookings

```http
GET /api/bookings
```

Returns bookings of the authenticated user.

---

### Update Booking

```http
PATCH /api/bookings/update?id=<bookingId>
```

**Auth:** Required

Users can update their own booking; Organizer/Admin can manage bookings according to their authorization.

---

### Cancel Booking

```http
DELETE /api/bookings/delete?id=<bookingId>
```

**Auth:** Required

Booking is marked as `Cancelled` rather than physically deleted.

---

# 6. Reviews

### Create Review

```http
POST /api/reviews/create
```

**Auth:** Public

```json
{
  "userId": "user-uuid",
  "eventId": "event-uuid",
  "rating": 5,
  "comment": "Excellent event!"
}
```

### Get Reviews

```http
GET /api/reviews
```

**Auth:** Public

### Update Review

```http
PATCH /api/reviews/update?id=<reviewId>
```

**Auth:** Public

### Delete Review

```http
DELETE /api/reviews/delete?id=<reviewId>
```

**Auth:** Public

---

# 7. Common Status Codes

| Code  | Meaning                 |
| ----- | ----------------------- |
| `200` | Success                 |
| `201` | Created                 |
| `400` | Bad Request             |
| `401` | Authentication required |
| `403` | Forbidden               |
| `404` | Not Found               |
| `500` | Server Error            |

---

## Authorization Summary

| Feature               | User | Organizer | Admin |
| --------------------- | ---- | --------- | ----- |
| Own profile           | ✅    | ✅         | ✅     |
| All users             | ❌    | ❌         | ✅     |
| Create event          | ❌    | ✅         | ✅     |
| Manage own events     | ❌    | ✅         | ✅     |
| Manage any event      | ❌    | ❌         | ✅     |
| Create booking        | ✅    | ✅         | ✅     |
| Manage own booking    | ✅    | ✅         | ✅     |
| Manage other bookings | ❌    | ✅         | ✅     |
