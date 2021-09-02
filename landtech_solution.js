/*
The Problem
 
We would like you to change the below function to return which land parcels the given company owns (** directly and indirectly **).
 
When you are ready, please open any text-editor/IDE you wish, paste the code below, and share your screen so we can collaborate on the solution.
 
** Don't forget you can ask as many questions as you want. **
 
*/

//  c1 : c3 -> l3
//  c3 : c5 -> l4, l5, c6 -> null
//  c2 : c4 -> null

const companies = [
  { id: "c1", name: "Big Corp A", parentId: null },
  { id: "c2", name: "Big Corp B", parentId: null },
  { id: "c3", name: "Medium Corp A", parentId: "c1" },
  { id: "c4", name: "Medium Corp B", parentId: "c2" },
  { id: "c5", name: "Small Corp A", parentId: "c3" },
  { id: "c6", name: "Small Corp B", parentId: "c3" }
];

const landParcels = [
  { id: "l1", companyId: "c1" },
  { id: "l2", companyId: "c2" },
  { id: "l3", companyId: "c3" },
  { id: "l4", companyId: "c5" },
  { id: "l5", companyId: "c5" }
];

// Implement the following function
//  E.g. getLandParcelsForCompany("c1") => ["l1","l3","l4","l5"]
function getLandParcelsForCompany(companyId) {
  let landsUnderCompany = [];
  let companyIds = []; // c1

  companyIds = getAllChildsOfCompany(companyId, []);

  companyIds.forEach((companyId) => {
    landsUnderCompany = [...landsUnderCompany, ...fetchLandParcels(companyId)];
  });

  return landsUnderCompany;
}

function getChildCompanies(companyId) {
  let resultCompanies = companies.reduce((result, company) => {
    if (company.parentId && company.parentId === companyId) {
    //   return result += "," + companyId;
    return [...result, company.id]
    }

    return result;
  }, []);

  return resultCompanies;
}

// Returns land ids []
function fetchLandParcels(companyId) {
  let landIds = [];
  landParcels.forEach((land) => {
      if (land.companyId === companyId) {
          landIds.push(land.id);
      }
  });

  return landIds;
}

//
function getAllChildsOfCompany(companyId, result) {
    result.push(companyId);
    let childCompanies = getChildCompanies(companyId);
    
    childCompanies.forEach(company => {
        return getAllChildsOfCompany(company, result); //recursive call to get child of child
    });

    return result;
}

//  will return : ["l1","l3","l4","l5"]
console.log(getLandParcelsForCompany("c1"));