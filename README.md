# Sroof UI

A modern React UI component library with TypeScript support and internationalization.

## Installation

```bash
npm install @your-username/sroof-ui
# or
yarn add @your-username/sroof-ui
```

## Usage

```tsx
import { Button, LanguageSwitcher } from '@your-username/sroof-ui';
import '@your-username/sroof-ui/dist/index.css';

function App() {
  return (
    <div>
      <Button variant="primary">Click me</Button>
      <LanguageSwitcher />
    </div>
  );
}
```

## Components

- **Button**: Customizable button component
- **Input**: Form input with validation
- **LanguageSwitcher**: Internationalization language switcher

## Development

```bash
# Install dependencies
npm install

# Start Storybook
npm run storybook

# Build library
npm run build:lib
```

## License

MIT