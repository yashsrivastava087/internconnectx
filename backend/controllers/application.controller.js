import { application } from "express";
import { Application } from "../models/application.js";
import Job from "../models/job.js";
 
export const applyjob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;

        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required",
                success: false
            });
        }

        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job",
                success: false
            });
        }

        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(400).json({
                message: "Job not found",
                success: false
            });
        }

        const newApplication = await Application.create({
            job:jobId,
            applicant:userId,
        });


        job.applications.push(newApplication._id);
        await job.save();

        return res.status(201).json({
            message: "Job applied successfully",
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};


export const getAppliedjob = async (req,res) =>{
    try {
        const userId = req.id;
        const applications = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options:{sort:{
                    createdAt:-1
                }}
            }
        })
        if(!applications || applications.length === 0){ 
            return res.status(400).json({
                message:'applications not found',
                success:false
            })
        }
        return res.status(200).json({
            applications, 
            success:true
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ // Add return statement here
            message: "Server error",
            success: false
        });
    }
}


export const getapplicants = async (req,res) =>{
    try {
        const jobid = req.params.id;
        const job = await Job.findById(jobid).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant',
                options:{sort:{createdAt:-1}}
            }
        })
        if(!job){
            return res.status(400).json({
                message:"Job not found",
                success:false
            })
        }
        return res.status(200).json({
            job,
            success:true
        })

    } catch (error) {
        console.log(error);
        }
}

export const updatestatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id; // Assuming your route parameter is named 'id'

        if (!status) {
            return res.status(400).json({
                message: "Status is required",
                success: false
            });
        }

        // Validate if applicationId is a valid ObjectId if using MongoDB
        // (Add validation if necessary)

        const application = await Application.findById(applicationId); // Use findById for clarity if ID is the primary key

        if (!application) {
            return res.status(404).json({ 
                message: "Application not found",
                success: false
            });
        }

        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "Status updated successfully",
            success: true,
            application 
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error updating status",
            success: false,
            error: error.message 
        });
    }
};
