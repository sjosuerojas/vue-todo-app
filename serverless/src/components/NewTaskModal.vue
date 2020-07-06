<template>
  <v-card>
    <v-card-title>
      <span class="headline">{{ editing ? 'Modify Task' : 'New Task' }}</span>
    </v-card-title>
    <v-container>
      <ValidationObserver v-slot="{ invalid }">
        <v-form ref="form" @submit.prevent="onSubmit">
          <v-card-text>
            <v-row>
              <v-col sm="6" md="3" lg="6">
                <ValidationProvider name="Name" rules="required|min:5" v-slot="{ errors }">
                  <v-text-field label="Name" v-model="nameTask" placeholder="Task Name" outlined></v-text-field>
                  <span class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
              </v-col>
              <v-col sm="6" md="3" lg="6">
                <v-dialog
                  ref="dialog"
                  v-model="modal"
                  :return-value.sync="date"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="date"
                      label="Creation date"
                      prepend-icon="mdi-calendar-range"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      outlined
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>
            </v-row>
            <v-row>
              <v-col sm="12">
                <ValidationProvider
                  name="Description"
                  rules="required|minmax:3,80"
                  v-slot="{ errors }"
                >
                  <v-textarea
                    height="100"
                    v-model="descriptionTask"
                    outlined
                    placeholder="Task Description"
                    name="description"
                    label="Description"
                  ></v-textarea>
                  <span class="text-danger">{{ errors[0] }}</span>
                </ValidationProvider>
                <v-checkbox v-model="completed" label="Task is completed"></v-checkbox>
              </v-col>
            </v-row>
            <v-alert v-if="successChange" type="success">{{ textAlert }}</v-alert>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              type="submit"
              :loading="loading"
              :disabled="invalid"
              color="primary"
            >{{ loading ? '' : 'Save Changes' }}</v-btn>
          </v-card-actions>
        </v-form>
      </ValidationObserver>
    </v-container>
    <v-snackbar v-model="snackbar">
      {{ textError }}
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script>
import { db } from '@/services/firebase'
import {
  ValidationProvider,
  ValidationObserver,
  extend,
  localize,
} from 'vee-validate'

localize({
  en: {
    messages: {
      required: 'Este campo no puede estar vacio',
      min: 'Este campo debe tener al menos 5 carácteres',
    },
  },
})

extend('required', {
  validate(value) {
    return {
      required: true,
      valid: ['', null, undefined].indexOf(value) === -1,
    }
  },
  computesRequired: true,
})

extend('min', value => {
  return value.length >= 5
})

extend('minmax', {
  validate(value, { min, max }) {
    return value.length >= min && value.length <= max
  },
  params: ['min', 'max'],
  message:
    'The {_field_} field must have at least {min} characters and {max} characters at most',
})

export default {
  name: 'NewTaskModal',
  props: {
    editing: {
      type: Boolean,
    },
    objectTasks: {
      type: Array,
    },
  },
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data: () => ({
    successChange: false,
    textAlert: null,
    nameTask: null,
    descriptionTask: null,
    date: new Date().toISOString().substr(0, 10),
    completed: false,
    currentIdTask: null,
    modal: false,
    loading: false,
    textError: null,
    snackbar: false,
  }),
  watch: {
    objectTasks: function(newTask) {
      if (newTask) {
        let task = newTask[0]
        this.currentIdTask = task.id
        this.nameTask = task.name
        this.descriptionTask = task.description
        // this.date = new Date(task.createdAt)
        this.completed = task.completed
      }
    },
  },
  methods: {
    async onSubmit() {
      if (this.editing) {
        this.loading = true
        try {
          const snapshot = await db
            .collection('tasks')
            .doc(this.currentIdTask)
            .update({
              name: this.nameTask,
              description: this.descriptionTask,
              createdAt: this.date,
              completed: this.completed,
            })
          this.loading = false
          this.successChange = true
          this.textAlert = 'Successfullt Updated'
        } catch (error) {
          this.snackbar = true
          this.textError = 'Error found when insert into collection'
        }
      } else {
        this.loading = true
        try {
          const snapshot = await db.collection('tasks').add({
            name: this.nameTask,
            description: this.descriptionTask,
            createdAt: this.date,
            completed: this.completed,
          })
          this.$refs.form.reset()
          this.loading = false
          this.successChange = true
          this.textAlert = 'Successfullt Created'
        } catch (error) {
          this.snackbar = true
          this.textError = 'Error found when insert into collection'
        }
      }
    },
  },
}
</script> 

<style scoped>
.text-danger {
  color: #d32727;
}
</style>