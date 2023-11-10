import { AbstractSemanticTokenProvider, AstNode, SemanticTokenAcceptor, flattenCst, isLeafCstNode } from "langium";
import { GrammarAST } from "langium";
import { SemanticTokenTypes, } from "vscode-languageserver";

export class HelloSemanticTokenProvider extends AbstractSemanticTokenProvider {
    // override async semanticHighlight(document: LangiumDocument, _params: SemanticTokensParams, cancelToken = CancellationToken.None): Promise<SemanticTokens> {
    //     this.currentRange = undefined;
    //     this.currentDocument = document;
    //     this.currentTokensBuilder = this.getDocumentTokensBuilder(document);
    //     this.currentTokensBuilder.previousResult(this.currentTokensBuilder.id);
    //     await this.computeHighlighting(document, this.createAcceptor(), cancelToken);
    //     return this.currentTokensBuilder.build();
    // }

    // override async semanticHighlightRange(document: LangiumDocument, params: SemanticTokensRangeParams, cancelToken = CancellationToken.None): Promise<SemanticTokens> {
    //     this.currentRange = params.range;
    //     this.currentDocument = document;
    //     this.currentTokensBuilder = this.getDocumentTokensBuilder(document);
    //     this.currentTokensBuilder.previousResult(this.currentTokensBuilder.id);
    //     await this.computeHighlighting(document, this.createAcceptor(), cancelToken);
    //     return this.currentTokensBuilder.build();
    // }
    
    protected override highlightElement(node: AstNode, acceptor: SemanticTokenAcceptor): void | "prune" | undefined {
        console.log("mimimimi3")
        if (node.$cstNode !== undefined && node.$container === undefined) {
            flattenCst(node.$cstNode).forEach ((cst) =>{
                if (cst && GrammarAST.isKeyword(cst.grammarSource) && "person" !== cst.grammarSource.value) {
                    console.log("aaaa", cst.range)
                    acceptor({
                        cst:cst,
                        type: SemanticTokenTypes.keyword
                    })
                } else if (isLeafCstNode(cst) && "ML_COMMENT" == cst.tokenType.name) {
                    // console.log("HelloSemanticTokenProvider", cst.tokenType.name)
                    // console.log("comment found");
                    // acceptor({
                    //     cst: cst,
                    //     type: SemanticTokenTypes.comment
                    // })
                }
            })
        }
        return "prune"
    }

}