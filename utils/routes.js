const fs = require('fs');

const getRoutes = (dir, a = []) => {
  console.log(a);
  const routeFiles = fs.readdirSync(`./routes/routes/${dir}`);
  for (let i = 0; i < routeFiles.length; i++) {
    if (!routeFiles[i].endsWith('.js')) {
      console.log(getRoutes(`${dir}/${routeFiles[i]}`));
      a = getRoutes(`${dir}/${routeFiles[i]}`, a);
    } else {
      a.push(`${dir}/${routeFiles[i]}`);
    }
  }
  return a;
};

module.exports = getRoutes;
