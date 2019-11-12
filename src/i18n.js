import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Backend from "i18next-locize-backend";
import Editor from "locize-editor";
import LastUsed from "locize-lastused";
import LanguageDetector from "i18next-browser-languagedetector";

const locizeOptions = {
    projectId: "9a278426-6e0b-4e14-9d5f-de7c1412c0a2",
    apiKey: "fb27333a-e693-4707-8481-db59e8221a39",
    referenceLng: "en-US",
    version: "latest"
};

i18n.use(Backend)
    .use(Editor)
    .use(LastUsed)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "en-US",
        saveMissing: true,
        interpolation: { escapeValue: false },
        keySeparator: false,
        nsSeparator: false,
        backend: locizeOptions,
        editor: {
            ...locizeOptions,
            onEditorSaved: async (lng, ns) => {
                await i18n.reloadResources(lng, ns);
                i18n.emit("editorSaved");
            }
        },
        react: {
            bindI18n: "languageChanged editorSaved"
        }
    });

export default i18n;
