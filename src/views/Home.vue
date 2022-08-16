<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <HelloWorld msg="Welcome to Your111 Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import axios from "axios";
export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  methods: {
    async callapi(token) {
      const res = await axios.get(
        "https://candidate.neversitup.com/todo/todos/",
        { headers: { Authorization: "Bearer " + token } }
      );
      console.log(res);
    },
    async putapi(token) {
      const res = await axios.put(
        "https://candidate.neversitup.com/todo/todos/",
        { headers: { Authorization: "Bearer " + token } }
      );
      console.log(res);
    },
  },
  mounted() {
   console.log( localStorage.getItem('tokenlg'));
  },
};
</script>
