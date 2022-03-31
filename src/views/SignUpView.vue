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
      <el-input type="text" v-model="ruleForm.username" autocomplete="off" />
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input
        v-model="ruleForm.password"
        type="password"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item label="Confirm" prop="checkPassword">
      <el-input
        v-model="ruleForm.checkPassword"
        type="password"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)"
        >Sign Up</el-button
      >
      <el-button type="text">
        Already have account, Please&nbsp;
        <router-link to="/login">Login</router-link>
      </el-button>
    </el-form-item>
    <el-alert v-if="alertMessage" :title="alertMessage" :type="alertType" />
  </el-form>
</template>

<script setup>
import { computed, ref, reactive } from "vue";
import { useStore } from "vuex";

const ruleFormRef = ref();
const store = useStore();

const checkUsername = (rule, value, callback) => {
  if (!value) {
    return callback(new Error("Please input the username"));
  } else {
    callback();
  }
};

const validatePass = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("Please input the password"));
  } else {
    if (ruleForm.checkPassword !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("checkPassword", () => null);
    }
    callback();
  }
};
const validatePass2 = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("Please input the password again"));
  } else if (value !== ruleForm.password) {
    callback(new Error("Two inputs don't match!"));
  } else {
    callback();
  }
};

const ruleForm = reactive({
  password: "",
  checkPassword: "",
  username: "",
});

const rules = reactive({
  username: [{ validator: checkUsername, trigger: "blur" }],
  password: [{ validator: validatePass, trigger: "blur" }],
  checkPassword: [{ validator: validatePass2, trigger: "blur" }],
});

const alertMessage = computed(() => store.state.user.alertMessage);

const alertType = computed(() => store.state.user.alertType);

const submitForm = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      try {
        const { username, password } = ruleForm;
        store.dispatch("register", { username, password });
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
