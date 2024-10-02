# Backend Report Generator with Image Upload

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
  - [API Endpoints](#api-endpoints)
  - [Generate Report Example](#generate-report-example)
  - [Upload Image Example](#upload-image-example)
- [Folder Structure](#folder-structure)

## Overview

This is a backend service built with Node.js that can generate a QC report based on input data provided through an API, as well as upload images. The report can be generated in both **Excel (.xlsx)** format and optionally read specific values from the uploaded images. It uses Multer for handling file uploads and ExcelJS for handling Excel files.

## Features

- Generate QC report in Excel format.
- Upload images with a custom filename.
- Insert uploaded image into a specific cell in the Excel report.

## Technologies Used

- Node.js
- Express.js
- Multer (for file uploads)
- ExcelJS (for generating Excel reports)
- PDFKit (for generating PDF reports)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/gesarizky/backend-report.git
    ```

2. Navigate into the project directory:

    ```bash
    cd backend-report
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Run the application:

    ```bash
    npm run dev
    ```

## Usage

### API Endpoints

#### 1. Upload Image

**URL**: `/api/upload/image`

- **Method**: `POST`
- **Content-Type**: `multipart/form-data`
- **Body Parameters**:
  - `image`: The image file to be uploaded.
  - `filename`: (Optional) A custom filename for the uploaded image.

**Response**:

- On success:

  ```json
  {
    "msg": "File uploaded successfully",
    "filename": "image-1684675895437-123456.jpg",
    "path": "/uploads/image-1684675895437-123456.jpg"
  }
  ```

- On failure:

  ```json
  {
    "msg": "No file uploaded"
  }
  ```

#### 2. Generate Report

**URL**: `/api/report/generate`

- **Method**: `POST`
- **Content-Type**: `application/json`
- **Body Parameters**:

  ```json
  {
  "Data": {
    "product": "Product 1",
    "sn": "sample_product",
    "date": "2 September 2024",
    "customer": "",
    "value1": "50",
    "value2": "51",
    "tester": "Gesa",
    "checker":"rizky"
  },
  "format": "xlsx"
  }
  ```

**Response**:

- On success (for Excel report):
  - The generated `.xlsx` file will be downloaded automatically.

- On failure:

  ```json
  {
    "msg": "Invalid format"
  }
  ```

### Generate Report Example

In Postman:

1. Set the request type to **POST**.
2. URL: `http://localhost:5000/api/report/generate`
3. Under **Body**, select **raw** and choose **JSON** format.
4. Paste the following JSON:

   ```json
   {
    "Data": {
     "product": "Product 1",
     "sn": "sample_product",
     "date": "2 September 2024",
     "customer": "",
     "value1": "50",
     "value2": "51",
     "tester": "Gesa",
     "checker":"rizky"
    },
    "format": "xlsx"
   }
   ```

5. The `.xlsx` file will be generated and downloaded as a response.

### Upload Image Example

In Postman:

1. Set the request type to **POST**.
2. URL: `http://localhost:5000/api/upload/image`
3. Under **Body**, select **form-data** and set the following fields:
   - Key: `image` → Type: **File** → Choose the image file.
   - Key: `filename` → Type: **Text** → Set your custom filename (optional).
4. Send the request, and you will receive the uploaded image's path as a response.

## Folder Structure

```bash
backend-qc-report/
├── controller/
│   ├── reportController.js     # Handles report generation
│   ├── uploadController.js     # Handles image upload
├── routes/
│   ├── reportRoutes.js         # Routes for report generation
│   ├── uploadRoutes.js         # Routes for image upload
├── templates/
│   └── sample_report.xlsx   # Excel template file
├── uploads/                    # Directory where uploaded files are stored
├── server.js                   # Main server file
├── package.json                # Project dependencies and scripts
└── README.md                   # This file
```

## Notes

- Ensure that the `uploads/` folder has the correct permissions for writing files.
- Ensure that filename image same with serial number (sn)
