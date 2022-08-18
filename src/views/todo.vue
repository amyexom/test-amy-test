<template>
  <v-container class="login" style="padding: 10% 20%">
    <v-row>
      <v-col v-if="item_todolist.length >= 1" class="mb-5" cols="12">
        <!-- <pre>{{ item_todolist }}</pre> -->
        <v-subheader class="text-h4">TODO</v-subheader>
        <v-list>
          <v-list-item
            style="
              border: thin solid rgba(0, 0, 0, 0.12);
              border-radius: 10px;
              margin: 5px;
            "
            v-for="file in item_todolist"
            :key="file.title"
          >
            <v-list-item-avatar>
              <v-icon color="darken-2"> mdi-checkbox-marked-circle </v-icon>
            </v-list-item-avatar>

            <v-list-item-content @click="editor(file)">
              <v-list-item-title v-text="file.title"></v-list-item-title>

              <v-list-item-subtitle
                v-text="file.description"
              ></v-list-item-subtitle> <v-list-item-subtitle class="mt-1">{{moment(file.createdAt).format('YYYY-MM-DD HH:ss')}}</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-action>
              <v-dialog transition="dialog-bottom-transition" max-width="600">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon>
                    <v-icon v-bind="attrs" v-on="on" color="red lighten-1"
                      >mdi-minus-circle</v-icon
                    >
                  </v-btn>
                </template>
                <template v-slot:default="dialog">
                  <v-card>
                    <v-card-text>
                      <div class="text-h5 pa-12">
                        Want to delete {{ file.title }} ?
                      </div>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                      <v-btn text @click="dialog.value = false">Close</v-btn>
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="deleteTask(file._id)"
                      >
                        Confirm
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </template>
              </v-dialog>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-col>
      <v-col v-else class="mb-4 text-center">
        Empty press 'Create'<br />
        for add new todo
      </v-col>
      <v-col class="mb-5 text-center" cols="12">
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
                <!-- <pre>{{ valid }}</pre> -->
                <v-form ref="form" v-model="valid" lazy-validation>
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
                        label="Description"
                        type="password"
                        required
                      ></v-textarea>
                    </v-col> </v-row
                ></v-form>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="canceldialog()">
                Cancel
              </v-btn>
              <v-btn color="blue darken-1" text @click="createNewTask()">
                Create
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
    <v-dialog v-model="dialogedit" width="500">
      <v-card>
        <v-card-title>
          <span class="text-h5">Edit todo</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <!-- <pre>{{ validedit }}</pre> -->
            <v-form ref="form" v-model="validedit" lazy-validation>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Name"
                    :rules="nameRules"
                    v-model="item_edit.title"
                    outlined
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    outlined
                    v-model="item_edit.description"
                    label="Description"
                    type="password"
                    required
                  ></v-textarea>
                </v-col> </v-row
            ></v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="canceldialogedit()">
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" text @click="calleditor()"> Edit </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      dialogconfirmdelete: false,
      dialogedit: false,
      show1: false,
      item_todolist: [],
      item_value: {},
      item_edit: {},
      valid: true,
      validedit: true,
      name: "",
      nameRules: [(v) => !!v || "Name is required"],
      email: "",
      select: null,
      items: ["Item 1", "Item 2", "Item 3", "Item 4"],
      checkbox: false,
    };
  },

  methods: {
    canceldialogedit() {
      this.dialogedit = false;
      this.item_edit = {};
      this.$refs.form.resetValidation();
    },
    editor(i) {
      this.item_edit = { ...i };
      this.dialogedit = true;
    },
    async calleditor() {
      if (this.item_edit.title && this.validedit) {
        await this.$http
          .put(this.$url + "todos/" + this.item_edit._id, this.item_edit, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("tokenlg"),
            },
          })
          .then((result) => {
            console.log(result.data);
            this.dialogedit = false;
            this.getItemToDo();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.$refs.form.validate();
      }
    },
    closedelete() {
      this.dialogconfirmdelete = true;
    },
    canceldialog() {
      this.dialog = false;
      this.item_value = {};
      this.$refs.form.resetValidation();
    },
    addtodo() {},
    async createNewTask() {
      if (this.item_value.name && this.valid) {
        const body = {
          title: this.item_value.name,
          description: this.item_value.description,
        };

        await this.$http
          .post(this.$url + "todos/", body, {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("tokenlg"),
            },
          })
          .then((result) => {
            console.log(result);
            this.dialog = false;
            this.item_todolist = [...this.item_todolist, result.data];
            this.item_value = {};
            this.$refs.form.resetValidation();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.$refs.form.validate();
      }
    },
    async getItemToDo() {
      await this.$http
        .get(this.$url + "todos/", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("tokenlg"),
          },
        })
        .then((result) => {
          console.log(result);
          this.dialog = false;
          this.item_todolist = result.data;
          this.item_value = {};
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async deleteTask(id) {
      await this.$http
        .delete(this.$url + "todos/" + id, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("tokenlg"),
          },
        })
        .then((result) => {
          console.log(result);
          // this.dialogconfirmdelete = false;
          this.item_todolist = this.item_todolist.filter(
            (task) => task._id !== id
          );
          this.dialogconfirmdelete = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    this.getItemToDo();
  },
  computed: {},
};
</script>

<style></style>
