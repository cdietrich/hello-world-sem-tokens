import { EmptyFileSystem, startLanguageServer, URI } from 'langium';
import { BrowserMessageReader, BrowserMessageWriter, createConnection } from 'vscode-languageserver/browser.js';
import { createHelloWorldServices } from './hello-world-module.js';

declare const self: DedicatedWorkerGlobalScope;

const messageReader = new BrowserMessageReader(self);
const messageWriter = new BrowserMessageWriter(self);

const connection = createConnection(messageReader, messageWriter);

const { shared } = createHelloWorldServices({ connection, ...EmptyFileSystem });

const documentBuilder = shared.workspace.DocumentBuilder;
const documents = shared.workspace.TextDocuments;
const mutex = shared.workspace.MutexLock;

function onDidClose(uri: URI) {
    mutex.lock(token => documentBuilder.update([], [uri], token));
}

documents.onDidClose((event) => {
    onDidClose(URI.parse(event.document.uri));
})
startLanguageServer(shared);
