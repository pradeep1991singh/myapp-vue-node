<template>
  <el-form
    ref="ruleFormRef"
    :model="ruleForm"
    status-icon
    :rules="rules"
    label-width="120px"
    class="demo-ruleForm"
  >
    <el-form-item label="Username" prop="username">
      <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input
        v-model="ruleForm.password"
        type="password"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)"
        >Login</el-button
      >
      <el-button type="text">
        Don't have account yet, Try&nbsp;
        <router-link to="/signup">Sign Up</router-link>
      </el-button>
    </el-form-item>
    <el-alert v-if="error" :title="error" type="error" />
  </el-form>
</template>

<script setup>
import { computed, ref, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const ruleFormRef = ref();
const store = useStore();
const router = useRouter();

const validateUsername = (rule, value, callback) => {
  value === "" ? callback(new Error("Please input the username")) : callback();
};
const validatePass = (rule, value, callback) => {
  value === ""
    ? callback(new Error("Please input a valid password"))
    : callback();
};

const ruleForm = reactive({
  username: "",
  password: "",
});

const rules = reactive({
  username: [{ validator: validateUsername, trigger: "blur" }],
  password: [{ validator: validatePass, trigger: "blur" }],
});

const error = computed(() => store.state.user.error);

const submitForm = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      try {
        const { username, password } = ruleForm;
        store.dispatch("login", { username, password });
        router.push("/");
      } catch (e) {
        console.log(e.message);
        return false;
      }
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
</script>
