<template>
  <v-card>
    <v-card-title>
      <span class="headline">New Task</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col sm="6" md="3" lg="6">
            <v-text-field label="Name" placeholder="Task Name" outlined></v-text-field>
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
            <v-textarea
              height="100"
              outlined
              placeholder="Task Description"
              name="description"
              label="Description"
            ></v-textarea>
            <v-checkbox v-model="completed" label="Task is completed"></v-checkbox>
          </v-col>
        </v-row> 
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text>Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'NewTaskModal',
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    modal: false,
    completed: false
  }),
}
</script> 