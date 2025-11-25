<template>
  <section class="facade-card facade-card--wide">
    <header class="facade-card__header">
      <h2>Цвет</h2>
    </header>

    <div class="option-grid option-grid--color">
      <label
        v-for="option in colors"
        :key="option.id"
        class="color-option"
        :class="{ 'color-option--active': model === option.id }"
      >
        <input
          v-model="model"
          class="color-option__input"
          type="radio"
          name="color"
          :value="option.id"
        >
        <span class="color-option__swatch" :style="{ background: option.swatch }" />
        <div class="color-option__meta">
          <p class="color-option__title">{{ option.label }}</p>
        </div>
      </label>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { FacadeCalculatorConfig } from '@/types/calculator';

type ColorsConfig = FacadeCalculatorConfig['colors'];

const props = defineProps<{
  colors: ColorsConfig;
  modelValue: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const model = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value),
});
</script>

