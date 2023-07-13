/************************** */
const db = require('../config/mongoose');
const Contact = require('../schima/stchima');
module.exports.home = async function(req, res){

    let contacts =  await Contact.find({})
          return res.render('home',{
              title: "Contact List",
              contact_list: contacts
          });
      };
/************************** */
module.exports.create = async function(req, res){
       let newContect =  await  Contact.create({
       Description: req.body.Description,
       Category: req.body.Category,
       Date:req.body.Date
       })
       return res.redirect('back')
   };
   
/************************** */
module.exports.delete =  async function(req, res) {
    try {
      console.log(req.query);
      let id = req.query.id;
  
      await Contact.findOneAndDelete({ _id: id });
  
      return res.redirect('back');
    } catch (error) {
      console.error('Error in deleting the object:', error);
      return res.status(500).send('Internal Server Error');
    }
  }; 
/************************** */
/************************** */

/************************** */