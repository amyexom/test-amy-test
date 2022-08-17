<template>
  <v-container class="login" style="padding: 10% 20%">
    <v-row class="text-center">
      <v-col v-if="item_todolist" class="mb-5" cols="12"> uu </v-col>
      <v-col v-else class="mb-4">
        Empty press 'Create'<br />
        for add new todo
      </v-col>
      <v-col class="mb-5" cols="12">
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on">
              + Create
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">Create todo</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <pre>{{ item_value }}</pre>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Name"
                      :rules="nameRules"
                      v-model="item_value.name"
                      outlined
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      outlined
                      v-model="item_value.description"
                      :rules="descriptionRules"
                      label="Description"
                      type="password"
                      required
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">
                Cancel
              </v-btn>
              <v-btn color="blue darken-1" text @click="dialog = false">
                Create
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      show1: false,
      item_todolist: [],
      item_value: {},
      valid: true,
      name: "",
      nameRules: [(v) => !!v || "Name is required"],
      email: "",
      descriptionRules: [(v) => !!v || "Description is required"],
      select: null,
      items: ["Item 1", "Item 2", "Item 3", "Item 4"],
      checkbox: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
      },
    };
  },

  methods: {
    addtodo() {},
  },
};
</script>

<style></style>
