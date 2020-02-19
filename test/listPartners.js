'use strict'

let expect  = require('chai').expect;
let {listPartners, listPartnersWithOfficesWithinKm, compareCompanyAsc, calculateDistanceForPartnerOfficesFromLocation} = require('../app/listPartners');



describe('List Partners', function() {
    it('should handle bad filePath', function() {
        let badFileNamePath = 'badFileNamePath.blah';
        let resultList = listPartners(badFileNamePath,{ lat : 0, lon : 0}, 100);

        expect(resultList.length).to.equal(0);
      });

      it('should calculate distance', function() {

        let partnerList = [
            {
              "id": 1,
              "urlName": "balance-at-work",
              "organization": "Balance at Work",
              "customerLocations": "across Australia, Pacific and Oceania",
              "willWorkRemotely": true,
              "website": "http://www.balanceatwork.com.au/",
              "services": "At Balance at Work, we want to help you make work a joy for your employees and you! We specialize in leadership development, talent management and career coaching, and use Spidergap as one of our tools to help employees focus their development and achieve more.",
              "offices": [
                {
                  "location": "Sydney, Australia",
                  "address": "Suite 1308, 109 Pitt St \nSydney 2000",
                  "coordinates": "-33.8934219,151.20404600000006"
                }
              ]
            }
        ];
        
        calculateDistanceForPartnerOfficesFromLocation(partnerList, {lat : 51.515419, lon: -0.141099});

        expect(partnerList[0].offices[0].distance).to.equal(10462.39105733);
      });
      
      it('should not calculate distance for invalid coordinates', function() {

        let partnerList = [
            {
              "id": 1,
              "urlName": "balance-at-work",
              "organization": "Balance at Work",
              "customerLocations": "across Australia, Pacific and Oceania",
              "willWorkRemotely": true,
              "website": "http://www.balanceatwork.com.au/",
              "services": "At Balance at Work, we want to help you make work a joy for your employees and you! We specialize in leadership development, talent management and career coaching, and use Spidergap as one of our tools to help employees focus their development and achieve more.",
              "offices": [
                {
                  "location": "Sydney, Australia",
                  "address": "Suite 1308, 109 Pitt St \nSydney 2000",
                  "coordinates": "-33.8934219151.20404600000006"
                }
              ]
            },
            {
              "id": 2,
              "urlName": "spring-development",
              "organization": "Spring Development",
              "customerLocations": "across the UK",
              "willWorkRemotely": true,
              "website": "http://www.springdevelopment.net/",
              "services": "We provide training, coaching and consultancy to ensure that 360 feedback is delivered positively and constructively, maximising personal development. We can train your people to carry out effective feedback meetings or, if you would benefit from having external, impartial facilitators, we can come and do them for you. We're always happy to have an initial confidential discussion to explore how we can help you.",
              "offices": [
                {
                  "location": "Banbury, Oxfordshire",
                  "address": "Banbury, Oxfordshire"
                }
              ]
            },
            {
              "id": 3,
              "urlName": "talent-lab",
              "organization": "Talent Lab",
              "customerLocations": "across Latin America",
              "willWorkRemotely": true,
              "website": "http://www.talentlab.mx/",
              "services": "We are passionate about people and the capability we all have to evolve and make great things together. We free company's potential through their people through innovative tools, holistic solutions and tailored Human Resources Strategies.",
              "offices": [
                {
                  "location": "México City, Mexico",
                  "address": "Emerson 150 - 503, Colonia Chapultepec Morales, Delegación Miguel Hidalgo, México City, Mexico, CP 11570",
                  "coordinates": "19.4361004,-99.18870959999998"
                }
              ]
            }
        ];
        
        calculateDistanceForPartnerOfficesFromLocation(partnerList, {lat : 51.515419, lon: -0.141099});

        expect(partnerList[0].offices[0].distance).to.equal(undefined);
        expect(partnerList[1].offices[0].distance).to.equal(undefined);
        expect(partnerList[2].offices[0].distance).to.equal(10856.58982677639);
      });      
      
      it('should list company offices within distance', function() {

        let partnerList = [
            {
              "id": 1,
              "urlName": "balance-at-work",
              "organization": "Balance at Work",
              "customerLocations": "across Australia, Pacific and Oceania",
              "willWorkRemotely": true,
              "website": "http://www.balanceatwork.com.au/",
              "services": "At Balance at Work, we want to help you make work a joy for your employees and you! We specialize in leadership development, talent management and career coaching, and use Spidergap as one of our tools to help employees focus their development and achieve more.",
              "offices": [
                {
                  "location": "Sydney, Australia",
                  "address": "Suite 1308, 109 Pitt St \nSydney 2000",
                  "coordinates": "-33.8934219,151.20404600000006",
                  distance : 10462.39105733
                }
              ]
            },
            {
              "id": 2,
              "urlName": "spring-development",
              "organization": "Spring Development",
              "customerLocations": "across the UK",
              "willWorkRemotely": true,
              "website": "http://www.springdevelopment.net/",
              "services": "We provide training, coaching and consultancy to ensure that 360 feedback is delivered positively and constructively, maximising personal development. We can train your people to carry out effective feedback meetings or, if you would benefit from having external, impartial facilitators, we can come and do them for you. We're always happy to have an initial confidential discussion to explore how we can help you.",
              "offices": [
                {
                  "location": "Banbury, Oxfordshire",
                  "address": "Banbury, Oxfordshire",
                  "coordinates": "52.0629009,-1.3397750000000315",
                  distance : 146.5285714359397
                }
              ]
            },
            {
              "id": 3,
              "urlName": "talent-lab",
              "organization": "Talent Lab",
              "customerLocations": "across Latin America",
              "willWorkRemotely": true,
              "website": "http://www.talentlab.mx/",
              "services": "We are passionate about people and the capability we all have to evolve and make great things together. We free company's potential through their people through innovative tools, holistic solutions and tailored Human Resources Strategies.",
              "offices": [
                {
                  "location": "México City, Mexico",
                  "address": "Emerson 150 - 503, Colonia Chapultepec Morales, Delegación Miguel Hidalgo, México City, Mexico, CP 11570",
                  "coordinates": "19.4361004,-99.18870959999998",
                  distance : 10856.58982677639
                }
              ]
            }
        ];
        
        let resultList = listPartnersWithOfficesWithinKm(partnerList, 146);
        expect(resultList.length).to.equal(0);
        
        resultList = listPartnersWithOfficesWithinKm(partnerList, 147);
        expect(resultList.length).to.equal(1);     
        
        resultList = listPartnersWithOfficesWithinKm(partnerList, 11000);
        expect(resultList.length).to.equal(3); 
        
      });      
      it('should list offices in ascending order', function() {

        let company1 = {companyName : 'B'};
        let company2 = {companyName : 'A'};
        
        let result = compareCompanyAsc(company2, company1);
        expect(result).to.equal(-1);

        result = compareCompanyAsc(company1, company2);
        expect(result).to.equal(0);
      });
})