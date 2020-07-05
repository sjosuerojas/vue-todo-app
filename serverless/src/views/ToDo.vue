<template>
  <Layout>
    <v-card :loading="loading" max-width="600" class="mx-auto">
      <v-app-bar dark color="light-green">
        <v-toolbar-title>Today's Tasks ({{ currentTasks }})</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-text-field
          flat
          solo-inverted
          hide-details
          prepend-inner-icon="mdi-magnify"
          label="Search Task"
          class="hidden-sm-and-down"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn color="light-green darken-4">Add</v-btn>
      </v-app-bar>

      <v-container>
        <v-row class="d-flex justify-center">
          <v-progress-circular v-if="loading" :size="50" color="light-green" indeterminate></v-progress-circular>
          <v-col v-for="task in tasks" :key="task.id" cols="10">
            <v-card color="#1F7087" dark>
              <v-row class="justify-between" dense>
                <v-col sm="2" class="d-flex justify-center align-center">
                  <v-checkbox v-model="task.completed"></v-checkbox>
                </v-col>
                <v-col sm="8">
                  <v-card-title class="headline" v-text="task.name"></v-card-title>
                  <v-card-subtitle v-text="task.description"></v-card-subtitle>
                </v-col>
                <v-col sm="1" class="d-flex justify-center align-center">
                  <v-menu right origin="center center" transition="scale-transition">
                    <template v-slot:activator="{ on: menu, attrs }">
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on: tooltip }">
                          <v-btn v-bind="attrs" v-on="{ ...tooltip, ...menu }" icon>
                            <v-icon>mdi-dots-vertical</v-icon>
                          </v-btn>
                        </template>
                        <span>More options</span>
                      </v-tooltip>
                    </template>
                    <v-list dense>
                      <v-list-item-group>
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title>
                              Edit
                            </v-list-item-title> 
                          </v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title>
                              Delete
                            </v-list-item-title> 
                          </v-list-item-content>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list>
                  </v-menu>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>

      <v-snackbar v-model="snackbar">
        {{ textError }}
        <template v-slot:action="{ attrs }">
          <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
        </template>
      </v-snackbar>
    </v-card>
  </Layout>
</template>

<script>
import Layout from '@/containers/Layout.vue'
import { db } from '@/services/firebase'

export default {
  name: 'ToDo',
  components: {
    Layout,
  },
  data: () => ({
    today: new Date().toISOString().substring(0, 10),
    snackbar: false,
    textError: null,
    loading: false,
    tasks: [],
  }),
  computed: {
    currentTasks() {
      return this.tasks.length
    },
  },
  created() {
    this.getTasks()
  },
  methods: {
    async getTasks() {
      try {
        this.loading = true
        const snapshot = await db.collection('tasks').get()

        snapshot.forEach(item => {
          const responseDB = item.data()
          responseDB.id = item.id
          this.tasks.push(responseDB)
          this.loading = false
        })
      } catch (error) {
        this.snackbar = true
        this.textError = 'Error found:' + error
      }
    },
  },
}
</script>