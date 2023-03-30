import { Router } from "https://deno.land/x/oak/mod.ts";
import response from "../Core/network/response.module.ts";
import controller from "./team.controller.ts";


const router = new Router();

router.get('team/all', async (context) => {
  try {
    const result = await controller.getAllTeams();
    response.success(context, result);
  } 
  catch (error) {
    response.error(error, "Unknown error");
  }
});

router.get('team/:id', async (context) => {
  try {
    if (context.params && context.params.userId) {
      const teamId: string = context.params.id as string;
      const result = await controller.getTeam(teamId);
      response.success(context, result);
    }
  } 
  catch (error) {
    response.error(error, "Unknown error");
  }
});

export default router;
