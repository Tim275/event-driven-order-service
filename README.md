# Event-Driven Store

![image](https://github.com/Tim275/event-driven-order-service-backend/assets/117520669/1c5e86ae-5f9c-4fd2-957b-1dd086705af1)


Event-Driven Store is a serverless application built on AWS, using Node.js and on AWS SAM. It demonstrates the power of event-driven computing in a loosely coupled system, leveraging the asynchrony of serverless architectures.

## Overview

The application simulates an e-commerce store, where tasks such as inventory check, price calculation, payment processing, and customer notification are handled asynchronously and independently, demonstrating the power and flexibility of event-driven architectures.

## Features

- **Event-Driven Computing**: Each component of the system operates independently, responding to events and generating new ones.
- **Loose Coupling**: Components are independent and interact through events, making the system flexible and resilient.
- **Asynchronous Operations**: Tasks are performed concurrently without blocking the main thread, improving performance and responsiveness.

## Getting Started

To get started with this project, you need to have AWS CLI and SAM CLI installed on your machine. You also need to have an AWS account with access and secret keys.

1. Clone this repository: `git clone https://github.com/Tim275/event-driven-order-service-backend.git`
2. Navigate to the project directory: `cd event-driven-order-service-backend`
3. Install dependencies: `npm install`
4. Deploy the application: `sam deploy --guided`

