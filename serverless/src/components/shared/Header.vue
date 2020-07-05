<template>
  <v-app-bar
    absolute
    color="#43a047"
    dark
    shrink-on-scroll
    prominent
    :src="require('@/assets/images/Home/homework-3235100_1280.jpg')"
    fade-img-on-scroll
    scroll-target="#scrolling-techniques-5"
    scroll-threshold="200"
  >
    <template v-slot:img="{ props }">
      <v-img v-bind="props" gradient="to top right, rgba(55,236,186,.7), rgba(25,32,72,.7)"></v-img>
    </template>

    <v-app-bar-nav-icon></v-app-bar-nav-icon>

    <v-toolbar-title>Todo App</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-history</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: 'Header',
}
</script>