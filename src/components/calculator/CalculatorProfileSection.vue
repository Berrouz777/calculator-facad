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

    <div class="additional-profiles">
      <header class="facade-card__header">
        <p>Доступно только для профиля PF-03.</p>
      </header>

      <div class="option-grid option-grid--profile">
        <label
          v-for="option in additionalProfiles"
          :key="option.id"
          class="option-card"
          :class="{
            'option-card--active': additionalProfileModel === option.id,
            'option-card--toggleable': !additionalProfilesDisabled,
            'option-card--disabled': additionalProfilesDisabled,
          }"
        >
          <input
            :checked="additionalProfileModel === option.id"
            class="option-card__input"
            type="radio"
            name="additional-profile"
            :value="option.id"
            :disabled="additionalProfilesDisabled"
            @click="toggleAdditionalProfile($event, option.id)"
          >
          <img :src="option.image" :alt="option.label" class="option-card__image">
          <div class="option-card__body">
            <p class="option-card__title">{{ option.label }}</p>
          </div>
        </label>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { FacadeCalculatorConfig } from '@/types/calculator';

type ProfilesConfig = FacadeCalculatorConfig['profiles'];

const props = defineProps<{
  profiles: ProfilesConfig;
  additionalProfiles: FacadeCalculatorConfig['additionalProfiles'];
  additionalProfilesDisabled: boolean;
  modelValue: string;
  additionalProfile: string;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'update:additionalProfile', value: string): void;
}>();

const model = computed({
  get: () => props.modelValue,
  set: (value: string) => emit('update:modelValue', value),
});

const additionalProfileModel = computed({
  get: () => props.additionalProfile,
  set: (value: string) => emit('update:additionalProfile', value),
});

const toggleAdditionalProfile = (event: MouseEvent, optionId: string) => {
  event.preventDefault();
  additionalProfileModel.value = additionalProfileModel.value === optionId ? '' : optionId;
};
</script>

