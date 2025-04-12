# Eventful.io Frontend

This is the frontend of Eventful.io, built using React, TypeScript, and Vite. It provides a seamless user interface for event management, attendee interaction, and real-time engagement.

---

## Features

- **Dynamic UI**: Role-based conditional rendering for attendees, organizers, and admins.
- **Real-Time Interaction**: Chatroom and video streaming integration.
- **Responsive Design**: Optimized for desktop and mobile devices.

---

## Installation

### Prerequisites

- Node.js version 22.13.1 or later.
- npm or yarn package manager.

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/katkes/SOEN-343-Project.git
   ```
2. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Access the application at [http://localhost:5173](http://localhost:5173).

---

## Code Structure

```
src
├── components       # Reusable UI components
├── pages            # Page-level components
├── hooks            # Custom React hooks
├── context          # Context API for global state management
├── utils            # Utility functions
├── assets           # Static assets (images, icons, etc.)
├── styles           # Global and modular styles
└── main.tsx         # Application entry point
```

---

## Development Guidelines

### ESLint Configuration

- Type-aware linting rules are enabled for better TypeScript support.
- Recommended plugins:
  - `eslint-plugin-react`
  - `typescript-eslint`

### Styling

- Use modular CSS or CSS-in-JS libraries like `styled-components`.

### Testing

- Unit tests with `Jest` and `React Testing Library`.
- End-to-end tests with `Cypress`.

---

## Future Enhancements

- Add environment variable documentation.
- Improve production deployment guidelines.

---

Thank you for contributing to the Eventful.io frontend! 🚀
