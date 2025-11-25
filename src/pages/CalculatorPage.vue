<template>
  <section class="facade-calculator">
    <header class="facade-calculator__header">
      <h1 class="facade-calculator__eyebrow">Калькулятор фасада</h1>
    </header>

    <div class="facade-calculator__layout">
      <form class="facade-calculator__form" @submit.prevent>
        <CalculatorDimensionsSection
          :config="config.dimensions"
          v-model:height="formState.height"
          v-model:width="formState.width"
        />

        <CalculatorProfileSection
          :profiles="config.profiles"
          v-model="formState.profileId"
        />

        <CalculatorColorSection
          :colors="config.colors"
          v-model="formState.colorId"
        />

        <CalculatorMillingSection
          :options="config.milling"
          v-model:mode="formState.milling.mode"
          v-model:quantity="formState.milling.quantity"
        />

        <CalculatorHingesSection
          :options="config.hinges"
          :disabled="isHingesDisabled"
          v-model:mode="formState.hinges.mode"
          v-model:quantity="formState.hinges.quantity"
        />

        <CalculatorFillingsSection
          :fillings="config.fillings"
          v-model:mode="formState.fillingMode"
          v-model:selected-items="formState.fillingItems"
        />
      </form>

      <CalculatorSummary
        v-if="isSummaryVisible"
        :results="results"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive, watch } from 'vue';
import CalculatorDimensionsSection from '@/components/calculator/CalculatorDimensionsSection.vue';
import CalculatorProfileSection from '@/components/calculator/CalculatorProfileSection.vue';
import CalculatorColorSection from '@/components/calculator/CalculatorColorSection.vue';
import CalculatorMillingSection from '@/components/calculator/CalculatorMillingSection.vue';
import CalculatorHingesSection from '@/components/calculator/CalculatorHingesSection.vue';
import CalculatorFillingsSection from '@/components/calculator/CalculatorFillingsSection.vue';
import CalculatorSummary from '@/components/CalculatorSummary.vue';
import { calculatorConfig as config } from '@/data/calculatorFields';
import type { CalculatorFormState, CalculatorResults, HingeOption, MillingOption } from '@/types/calculator';

const ASSEMBLY_COST = 1500;

const normalizeDimension = (value: number | null) =>
  typeof value === 'number' && Number.isFinite(value) ? value : 0;

const createInitialState = (): CalculatorFormState => ({
  height: null,
  width: null,
  profileId: '',
  colorId: '',
  milling: {
    mode: '',
    quantity: 0,
  },
  hinges: {
    mode: '',
    quantity: 0,
  },
  fillingMode: 'catalog',
  fillingItems: [],
});

const formState = reactive<CalculatorFormState>(createInitialState());

watch(
  () => formState.fillingMode,
  (mode) => {
    if (mode === 'custom') {
      formState.fillingItems = [];
    }
  },
);

const ensureQuantity = (option: MillingOption | HingeOption, current: number) => {
  if (!option.requiresQuantity) {
    return 0;
  }
  // Не устанавливаем дефолтное значение, только проверяем минимум если значение уже введено
  if (current && current > 0) {
    const min = option.minQuantity ?? 1;
    return Math.max(current, min);
  }
  return current || 0;
};

watch(
  () => formState.milling.mode,
  (mode) => {
    const option = config.milling.find((item) => item.id === mode);
    if (!option) {
      return;
    }
    // Сбрасываем количество при смене режима, если новый режим не требует количества
    if (!option.requiresQuantity) {
      formState.milling.quantity = 0;
    } else if (formState.milling.quantity > 0) {
      // Проверяем минимум только если значение уже введено
      formState.milling.quantity = ensureQuantity(option, formState.milling.quantity);
    }
  },
);

watch(
  () => formState.hinges.mode,
  (mode) => {
    const option = config.hinges.find((item) => item.id === mode);
    if (!option) {
      return;
    }
    // Сбрасываем количество при смене режима, если новый режим не требует количества
    if (!option.requiresQuantity) {
      formState.hinges.quantity = 0;
    } else if (formState.hinges.quantity > 0) {
      // Проверяем минимум только если значение уже введено
      formState.hinges.quantity = ensureQuantity(option, formState.hinges.quantity);
    }
  },
);

// Сбрасываем выбор петель при выборе профиля КС
watch(
  () => formState.profileId,
  (profileId) => {
    if (profileId === 'slim') {
      formState.hinges.mode = '';
      formState.hinges.quantity = 0;
    }
  },
);

const areaSqM = computed(() => {
  const height = normalizeDimension(formState.height) / 1000;
  const width = normalizeDimension(formState.width) / 1000;
  return height * width;
});

const perimeterMeters = computed(() => {
  const height = normalizeDimension(formState.height);
  const width = normalizeDimension(formState.width);
  return ((height + width) * 2) / 1000;
});

const isSummaryVisible = computed(() => {
  const hasHeight = normalizeDimension(formState.height) > 0;
  const hasWidth = normalizeDimension(formState.width) > 0;
  const hasProfile = Boolean(formState.profileId);
  const hasColor = Boolean(formState.colorId);
  return hasHeight && hasWidth && hasProfile && hasColor;
});

const selectedProfile = computed(
  () => config.profiles.find((option) => option.id === formState.profileId),
);
const selectedColor = computed(
  () => config.colors.find((option) => option.id === formState.colorId),
);
const selectedMilling = computed(() => config.milling.find((option) => option.id === formState.milling.mode));
const selectedHinges = computed(() => config.hinges.find((option) => option.id === formState.hinges.mode));

const isHingesDisabled = computed(() => formState.profileId === 'slim');

const colorCost = computed(() => {
  if (!selectedColor.value || !selectedProfile.value) {
    return 0;
  }
  const profileId = selectedProfile.value.id;
  if (profileId !== 'slim' && profileId !== 'quadro' && profileId !== 'wide') {
    return 0;
  }
  const pricePerMeter = selectedColor.value.pricePerMeterByProfile[profileId];
  if (!pricePerMeter) {
    return 0;
  }
  return perimeterMeters.value * pricePerMeter;
});

const accessoriesCost = computed(() =>
  config.accessories.reduce((sum, accessory) => {
    if (!accessory.defaultValue) {
      return sum;
    }
    if (accessory.calculation === 'perimeter' && accessory.pricePerMeter) {
      return sum + perimeterMeters.value * accessory.pricePerMeter;
    }
    if (accessory.calculation === 'pieces' && accessory.pricePerPiece) {
      const pieces = accessory.pieces ?? 0;
      return sum + pieces * accessory.pricePerPiece;
    }
    return sum;
  }, 0),
);

const millingCost = computed(() => {
  const option = selectedMilling.value;
  if (!option) {
    return 0;
  }
  if (!option.requiresQuantity) {
    return option.pricePerUnit ?? 0;
  }
  // Используем введенное количество, если оно больше 0, иначе 0
  const qty = formState.milling.quantity > 0 ? formState.milling.quantity : 0;
  
  // Если цена зависит от профиля
  if (option.pricePerUnitByProfile && selectedProfile.value) {
    const profileId = selectedProfile.value.id;
    if (profileId === 'slim' || profileId === 'quadro' || profileId === 'wide') {
      const pricePerUnit = option.pricePerUnitByProfile[profileId];
      return qty * pricePerUnit;
    }
  }
  
  // Если цена фиксированная
  if (option.pricePerUnit !== undefined) {
    return qty * option.pricePerUnit;
  }
  
  return 0;
});

const hingesCost = computed(() => {
  const option = selectedHinges.value;
  if (!option) {
    return 0;
  }
  if (!option.requiresQuantity) {
    return option.pricePerUnit;
  }
  // Используем введенное количество, если оно больше 0, иначе 0
  const qty = formState.hinges.quantity > 0 ? formState.hinges.quantity : 0;
  return qty * option.pricePerUnit;
});

const selectedFillings = computed(() =>
  config.fillings.items.filter((item) => formState.fillingItems.includes(item.id)),
);

const fillingsCost = computed(() => {
  if (formState.fillingMode === 'custom') {
    return 0;
  }
  return selectedFillings.value.reduce((sum, item) => sum + item.pricePerSqM * areaSqM.value, 0);
});

const assemblyTotal = computed(() => (isSummaryVisible.value ? ASSEMBLY_COST : 0));

const totalCost = computed(
  () =>
    colorCost.value +
    accessoriesCost.value +
    millingCost.value +
    hingesCost.value +
    fillingsCost.value +
    assemblyTotal.value,
);

const results = computed<CalculatorResults>(() => ({
  total: totalCost.value,
  breakdown: [],
}));
</script>

<style lang="scss" src="@/styles/pages/calculator/index.scss"></style>
