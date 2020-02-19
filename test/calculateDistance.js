'use strict'

let expect  = require('chai').expect;
let {calculateDistance, degrees_to_radians, deltaSigma, deltaSigmaLong} = require('../app/calculateDistance');

describe('Distance Calculator', function() {
    it('should calculate distance', function() {
        let srcTownCoordinates = {lat : 51.515419, lon: -0.141099};
        let townCoordinates = {lat : 51.5014767,lon: -0.0713608999999451};

        let distance = calculateDistance(townCoordinates.lat, townCoordinates.lon, srcTownCoordinates.lat, srcTownCoordinates.lon)

        //console.log(distance);

        expect(distance).to.equal(7.90797619788474);
      });

      it('should calculate deltaSigma (short method)', function() {
        let srcTownCoordinates = {lat : 51.515419, lon: -0.141099};
        let townCoordinates = {lat : 51.5014767,lon: -0.0713608999999451};

        let deltaSigmaResult = deltaSigma(townCoordinates.lat, townCoordinates.lon, srcTownCoordinates.lat, srcTownCoordinates.lon)

        expect(deltaSigmaResult).to.equal(0.0012412456753860838);
        
      }); 
      
      it('should calculate deltaSigma (long method)', function() {
        let srcTownCoordinates = {lat : 51.515419, lon: -0.141099};
        let townCoordinates = {lat : 51.5014767,lon: -0.0713608999999451};

        let deltaSigmaResult = deltaSigmaLong(townCoordinates.lat, townCoordinates.lon, srcTownCoordinates.lat, srcTownCoordinates.lon)

        expect(deltaSigmaResult).to.equal(0.0012412456753263816);
        
      });

      it('should convert degrees to radians', function() {

        let radians = degrees_to_radians(51.515419);

        expect(radians).to.equal(0.8991136770944448);
        
      });
      
})