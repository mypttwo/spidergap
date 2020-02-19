'use strict';

let readJsonFile = require('./readJsonFile');
let {calculateDistance} = require('./calculateDistance');

const calculateDistanceForPartnerOfficesFromLocation = (partnersList, srcTownCoordinates) => {
    partnersList.map((partnerData) => {
        partnerData.offices.map(office =>{
            try {
                let coord = office.coordinates.split(',');
                office.distance = calculateDistance(JSON.parse(coord[0]), JSON.parse(coord[1]), 
                                            srcTownCoordinates.lat, srcTownCoordinates.lon)
            } catch (error) {
                //Write to log
                //console.error(error);
            }
        })
        return partnerData
    });
}

const compareCompanyAsc = (company1, company2) => {
    if (company1.companyName < company2.companyName) {
        return -1;
    }
    if (company1.companyName < company2.companyName) {
        return 1;
    }
    return 0;
}

const listPartnersWithOfficesWithinKm = (partnersList, minDistance) => {
    let resultList = [];

    partnersList.forEach(partner => {
        if(partner.offices){
            partner.offices.forEach(office => {
                try {
                    if(office.distance < minDistance){
                        resultList.push({
                            companyName : partner.organization,
                            address : office.address,
                            distance : office.distance
                        })
                    }                    
                } catch (error) {
                    //Write to log
                    //console.error(error);                    
                }
            })
        }
    });

    return resultList;
}

const listPartners = (partnersJsonFileWithPath, srcTownCoordinates, minDistance) => {
    let resultList = [];

    try {

        let partnersList = [];

        partnersList = JSON.parse(readJsonFile(partnersJsonFileWithPath));

        calculateDistanceForPartnerOfficesFromLocation(partnersList, srcTownCoordinates);

        resultList = listPartnersWithOfficesWithinKm(partnersList, minDistance);

        //console.log(JSON.stringify(resultList, null, 2));

        resultList.sort(compareCompanyAsc);

        //console.log(JSON.stringify(resultList, null, 2));
        

    } catch (error) {
        //Write to log
        //console.error(error);
    }

    return resultList;
}

// listPartners('partners.json',{lat : 51.515419, lon: -0.141099}, 100);

module.exports = {
    listPartners,
    listPartnersWithOfficesWithinKm,
    compareCompanyAsc,
    calculateDistanceForPartnerOfficesFromLocation
}
