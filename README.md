# Translate Obsidian

Help translate Obsidian into your language.

## Add a new language

To add a new language, follow these steps:

1. Copy all of the content of `en.txt`: https://raw.githubusercontent.com/obsidianmd/obsidian-translations/master/translations/en.txt
2. Paste into here: https://github.com/obsidianmd/obsidian-translations/new/master/translations
3. Translate some strings to your language
4. Find the language code of the language you're contributing: https://www.wikiwand.com/en/List_of_ISO_639-1_codes and name the new file `[language code].txt`.
6. In the description of the pull request, or in a comment, please include the [endonym](<https://en.wikipedia.org/wiki/Endonym_and_exonym#:~:text=An%20endonym%20(also%20known%20as,their%20homeland%2C%20or%20their%20language.>) of the language, this is how the language will be displayed in the app.
7. Submit your pull request.

## Staying up-to-date

Merge conflicts are nasty. They happen when you're translating an outdated version of the template, part of which might have been translated by someone else. To prevent this, try to fork our repository right before you translate.

If you want to do multiple translation pull requests, before doing work each time, use the "Compare" UI on your own fork to pull in all the newest changes from `obsidianmd:master` first by creating a pull request on your own repository and merge it in yourself, so that your own copy is up-to-update.

## Submit changes

To translate, [fork this repo](https://guides.github.com/activities/forking/) and edit the txt file of your language. After that, [submit a pull request](https://guides.github.com/activities/forking/).

Note that you don't have to use git to clone your fork to make the edits; you can do everything on GitHub's web UI. Simply open a file in your own forked repo and click on the pencil icon to start editing.

## Translating

The translation file consists of blocks. Each block header is the key that should give you a good idea of where the text is in the app.

To translate, simply write after `translation=`. For example, let's say you see

```
[setting.label-example]
original=The original english text.
translation=
```

Simply change it to:

```
[setting.label-example]
original=The original english text.
translation=Le texte original en anglais.
```

If you encounter something like

```
[setting.label-welcome]
original=Welcome, {{name}}!
translation=Bienvenue, {{name}} !
```

leave the `{{name}}` part alone and DO NOT translate it. "name" is not part of the text and will be replaced by the appropriate value when the app runs.

### Translating an update

From time to time, we'll add new strings to all the language files. The new strings will be in English and ready to be translated to your language of choice.

Update commits usually have message in the format of "Update strings for 1.x.x" where "1.x.x" is the new version number. This is an example commit: [Update strings for 1.2.7](https://github.com/obsidianmd/obsidian-translations/commit/8bff16a8b866604876d417bf7f322484b6090431).

By examining what happened to your language file, you can find the new strings to translate.

### Translate a missing phrase on the UI

If you spot a missing phrase while using Obsidian, here's what to do:

1. Figure out where the language file lives by looking up the language table in the README under the ["Existing languages" section](https://github.com/obsidianmd/obsidian-translations#existing-languages).
2. Edit the language file, look for the exact English phrase.
3. Replace it with the appropriate translated phrase.
4. Submit your changes as a pull request.

### Testing translation

Once you have the txt file, you can test it by opening up developer console and enter `selectLanguageFileLocation()`. The app will prompt you for a txt file location. After that, the app will reboot itself with the selected translation file applied.

To revert to using the default language pack, open developer console and enter `localStorage.removeItem('language')`.

## Website translations

The `website/` directory contains translations for the [Obsidian website](https://obsidian.md). These are JSON files used by the static site generator to produce localized versions of the marketing pages.

- `website/locales.json` — lists enabled locales and their display names
- `website/{locale}.txt` — translations for each locale

Website translations cover the header, footer, navigation, and all marketing page content.

### Workflow

1. **English is the source of truth.** Add or change strings in `website/en.txt` first.
2. **Run `node scripts/check-website.mjs`** to see which locales have missing or extra keys.
3. **Translators update their locale files** to match. Missing keys automatically fall back to English on the site.

### Guidelines for website translations

- **Brand names stay in English** in running text: Obsidian, Obsidian Sync, Obsidian Publish, Catalyst, Web Clipper, Markdown.
- **Feature names in navigation** should match the app translations (e.g. Sync = 同期 in Japanese, 同步 in Chinese).
- Use `%LOCALE_PATH%` in links that need locale prefixing (e.g. `<a href="%LOCALE_PATH%/sync">`).

## Existing languages

Here is a table of language code to language name, in alphabetical order. The "App" column indicates the status of the app translation. The "Website" column indicates whether a website translation is available.

| Language code | Language name | Native name | App | Website |
| --- | --- | --- | :---: | :---: |
| `en` | English | English | ✅ | ✅ |
| `af` | Afrikaans | Afrikaans | 🚧 | |
| `am` | Amharic |  አማርኛ | ✅ | |
| `ar` | Arabic | العربية | ✅ | ✅ |
| `az` | Azerbaijani | ? | 🚧 | |
| `be` | Belarusian | Беларуская мова | ✅ | |
| `bg` | Bulgarian | български език | 🚧 | |
| `bn` | Bengali | বাংলা | ✅ | |
| `ca` | Catalan | català | ✅ | |
| `cs` | Czech | čeština | ✅ | |
| `da` | Danish | Dansk | ✅ | |
| `de` | German | Deutsch | ✅ | ✅ |
| `dv` | Dhivehi | ދިވެހި | 🚧 | |
| `el` | Greek | Ελληνικά | ✅ | |
| `en-GB` | English (GB) | English (GB) | ✅ | |
| `eo` | Esperanto | Esperanto | 🚧 | |
| `es` | Spanish | Español | ✅ | ✅ |
| `eu` | Basque | Euskara | 🚧 | |
| `fa` | Persian | فارسی | ✅ | |
| `fi` | Finnish | suomi | ✅ | |
| `fr` | French | français | ✅ | ✅ |
| `ga` | Irish | Gaeilge | ✅ | |
| `gl` | Galician  | Galego | 🚧 | |
| `he` | Hebrew  | עברית 🇮🇱 | ✅ | |
| `hi` | Hindi | हिन्दी | 🚧 | |
| `hr` | Croatian | ? | 🚧 | |
| `hu` | Hungarian | Magyar | ✅ | |
| `id` | Indonesian | Bahasa Indonesia | ✅ | |
| `it` | Italian | Italiano | ✅ | ✅ |
| `ja` | Japanese | 日本語 | ✅ | ✅ |
| `ka` | Georgian | ქართული | ✅ | |
| `kh` | Khmer | ខេមរភាសា | ✅ | |
| `kn` | Kannada | ಕನ್ನಡ | 🚧 | |
| `ko` | Korean | 한국어 | ✅ | ✅ |
| `ky` | Kyrgyz | Кыргызча | 🚧 | |
| `la` | Latin | Latina | 🚧 | |
| `lt` | Lithuanian | ? | 🚧 | |
| `lv` | Latvian | Latviešu | ✅ | |
| `ml` | Malayalam | മലയാളം | 🚧 | |
| `ms` | Malay | Bahasa Melayu | ✅ | |
| `nan-TW` | Taiwanese (Min Nan) | ? | 🚧 | |
| `ne` | Nepali | नेपाली | ✅ | |
| `nl` | Dutch | Nederlands | ✅ | |
| `nn` | Norwegian Nynorsk | ? | 🚧 | |
| `no` | Norwegian | Norsk | ✅ | |
| `oc` | Occitan | Occitan | 🚧 | |
| `or` | Odia | ଓଡ଼ିଆ | 🚧 | |
| `pl` | Polish | język polski | ✅ | |
| `pt` | Portuguese | Português | ✅ | |
| `pt-BR` | Brazilian Portuguese | Portugues do Brasil | ✅ | |
| `ro` | Romanian | Română | ✅ | |
| `ru` | Russian | Русский | ✅ | |
| `sa` | Sanskrit | संस्कृतम् | 🚧 | |
| `si` | Sinhalese | සිංහල | 🚧 | |
| `sk` | Slovak | Slovenčina | ✅ | |
| `sl` | Slovenian | ? | 🚧 | |
| `sq` | Albanian | Shqip | ✅ | |
| `sr` | Serbian | српски језик | ✅ | |
| `sv` | Swedish | Svenska | ✅ | |
| `sw` | Swahili | ? | 🚧 | |
| `ta` | Tamil | தமிழ் | 🚧 | |
| `te` | Telugu | తెలుగు | 🚧 | |
| `th` | Thai | ไทย | ✅ | |
| `tl` | Filipino (Tagalog) | Tagalog | 🚧 | |
| `tr` | Turkish | Türkçe | ✅ | |
| `tt` | Tatar | Татарча | 🚧 | |
| `uk` | Ukrainian | Українська | ✅ | |
| `ur` | Urdu | اردو | 🚧 | |
| `uz` | Uzbek | oʻzbekcha | ✅ | |
| `vi` | Vietnamese | Tiếng Việt | ✅ | |
| `zh` | Chinese (Simplified) | 简体中文 | ✅ | ✅ |
| `zh-TW` | Chinese (Traditional) | 繁體中文 | ✅ | |

> Note: the Chinese translation is maintained by Obsidian.zh. If you want to discuss it, please come here: https://github.com/obsidianzh/obsidian-translations.
