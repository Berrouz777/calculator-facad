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
}

export interface AdditionalProfileLengthOption {
  id: string;
  label: string;
  price: number;
}

interface AdditionalProfileBase {
  id: string;
  label: string;
  image: string;
  requiredProfileId: string;
  allowedColorIds: string[];
}

interface FixedAdditionalProfileOption extends AdditionalProfileBase {
  price: number;
  lengthOptions?: never;
}

interface LengthAdditionalProfileOption extends AdditionalProfileBase {
  price?: never;
  lengthOptions: AdditionalProfileLengthOption[];
}

export type AdditionalProfileOption =
  | FixedAdditionalProfileOption
  | LengthAdditionalProfileOption;

export interface ColorOption {
  id: string;
  label: string;
  swatch: string;
  pricePerMeterByProfile: {
    pf_01: number;
    pf_02: number;
    pf_03: number;
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
    pf_01: number;
    pf_02: number;
    pf_03: number;
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
  profiles: ProfileOption[];
  additionalProfiles: AdditionalProfileOption[];
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
  additionalProfileId: string;
  additionalProfileLengthId: string;
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

