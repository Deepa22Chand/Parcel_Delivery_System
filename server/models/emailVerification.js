// const sgMail= require('@sendgrid/mail')

// const API_KEY='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';

// sgMail.setApiKey(API_KEY)
// const message={
//     to:'co18364@ccet.ac.in',
//     from:'xiwobo4623@spruzme.com',
//     subject:'Parcel delivery',
//     Text: 'hello'
// }
// sgMail.send(message).then((response)=>console.log('email sent..'))
// .catch((error)=>console.log(error.message));
var nodemailer = require("nodemailer");

var sender = nodemailer.createTransport({
service: 'gmail',
auth: {
	user: 'mamta95.chd@gmail.com"',
	pass: 'Axtria@1'
}
});

var mail = {
from: "mamta95.chd@gmail.com",
to: "co18364@ccet.ac.in",
subject: "Sending Email using Node.js",
text: "That was easy!"
};

sender.sendMail(mail, function(error, info) {
if (error) {
	console.log(error);
} else {
	console.log("Email sent successfully: "
				+ info.response);
}
});
