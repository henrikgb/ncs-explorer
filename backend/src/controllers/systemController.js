function getMessage(req, res) {
   res.status(200).json({ message: 'Hello from the backend!' });
 }

 function getHealth(req, res) {
   res.status(200).json({ status: 'UP', message: 'Backend server is running smoothly' });
 }

 module.exports = { getMessage, getHealth };