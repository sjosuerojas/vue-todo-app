<template>
  <v-app id="inspire">
    <v-card class="overflow-hidden">
      <Header />
      <v-sheet id="scrolling-techniques-5" class="overflow-y-auto" max-height="600">
        <v-container class="margin-top--container" style="height: 150vh;">
          <slot />
        </v-container>
        <BottomNavegation />
      </v-sheet>
    </v-card>
  </v-app>
</template>

<script>
import Header from '@/components/shared/Header.vue'
import BottomNavegation from '@/components/shared/BottomNavegation.vue'

export default {
  name: 'Layout',
  components: {
    Header,
    BottomNavegation,
  },
}
</script> 

<style scoped>
.margin-top--container {
  margin-top: 9rem;
}
</style>