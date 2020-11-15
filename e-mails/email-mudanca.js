const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "baitthenew@gmail.com",
    pass: "theryston10"
  }
});

var termo = "cobertor"
var artigo = "Cobertor ou manta é um utensílio de tecido, usado como roupa de cama, sobre o lençóis, como proteção contra o frio. Funcionam mantendo o calor do corpo, impedindo que se dissipe."

transporter.sendMail({
  from: "Bait <baitthenew@gmail.com>",
  to: ["funktodo2@gmail.com"],
  subject: "mudança no estilo de email",
  html: `
  
<html>
<head>
  <meta http-equiv="content-type" content="text/html;charset=UTF-8" />
  <style type="text/css" media="all">
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap');

    * {
      background: white;
      color: black;
      margin: 0px;
      padding: 0px;
      font-family: 'Poppins', sans-serif;
    }

    #background {
      position: absolute;
      top: 0px;
      left: 0px;
      height: 60%;
      width: 100%;
      object-fit: cover;
    }

    #text p {
      position: absolute;
      left: 0px;
      top: 650px;
      text-align: center;
      font-size: 0.9em;
    }

    #text h1 {
      position: absolute;
      left: 50%;
      text-align: center;
      position: absolute;
      font-size: 2.5em;
    }
  </style>
</head>

<body>
  <a href="https://baitnew-com.umbler.net">
    <img src="https://baitnew-com.umbler.net/assets/img/background-search.png" id="background">
     <br /> <br /> <br /> <br />
    <a />
    <div id="text">
      <h1>novos e-mails da bait</h1>
      
      <br /><br />
      
      <p>
        a partir de hoje os e-mails em que eu (Bait) te enviarei será neste formado bem mais bonito graças ao meu programador Theryston
      </p>
    </div>
    
</body>
</html>

`
}).then(message => {
  console.log(message)
}).catch(err => {
  console.log(err)
});