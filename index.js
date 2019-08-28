const Enumerable = require('linq');
const fs = require('fs');

async function getCars() {
	return new Promise ((resolve, reject) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
      if (err) reject(err);
      resolve(JSON.parse(data));
    });
  });
}

async function doFilters(cars) {
  const props = ['FUEL', 'BODYSTYLE'];
  const enumCars = Enumerable.from(cars.result);
  let result = {};
  props.forEach(item => {
    const desc = item + '_DESCRIPTION';
    const keys = enumCars.select(x => x[item]).distinct().toArray();
    const values = enumCars.select(x => x[desc]).distinct().toArray();
    /*
    result[item] = [];
    for (let i = 0; i < keys.length; i++) {
      result[item].push({[keys[i]]: values[i]});
    }
    */
    result[item] = keys.reduce((o, k, i) => ({...o, [k]: values[i]}), {})
  });
  return result;
}

async function main() {
  const cars = await getCars();
  const filteredData = doFilters(cars);
  // console.log(filteredData);
  //const res = Enumerable.from(cars.result).select(x => x.FUEL_DESCRIPTION).distinct().toArray();
  //const res = Enumerable.from(cars.result).selectMany(x => x).distinct().toArray();

  const res = Enumerable.from(cars.result).where(function(item) {
    return (item.NAME.includes('4WD'));
    // return Enumerable.from(item).distinct('$.NAME').contains('CHEROKEE')
  }).toArray();
  console.log(res);
}

main();