import 'dotenv/config';
import Koa from 'koa';
import Router from 'koa-router';
import Shorten from './models/shorten.js';
import randomStr from './randomKey.js';
import koaBody from 'koa-body';
import cors from '@koa/cors';
import serve from 'koa-static';
const app = new Koa();
app.use(koaBody());
app.use(cors());
app.use(serve('dist'));
const router = new Router();
router.get('/add', async ctx => {
  const { origin } = ctx?.query || {};
  if (!origin) {
    return;
  }
  const [shorten, exists] = await Shorten.findOrCreate({
    defaults: {
      originLink: origin,
      shortKey: randomStr()
    },
    where: {
      originLink: origin
    }
  });
  ctx.body = shorten.toJSON();
})

router.get('/list', async ctx => {
  const list = await Shorten.findAll();
  ctx.body = list;
})

router.post('/delete', async ctx => {
  const { shortKey } = ctx?.request?.body || {};
  if (!shortKey) {
    ctx.status = 404;
    return;
  }
  const shorten = await Shorten.findByPk(shortKey);
  if (!shorten) {
    ctx.status = 404;
  } else {
    await shorten.destroy();
    ctx.status = 204;
  }
})

router.get('/:key', async ctx => {
  const { key } = ctx.params || {};
  console.log(ctx.params);
  let shorten = await Shorten.findOne({
    where: {
      shortKey: key
    }
  });
  if (shorten) {
    let target = shorten.originLink;
    if (!target.startsWith('http')) {
      target = `${ctx.protocol}://${target.originLink}`;
    }
    ctx.redirect(shorten.originLink);
  } else {
    ctx.status = 404;
  }
});

app.use(router.routes());

app.listen(8000);
