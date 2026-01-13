import { Company } from "../models/company.js"; 
export const registercompany = async (req,res) => {
    try {
        const {companyName} = req.body;
        if(!companyName){
            return res.status(400).json({
                message:"Company name is required",
                success: false
            })
        }

        let company = await Company.findOne({name:companyName});
        if(company){
            return res.status(400).json({
                message:"u cannot add the same company name",
                success:false
            })
        }
        company = await Company.create({
            name:companyName,
            userId:req.id
        })
        return res.status(201).json({
            message:"Company registered successfully",
            company,
            success:true
        })


    } catch (error) {
        console.log(error);
    }
}

export const getcompany = async (req,res) => {
    try {
        const userId = req.id;
        const companies = await Company.find({userId});
        if(!companies){
            return res.status(404).json({
                message:"companies not found",
                success:false
            })
        }
        return res.status(200).json({
            message:"corect",
            companies,
            success: true
        })
        
    } catch (error) {
        console.log(error);
    }
}

export const getcompanybyId = async (req,res) => {
    try {
        const companyid = req.params.id;
        const company = await Company.findById(companyid);
        if(!company){
            return res.status(404).json({
                message:"Company not found",
                success: false
            })
        }
        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updatecompany = async (req,res)=>{
    try {
        const {name,description,website,location} = req.body;

        const file = req.file;
        const updatedata = {name,description,website,location};

        const company = await Company.findByIdAndUpdate(req.params.id, updatedata, {new:true});

        if(!company){
            return res.status(404).json({
                message:"company not found",
                success:false
            })
        }
        return res.status(200).json({
            message:"Company data updated",
            success:true
        })

    } catch (error) {
        console.log(error);
    }
}