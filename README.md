# Sroof UI

A modern React UI component library with TypeScript support and internationalization.

## Installation

```bash
npm install sroof-ui
# or
yarn add sroof-ui
```

## Usage

```tsx
import { Button, LanguageSwitcher, Menu, Tabs, Tab, Radio, Switch, Form } from 'sroof-ui';
import 'sroof-ui/dist/index.css';

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

- **Button**: Customizable button component with multiple variants
- **Input**: Form input with validation support
- **LanguageSwitcher**: Internationalization language switcher
- **Menu**: Flexible menu component with horizontal/vertical layouts
- **Tabs**: Tab navigation component with controlled/uncontrolled modes
- **Radio**: Radio button component for single selection
- **Switch**: Toggle switch component
- **Form**: Form wrapper component with validation

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