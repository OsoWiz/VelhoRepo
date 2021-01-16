import { Application, Router, send } from "https://deno.land/x/oak@v6.3.2/mod.ts";
import { viewEngine, engineFactory, adapterFactory } from "https://raw.githubusercontent.com/deligenius/view-engine/master/mod.ts";

const app = new Application();

const router = new Router();

const ejsEngine = engineFactory.getEjsEngine();
const oakAdapter = adapterFactory.getOakAdapter();

app.use(async (ctx,next) => {
    await send(ctx,
        ctx.request.url.pathname,{
            root:`${Deno.cwd()}/static`
        })
        next();
    });

    app.use(viewEngine(oakAdapter, ejsEngine));

const ShowLanding = ({render}) => {
    render('index.ejs');
}

router.get('/',ShowLanding);



app.use(router.routes());


let port = 7777;
if (Deno.args.length > 0) {  const lastArgument = Deno.args[Deno.args.length - 1];  port = Number(lastArgument);}
app.listen({ port: port });

export { app };


