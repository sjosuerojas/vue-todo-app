<template>
  <div>
    <v-bottom-navigation :value="activeBtn" background-color="light-green" dark grow fixed>
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on">
            <span>Recents</span>
            <v-icon>mdi-history</v-icon>
          </v-btn>
        </template>
        <span>See more</span>
      </v-tooltip>

      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn @click.stop="dialogModal = !dialogModal" v-bind="attrs" v-on="on">
            <span>New Task</span>
            <v-icon>mdi-plus-box-multiple-outline</v-icon>
          </v-btn>
        </template>
        <span>Add a new Task</span>
      </v-tooltip>

      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-bind="attrs" v-on="on">
            <span>Clear Done</span>
            <v-icon>mdi-delete-empty</v-icon>
          </v-btn>
        </template>
        <span>Delete all tasks performed</span>
      </v-tooltip>
    </v-bottom-navigation>
    <v-dialog v-model="dialogModal" max-width="600px">
      <NewTaskModal />
    </v-dialog>
  </div>
</template>

<script>
import NewTaskModal from '@/components/NewTaskModal.vue'

export default {
  name: 'BottomNavegation',
  components: {
    NewTaskModal,
  },
  data() {
    return {
      activeBtn: 1,
      dialogModal: false,
    }
  },
}
</script>