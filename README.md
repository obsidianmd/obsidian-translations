# Translate Obsidian

Help translate Obsidian into your language.

## Request a language

If the language you want to translate doesn't exist as a JSON file yet, submit an issue so that we can create a template for you to get started.

## Staying up-to-date

Merge conflicts are nasty. They happen when you're translating an outdated version of the template, part of which might have been translated by someone else. To prevent this, try to fork our respository right before you translate.

If you want to do multiple translation pull requests, before doing work each time, use the "Compare" UI on your own fork to pull in all the newest changes from `obsidianmd:master` first by creating a pull request on your own repository and merge it in yourself, so that your own copy is up-to-update.

## Submit changes

To translate, [fork this repo](https://guides.github.com/activities/forking/) and edit the JSON file of your language. After that, [submit a pull request](https://guides.github.com/activities/forking/).

Note that you don't have to clone your fork to make the edits; you can do everything on GitHub's web UI. Simply open a file in your own forked repo and click on the pencil icon to start editing.

## Translating

The translation JSON file consists of key value pairs. The key should give you a good idea of where the text is in the app.

To translate, simply edit the value. For example, let's say you see

```json
"plugin": "Plugin"
```

Simply change it to:

```json
"plugin": "pLU9IN"
```

where "pLU9IN" is the phrase "plugin" in the target language. I'm using leetspeak as an example here.

If you encounter something like

```json
"label-welcome": "Welcome, {{name}}!"
```
leave the `{{name}}` part alone and do not translate it. "name" is not part of the text and will be replaced by the appropriate value when the app runs.

## Existing languages

Here is a table of language code to language name, in alphabetical order. These languages have their template files ready, but are not necessarily ready to be used in the app.

| Language code | Language name | Native name | Status |
| --- | --- | --- | :---: |
| `en` (default) | English | English | ✅ |
| `ar` | Arabic | العربية | 🚧 |
| `cz` | Czech | čeština | ✅ |
| `da` | Danish | Dansk | ✅ |
| `de` | German | Deutsch | ✅ |
| `el` | Greek | Ελληνικά | 🚧 |
| `es` | Spanish | Español | ✅ |
| `fr` | French | français | ✅ |
| `hi` | Hindi | हिन्दी | 🚧 |
| `id` | Indonesian | Bahasa Indonesia | ✅ |
| `it` | Italian | Italiano | ✅ |
| `ja` | Japanese | 日本語 | ✅ |
| `ko` | Korean | 한국어 | ✅ |
| `ml` | Malayalam | മലയാളം | 🚧 |
| `nl` | Dutch | Nederlands | 🚧 |
| `no` | Norwegian | Norsk | ✅ |
| `pl` | Polish | język polski | ✅ |
| `pt` | Portuguese | Português | ✅ |
| `pt-BR` | Brazilian Portuguese | Portugues do Brasil | ✅ |
| `ro` | Romanian | Română | ✅ |
| `ru` | Russian | русский | ✅ |
| `sk` | Slovak | Slovenčina |  🚧 |
| `tam` | Tamil | தமிழ் | 🚧 |
| `tr` | Turkish | Türkçe | 🚧 |
| `ur` | Urdu | اردو | 🚧 |
| `zh` (see note below) | Chinese (Simplified) | 简体中文 | ✅ |
| `zh-TW` | Chinese (Traditional) | 繁體中文 | ✅ |

> Note: the Chinese translation is maintained by the Chinese Obsidian QQ group. If you want to discuss it, please join the QQ group: 774176839.

