const {simpanContact, listContact, detailContact, deleteContact} = require('./contacts')
const yargs = require('yargs')

yargs.command({
    command: 'add', 
    describe: 'Menambahkan Contact',
    builder: {
        nama: {
            describe: 'Nama Lengkap',
            demandOption : true,
            type: 'string'
        },
        email: {
            describe: 'Email',
            demandOption : false,
            type: 'string'
        },
        nohp: {
            describe: 'Nomor HandPhone Anda',
            demandOption : true,
            type: 'string'
        }
    },
    handler(argv){
        simpanContact(argv.nama, argv.email, argv.nohp)
    }
}).demandCommand()

// menampilkan nama dan no HP contact
yargs.command({
    command: 'list', 
    describe: 'Menampilkan daftar Contact',
    handler(){
        listContact()
    }
})

// menampilkan detail contact
yargs.command({
    command: 'detail', 
    describe: 'Menampilkan detail Contact',
    builder: {
        nama : {
            describe: 'Nama Lengkap',
            demandOption : true,
            type: 'string'
        }
    },
    handler(argv){
        detailContact(argv.nama)
    }
})

// menghapus contact
yargs.command({
    command: 'remove', 
    describe: 'Menghapus Contact',
    builder: {
        nama : {
            describe: 'Nama Lengkap',
            demandOption : true,
            type: 'string'
        }
    },
    handler(argv){
        deleteContact(argv.nama)
    }
})

yargs.parse()