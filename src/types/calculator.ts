export type CalculatorFieldType = 'number' | 'select';

export interface CalculatorOption {
  label: string;
  value: number | string;
}

export interface CalculatorField {
  id: string;
  label: string;
  type: CalculatorFieldType;
  defaultValue: number | string | boolean;
  placeholder?: string;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
  options?: CalculatorOption[];
  description?: string;
}

export interface DimensionFieldConfig {
  id: string;
  label: string;
  unit: string;
  min?: number;
  max?: number;
  step: number;
  defaultValue: number;
}

export interface ProfileOption {
  id: string;
  label: string;
  description?: string;
  image: string;
  pricePerSqM: number;
}

export interface ColorOption {
  id: string;
  label: string;
  swatch: string;
  pricePerMeterByProfile: {
    slim: number;
    quadro: number;
    wide: number;
  };
}

export type AccessoryCalculation = 'perimeter' | 'pieces';

export interface AccessoryOption {
  id: string;
  label: string;
  description: string;
  locked: boolean;
  defaultValue: boolean;
  calculation: AccessoryCalculation;
  pricePerMeter?: number;
  pricePerPiece?: number;
  pieces?: number;
}

export type MillingMode = 'hinge' | 'weights' | 'none';

export interface MillingOption {
  id: MillingMode;
  label: string;
  description?: string;
  requiresQuantity: boolean;
  inputLabel?: string;
  minQuantity?: number;
  defaultQuantity?: number;
  pricePerUnit?: number;
  pricePerUnitByProfile?: {
    slim: number;
    quadro: number;
    wide: number;
  };
}

export type HingeMode = 'softClose' | 'standard' | 'client';

export interface HingeOption {
  id: HingeMode;
  label: string;
  description?: string;
  requiresQuantity: boolean;
  inputLabel?: string;
  minQuantity?: number;
  defaultQuantity?: number;
  pricePerUnit: number;
}

export interface FillingOption {
  id: string;
  label: string;
  description?: string;
  pricePerSqM: number;
}

export interface FillingsConfig {
  catalogLabel: string;
  items: FillingOption[];
  customOption: {
    id: string;
    label: string;
  };
}

export interface FacadeCalculatorConfig {
  dimensions: {
    height: DimensionFieldConfig;
    width: DimensionFieldConfig;
  };
  basePricePerSqM: number;
  profiles: ProfileOption[];
  colors: ColorOption[];
  accessories: AccessoryOption[];
  milling: MillingOption[];
  hinges: HingeOption[];
  fillings: FillingsConfig;
}

export type FillingMode = 'catalog' | 'custom';

export interface CalculatorFormState {
  height: number | null;
  width: number | null;
  profileId: string;
  colorId: string;
  milling: {
    mode: MillingMode | '';
    quantity: number;
  };
  hinges: {
    mode: HingeMode | '';
    quantity: number;
  };
  fillingMode: FillingMode;
  fillingItems: string[];
}

export interface CalculatorBreakdownItem {
  id: string;
  label: string;
  value: number;
}

export interface CalculatorResults {
  total: number;
  breakdown: CalculatorBreakdownItem[];
}

