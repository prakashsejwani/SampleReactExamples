# Sample React Examples

This repository contains a collection of React components and custom hooks, implemented with TypeScript and Vite. It serves as a reference for common UI patterns and React hook implementations.

## Setup & Installation

**Prerequisites:**
- Node.js version **24.11.1** (Enforced via `.nvmrc`)

### 1. Install Dependencies

```bash
# Ensure you are using the correct node version
source ~/.nvm/nvm.sh  # Adjust path if different
nvm use 24.11.1

npm install
```

### 2. Run Development Server

The development server runs on port `3002`.

```bash
npm run dev -- --port 3002
```

### 3. Run Tests

Tests are written using Vitest/Jest and React Testing Library.

```bash
# Run all tests
npm run test
```

## Components

### UI Components

- **Accordion**: A collapsible content panel that allows users to toggle the visibility of sections.
- **ContactForm**: A form with validation handling name, email, and message inputs, simulating an API submission.
- **Counter**: A simple counter component demonstrating state management.
- **DigitalClock**: A clock component that updates in real-time.
- **HolyGrail**: A implementation of the classic "Holy Grail Layout" (Header, Footer, Main, Left/Right Sidebars).
- **ImageCarousel**: A slider/carousel component for cycling through a series of images.
- **JobBoard**: A component displaying a list of job postings, likely fetching from an API (Hacker News).
- **LikeButton**: A button with heart animation and state toggling.
- **ProgressBars**: Visual indicators of task completion or loading states.
- **StarRating**: An interactive star rating component.
- **Stopwatch**: A timer with start, stop, and reset functionality.
- **Tabs**: A navigation component for switching between different views/content in the same context.
- **TodoList**: A classic To-Do application supporting adding, removing, and toggling tasks.
- **TrafficLight**: A simulation of a traffic light system with timed state transitions.

### Custom Hooks

- **UseArray**: A hook providing utility methods for array manipulation (push, remove, filter, clear, etc.).
- **UseBoolean**: A simple hook for managing boolean state with `setTrue`, `setFalse`, and `toggle` helpers.
- **UseCounter**: A hook for managing numeric count state (increment, decrement, reset, set).
- **UseCounter2**: An alternative or extended implementation of the counter hook.
- **UseCycle**: A hook for cycling through a defined set of values (e.g., list of colors or states).
- **UseQuery**: A hook for fetching data asynchronously, handling loading and error states.

## Project Structure

```
src/
  ├── components/       # Individual component and hook directories
  ├── App.tsx          # Main entry component
  ├── main.tsx         # Application entry point
  └── setupTests.ts    # Test configuration
```

## Technologies

- **React 18**
- **TypeScript**
- **Vite**
- **Vitest / Jest**
- **React Testing Library**
- **Sass (SCSS)**

## License

MIT
