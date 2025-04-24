# Alpine Library

Alpine Library is a modern web application for managing your reading lists and book collections. It allows users to search for books, create personalized reading lists, and track their reading progress.

[UI Design mocks are available here](https://www.figma.com/design/5fAhWEfiU4S6fPrKrfcrTD/Alpine-Library?node-id=0-1&p=f&t=4GeOhIBv5bTChfZz-0).

## Features

- User authentication (register, login, logout)
- Book search using Google Books API
- Personal reading lists management
- User profiles
- Responsive UI with TailwindCSS

## Technology Stack

- **Framework**: AdonisJS 6 (TypeScript)
- **Database**: LibSQL (SQLite) - intended backend is Turso.tech.
- **ORM**: Lucid ORM
- **Frontend**: Edge templates with TailwindCSS
- **Authentication**: AdonisJS Auth

## Prerequisites

- Node.js (v18 or higher)
- pnpm package manager
- LibSQL/SQLite

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/alpine-library.git
   cd alpine-library
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up environment variables:

   ```bash
   cp .env.example .env
   ```

4. Run database migrations:
   ```bash
   task db:migrate
   ```

## Usage

### Development

Run the development server:

```bash
pnpm dev
```

The app will be available at http://localhost:3333

### Build for Production

```bash
pnpm build
```

### Run Production Server

```bash
pnpm start
```

## Commands

- **Build**: `pnpm build`
- **Development Server**: `pnpm dev`
- **Test**: `pnpm test`
- **Run Single Test**: `node ace test tests/path_to_test.ts`
- **Lint**: `pnpm lint`
- **Format**: `pnpm format`
- **Type Check**: `pnpm typecheck`
- **Database Migration**: `task db:migrate`
- **Database Reset**: `task db:reset`

## Coding Conventions

- **Naming**: snake_case for files, PascalCase for classes, camelCase for methods/variables
- **Imports**: Framework imports first, third-party next, local imports last with # prefix
- **TypeScript**: Use explicit type annotations, interfaces in app/lib/types.ts
- **Controllers**: Follow RESTful conventions (index, show, store, etc.)
- **Error Handling**: Use request validation with @vinejs/vine
- **Model Relations**: Use Lucid ORM with decorators (@column, @hasMany)
- **Routes**: Define in start/routes.ts with meaningful names

## License

This project is licensed under the [Mozilla Public License 2.0](LICENSE).
