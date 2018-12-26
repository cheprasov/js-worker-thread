
import BlobFileFactory, { objectUrlMap } from './BlobFileFactory';

describe('BlobFileFactory', () => {

    beforeEach(() => {
        global.URL = {
            createObjectURL: jest.fn((blob) => {
                return `objectURL:${blob.size}`;
            }),
        };
        objectUrlMap.clear();
    });

    describe('createJavaScriptObjectUrl', () => {
        it('should create new object url by code', () => {
            expect(BlobFileFactory.createJavaScriptObjectUrl('foo')).toEqual('objectURL:3');
            expect(BlobFileFactory.createJavaScriptObjectUrl('fooBar')).toEqual('objectURL:6');
        });

        it('should return object url from cache if useCache is true', () => {
            objectUrlMap.set('foo', 'cached-url');
            expect(BlobFileFactory.createJavaScriptObjectUrl('foo', true)).toEqual('cached-url');
        });

        it('should not return object url from cache if useCache is false', () => {
            objectUrlMap.set('foo', 'cached-url');
            expect(BlobFileFactory.createJavaScriptObjectUrl('foo', false)).toEqual('objectURL:3');
        });

        it('should add new object url to cache if useCache is true', () => {
            expect(BlobFileFactory.createJavaScriptObjectUrl('foo', true)).toEqual('objectURL:3');
            expect(objectUrlMap.get('foo')).toEqual('objectURL:3');
        });

        it('should not add new object url to cache if useCache is false', () => {
            expect(BlobFileFactory.createJavaScriptObjectUrl('foo', false)).toEqual('objectURL:3');
            expect(objectUrlMap.has('foo')).toBeFalsy();
        });
    });

});
