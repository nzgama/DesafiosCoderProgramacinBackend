import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import mongo from "./Core/repository/mongo.module.ts";

import user from "./User/user.network.ts";
import task from "./Task/task.network.ts";


const app = new Application();
const port: number = parseInt(`${Deno.env.get('PORT')}`);

const components = [ user, task ];

components.forEach((component: Router) => {
  app.use(component.routes());
  app.use(component.allowedMethods());
});

mongo.connect();
await app.listen({ port });
