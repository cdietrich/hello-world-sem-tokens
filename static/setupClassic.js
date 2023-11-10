import { addMonacoStyles, defineUserServices, MonacoEditorLanguageClientWrapper } from './bundle/index.js';
import monarchSyntax from "../syntaxes/hello-world.monarch.js";
import { configureWorker } from './setup.js';

addMonacoStyles('monaco-editor-styles');

export const setupConfigClassic = () => {
    return {
        wrapperConfig: {
            serviceConfig: defineUserServices(),
            editorAppConfig: {
                $type: 'classic',
                languageId: 'hello-world',
                code: `// Hello World is running in the web!
person A Hello A! Hello B!`,
                useDiffEditor: false,
                languageExtensionConfig: { id: 'langium' },
                // languageDef: monarchSyntax,
                editorOptions: {
                    'semanticHighlighting.enabled': true,
                    //theme: 'vs-dark'
                }
            }
        },
        languageClientConfig: configureWorker()
    };
};

export const executeClassic = async (htmlElement) => {
    const userConfig = setupConfigClassic();
    const wrapper = new MonacoEditorLanguageClientWrapper();
    await wrapper.start(userConfig, htmlElement);
};
