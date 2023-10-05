const express = require('express')
const router = express.Router()
const conn = require('../dbsetup/dbconfig')
const bcrypt = require('bcrypt')
const session = require('express-session')

const saltRound = 8

// Routes----------------------------------------------------------------
router.get('/check', (req, res) => {
    res.json({success:`Server is Running.`, statuscode:200})
})

// get
router.get('/chckacc', (req, res) => {
    const sql = `select * from account`
    conn.query(sql, (err, result) => {
        if (err) throw err
        res.send(result)
    })
})
router.get('/accsess', (req, res) => {
    // console.log(req.session.usracc)
    if (req.session.usracc) {
        res.json({message:'Already Logged In.', statuscode:200, user:req.session.usracc})
    }
    else {
        res.json({message:'Not Yet Loged In !!', statuscode:400})
    }
})

// post
router.post('/crtacc', (req, res) => {
    const {acc_phone, acc_name, acc_email, acc_pass} = req.body
    bcrypt.genSalt(saltRound, (err, salt) => {
        bcrypt.hash(acc_pass, salt, (err, hashPass) => {
            const sql = `insert into account(acc_phone, acc_name, acc_email, acc_pass) values('${acc_phone}', '${acc_name}', '${acc_email}', '${hashPass}')`
            conn.query(sql, (err, result) => {
                if (err) {
                    res.json({error:err})
                }
                else {
                    res.json({success:`Account Created Successfully.`, statuscode:200, data:result})
                }
            })
        })
    })
})
router.post('/login', (req, res) => {
    const {acc_email, acc_pass} = req.body
    const sql = `select * from account where acc_email = '${acc_email}'`
    conn.query(sql, (err, result) => {
        // console.log(result.length);
        if (err) {
            res.send({error:err})
        }
        else if (result.length>0) {
            bcrypt.compare(String(acc_pass), String(result[0].acc_pass), (error, nwresult) => {
                // console.log(result[0])
                if (nwresult) {
                    req.session.usracc = result[0]
                    // console.log(req.session.usracc);
                    res.json({success:`Account Successfully Logged In.`, statuscode:200, user:req.session.usracc})
                }
                else {
                    res.send({error:`Wrong Password !!`, statuscode:402})
                }
            })
        }
        else {
            res.send({error:`User doesn't Exist !!`, statuscode:401})
        }
    })
})

// put

// delete
router.delete('/logout', (req, res) => {
    if (req.session) {
        const usernm = req.session.usracc.acc_name
        req.session.destroy(err => {
            if (err) {
                res.json({error:err})
            }
            else {
                res.json({message:`${usernm} Successfully Logout.`, statuscode:200})
            }
        })
    }
})


module.exports = router