import { doesNotMatch } from 'assert';
import { BalleriaLanguageClient } from '../index';
import { file } from '../messages';

describe('Test Ballerina Language Client Load', () => {
    const bls = BalleriaLanguageClient.load("/usr/lib/ballerina/distributions/ballerina-slbeta3");
    const mainFile = __dirname + '/resources/myPackage/main.bal';

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
    })
});
