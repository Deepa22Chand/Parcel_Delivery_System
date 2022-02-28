const sgMail= require('@sendgrid/mail')

const API_KEY='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';

sgMail.setApiKey(API_KEY)
const message={
    to:'co18364@ccet.ac.in',
    from:'xiwobo4623@spruzme.com',
    subject:'Parcel delivery',
    Text: 'hello'
}
sgMail.send(message).then((response)=>console.log('email sent..'))
.catch((error)=>console.log(error.message));