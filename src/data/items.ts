export type DemoItem = {
  id: string;
  name: string;
  icon: string;
  category: string;
  description: string;
};

// Deliberately generic, original placeholder content - not modelled on any
// third-party product catalog - so this stays a clean, reusable fixture.
export const DEMO_ITEMS: DemoItem[] = [
  {
    id: 'widget-a',
    name: 'Widget A - Standard',
    icon: '\u25A0',
    category: 'Widgets',
    description: 'A standard-issue test widget used to validate basic list-to-detail navigation.',
  },
  {
    id: 'widget-b',
    name: 'Widget B - Compact',
    icon: '\u25B2',
    category: 'Widgets',
    description: 'A smaller variant, useful for testing image/label scaling in detail views.',
  },
  {
    id: 'gadget-a',
    name: 'Gadget A - Rotating',
    icon: '\u25CF',
    category: 'Gadgets',
    description: 'Represents an item with a rotating/animated state indicator.',
  },
  {
    id: 'gadget-b',
    name: 'Gadget B - Networked',
    icon: '\u25C6',
    category: 'Gadgets',
    description: 'Represents an item whose detail screen depends on a network call.',
  },
  {
    id: 'gizmo-a',
    name: 'Gizmo A - Limited',
    icon: '\u2605',
    category: 'Gizmos',
    description: 'A limited-availability item, useful for testing quantity/stock edge cases.',
  },
  {
    id: 'gizmo-b',
    name: 'Gizmo B - Bundle',
    icon: '\u2666',
    category: 'Gizmos',
    description: 'A bundle item, useful for testing multi-line descriptions and longer text.',
  },
];
