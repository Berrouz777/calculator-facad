<template>
  <section class="facade-card facade-card--wide">
    <header class="facade-card__header">
      <h2>Размер фасада</h2>
      <p>Введите высоту и ширину полотна.</p>
    </header>

    <div class="dimensions-control">
      <label class="dimensions-control__field">
        <span>Высота</span>
        <div class="dimensions-control__input">
          <input
            v-model.number="heightModel"
            type="number"
            :step="config.height.step"
          >
          <span>{{ config.height.unit }}</span>
        </div>
      </label>

      <span class="dimensions-control__separator">×</span>

      <label class="dimensions-control__field">
        <span>Ширина</span>
        <div class="dimensions-control__input">
          <input
            v-model.number="widthModel"
            type="number"
            :step="config.width.step"
          >
          <span>{{ config.width.unit }}</span>
        </div>
      </label>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { FacadeCalculatorConfig } from '@/types/calculator';

type DimensionsConfig = FacadeCalculatorConfig['dimensions'];

const props = defineProps<{
  config: DimensionsConfig;
  height: number | null;
  width: number | null;
}>();

const emit = defineEmits<{
  (e: 'update:height', value: number | null): void;
  (e: 'update:width', value: number | null): void;
}>();

const heightModel = computed({
  get: () => props.height,
  set: (value: number | null) => emit('update:height', value),
});

const widthModel = computed({
  get: () => props.width,
  set: (value: number | null) => emit('update:width', value),
});
</script>

