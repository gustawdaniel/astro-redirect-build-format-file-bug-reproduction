# Reproduction of bug with url for build.format = file

In docs https://docs.astro.build/en/reference/configuration-reference/#buildformat

there are mentioned 3 build.format options:

- Default `directory`
- `file`
- `preserve`

We will skip `preserve` as it is not relevant to this issue. Let's focus on `file` and `directory`.

This project contains a demo app with urls generated for multilingual blog.

When I am on english version of blog post I want to see

```html
<ul>
    <li style="font-weight:normal"><a href="/posts/en/post-1"> en </a></li>
    <li style="font-weight:bold"><a href="/posts/pl/post-1"> pl </a></li>
</ul>
```

It is desired behavior and work only in `directory` mode.

But when I set `build.format = file` in astro.config.mjs I get

```html
<ul>
    <li style="font-weight:bold"><a href="/"> en </a></li>
    <li style="font-weight:normal"><a href="/pl"> pl </a></li>
</ul>
```

so I'm effectively loosing direct links to translated texts.

# How to reproduce:

With config:

```js
export default defineConfig({
    i18n: {
        defaultLocale,
        // @ts-ignore
        locales: locales
    },
    build:{
        format: 'directory'
    }
});
```

execute

```bash
pnpm build
```

then check lines 18-19 of

```bash
npx prettier dist/posts/en/post-1/index.html | cat -n
```

it will present full correct hrefs.

```html
<a href="/posts/en/post-1">
<a href="/posts/pl/post-1">
```

Now change config to:

```js
export default defineConfig({
    i18n: {
        defaultLocale,
        // @ts-ignore
        locales: locales
    },
    build:{
        format: 'file'
    }
});
```

and again execute

```bash
pnpm build
npx prettier dist/posts/en/post-1.html | cat -n
```

and you will see that hrefs are incorrect.

```html
<a href="/">
<a href="/pl">
```
