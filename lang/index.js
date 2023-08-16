import { createTranslator } from "@/lang/translator.js";

import global_en from "@/lang/translations/en/global.js";
import global_nl from "@/lang/translations/nl/global.js";
import auth_en from "@/lang/translations/en/auth.js";
import app_en from "@/lang/translations/en/app.js";
import auth_nl from "@/lang/translations/nl/auth.js";
import app_nl from "@/lang/translations/nl/app.js";


const translator = createTranslator({
    "en": {
        global: global_en,
        auth: auth_en,
        app: app_en
    },
    "nl": {
        global: global_nl,
        auth: auth_nl,
        app: app_nl
    }
});

export default translator;
