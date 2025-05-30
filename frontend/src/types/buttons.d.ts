export interface IconButtonProps {
  onClick?: (e: React.MouseEvent<SVGElement>) => void;
  color?: string;
  cursor?: React.CSSProperties['cursor'];
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}