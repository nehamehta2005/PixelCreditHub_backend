import Member from "../models/memberSchema.js";
import {capitalize} from "../helpers/index.js";

export const members = async (req, res, next) => {
  try {
    // Fetch allMembers data from the MongoDB collection named 'members'
    const allMembers = await Member.find({});
    if (allMembers) {
      res.status(200).json(allMembers);
      //console.log("allok here")
    } else {
      res.status(500).json({ error: error.message });
    }
  } catch (error) {
    next(error);
  }
};

export const singleMember = async (req, res, next) => {
  /*   const singleMember = await Member.findOne({name:req.params.singlemember});
  console.log(req.params.singlemember) */

  try {
    const singleMember = await Member.findOne({
      name: capitalize(req.params.singlemember)
    });
  
    if (singleMember) {
      res.status(200).json(singleMember);
 
    } else {
      res.status(404).json({ error: "Member not found" });
    }
  } catch (error) {
    next(error);
  }
};
