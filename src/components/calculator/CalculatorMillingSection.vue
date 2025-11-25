<template>
  <section class="facade-card facade-card--milling">
    <header class="facade-card__header">
      <h2>Фрезеровка</h2>
    </header>

    <div class="option-stack option-stack--horizontal">
      <label
        v-for="option in options"
        :key="option.id"
        class="stack-option"
        :class="{ 'stack-option--active': modeModel === option.id }"
      >
        <input
          v-model="modeModel"
          class="stack-option__input"
          type="radio"
          name="milling"
          :value="option.id"
        >
        <div class="stack-option__content">
          <p class="stack-option__title">{{ option.label }}</p>
          <input
            v-if="option.requiresQuantity && modeModel === option.id"
            v-model.number="quantityModel"
            type="number"
            :min="option.minQuantity || 1"
            step="1"
            class="stack-option__quantity-input"
            @click.stop
            @focus.stop
          >
        </div>
      </label>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { MillingOption } from '@/types/calculator';

const props = defineProps<{
  options: MillingOption[];
  mode: MillingOption['id'] | '';
  quantity: number;
}>();

const emit = defineEmits<{
  (e: 'update:mode', value: MillingOption['id'] | ''): void;
  (e: 'update:quantity', value: number): void;
}>();

const modeModel = computed({
  get: () => props.mode,
  set: (value: MillingOption['id'] | '') => emit('update:mode', value),
});

const quantityModel = computed({
  get: () => props.quantity,
  set: (value: number) => emit('update:quantity', value),
});
</script>

