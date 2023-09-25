# Image Search App Readme

Welcome to the Image Search App! This document will guide you through setting up and running the application. Please follow the steps below to get started.

## Before You Run

Before running the application, you need to provide your Pixabay API key. Follow these steps:

1. Open the `.env` file in the project root directory.
2. Locate the variable `REACT_APP_PIXABAY_API_KEY`.
3. Replace the placeholder value with your actual Pixabay API key.

## Running the Application with Docker

We offer a convenient way to run the application using Docker. Follow these steps:

### Build the Docker Image

```
docker-compose build
```
### Run the Application

``` 
docker-compose up
```
### Stop and Remove Containers
To stop and remove the running containers, use the following command:

```
docker-compose down
```
## Running the Application Without Docker

If you prefer to run the application without Docker, follow these steps:

Install Dependencies
```
npm install
```

Start the Application
```
npm start
```

Note: CORS Issues

When running the application without Docker, you may encounter CORS (Cross-Origin Resource Sharing) issues, especially if your development server and the API server have different origins. To address these issues, you can configure your server or use browser extensions to disable CORS temporarily for development purposes.
