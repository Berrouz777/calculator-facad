<template>
  <section class="facade-card facade-card--wide">
    <header class="facade-card__header">
      <h2>Наполнение</h2>
      <p>Можно выбрать несколько наполнений или выбрать другой вариант.</p>
    </header>

    <div
      class="filling-list"
      :class="{ 'filling-list--disabled': modeModel === 'custom' }"
    >
      <label
        v-for="item in fillings.items"
        :key="item.id"
        class="filling-item"
        :class="{ 'filling-item--checked': selectedItemsModel.includes(item.id) }"
      >
        <div
          v-if="selectedItemsModel.includes(item.id)"
          class="filling-item__checkmark"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="9" fill="#38adc2" stroke="#38adc2" stroke-width="2" />
            <path d="M6 10L9 13L14 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <div
          v-else
          class="filling-item__checkmark filling-item__checkmark--empty"
        />
        <div>
          <p class="filling-item__title" v-html="item.label"/>
        </div>
        <input
          v-model="selectedItemsModel"
          type="checkbox"
          :value="item.id"
          :disabled="modeModel === 'custom'"
          class="filling-item__input"
        >
      </label>
    </div>

    <div class="filling-custom">
      <div class="filling-custom__divider" aria-hidden="true"></div>
      <label
        class="filling-item filling-item--standalone"
        :class="{ 'filling-item--checked': modeModel === 'custom' }"
      >
        <div
          v-if="modeModel === 'custom'"
          class="filling-item__checkmark"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="9" fill="#38adc2" stroke="#38adc2" stroke-width="2" />
            <path d="M6 10L9 13L14 7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
        <div
          v-else
          class="filling-item__checkmark filling-item__checkmark--empty"
        />
        <div>
          <p class="filling-item__title">{{ customLabel }}</p>
        </div>
        <input
          type="checkbox"
          class="filling-item__input"
          :checked="modeModel === 'custom'"
          @change="handleCustomToggle"
        >
      </label>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { FillingsConfig, FillingMode } from '@/types/calculator';

const props = defineProps<{
  fillings: FillingsConfig;
  mode: FillingMode;
  selectedItems: string[];
}>();

const emit = defineEmits<{
  (e: 'update:mode', value: FillingMode): void;
  (e: 'update:selectedItems', value: string[]): void;
}>();

const customLabel = computed(() => props.fillings.customOption.label || 'Другое');

const modeModel = computed({
  get: () => props.mode,
  set: (value: FillingMode) => emit('update:mode', value),
});

const selectedItemsModel = computed({
  get: () => props.selectedItems,
  set: (value: string[]) => emit('update:selectedItems', value),
});

const handleCustomToggle = (event: Event) => {
  const target = event.target as HTMLInputElement | null;
  if (!target) {
    return;
  }
  modeModel.value = target.checked ? 'custom' : 'catalog';
};
</script>

