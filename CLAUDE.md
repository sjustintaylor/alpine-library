# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
Alpine Library is an AdonisJS TypeScript application following MVC architecture.

## Commands
- Build: `pnpm build`
- Run dev server: `pnpm dev`
- Test: `pnpm test`
- Run single test: `node ace test tests/path_to_test.ts`
- Lint: `pnpm lint`
- Format: `pnpm format`
- Type check: `pnpm typecheck`
- Database: `task db:migrate` or `task db:reset`

## Coding Conventions
- **Naming**: snake_case for files, PascalCase for classes, camelCase for methods/variables
- **Imports**: Framework imports first, third-party next, local imports last with # prefix
- **TypeScript**: Use explicit type annotations, interfaces in app/lib/types.ts
- **Controllers**: Follow RESTful conventions (index, show, store, etc.)
- **Error Handling**: Use request validation with @vinejs/vine
- **Model Relations**: Use Lucid ORM with decorators (@column, @hasMany)
- **Routes**: Define in start/routes.ts with meaningful names