const fs = require('fs');

let path = process.argv[2];
const exit = msg => {
  console.log(msg);
  process.exit(-1);
};
if (process.argv.length <= 2) {
  const fileName = __filename.split('/')[__filename.split('/').length - 1];

  exit('Usage: ' + fileName + ' [directory]');
}

const subjects = {
  '030233111': 'abc'
};

path = path + '/term 1/midterm';

fs.readdir(path, { withFileTypes: true, encoding: 'utf8' }, function(
  err,
  items
) {
  if (err !== null) return console.log(err);
  if (items.length === 0) {
    exit('Directory is null');
  } else {
    for (var i = 0; i < items.length; i++) {
      var datePath = path + '/' + items[i].name;
      // .replace(' ', `\\ `);

      if (items[i].isDirectory()) {
        fs.readdir(datePath, function(err, files) {
          if (err !== null) return console.log(err);

          for (var a = 0; a < files.length; a++) {
            const pathExamination = datePath + '/' + files[a];
            const fileName = files[a].split('.')[0];
            fs.stat(pathExamination, (err, examination) => {
              const searchName = Object.keys(subjects).indexOf(fileName);
              if (searchName > -1) {
                const copyPath = datePath + '/' + subjects[fileName] + '.pdf';

                fs.copyFile(pathExamination, copyPath, error => {
                  if (error !== null) return console.log(error);
                  console.log('COPIED: ' + copyPath);
                });
              }
            });
          }
        });
      }
    }
  }
});
