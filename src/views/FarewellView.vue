<script setup lang="ts">
// No props needed for this simple page
</script>

<template>
  <div class="farewell-page">
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="10" md="8" lg="6">
          <v-card class="farewell-card pa-6 text-center" elevation="8">
            <v-icon icon="mdi-hand-wave" size="80" color="primary" class="mb-4"></v-icon>
            
            <h1 class="text-h4 font-weight-bold mb-4">
              Thank You for Visiting
            </h1>
            
            <div class="text-body-1 mb-6">
              <p class="mb-4">
                We're sorry to see you go. However, we understand your decision.
              </p>
              
              <p class="mb-4">
                <strong>Please note:</strong> Accepting the disclaimer is mandatory to use this app. 
                The disclaimer ensures that you understand the nature and limitations of the app.
              </p>
              
              <p class="mb-0">
                If you change your mind, please refresh the page to see the disclaimer again.
              </p>
            </div>
            
            <v-divider class="my-4"></v-divider>
            
            <p class="text-body-2 text-grey">
              We wish you the best on your journey to better health. 
              If you need professional support, please consult with a healthcare provider.
            </p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
.farewell-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.farewell-card {
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.fill-height {
  min-height: 100vh;
}
</style>
