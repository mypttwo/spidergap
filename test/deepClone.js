'use strict'

let expect  = require('chai').expect;
let deepClone = require('../app/deepClone');

describe('Deep Clone', function() {
    it('should clone obj without functions', function() {
        let obj = {
            name: "Paddy",
            address: {
                town: "Lerum",
                country: "Sweden"
            }
        }
        let deepCloneObj = deepClone(obj);

        expect(obj).to.deep.equal(deepCloneObj);
      });
      it('should clone obj with functions', function() {

        let obj = {
            name: "Paddy",
            address: {
                town: "Lerum",
                country: "Sweden"
            },
            fullAddress : function() {
                return this.address.town + " " + this.address.country;
            }
        }
        
        let deepCloneObj = deepClone(obj);
        
        expect(deepCloneObj.fullAddress()).to.equal("Lerum Sweden");
      }); 
      
      it('should clone array', function() {

        let arr = ['Apple', 'Banana'];
        
        let deepCloneArr = deepClone(arr);
        
        expect(deepCloneArr).to.deep.equal(arr);
      });
})