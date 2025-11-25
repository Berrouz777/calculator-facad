<template>
  <section class="facade-card facade-card--hinges">
    <header class="facade-card__header">
      <h2>Петли</h2>
    </header>

    <div
      class="option-stack option-stack--horizontal"
      :class="{ 'option-stack--disabled': disabled }"
    >
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
          name="hinges"
          :value="option.id"
          :disabled="disabled"
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
            :disabled="disabled"
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
import type { HingeOption } from '@/types/calculator';

const props = defineProps<{
  options: HingeOption[];
  mode: HingeOption['id'] | '';
  quantity: number;
  disabled: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:mode', value: HingeOption['id'] | ''): void;
  (e: 'update:quantity', value: number): void;
}>();

const modeModel = computed({
  get: () => props.mode,
  set: (value: HingeOption['id'] | '') => emit('update:mode', value),
});

const quantityModel = computed({
  get: () => props.quantity,
  set: (value: number) => emit('update:quantity', value),
});
</script>

