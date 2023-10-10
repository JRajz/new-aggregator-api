# News Aggregator API Documentation

This documentation provides comprehensive information about the API endpoints and the associated authorization methods for the News Aggregator API. The News Aggregator API seamlessly integrates with the [newsdata.io service](https://newsdata.io/documentation) to deliver up-to-date news content.

**POSTMAN COLLECTION**: [View Postman Collection](https://www.postman.com/cryosat-cosmonaut-54527758/workspace/development/collection/22854732-87ade348-3306-4b0c-87fe-2eb64ec41459?action=share&creator=22854732)

## User Endpoints

### Register User

- **Method**: POST
- **URL**: `http://localhost:3000/register`
- **Authorization**: None
- **Body**:

  ```json
  {
    "name": "jishnu",
    "email": "jrnew@gmail.com",
    "password": "jr@12345"
  }
  ```

### User Login

- **Method**: POST
- **URL**: `http://localhost:3000/login`
- **Authorization**: None
- **Body**:

  ```json
  {
    "email": "jrnew@gmail.com",
    "password": "jr@12345"
  }
  ```

- If Authentication is successful you will receive `AccessToken` in **Response**.

### Get User Profile

- **Method**: GET
- **URL**: `http://localhost:3000/profile`
- **Authorization**: Access Token

## Preferences Endpoints

### Get User Preferences

- **Method**: GET
- **URL**: `http://localhost:3000/preferences`
- **Authorization**: Access Token

### Update User Preferences

- **Method**: PUT
- **URL**: http://localhost:3000/preferences
- **Authorization**: Access Token
- **Body**:

  ```json
  {
    "preferences": ["sports", "science", "top"]
  }
  ```

## News Endpoints

### Get News

- **Method**: GET
- **URL**: `http://localhost:3000/news`
- **Authorization**: Access Token
- **Description**: Retrieve news articles based on user preferences.
