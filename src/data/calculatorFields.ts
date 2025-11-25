import type { FacadeCalculatorConfig } from '../types/calculator';
import { priceBook } from './pricing';
import imgkc from '../img/kc.png';
import imgf1_99 from '../img/f1-99.png';
import imgf1_93 from '../img/f1-93.png';

export const calculatorConfig: FacadeCalculatorConfig = {
  dimensions: {
    height: {
      id: 'height',
      label: 'Высота',
      unit: 'мм',
      step: 10,
      defaultValue: 2400,
    },
    width: {
      id: 'width',
      label: 'Ширина',
      unit: 'мм',
      step: 10,
      defaultValue: 700,
    },
  },
  basePricePerSqM: priceBook.basePerSquareMeter,
  profiles: [
    {
      id: 'slim',
      label: 'KC (45мм)',
      image: imgkc,
      pricePerSqM: priceBook.profiles.slim,
    },
    {
      id: 'quadro',
      label: 'F1-99 (19х21мм)',
      image: imgf1_99,
      pricePerSqM: priceBook.profiles.quadro,
    },
    {
      id: 'wide',
      label: 'F1-93 (19х21мм)',
      image: imgf1_93,
      pricePerSqM: priceBook.profiles.wide,
    },
  ],
  colors: [
    {
      id: 'snow-white',
      label: 'Черный',
      swatch: '#000000',
      pricePerMeterByProfile: priceBook.colors.snow,
    },
    {
      id: 'warm-sand',
      label: 'Белый',
      swatch: '#FFFFFF',
      pricePerMeterByProfile: priceBook.colors.warm,
    },
    {
      id: 'deep-graphite',
      label: 'Серебро',
      swatch: '#C0C0C0',
      pricePerMeterByProfile: priceBook.colors.graphite,
    },
    {
      id: 'soft-bronze',
      label: 'Золото',
      swatch: '#E6D5B8',
      pricePerMeterByProfile: priceBook.colors.bronze,
    },
  ],
  accessories: [
    {
      id: 'sealant',
      label: 'Уплотнитель',
      description: 'Силиконовый контур по периметру фасада.',
      locked: true,
      defaultValue: true,
      calculation: 'perimeter',
      pricePerMeter: priceBook.accessories.sealantPerMeter,
    },
    {
      id: 'corner',
      label: 'Уголок соединительный',
      description: 'Комплект из четырёх углов с усилением.',
      locked: true,
      defaultValue: true,
      calculation: 'pieces',
      pieces: priceBook.accessories.cornerPiecesIncluded,
      pricePerPiece: priceBook.accessories.cornerPerPiece,
    },
  ],
  milling: [
    {
      id: 'hinge',
      label: 'Под петлю',
      requiresQuantity: true,
      minQuantity: 2,
      defaultQuantity: 4,
      pricePerUnitByProfile: priceBook.milling.hinge,
    },
    {
      id: 'weights',
      label: 'Под веса',
      requiresQuantity: true,
      minQuantity: 1,
      defaultQuantity: 2,
      pricePerUnit: priceBook.milling.weights,
    },
    {
      id: 'none',
      label: 'Без фрезеровки',
      requiresQuantity: false,
      pricePerUnit: 0,
    },
  ],
  hinges: [
    {
      id: 'softClose',
      label: 'С доводчиком',
      requiresQuantity: true,
      minQuantity: 2,
      defaultQuantity: 4,
      pricePerUnit: priceBook.hinges.softClose,
    },
    {
      id: 'standard',
      label: 'Без доводчика',
      requiresQuantity: true,
      minQuantity: 2,
      defaultQuantity: 4,
      pricePerUnit: priceBook.hinges.regular,
    },
    {
      id: 'client',
      label: 'Петли заказчика',
      requiresQuantity: false,
      pricePerUnit: priceBook.hinges.client,
    },
  ],
  fillings: {
    catalogLabel: 'Каталог наполнений',
    items: [
      { id: 'clearGlass', label: 'Зеркало', pricePerSqM: priceBook.fillings.clearGlass },
      { id: 'ultraClear', label: 'Стекло', pricePerSqM: priceBook.fillings.ultraClear },
      { id: 'graphiteGlass', label: 'Графит', pricePerSqM: priceBook.fillings.graphiteGlass },
      { id: 'bronzeGlass', label: 'Бронза', pricePerSqM: priceBook.fillings.bronzeGlass },
      { id: 'mirrorSilver', label: 'Сатин', pricePerSqM: priceBook.fillings.mirrorSilver },
    ],
    customOption: {
      id: 'clientGlass',
      label: 'Другое',
    },
  },
};

export const calculatorFields = calculatorConfig;

