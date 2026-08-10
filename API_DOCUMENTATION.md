# Event Booking API Documentation

**Project:** Express + Prisma + PostgreSQL Event Booking Backend  
**API Base URL:** `http://localhost:5000`  
**Content-Type:** `application/json`

> This documentation reflects the current implementation of the repository. Authentication endpoints issue JWTs, but the current routes do not yet attach JWT authentication/authorization middleware to protected resources.

---

## 1. API Overview

| Module | Base Endpoint | Purpose |
|---|---|---|
| Health | `/` | API health/basic response |
| Authentication | `/api/auth` | Registration and login |
| Users | `/api/users` | User listing, update, soft delete |
| Categories | `/api/categories` | Category CRUD |
| Events | `/api/events` | Event CRUD and related category/organizer data |
| Bookings | `/api/bookings` | Booking creation, lookup, update and cancellation |
| Reviews | `/api/reviews` | Review CRUD |

---

## 2. Authentication

### 2.1 Register User

**Endpoint**

```http
POST /api/auth/register
```

**Description**

Creates a new user account. The password is hashed using bcrypt before being stored. The response does not expose the password.

**Request Body**

```json
{
  "name": "Rahim Ahmed",
  "email": "rahim@example.com",
  "password": "12345678",
  "image": "https://example.com/rahim.jpg"
}
```

| Field | Type | Required | Description |
|---|---|---:|---|
| `name` | string | Yes | User's name |
| `email` | string | Yes | Unique email address |
| `password` | string | Yes | Plain password supplied by the client |
| `image` | string | No | Profile image URL |

**Success Response — 201 Created**

```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "id": "uuid",
    "name": "Rahim Ahmed",
    "email": "rahim@example.com",
    "image": "https://example.com/rahim.jpg",
    "role": "User",
    "createdAt": "2026-08-10T10:00:00.000Z"
  }
}
```

**Status Codes**

| Status | Meaning |
|---:|---|
| `201` | User registered successfully |
| `400` | Registration failed / user already exists |

---

### 2.2 Login

**Endpoint**

```http
POST /api/auth/login
```

**Description**

Authenticates a user using email and password and returns a JWT valid for 7 days.

**Request Body**

```json
{
  "email": "rahim@example.com",
  "password": "12345678"
}
```

**Success Response — 200 OK**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "uuid",
      "name": "Rahim Ahmed",
      "email": "rahim@example.com",
      "image": "https://example.com/rahim.jpg",
      "role": "User"
    }
  }
}
```

**Status Codes**

| Status | Meaning |
|---:|---|
| `200` | Login successful |
| `401` | Invalid email/password or deleted account |

---

## 3. Users

### 3.1 Get All Users

**Endpoint**

```http
GET /api/users
```

**Description**

Returns all users currently stored in the database.

**Request Body**

None.

**Success Response — 200 OK**

```json
{
  "success": true,
  "message": "Get All User Successfully",
  "data": [
    {
      "id": "uuid",
      "email": "rahim@example.com",
      "name": "Rahim Ahmed",
      "image": null,
      "role": "User",
      "deletedAt": null,
      "createdAt": "2026-08-10T10:00:00.000Z",
      "updatedAt": "2026-08-10T10:00:00.000Z"
    }
  ]
}
```

**Status Codes**

| Status | Meaning |
|---:|---|
| `200` | Users retrieved successfully |
| `500` | Server error |

---

### 3.2 Update User

**Endpoint**

```http
PATCH /api/users/update?email={email}
```

**Description**

Updates a user identified by email.

**Query Parameter**

| Parameter | Type | Required | Description |
|---|---|---:|---|
| `email` | string | Yes | Email of the user to update |

**Request Body**

```json
{
  "name": "Rahim Ahmed Updated",
  "email": "rahim.updated@example.com",
  "password": "new-password",
  "image": "https://example.com/new-image.jpg",
  "role": "User"
}
```

**Success Response — 200 OK**

```json
{
  "success": true,
  "message": "User Updated Successfully",
  "data": {
    "id": "uuid",
    "email": "rahim.updated@example.com",
    "name": "Rahim Ahmed Updated",
    "image": "https://example.com/new-image.jpg",
    "role": "User",
    "deletedAt": null,
    "createdAt": "2026-08-10T10:00:00.000Z",
    "updatedAt": "2026-08-10T11:00:00.000Z"
  }
}
```

**Status Codes**

| Status | Meaning |
|---:|---|
| `200` | User updated successfully |
| `500` | Server/database error |

> Note: The current implementation updates the supplied data directly. It does not bcrypt-hash a password during this update operation.

---

### 3.3 Delete User (Soft Delete)

**Endpoint**

```http
DELETE /api/users/delete?email={email}
```

**Description**

Soft-deletes a user by setting `deletedAt` to the current timestamp. The user record remains in the database.

**Success Response — 200 OK**

```json
{
  "success": true,
  "message": "User deleted successfully",
  "data": {
    "id": "uuid",
    "email": "rahim@example.com",
    "deletedAt": "2026-08-10T12:00:00.000Z"
  }
}
```

**Status Codes**

| Status | Meaning |
|---:|---|
| `200` | User soft-deleted successfully |
| `500` | Server/database error |

---

## 4. Categories

### 4.1 Create Category

**Endpoint**

```http
POST /api/categories/create
```

**Description**

Creates a new event category.

**Request Body**

```json
{
  "name": "Technology",
  "description": "Technology and software related events"
}
```

**Success Response — 200 OK**

```json
{
  "success": true,
  "message": "New Category Created Successfully",
  "data": {
    "id": "uuid",
    "name": "Technology",
    "description": "Technology and software related events",
    "deletedAt": null,
    "createdAt": "2026-08-10T10:00:00.000Z",
    "updatedAt": "2026-08-10T10:00:00.000Z"
  }
}
```

**Status Codes**

| Status | Meaning |
|---:|---|
| `200` | Category created |
| `500` | Server/database error |

---

### 4.2 Get All Categories

**Endpoint**

```http
GET /api/categories
```

**Description**

Returns all categories.

**Request Body**

None.

**Success Response — 200 OK**

```json
{
  "success": true,
  "message": "Get All Categories Successfully",
  "data": [
    {
      "id": "uuid",
      "name": "Technology",
      "description": "Technology and software related events",
      "deletedAt": null,
      "createdAt": "2026-08-10T10:00:00.000Z",
      "updatedAt": "2026-08-10T10:00:00.000Z"
    }
  ]
}
```

---

### 4.3 Update Category

**Endpoint**

```http
PATCH /api/categories/update?id={categoryId}
```

**Request Body**

```json
{
  "name": "Technology & AI",
  "description": "Technology, AI and software events"
}
```

**Success Response — 200 OK**

```json
{
  "success": true,
  "message": "Category Updated Successfully",
  "data": {
    "id": "uuid",
    "name": "Technology & AI",
    "description": "Technology, AI and software events",
    "deletedAt": null,
    "createdAt": "2026-08-10T10:00:00.000Z",
    "updatedAt": "2026-08-10T11:00:00.000Z"
  }
}
```

---

### 4.4 Delete Category

**Endpoint**

```http
DELETE /api/categories/delete?id={categoryId}
```

**Description**

Soft-deletes a category by setting `deletedAt`.

**Success Response — 200 OK**

```json
{
  "success": true,
  "message": "Category deleted successfully",
  "data": {
    "id": "uuid",
    "deletedAt": "2026-08-10T12:00:00.000Z"
  }
}
```

**Status Codes**

| Status | Meaning |
|---:|---|
| `200` | Category deleted |
| `500` | Server/database error |

---

## 5. Events

### 5.1 Create Event

**Endpoint**

```http
POST /api/events/create
```

**Description**

Creates a new event.

**Request Body**

```json
{
  "title": "Bangladesh Tech Summit 2026",
  "organizerId": "user-uuid",
  "categoryId": "category-uuid",
  "description": "A technology conference for developers and technology enthusiasts.",
  "location": "Bangabandhu International Conference Center, Dhaka",
  "capacity": "500",
  "price": 1500,
  "image": "https://example.com/images/tech-summit.jpg",
  "startDate": "2026-09-15T09:00:00.000Z",
  "endDate": "2026-09-15T17:00:00.000Z",
  "status": "Published"
}
```

| Field | Type | Required |
|---|---|---:|
| `title` | string | Yes |
| `organizerId` | UUID string | Yes |
| `categoryId` | UUID string | Yes |
| `description` | string | Yes |
| `location` | string | No |
| `capacity` | string | No |
| `price` | number | Yes |
| `image` | string | No |
| `startDate` | ISO datetime | Yes |
| `endDate` | ISO datetime | Yes |
| `status` | `Draft \| Published \| Cancelled \| Completed` | Yes |

**Success Response — 200 OK**

Returns the newly created event.

---

### 5.2 Get All Events

**Endpoint**

```http
GET /api/events
```

**Description**

Returns all events. The current implementation additionally includes the category name and organizer name/email.

**Success Response — 200 OK**

```json
{
  "success": true,
  "message": "Get All Events Successfully",
  "data": [
    {
      "id": "event-uuid",
      "title": "Bangladesh Tech Summit 2026",
      "organizerId": "user-uuid",
      "categoryId": "category-uuid",
      "description": "A technology conference for developers.",
      "location": "Dhaka",
      "capacity": "500",
      "price": "1500",
      "image": "https://example.com/event.jpg",
      "startDate": "2026-09-15T09:00:00.000Z",
      "endDate": "2026-09-15T17:00:00.000Z",
      "status": "Published",
      "deletedAt": null,
      "createdAt": "2026-08-10T10:00:00.000Z",
      "updatedAt": "2026-08-10T10:00:00.000Z",
      "category": {
        "name": "Technology"
      },
      "organize": {
        "name": "Rahim Ahmed",
        "email": "rahim@example.com"
      }
    }
  ]
}
```

---

### 5.3 Update Event

**Endpoint**

```http
PATCH /api/events/update?id={eventId}
```

**Request Body**

```json
{
  "title": "Updated Tech Summit",
  "organizerId": "user-uuid",
  "categoryId": "category-uuid",
  "description": "Updated event description.",
  "location": "Dhaka",
  "capacity": "600",
  "price": 1800,
  "image": "https://example.com/updated-event.jpg",
  "startDate": "2026-09-15T09:00:00.000Z",
  "endDate": "2026-09-15T17:00:00.000Z",
  "status": "Published"
}
```

**Success Response — 200 OK**

```json
{
  "success": true,
  "message": "Event Updated Successfully",
  "data": {}
}
```

---

### 5.4 Delete Event

**Endpoint**

```http
DELETE /api/events/delete?id={eventId}
```

**Description**

Soft-deletes the event by setting `deletedAt` to the current timestamp.

**Success Response — 200 OK**

```json
{
  "success": true,
  "message": "Event deleted successfully",
  "data": {}
}
```

**Status Codes**

| Status | Meaning |
|---:|---|
| `200` | Event operation successful |
| `500` | Server/database error |

---

## 6. Bookings

### 6.1 Create Booking

**Endpoint**

```http
POST /api/bookings/create
```

**Description**

Creates a booking for an event.

**Request Body**

```json
{
  "userId": "user-uuid",
  "eventId": "event-uuid",
  "quantity": 2,
  "totalAmount": 3000,
  "status": "Pending",
  "bookingDate": "2026-08-10T12:00:00.000Z"
}
```

| Field | Type | Required |
|---|---|---:|
| `userId` | UUID string | Yes |
| `eventId` | UUID string | Yes |
| `quantity` | integer | Yes |
| `totalAmount` | number | Yes |
| `status` | `Pending \| Confirm \| Cancelled` | Yes |
| `bookingDate` | ISO datetime | Yes |

**Success Response — 200 OK**

```json
{
  "success": true,
  "message": "New Booking Created Successfully",
  "data": {
    "id": "booking-uuid",
    "userId": "user-uuid",
    "eventId": "event-uuid",
    "quantity": 2,
    "totalAmount": "3000",
    "status": "Pending",
    "bookingDate": "2026-08-10T12:00:00.000Z",
    "createdAt": "2026-08-10T12:00:00.000Z",
    "updatedAt": "2026-08-10T12:00:00.000Z"
  }
}
```

---

### 6.2 Get Bookings by User

**Endpoint**

```http
GET /api/bookings?userId={userId}
```

**Description**

Returns all bookings belonging to a specific user.

**Success Response — 200 OK**

```json
{
  "success": true,
  "message": "Successfully get all bookings of a user",
  "data": [
    {
      "id": "booking-uuid",
      "userId": "user-uuid",
      "eventId": "event-uuid",
      "quantity": 2,
      "totalAmount": "3000",
      "status": "Pending",
      "bookingDate": "2026-08-10T12:00:00.000Z",
      "createdAt": "2026-08-10T12:00:00.000Z",
      "updatedAt": "2026-08-10T12:00:00.000Z"
    }
  ]
}
```

---

### 6.3 Update Booking

**Endpoint**

```http
PATCH /api/bookings/update?id={bookingId}
```

**Request Body**

```json
{
  "userId": "user-uuid",
  "eventId": "event-uuid",
  "quantity": 3,
  "totalAmount": 4500,
  "status": "Confirm",
  "bookingDate": "2026-08-10T12:00:00.000Z"
}
```

**Success Response — 200 OK**

```json
{
  "success": true,
  "message": "Booking Updated Successfully",
  "data": {}
}
```

---

### 6.4 Cancel Booking

**Endpoint**

```http
DELETE /api/bookings/delete?id={bookingId}
```

**Description**

The current implementation does not physically delete the booking. It updates its status to `Cancelled`.

**Success Response — 200 OK**

```json
{
  "success": true,
  "message": "Booking deleted successfully",
  "data": {
    "id": "booking-uuid",
    "status": "Cancelled"
  }
}
```

---

## 7. Reviews

### 7.1 Create Review

**Endpoint**

```http
POST /api/reviews/create
```

**Description**

Creates a review for an event.

**Request Body**

```json
{
  "userId": "user-uuid",
  "eventId": "event-uuid",
  "rating": 5,
  "comment": "Excellent event. Very informative and well organized."
}
```

| Field | Type | Required |
|---|---|---:|
| `userId` | UUID string | Yes |
| `eventId` | UUID string | Yes |
| `rating` | number | Yes |
| `comment` | string | No |
| `deletedAt` | ISO datetime | No |

**Success Response — 200 OK**

```json
{
  "success": true,
  "message": "New Review Created Successfully",
  "data": {
    "id": "review-uuid",
    "userId": "user-uuid",
    "eventId": "event-uuid",
    "rating": 5,
    "comment": "Excellent event. Very informative and well organized.",
    "deletedAt": null,
    "createdAt": "2026-08-10T12:00:00.000Z",
    "updatedAt": "2026-08-10T12:00:00.000Z"
  }
}
```

---

### 7.2 Get All Reviews

**Endpoint**

```http
GET /api/reviews
```

**Description**

Returns all reviews.

**Success Response — 200 OK**

```json
{
  "success": true,
  "message": "Successfully get all reviews",
  "data": [
    {
      "id": "review-uuid",
      "userId": "user-uuid",
      "eventId": "event-uuid",
      "rating": 5,
      "comment": "Excellent event.",
      "deletedAt": null,
      "createdAt": "2026-08-10T12:00:00.000Z",
      "updatedAt": "2026-08-10T12:00:00.000Z"
    }
  ]
}
```

---

### 7.3 Update Review

**Endpoint**

```http
PATCH /api/reviews/update?id={reviewId}
```

**Request Body**

```json
{
  "userId": "user-uuid",
  "eventId": "event-uuid",
  "rating": 4,
  "comment": "Good event with useful sessions."
}
```

**Success Response — 200 OK**

```json
{
  "success": true,
  "message": "Review Updated Successfully",
  "data": {}
}
```

---

### 7.4 Delete Review

**Endpoint**

```http
DELETE /api/reviews/delete?id={reviewId}
```

**Description**

Soft-deletes a review by setting `deletedAt`.

**Success Response — 200 OK**

```json
{
  "success": true,
  "message": "Review deleted successfully",
  "data": {}
}
```

---

## 8. Root Endpoint

### API Health / Root

**Endpoint**

```http
GET /
```

**Success Response — 200 OK**

```json
{
  "success": true,
  "message": "Hello World"
}
```

---

## 9. Common Error Response

Most non-authentication controllers currently return errors in this structure:

```json
{
  "success": false,
  "message": "Something went wrong"
}
```

Authentication errors use the same basic structure:

```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

## 10. Status Code Summary

| Status | Meaning |
|---:|---|
| `200 OK` | Request completed successfully |
| `201 Created` | New user successfully registered |
| `400 Bad Request` | Registration/validation failure |
| `401 Unauthorized` | Authentication failure |
| `500 Internal Server Error` | Unexpected server/database error |

---

## 11. Data Models

### User

```json
{
  "id": "uuid",
  "email": "string",
  "password": "bcrypt-hash",
  "name": "string",
  "image": "string | null",
  "role": "User | Organizer | Admin",
  "deletedAt": "datetime | null",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### Category

```json
{
  "id": "uuid",
  "name": "string",
  "description": "string | null",
  "deletedAt": "datetime | null",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### Event

```json
{
  "id": "uuid",
  "title": "string",
  "organizerId": "uuid",
  "categoryId": "uuid",
  "description": "string",
  "location": "string | null",
  "capacity": "string | null",
  "price": "decimal",
  "image": "string | null",
  "startDate": "datetime",
  "endDate": "datetime",
  "status": "Draft | Published | Cancelled | Completed",
  "deletedAt": "datetime | null",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### Booking

```json
{
  "id": "uuid",
  "userId": "uuid",
  "eventId": "uuid",
  "quantity": "integer",
  "totalAmount": "decimal",
  "status": "Pending | Confirm | Cancelled",
  "bookingDate": "datetime",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

### Review

```json
{
  "id": "uuid",
  "userId": "uuid",
  "eventId": "uuid",
  "rating": "number",
  "comment": "string | null",
  "deletedAt": "datetime | null",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

---

## 12. Relationship Overview

```text
User
 ├── has many Events
 ├── has many Bookings
 └── has many Reviews

Category
 └── has many Events

Event
 ├── belongs to User (organizer)
 ├── belongs to Category
 ├── has many Bookings
 └── has many Reviews

Booking
 ├── belongs to User
 └── belongs to Event

Review
 ├── belongs to User
 └── belongs to Event
```

---

## 13. Authentication Notes

- Registration hashes passwords with **bcrypt**.
- Login verifies the password using `bcrypt.compare()`.
- Successful login returns a **JWT**.
- The JWT currently contains `userId`, `email`, and `role`.
- JWT expiry is currently configured for **7 days**.
- Soft-deleted users are rejected during login.
- The current repository does not yet attach JWT verification middleware to the resource routes, so the API should not currently be described as fully protected by JWT.
