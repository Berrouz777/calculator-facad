<template>
  <section class="facade-card facade-card--wide">
    <header class="facade-card__header">
      <h2>Профиль</h2>
      <p>Выберите тип профиля.</p>
    </header>

    <div class="option-grid option-grid--profile">
      <label
        v-for="option in profiles"
        :key="option.id"
        class="option-card"
        :class="{ 'option-card--active': model === option.id }"
      >
        <input
          v-model="model"
          class="option-card__input"
          type="radio"
          name="profile"
          :value="option.id"
        >
        <img :src="option.image" :alt="option.label" class="option-card__image">
        <div class="option-card__body">
          <p class="option-card__title">{{ option.label }}</p>
        </div>
      </label>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { FacadeCalculatorConfig } from '@/types/calculator';

type ProfilesConfig = FacadeCalculatorConfig['profiles'];

const props = defineProps<{
  profiles: ProfilesConfig;
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

