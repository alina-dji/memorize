const User = require('../models/user');
const schedule = require('node-schedule');
const nodemailer = require('nodemailer');
require('dotenv').config();

async function getWorkspace (req, res) {
    try {
        const userId = req.params.user_id;
        const pageId = req.params.page_id;
        const user = await User.findById(userId);
        const page = user.pages.id(pageId);
        res.render('workspace.ejs', {page});
    }
    catch (err) {
        console.log(err);      // ADD STATUS CODE
    }  
}

async function deletePage (req, res) {
    try {
        const userId = req.params.user_id;
        const pageId = req.params.page_id;
        const user = await User.findById(userId);
        user.pages.id(pageId).remove();
        user.save(err => {
            if (err) {
                console.log(err);
            }
        });
        res.status(200).json(user);
    }
    catch (err) {
        res.status(400);
        console.log(err);
    }
}

async function newPage (req, res) {
    try {
        const userId = req.params.user_id;
        const user = await User.findById(userId);
        user.pages.push({title: '', priority:'unset', questions: [], answers: []});
        user.save(err => {
            if (err) {
                console.log(err);
            }
        });    
        res.status(200).json(user);
    } 
    catch (err) {
        res.status(400);
        console.log(err);
    }
}

async function deleteQuestion (req, res) {
    try {
        const userId = req.params.user_id;
        const pageId = req.params.page_id;
        const qstansId = req.params.question_id;
        const user = await User.findById(userId);
        const page = await user.pages.id(pageId);
        page.questions.splice(qstansId, 1);
        page.answers.splice(qstansId, 1);
        user.save(err => {
            if (err) {
                console.log(err);
            }
        });
        res.status(200).json({userId, pageId}); 
    }
    catch (err) {
        res.status(400);
        console.log(err);
    }
}

function sendEmails (user, page) {
    let text = ``;
    for (let i=0; i<page.questions.length; i++) {
        text = text + `◾ ${page.questions[i]}\n`;
    }
    const mailOptions = {
        from: 'memorize.webapp@gmail.com',
        to: user.email,
        subject: page.title,
        text: text
    };
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'memorize.webapp@gmail.com',
            pass: process.env.EMAIL_PW,
        }
    });
    let date = page.createdAt;
    date = date.toString();
    date = Date.now(date);
    let priority = page.priority;
    let lim=0;
    while (priority === 'low' && lim<3) {
        lim++;
        let numOfDaysToAdd = 864000000; // 10 days in ms
        let test = 180000; // 3min
        date = date + test;
        schedule.scheduleJob(date, () => {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('error sending email', error);
                }
                else {
                    console.log('email sent', info);
                }
            });
        });
    }
    while (priority === 'medium' && lim<3) {
        lim++;
        let numOfDaysToAdd = 432000000; // 5 days in ms
        let test = 120000; // 2min
        date = date + test;
        schedule.scheduleJob(date, () => {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('error sending email', error);
                }
                else {
                    console.log('email sent', info);
                }
            });
        });
    }
    while (priority === 'high' && lim<3) {
        lim++;
        let numOfDaysToAdd = 259200000; // 3 days in ms
        let test = 60000; // 1min
        date = date + test;
        schedule.scheduleJob(date, () => {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log('error sending email', error);
                }
                else {
                    console.log('email sent', info);
                }
            });
        });
    }
}

async function addQuestion (req, res) {
    try {
        const { question, answer } = req.body;
        const userId = req.params.user_id;
        const pageId = req.params.page_id;
        const user = await User.findById(userId);
        const page = await user.pages.id(pageId);
        page.questions.push(question);
        page.answers.push(answer);
        user.save(err => {
            if (err) {
                console.log(err);
            }
        });    
        res.status(200).json({userId, pageId});
    } 
    catch (err) {
        res.status(400);
        console.log(err);
    }
}

async function addTitle (req, res) {
    try {
        const { title } = req.body;
        const userId = req.params.user_id;
        const pageId = req.params.page_id;
        const user = await User.findById(userId);
        const page = await user.pages.id(pageId);
        page.title = title;
        user.save(err => {
            if (err) {
                console.log(err);
            }
        });    
        res.status(200).json({userId, pageId});
    } 
    catch (err) {
        res.status(400);
        console.log(err);
    }
}

async function setPriority (req, res) {
    try {
        const { priority } = req.body;
        const userId = req.params.user_id;
        const pageId = req.params.page_id;
        const user = await User.findById(userId);
        const page = await user.pages.id(pageId);
        page.priority = priority;
        user.save(err => {
            if (err) {
                console.log(err);
            }
        });
        sendEmails(user, page);    
        res.status(200).json({userId, pageId});
    } 
    catch (err) {
        res.status(400);
        console.log(err);
    }
}

module.exports = { getWorkspace, deletePage, newPage, deleteQuestion, addQuestion, addTitle, setPriority };