<script setup lang="ts">

const emit = defineEmits<{
  agree: []
  decline: []
}>()

const handleAgree = () => {
  emit('agree')
}

const handleDecline = () => {
  emit('decline')
}
</script>

<template>
  <v-dialog model-value persistent max-width="700">
    <v-card class="disclaimer-card">
      <v-card-title class="text-h5 font-weight-bold mb-4">
        Disclaimer
      </v-card-title>
      
      <v-card-text class="disclaimer-text">
        <p class="mb-3">
          Welcome to our <strong>No Smoking</strong> app! Before you begin, please read the following disclaimer carefully.
        </p>
        
        <p class="mb-3">
          This app is provided purely for <strong>experimental and informational purposes</strong>. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
        </p>
        
        <p class="mb-3">
          The information and tools provided in this app are based on general principles of health and wellness and may not be suitable for everyone. The author of this app does not guarantee the accuracy, effectiveness, or reliability of the information provided. The use of this app is at your own risk.
        </p>
        
        <p class="mb-3">
          By using this app, you agree that the author is <strong>not responsible or liable</strong> for any loss or damage, whether direct, indirect, incidental, special, or consequential, arising out of or in connection with the use of this app.
        </p>
        
        <p class="mb-3">
          You must be <strong>at least 18 years old</strong> to use this app. If you are not at least 18 years old, you are not permitted to use this app.
        </p>
        
        <p class="mb-0">
          Thank you for understanding. By clicking <strong>"Agree,"</strong> you acknowledge that you have read this disclaimer and agree to its terms.
        </p>
      </v-card-text>
      
      <v-card-actions class="pa-4 pt-0">
        <v-spacer></v-spacer>
        <v-btn
          color="grey"
          variant="outlined"
          @click="handleDecline"
          size="large"
        >
          Decline
        </v-btn>
        <v-btn
          color="primary"
          variant="elevated"
          @click="handleAgree"
          size="large"
        >
          Agree
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.disclaimer-card {
  border-radius: 12px;
}

.disclaimer-text {
  font-size: 1rem;
  line-height: 1.6;
  max-height: 60vh;
  overflow-y: auto;
}

.disclaimer-text p {
  text-align: justify;
}
</style>
