# News Aggregator API Documentation

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [API Endpoints](#api-endpoints)
- [Dependencies](#dependencies)
- [Development and Testing](#development-and-testing)
- [Author](#author)

## Description

This documentation provides comprehensive information about the API endpoints and the associated authorization methods for the News Aggregator API. The News Aggregator API seamlessly integrates with the [NewsData.io](https://newsdata.io/documentation) service to deliver up-to-date news content.

**POSTMAN COLLECTION**: [View Postman Collection](https://www.postman.com/cryosat-cosmonaut-54527758/workspace/development/collection/22854732-87ade348-3306-4b0c-87fe-2eb64ec41459?action=share&creator=22854732)

## Installation

To get started with the News Aggregator API, follow these steps:

1. Clone this repository to your local machine.
2. Navigate to the project directory.
3. Install the required dependencies using the following command:

```bash
npm install
```

4. Create a `.env` file in the root directory and configure your environment variables. You can use the provided `.env.sample` as a reference.

5. Start the API server with the following command:

```bash
npm run auto
```

## Environment Setup

Before using the News Aggregator API, you'll need to set up your environment variables. Follow these steps:

1. Create a `.env` file in the root directory of your project.

2. Copy the contents from the provided `.env.sample` file to your newly created `.env` file.

3. Fill in the required values in your `.env` file, such as API keys and other configuration details.

4. Save and secure your `.env` file. Do not share it publicly, as it contains sensitive information.

## API Endpoints

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

### Get User Read News

- **Method**: POST
- **URL**: `http://localhost:3000/news/read`
- **Authorization**: Access Token
- **Description**: Retrieve news articles read by user.

#### Mark Article as Read/Unread

- **Method**: POST
- **URL**: `http://localhost:3000/news/:id/read`
- **Authorization**: Access Token
- **Path Variables**:
  - `id`: Article ID
- **Description**: Mark an article as read/unread.

#### Get User's Favorite News

- **Method**: GET
- **URL**: `http://localhost:3000/news/favorite`
- **Authorization**: Access Token
- **Description**: Get the user's favorite news articles.

#### Mark Article as Favorite

- **Method**: POST
- **URL**: `http://localhost:3000/news/:id/favorite`
- **Authorization**: Access Token
- **Path Variables**:
  - `id`: News Article ID
- **Description**: Mark an article as a favorite/unfavourite.

## Dependencies

The News Aggregator API relies on the following dependencies:

- [axios](https://www.npmjs.com/package/axios)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [date-fns](https://www.npmjs.com/package/date-fns)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [express](https://www.npmjs.com/package/express)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [node-cron](https://www.npmjs.com/package/node-cron)
- [path](https://www.npmjs.com/package/path)
- [uuid](https://www.npmjs.com/package/uuid)

For specific versions, please refer to the [package.json](./package.json) file.

## Development and Testing

To facilitate development and testing, the News Aggregator API uses the following development dependencies:

- [chai](https://www.npmjs.com/package/chai)
- [chai-http](https://www.npmjs.com/package/chai-http)
- [mocha](https://www.npmjs.com/package/mocha)
- [nodemon](https://www.npmjs.com/package/nodemon)

## Running Tests

To run tests, run the following command

```bash
  npm run test
```

## Author

- [@Jishnu Raj](https://github.com/JRajz)
