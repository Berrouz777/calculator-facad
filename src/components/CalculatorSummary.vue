<template>
  <section class="calculator-summary">
    <header class="calculator-summary__header">
      <p class="calculator-summary__eyebrow">Итого</p>
      <p class="calculator-summary__total">{{ formatCurrency(props.results.total) }}</p>
    </header>
  </section>
</template>

<script setup lang="ts">
import type { CalculatorResults } from '@/types/calculator';
import { formatCurrency } from '@/utils/number';

const props = defineProps<{
  results: CalculatorResults;
}>();
</script>

<style scoped lang="scss">
.calculator-summary {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2.4rem;
  border-radius: 16px;
  background-color: rgba($base-0, .9);
  box-shadow: 0 20px 60px rgb(12 36 48 / 12%);
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;

  &__header {
    display: flex;
    flex-direction: column;
    gap: .8rem;
  }

  &__eyebrow {
    text-transform: uppercase;
    font-size: 1.1rem;
    letter-spacing: .08em;
    color: $blue;
    margin: 0;
  }

  &__total {
    margin: 0;
    font-size: 2.4rem;
    font-weight: 700;
    color: $body-color;
  }
}
</style>

