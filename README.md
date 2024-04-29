# Event-Driven Store

![Event-Driven Store](/assets/eventdrivendark.png)

Event-Driven Store is a serverless application built on AWS, using Node.js and the Serverless framework. It demonstrates the power of event-driven computing in a loosely coupled system, leveraging the asynchrony of serverless architectures.

## Overview

This project was inspired by the talk given by Amazon's CTO, Dr. Werner Vogels, at the last year's re:Invent. The main theme of the talk was "The World is Asynchronous", emphasizing the importance of Event-Driven Computing, Loose Coupling, and Asynchrony in today's software development.

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

## Contributing

Contributions are welcome! Please read the [contributing guidelines](CONTRIBUTING.md) first.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
