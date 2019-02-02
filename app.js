const fs = require('fs');

let path = process.argv[2];
const exit = msg => {
  console.log(msg);
  process.exit(-1);
};
if (process.argv.length <= 4) {
  const fileName = __filename.split('/')[__filename.split('/').length - 1];

  exit('Usage: ' + fileName + ' [directory] [term:1,2] [part: final,mid]');
}
const year = path.split('/')[path.split('/').length - 1];

const subjects = {
  '030233111': 'abc',
  '393142': 'English ' + year,
  '341152': 'Circuit ' + year,
  '394172': 'Math ' + year,
  '393162': 'Thai ' + year,
  '392152': 'Chemistry ' + year,
  '392132': 'Physic ' + year,
  '340152': 'Measurement ' + year,
  '393142 EP': 'English ' + year,
  '341152 EP': 'Circuit ' + year,
  '394172 EP': 'Math ' + year,
  '393162 EP': 'Thai ' + year,
  '392152 EP': 'Chemistry ' + year,
  '392132 EP': 'Physic ' + year,
  '340152 EP': 'Measurement ' + year
};
const term = process.argv[3];
const isFinal = process.argv[4] === 'mid' ? 'mid' : 'final';
path = path + '/term ' + term;

fs.readdir(path, { withFileTypes: true, encoding: 'utf8' }, function(
  err,
  items
) {
  if (err !== null) return console.log(err);
  if (items.length === 0) {
    exit('Directory is null');
  } else {
    for (var i = 0; i < items.length; i++) {
      let datePath = path + '/' + items[i].name;

      if (items[i].isDirectory()) {
        fs.readdir(
          datePath,
          { withFileTypes: true, encoding: 'utf8' },
          function(err, files) {
            if (err !== null) return console.log(err);

            for (var a = 0; a < files.length; a++) {
              if (files[a].isFile()) {
                const pathExamination = datePath + '/' + files[a].name;
                const fileName = files[a].name.split('.')[0];
                fs.stat(pathExamination, (err, examination) => {
                  if (err === null) {
                    const searchName = Object.keys(subjects).indexOf(fileName);
                    if (searchName > -1) {
                      const copyPath =
                        __dirname + '/' + subjects[fileName] + '.pdf';
                      fs.copyFile(pathExamination, copyPath, error => {
                        if (error !== null) return console.log(error);
                        console.log('COPIED: ' + copyPath);
                      });
                    }
                  }
                });
              }
            }
          }
        );
      }
    }
  }
});
