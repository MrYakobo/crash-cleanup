#!/usr/bin/env node

var fs = require('fs')
var program = require('commander');
var yesno = require('yesno')
var folder = '.'

program
    .version(JSON.parse(fs.readFileSync(__dirname + '/package.json')).version)
    .arguments('<path>')
    .option('-r, --recursive', 'recursive')
    .option('-f, --force', 'force')
    .action((path) => {
        folder = path
    })
    .parse(process.argv);

//optional "/" for paths, ends with .n
var reg = /(\/|^)\.\d+$/

var walker = require('walker');
var ora = require('ora')

if (program.recursive) {
    var remove = []
    const spinner = ora({text: 'Scanning subdirs...', spinner: 'dots'}).start()
    walker(folder)
    .on('file', function(f, stat){
        if (reg.test(f)) {
            remove.push(f)
        }
    })
    .on('error', (er, f, stat)=>{
        spinner.warn('Error reading file ' + f).start()
    })
    .on('end', ()=>{
        spinner.stop()
        cb(remove)
    })
} else {
    const spinner = ora({text: 'Scanning dir...', spinner: 'dots'}).start()
    var files = fs.readdirSync(folder)
    var remove = []
    files.forEach((f) => {
        if (reg.test(f)) {
            remove.push(f)
        }
    })
    spinner.succeed()
    cb(remove)
}

function cb(files){
    if(files.length===0) {
        console.log('No crashfiles found. You\'re clean!')
        process.exit(0)
    }
    if(!program.force){
        yesno.ask('Delete ' + files.join(', ') + '? [Y/n]', true, (ok)=>{
            if(ok){ cb2(files) }
            else process.exit(0)
        })
    }
    else
        cb2(files)
}

function cb2(files){
    files.forEach((f)=>{
        fs.unlinkSync(f)
    })
    console.log('Removed ' + files.length + ' files.')
}