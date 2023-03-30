import { Router } from "https://deno.land/x/oak/mod.ts";
import response from "../Core/network/response.module.ts";
import controller from "./user.controller.ts";


const router = new Router();

router.get('/user/all', async (context) => {
  try {
    const result = await controller.getAllUser(); 
    response.success(context, result);
  } 
  catch (error) {
    response.error(error, "Unknown error");
  }
});

router.get('/user/:id', async (context) => {
  try {
    if (context.params && context.params.id) {
      const id: string = context.params.id;
      const result = await controller.getUser(id);
      response.success(context, result);
    }
  } 
  catch (error) {
    response.error(error, "Unknown error");
  }
});

router.post('/user', async (context) => {
  try {
    const { value } = await context.request.body();
    const result = await controller.addUser(value);
    return response.success(context, result);
  } 
  catch (error) {
    response.error(error, "Unknown error");
  }
});

export default router;
