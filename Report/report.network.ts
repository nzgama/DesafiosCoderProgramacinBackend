import { Router } from "https://deno.land/x/oak/mod.ts";
import response from "../Core/network/response.module.ts";
import controller from "./report.controller.ts";


const router = new Router();


router.get('/report/:id', async (context) => {
  try {
    if (context.params && context.params.id) {
      const id: string = context.params.id;
      const result = await controller.getReport(id);
      response.success(context, result);
    }
  } 
  catch (error) {
    response.error(error, "Unknown error");
  }
});

export default router;
