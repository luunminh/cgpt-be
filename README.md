<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="100" alt="Nest Logo" /></a>
</p>

<h1 align="center">NestJS Caigiaphaitra with Clean Architecture</h1>

<div align="center">
<img src="public/img/clean-architecture.jpg" width="90%" alt="Clean Architecture" />
</div>

# Introduction

Clean Architecture is a software design pattern that separates the code into multiple concentric circles of responsibility, where the innermost circle contains the business logic and the outermost circle contains the delivery mechanism. This structure helps to ensure that the code is maintainable, testable, and scalable over time.

- In the image above, as more details are added towards the center, the level becomes increasingly higher. This means that the closer it is to the rear, the lower the level
- High level: More "abstract"
- Low level: More detail

<hr/>
- <a href="https://www.youtube.com/watch?v=p0bHhVSo_ME">Explaination video</a>

# Folders Structure

The following is a typical folder structure for implementing Clean Architecture in a NestJS application:

```
.
├── + use-cases
│   ├── + user
│   └── + auth
│   └── + ...
│
├── + adapter
│   ├── + user
│   └── + auth
│   └── + ...
│
├── + core
│   ├── + entities
│   └── + repositories
│
├── + infra
│   ├── + data (database)
│   └── + config (env, ...)
│   └── + modules
│       └── + controller
│       └── + [module-name].modules.ts
│
├── + shared
│   └── + dtos
│   └── + utils
│   └── + decorators
```

- `core`: contains the business logic of the application, such as entities, use cases, and interfaces.

- `use-cases (Application Layer)`: Business logic and rules that govern how entities behave.

- `adapter`: Input/output handling, controllers, or UI logic.

- `infra`: Frameworks, databases, and external services used to fulfill the use cases.

- `shared`: contains code that can be shared between multiple modules, such as models and DTOs.

## Core Folder

The `core` folder contains the core logic of the application, such as entities, repositories. It should have no knowledge of the delivery mechanism, such as the HTTP API or the database.

### Entities

Entities are the objects that represent the business domain, such as user, product, or order. They should be defined in a plain TypeScript class, with properties and methods that match the business requirements.

### Repositories

Repositories are the contracts that define the expected behavior of the delivery mechanism. They must be defined in the core, without implementation details.

## Use Cases Folder

Use cases are the actions that can be performed in the application, such as creating a user, retrieving a product, or processing an order. They should be defined as interfaces, with a clear definition of the inputs and outputs.

## Adapter Folder

The `adapter` folder contains some necessary function which using for format/handling inputs/outputs.

## Infra Folder

The `infra` folder contains the implementation of the interfaces defined in the core, such as data sources and services. It should have no knowledge of the business logic.

### Data Sources

Data sources are the objects that access the data storage, such as a database or a REST API. They should implement the interfaces defined in the core, with the specific implementation details.

## Shared Folder

The `shared` folder contains code that can be shared between multiple modules, such as models and DTOs. It should have no knowledge of the business logic or the delivery mechanism.

### DTOs

DTOs are the objects that represent the data transfer between different layers of the application, such as a user DTO or a product DTO. They should be defined in a plain TypeScript class, with properties and methods that match the data requirements.

## Use-Cases Folder

The `use-cases` folder contains the implementation of the use cases defined in the core, such as controllers and middleware. It should have no knowledge of the business logic.

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## License

This project is licensed under the terms of the [MIT license](https://github.com/wesleey/nest-clean-architecture/blob/HEAD/LICENSE).
