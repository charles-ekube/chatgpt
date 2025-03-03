export type RatioOption = {
  label: string;
  value: string;
  width: number;
  height: number;
};

export interface EditButtonConfig {
  id: string;
  title: string;
  action: () => void;
  icon: (color: string) => JSX.Element;
  activeColor: string;
}
