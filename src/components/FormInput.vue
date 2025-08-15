<!-- components/FormInput.vue -->
<template>
  <div class="mb-4">
    <label v-if="label" class="block mb-1 text-sm font-medium">{{ label }}</label>
    <input
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="w-full px-4 py-2 border rounded-md dark:bg-gray-800 dark:text-white"
      :class="{ 'border-red-500': error }"
      :placeholder="placeholder"
    />
    <p v-if="error" class="text-sm text-red-500 mt-1">{{ error }}</p>
  </div>
</template>

<script setup>
defineProps({
  modelValue: [String, Number],
  label: String,
  error: String,
  type: {
    type: String,
    default: 'text'
  },
  placeholder: String
})
defineEmits(['update:modelValue'])
</script>