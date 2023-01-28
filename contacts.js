const fs = require('fs')
const chalk = require('chalk')
const validator = require('validator')

// membuat folder data
if(!fs.existsSync('./data')){
    fs.mkdirSync('./data')
}

// membuat file contacts.json
const dataPath = './data/contacts.json'
if(!fs.existsSync(dataPath)){
    fs.writeFileSync(dataPath, '[]', 'utf-8')
}

const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf-8')
    const contacts = JSON.parse(file)
    return contacts
}

const simpanContact = (nama, email, noHP) => {
    const contact = {nama, email, noHP}
    const contacts = loadContact()

    //cek duplikat
    const duplikat = contacts.find((contact) => contact.nama === nama)
    if(duplikat){
        console.log(chalk.red.inverse(`Contact Sudah Terdaftar`))
        return false
    };

    // cek email
    if(email){
        if(!validator.isEmail(email)){
            console.log(chalk.red.inverse(`Email tidak valid`))
            return false
        }
    }

    if(!validator.isMobilePhone(noHP, 'id-ID')){
        console.log(chalk.red.inverse(`Nomor HP tidak valid`))
        return false
    }

    contacts.push(contact)

    fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))
    console.log(chalk.green.inverse("\nTerimas kasih"))
}

const listContact = () => {
    const contacts = loadContact()
    console.log(chalk.yellow.inverse(`Daftar Contact`))
    contacts.forEach((contact, i) => {
        console.log(`${i + 1}. ${contact.nama} - ${contact.noHP}`);
    });
}

const detailContact = (nama) => {
    const contacts = loadContact()
    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase())

    if(!contact){
        console.log(chalk.red.inverse(`${nama} tidak ditemukan`));
        return false
    }

    console.log(chalk.cyan.inverse(contact.nama));
    if(contact.email) console.log(contact.email);
    console.log(contact.noHP);
}

const deleteContact = (nama) => {
    const contacts = loadContact()
    const newContact = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase())

    if(contacts.length === newContact.length){
        console.log(chalk.red.inverse(`${nama} tidak ditemukan`));
        return false
    }

    fs.writeFileSync('data/contacts.json', JSON.stringify(newContact))
    console.log(chalk.green.inverse(`\nKontak ${nama} berhasil dihapus`))
}

module.exports = {simpanContact, listContact, detailContact, deleteContact}