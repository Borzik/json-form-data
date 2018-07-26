describe('jsonToFormData', function() {

    it('should be attached to the window', function() {

        expect(window).to.have.property('jsonToFormData');
    });

    it('should be a function', function() {

        expect(window.jsonToFormData).to.be.an('function');
    });

    it('should not append null or undefined values', function() {

        var testObject = {
            prop1: null,
            prop2: undefined
        };

        var formDataResult = window.jsonToFormData(testObject);

        expect(formDataResult.has('prop1')).to.equal(false);
        expect(formDataResult.has('prop2')).to.equal(false);
    });

    it('should convert true to 1 and false to 0', function() {

        var testObject = {
            prop1: true,
            prop2: false
        };

        var formDataResult = window.jsonToFormData(testObject);

        expect(formDataResult.get('prop1')).to.equal('1');
        expect(formDataResult.get('prop2')).to.equal('0');
    });

    it('should convert arrays', function() {

        var testObject = {
            prop1: [11, 'test', true, false]
        };

        var formDataResult = window.jsonToFormData(testObject);

        expect(formDataResult.getAll('prop1[]')).to.equal(['11', 'test', '1', '0']);
    });

    it('should convert a shallow object', function() {

        var testObject = {
            prop1: 'test',
            prop2: 2,
            prop3: null,
            prop4: undefined,
            prop5: true,
            prop6: false
        };

        var formDataResult = window.jsonToFormData(testObject);

        expect(formDataResult.get('prop1')).to.equal('test');
        expect(formDataResult.get('prop2')).to.equal('2');
        expect(formDataResult.get('prop5')).to.equal('1');
        expect(formDataResult.get('prop6')).to.equal('0');
    });

    it('should convert a nested object', function() {

        var testObject = {
            prop1: 'test',
            prop2: 2,
            prop3: null,
            prop4: undefined,
            prop5: true,
            prop6: false,
            prop7: {
                prop1: 'test',
                prop2: 2,
                prop3: null,
                prop4: undefined,
                prop5: true,
                prop6: false
            }
        };

        var formDataResult = window.jsonToFormData(testObject);

        expect(formDataResult.get('prop7[prop1]')).to.equal('test');
        expect(formDataResult.get('prop7[prop2]')).to.equal('2');
        expect(formDataResult.get('prop7[prop5]')).to.equal('1');
        expect(formDataResult.get('prop7[prop6]')).to.equal('0');
    });

    it('should convert an object nested 3 levels deep', function() {

        var testObject = {
            prop1: 'test',
            prop2: 2,
            prop3: null,
            prop4: undefined,
            prop5: true,
            prop6: false,
            prop7: {
                prop1: 'test',
                prop2: 2,
                prop3: null,
                prop4: undefined,
                prop5: true,
                prop6: false,
                prop7: {
                    prop1: 'test',
                    prop2: 2,
                    prop3: null,
                    prop4: undefined,
                    prop5: true,
                    prop6: false
                }
            }
        };

        var formDataResult = window.jsonToFormData(testObject);

        expect(formDataResult.get('prop7[prop7][prop1]')).to.equal('test');
        expect(formDataResult.get('prop7[prop7][prop2]')).to.equal('2');
        expect(formDataResult.get('prop7[prop7][prop5]')).to.equal('1');
        expect(formDataResult.get('prop7[prop7][prop6]')).to.equal('0');
    });

    it('should convert an array nested with a nested object', function() {

        var testObject = {
            prop1: 'test',
            prop2: 2,
            prop3: null,
            prop4: undefined,
            prop5: true,
            prop6: false,
            prop7: {
                prop1: 'test',
                prop2: 2,
                prop3: null,
                prop4: undefined,
                prop5: true,
                prop6: false,
                prop7: [11, 'test', true, false]
            }
        };

        var formDataResult = window.jsonToFormData(testObject);

        expect(formDataResult.get('prop7[prop7][]')).to.equal(['11', 'test', '1', '0']);
    });
});