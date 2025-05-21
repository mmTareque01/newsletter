// Props for each UI component
export interface UIComponent {
  /**
   * The HTML tag or React component to render
   */
  component: HTMLElementTag | React.ComponentType<any>;

  /**
   * CSS class names
   */
  className?: string;

  /**
   * Child elements
   */
  children?: React.ReactNode;

  /**
   * Unique key for React's reconciliation
   */
  key?: string | number;

  /**
   * All other props that the component might accept
   */
  [key: string]: any;
}

export interface GenerateUIProps {
  /**
   * Array of UI components to render
   */
  UIComponents: UIComponent[];

  /**
   * Optional wrapper component for all items
   */
  wrapperComponent?: HTMLElementTag | React.ComponentType<any>;

  /**
   * Class name for the wrapper component
   */
  wrapperClassName?: string;
}