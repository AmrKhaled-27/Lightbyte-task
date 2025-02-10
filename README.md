# URL Shortener

## Overview

This is a URL Shortener built using [NestJS](https://nestjs.com/) and PostgreSQL. It allows users to shorten long URLs and retrieve them using a unique identifier. The project is containerized with Docker and can be easily deployed using Docker Compose.

## 🛠 Features

- Generate short URLs for long links
- Redirect to original URLs using short identifiers
- Dockerized for easy deployment

## 📦 Tech Stack

- **Backend:** [NestJS](https://nestjs.com/)
- **Database:** PostgreSQL
- **Containerization:** Docker & Docker Compose

---

## 📥 Installation

### **1️⃣ Clone the Repository**

```sh
git https://github.com/AmrKhaled-27/Lightbyte-task.git
cd url-shortener
```

### **2️⃣ Set Up Environment Variables**

Create a `.env` file like the .env.example(this will be used by docker), note that if you want to run in dev mode
you will have to create a `.env.dev` file

> **Note:** Make sure to update the database credentials as per your setup.

### **3️⃣ Run the Application with Docker**

```sh
docker compose up -d
```

This will:

- Start the NestJS server
- Start PostgreSQL in a container

### **4️⃣ Running the App Locally (Without Docker)**

Ensure PostgreSQL is installed and running and that you have a `.env.dev` file, then run:

```sh
yarn
yarn run start:dev
```

---
