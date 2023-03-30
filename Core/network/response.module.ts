import { Context } from "https://deno.land/x/oak/mod.ts";


function success(context: Context<Record<string, any>>, message: any, status?: number) {
  context.response.status = status || 200;
  context.response.body = {
    error: '',
    body: message
  }
}

function error(context: Context<Record<string, any>>, message: any, status?: number) {
  context.response.status = status || 500;
  context.response.body = {
    error: message,
    body: ''
  }
}

export default { success, error };
