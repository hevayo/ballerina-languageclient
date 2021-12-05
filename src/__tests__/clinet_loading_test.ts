import { doesNotMatch } from 'assert';
import { BalleriaLanguageClient } from '../index';
import { file } from '../messages';
import { StdioConnection } from '../StdioConnection';

describe('Test Ballerina Language Client Load', () => {
    const mainFile = __dirname + '/resources/myPackage/main.bal';
    let bls: BalleriaLanguageClient;

    beforeAll(() => {
        bls = new BalleriaLanguageClient(new StdioConnection(mainFile));
    });

    test('Open a file', () => {
        return bls.onReady().then(() => {
            return bls.didOpen(mainFile);
        });
    });

    test('Test Syntax Tree', () => {
        return bls.onReady().then(() => {
            return bls.getSyntaxTree({
                documentIdentifier: {
                    uri: file(mainFile)
                }
            })
        }).then((response) => {
            expect(response).toHaveProperty('syntaxTree');
        });
    });

    afterAll(() => {
        return bls.onReady().then(() => {
            return bls.stop();
        });
    });


});
