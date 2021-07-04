import dotenv from 'dotenv';
import {
    Telegraf, Markup, session, Context,
} from 'telegraf';

dotenv.config();

const token = process.env.BOT_TOKEN;

if (!token) throw new Error('No token for bot!');

interface SessionData {
    workflowName: string;
}

// Define your own context type
interface MyContext extends Context {
    session?: SessionData;
}

const bot = new Telegraf<MyContext>(token);

bot.use(session());

const mainKeyboard = Markup.keyboard([
    Markup.button.text('Поступления'),
    Markup.button.text('Расходы'),
]);

const secondaryKeyboard = Markup.keyboard([
    Markup.button.text('Новые'),
    Markup.button.text('Старые'),
]);

bot.start((ctx) => {
    ctx.reply('Добро пожаловать. Тут будет что-то интересное :)', mainKeyboard);
});

bot.hears('Поступления', (ctx) => {
    ctx.session = {
        ...ctx.session,
        workflowName: 'Поступления',
    };
    ctx.reply(
        'Income',
        secondaryKeyboard,
    );
});
bot.hears('Расходы', (ctx) => {
    ctx.session = {
        ...ctx.session,
        workflowName: 'Расходы',
    };
    ctx.reply(
        'Outcome',
        secondaryKeyboard,
    );
});
bot.hears('Новые', (ctx) => {
    ctx.reply(`${ctx.session?.workflowName} -> Новые`, mainKeyboard);
});
bot.hears('Старые', (ctx) => {
    ctx.reply(`${ctx.session?.workflowName} -> Старые`, mainKeyboard);
});

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
