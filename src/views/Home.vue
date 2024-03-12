<template>
  <el-radio-group v-model="toPage" @change="changePage">
    <el-radio-button
      :label="route.path"
      :value="route.path"
      v-for="route in routes"
      :key="route.path"
    />
  </el-radio-group>
</template>

<script lang="ts">
export default { name: "Home" };
</script>
<script lang="ts" setup>
import { getFileRoutes } from "@/router/routes";
import { RoutesList } from "@/types/global";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const toPage = ref("/home");
const router = useRouter();
const routes = ref<RoutesList[]>([]);
const changePage = (path: string) => {
  router.push(path);
};

onMounted(() => {
  const routeFiles = getFileRoutes();
  routes.value = routeFiles;
});
</script>

<style lang="scss" scoped></style>
