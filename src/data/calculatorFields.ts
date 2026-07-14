import type { FacadeCalculatorConfig } from '../types/calculator';
import { priceBook } from './pricing';
import imgpf_01 from '../img/pf_01.png';
import imgpf_02 from '../img/pf_02.png';
import imgpf_03 from '../img/pf_03.png';
import imgpf_13 from '../img/pf_13.png';
import imgpf_14 from '../img/pf_14.png';

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
  profiles: [
    {
      id: 'pf_01',
      label: 'PF-01',
      image: imgpf_01,
    },
    {
      id: 'pf_02',
      label: 'PF-02',
      image: imgpf_02,
    },
    {
      id: 'pf_03',
      label: 'PF-03',
      image: imgpf_03,
    },
  ],
  additionalProfiles: [
    {
      id: 'pf_13',
      label: 'PF-13 250мм',
      image: imgpf_13,
      price: 1500,
      requiredProfileId: 'pf_03',
    },
    {
      id: 'pf_14',
      label: 'PF-14 250мм',
      image: imgpf_14,
      price: 1500,
      requiredProfileId: 'pf_03',
    },
  ],
  colors: [
    {
      id: 'black',
      label: 'Черный матовый',
      swatch: '#2a2a2a',
      pricePerMeterByProfile: priceBook.colors.black_matte,
    },
    {
      id: 'black_brush_matte',
      label: 'Черный браш матовый',
      swatch: 'repeating-linear-gradient(90deg, #1a1a1a 0px, #2d2d2d 1px, #1a1a1a 2px, #333 3px)',
      pricePerMeterByProfile: priceBook.colors.black_brush_matte,
    },
    {
      id: 'white_gloss',
      label: 'Белый глянец',
      swatch: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 35%, #ffffff 55%, #ebebeb 100%)',
      pricePerMeterByProfile: priceBook.colors.white_gloss,
    },
    {
      id: 'white_matte',
      label: 'Белый матовый',
      swatch: '#F0F0F0',
      pricePerMeterByProfile: priceBook.colors.white_matte,
    },
    {
      id: 'graphite_brush_gloss',
      label: 'Графит браш глянец',
      swatch: 'linear-gradient(145deg, rgba(255,255,255,.25) 0%, transparent 45%, rgba(255,255,255,.12) 70%, transparent 100%), repeating-linear-gradient(90deg, #525252 0px, #707070 1px, #525252 2px, #656565 3px)',
      pricePerMeterByProfile: priceBook.colors.graphite_brush_gloss,
    },
    {
      id: 'graphite_brush_matte',
      label: 'Графит браш матовый',
      swatch: 'repeating-linear-gradient(90deg, #4a4a4a 0px, #585858 1px, #4a4a4a 2px, #525252 3px)',
      pricePerMeterByProfile: priceBook.colors.graphite_brush_matte,
    },
    {
      id: 'gold_anode',
      label: 'Золото анод',
      swatch: 'linear-gradient(145deg, #f2d96b 0%, #d4af37 40%, #e6c24a 65%, #c9a227 100%)',
      pricePerMeterByProfile: priceBook.colors.gold_anode,
    },
    {
      id: 'gold_pink',
      label: 'Золото розовое',
      swatch: 'linear-gradient(145deg, #f0c4b4 0%, #d49a82 35%, #e8b0a0 55%, #c47a6a 100%)',
      pricePerMeterByProfile: priceBook.colors.gold_pink,
    },
    {
      id: 'brass',
      label: 'Латунь браш',
      swatch: 'linear-gradient(145deg, rgba(255,244,188,.45) 0%, transparent 40%, rgba(255,232,120,.3) 65%, transparent 100%), repeating-linear-gradient(90deg, #c9a030 0px, #ffe878 1px, #c9a030 2px, #d4af37 3px)',
      pricePerMeterByProfile: priceBook.colors.brass,
    },
    {
      id: 'silver_anode',
      label: 'Серебро анод',
      swatch: 'linear-gradient(145deg, #eef1f3 0%, #c4c8cc 35%, #d8dce0 60%, #a8acb0 100%)',
      pricePerMeterByProfile: priceBook.colors.silver_anode,
    },
    {
      id: 'silver_brush',
      label: 'Серебро браш',
      swatch: 'linear-gradient(145deg, rgba(255,255,255,.25) 0%, transparent 45%, rgba(255,255,255,.1) 70%, transparent 100%), repeating-linear-gradient(90deg, #b0b4b8 0px, #d0d4d8 1px, #b0b4b8 2px, #c0c4c8 3px)',
      pricePerMeterByProfile: priceBook.colors.silver_brush,
    },
    {
      id: 'champagne_brush',
      label: 'Шампань браш',
      swatch: 'linear-gradient(145deg, rgba(255,255,255,.3) 0%, transparent 45%, rgba(255,245,220,.2) 70%, transparent 100%), repeating-linear-gradient(90deg, #c9b896 0px, #e8dcc4 1px, #c9b896 2px, #d8c8a8 3px)',
      pricePerMeterByProfile: priceBook.colors.champagne_brush,
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
      label: 'Отверстие подвеса',
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
      { id: 'clearGlass', label: 'Зеркало (Серебро)', pricePerSqM: priceBook.fillings.clearGlass },
      { id: 'ultraClear', label: 'Стекло (Б/Ц)', pricePerSqM: priceBook.fillings.ultraClear },
      { id: 'graphiteGlass', label: 'Стекло (Графит)', pricePerSqM: priceBook.fillings.graphiteGlass },
      { id: 'bronzeGlass', label: 'Стекло (Бронза)', pricePerSqM: priceBook.fillings.bronzeGlass },
      { id: 'mirrorSilver', label: 'Стекло Сатин (Б/Ц)', pricePerSqM: priceBook.fillings.mirrorSilver },
    ],
    customOption: {
      id: 'clientGlass',
      label: 'Другое',
    },
  },
};

