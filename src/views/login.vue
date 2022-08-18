<template>
  <v-container class="login" style="padding: 10% 20%">
    <v-row class="text-center">
      <v-col class="mb-4">
        <v-text-field
          v-model="item_value.username"
          outlined
          :rules="nameRules"
          label="Username"
          required
        ></v-text-field>
      </v-col>
      <v-col class="mb-5" cols="12">
        <v-text-field
          v-model="item_value.password"
          outlined
          :type="show1 ? 'text' : 'password'"
          :rules="[rules.required, rules.min]"
          label="Password"
          required
        ></v-text-field>
      </v-col>
      <v-col class="mb-5" cols="12">
        <v-btn @click="calllog" color="cyan" block> LOGIN </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "login",
  components: {
    // HelloWorld,
  },
  data() {
    return {
      // tokenlg: "",
      show1: false,
      item_value: { username: "amy1", password: "amy12345" },
      valid: true,
      name: "",
      nameRules: [(v) => !!v || "Name is required"],
      email: "",
      passwordRules: [(v) => !!v || "Password is required"],
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
    async calllog() {
      // let body = { username: "amy1", password: "amy12345" };
      try {
        let body = {
          username: this.item_value.username,
          password: this.item_value.password,
        };
        const res = await axios.post(
          "https://candidate.neversitup.com/todo/users/auth",
          body
        );
        // console.log(res.data.token);
        // this.tokenlg = res.data.token;
        console.log(res);
        localStorage.setItem("tokenlg", res.data.token);
        this.$router.push({
          path: "/todo",
        });
      } catch (error) {
        // console.log(res);
        console.log(localStorage.getItem("tokenlg"));
      }
      // console.log(localStorage.getItem("tokenlg"));
      // this.callapi(res.data.token);
    },
  },
  mounted() {
    // this.calllog();
  },
};
</script>
