'use strict'

const earthRadius = 6371;

const sq = x => Math.pow(x,2);

//https://wikimedia.org/api/rest_v1/media/math/render/svg/87cea288a5b6e80757bc81375c3b6a38a30a5184
const deltaSigmaLong = (lambda1_deg, phi1_deg, lambda2_deg, phi2_deg) => {
    let lambda1_rad = degrees_to_radians(lambda1_deg);
    let phi1_rad = degrees_to_radians(phi1_deg);
    let lambda2_rad = degrees_to_radians(lambda2_deg);
    let phi2_rad = degrees_to_radians(phi2_deg);

    let deltaLambda = Math.abs(lambda1_rad - lambda2_rad);

    let num1 = sq((Math.cos(phi2_rad) * Math.sin(deltaLambda)));
    let num2 = sq(Math.cos(phi1_rad) * Math.sin(phi2_rad) - Math.sin(phi1_rad) * Math.cos(phi2_rad) * Math.cos(deltaLambda));


    let numerator = Math.sqrt(num1 + num2);

    let denominator = Math.sin(phi1_rad) * Math.sin(phi2_rad) + Math.cos(phi1_rad) * Math.cos(phi2_rad) * Math.cos(deltaLambda);

    return Math.atan(numerator/denominator);
}

//https://wikimedia.org/api/rest_v1/media/math/render/svg/d924c72204c36417ad81c90186cf20da997b266f
const deltaSigma = (lambda1_deg, phi1_deg, lambda2_deg, phi2_deg) => {
    let lambda1_rad = degrees_to_radians(lambda1_deg);
    let phi1_rad = degrees_to_radians(phi1_deg);
    let lambda2_rad = degrees_to_radians(lambda2_deg);
    let phi2_rad = degrees_to_radians(phi2_deg);

    let deltaLambda = Math.abs(lambda1_rad - lambda2_rad);

    return Math.acos(Math.sin(phi1_rad) * Math.sin(phi2_rad) + 
    Math.cos(phi1_rad) * Math.cos(phi2_rad) * Math.cos(deltaLambda));
}

//https://www.w3resource.com/javascript-exercises/javascript-math-exercise-33.php
const degrees_to_radians = (degrees) => {
  let pi = Math.PI;
  return degrees * (pi/180);
}

const calculateDistance = (lambda1_deg, phi1_deg, lambda2_deg, phi2_deg) =>{
    //return Math.abs(earthRadius * deltaSigmaLong(lambda1_deg, phi1_deg, lambda2_deg, phi2_deg));
    return Math.abs(earthRadius * deltaSigma(lambda1_deg, phi1_deg, lambda2_deg, phi2_deg));
}

module.exports = {
    calculateDistance,
    degrees_to_radians,
    deltaSigma,
    deltaSigmaLong
};