import Job from "../models/job.js";

export const postjob = async (req, res) => {
  try {
    const { title, description, requirements, salary, Jobtype, position, companyId, experience, location } = req.body;
    const userId = req.id;

    const requiredFields = [
      'title',
      'description',
      'requirements',
      'salary',
      'Jobtype',
      'position',
      'companyId',
      'experience',
      'location'
    ];

    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Missing required fields: ${missingFields.join(', ')}`,
        success: false,
        missingFields
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location, 
      Jobtype,
      experience: Number(experience), 
      position,
      company: companyId,
      created_by: userId
    });

    return res.status(201).json({
      message: "New Job created successfully",
      success: true,
      job
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};

export const getAlljobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } }
      ]
    };
    const jobs = await Job.find(query).populate({
        path:"company",
    }).sort({createdAt:-1});

    if(!jobs){
        return res.status(404).json({ // Changed status to 404
            message: "Job not found",
            success: false
          });
    }
    return res.status(200).json({
      jobs,
      success: true
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", success: false });
  }
}

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ // Changed status to 404
        message: "Job not found",
        success: false
      });
    }
    return res.status(200).json({
      job,
      success: true
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", success: false });
  }
}

export const getadminjobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await Job.find({ created_by: adminId });
    return res.status(200).json({
      jobs,
      success: true
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", success: false });
  }
}