var express = require('express'),
    bodyParser = require('body-parser'),
    needle = require('needle');
var app = express();
var exec = require('child_process').exec;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.post('/image', (req, res) => {
  res.send('Thanks');
  console.log("Received Message: ");
  console.log(req.body);

  var options = {
    multipart: true
  };

  var uploadurl = req.body.uploadurl || 'http://166b79c3.ngrok.io/upload';
  var data = {
    image: {
      file: './photo/image.jpg',
      content_type: 'image/jpeg'
    },
    room: req.body.room
  };

  var capture = exec('raspistill -o photo/image.jpg -w 640 -h 480');
  capture.on('exit', (code) => {
    needle.post(uploadurl , data, options, (err, resp, body) => {
      if(err) throw err;
      console.log('Succeeded with response: ' + resp);
    });
  });

});

app.listen(4040 , () => {
  console.log('Pi listening on Port 4040');
});
