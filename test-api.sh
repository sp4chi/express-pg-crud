#!/usr/bin/env bash

# Base API URL (adjust port if different in .env)
BASE_URL="http://localhost:3001"

echo "=================================================="
echo " Starting API Tests on $BASE_URL"
echo "=================================================="

# 1. Test Database Connection
echo -e "\n1. Testing DB Connection (GET /db)..."
curl -s -w "\nHTTP Status: %{http_code}\n" -X GET "$BASE_URL/db"

# 2. Create User
echo -e "\n2. Creating a new user (POST /api/user)..."
CREATE_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$BASE_URL/api/user" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "johndoe@example.com"
  }')

HTTP_BODY=$(echo "$CREATE_RESPONSE" | sed '$d')
HTTP_CODE=$(echo "$CREATE_RESPONSE" | tail -n 1)

echo "$HTTP_BODY"
echo "HTTP Status: $HTTP_CODE"

# Extract user ID (works with or without jq using python)
USER_ID=$(python3 -c "import sys, json; data=json.loads(sys.stdin.read()); print(data.get('data', {}).get('id', '1'))" <<< "$HTTP_BODY" 2>/dev/null || echo "1")
echo "Extracted User ID: $USER_ID"

# 3. Get All Users
echo -e "\n3. Fetching all users (GET /api/user)..."
curl -s -w "\nHTTP Status: %{http_code}\n" -X GET "$BASE_URL/api/user"

# 4. Get User by ID
echo -e "\n4. Fetching user by ID (GET /api/user/$USER_ID)..."
curl -s -w "\nHTTP Status: %{http_code}\n" -X GET "$BASE_URL/api/user/$USER_ID"

# 5. Update User
echo -e "\n5. Updating user (PUT /api/user/$USER_ID)..."
curl -s -w "\nHTTP Status: %{http_code}\n" -X PUT "$BASE_URL/api/user/$USER_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Johnathan Doe",
    "email": "johnathan@example.com"
  }'

# 6. Delete User
echo -e "\n6. Deleting user (DELETE /api/user/$USER_ID)..."
curl -s -w "\nHTTP Status: %{http_code}\n" -X DELETE "$BASE_URL/api/user/$USER_ID"

# 7. Verify User is Deleted (Should return 404)
echo -e "\n7. Verifying deleted user returns 404 (GET /api/user/$USER_ID)..."
curl -s -w "\nHTTP Status: %{http_code}\n" -X GET "$BASE_URL/api/user/$USER_ID"

echo -e "\n=================================================="
echo " Tests Complete!"
echo "=================================================="
